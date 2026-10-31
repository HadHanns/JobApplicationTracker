import ExcelJS from "exceljs";
import {
  JobApplication,
  ExcelImportResult,
  ColumnMappingConfig,
} from "@/types/application";
import { normalizeStatus } from "@/lib/utils";
import { detectColumnMappings } from "./column-mapping";

function getCellValue(cell: any): any {
  if (cell == null) return "";
  const val = cell.value !== undefined ? cell.value : cell;
  if (val == null) return "";

  if (val instanceof Date) {
    return val.toISOString().slice(0, 10);
  }

  if (typeof val === "object") {
    if ("result" in val && val.result != null) {
      if (val.result instanceof Date) {
        return val.result.toISOString().slice(0, 10);
      }
      return String(val.result).trim();
    }
    if ("text" in val && typeof val.text === "string") {
      return val.text.trim();
    }
    if ("richText" in val && Array.isArray(val.richText)) {
      return val.richText.map((t: any) => t.text).join("").trim();
    }
    return "";
  }

  return String(val).trim();
}

function parseDateValue(raw: any): string {
  if (!raw) return new Date().toISOString().slice(0, 10);
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);

  const str = String(raw).trim();
  // check if already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // check if numeric Excel timestamp
  const num = Number(str);
  if (!isNaN(num) && num > 30000 && num < 60000) {
    // Excel epoch 1899-12-30
    const date = new Date(Math.round((num - 25569) * 86400 * 1000));
    return date.toISOString().slice(0, 10);
  }

  // Try parsing generic date
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return new Date().toISOString().slice(0, 10);
}

export async function parseExcelTemplate(
  buffer: ArrayBuffer,
  sheetNameToUse?: string,
  customMapping?: Partial<ColumnMappingConfig>
): Promise<ExcelImportResult> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const sheetNames = workbook.worksheets.map((ws) => ws.name);
  if (sheetNames.length === 0) {
    throw new Error("No worksheets found in this Excel workbook.");
  }

  // Prefer Tracker sheet if exists, otherwise sheetNameToUse, otherwise first visible sheet
  let selectedSheetName = sheetNameToUse;
  if (!selectedSheetName) {
    if (sheetNames.includes("Tracker")) {
      selectedSheetName = "Tracker";
    } else {
      selectedSheetName = sheetNames[0];
    }
  }

  const worksheet = workbook.getWorksheet(selectedSheetName);
  if (!worksheet) {
    throw new Error(`Worksheet "${selectedSheetName}" not found.`);
  }

  // Find header row: scan first 12 rows
  let headerRowIndex = 5; // default for template
  let maxMatchedKeywords = -1;
  const keywordList = [
    "company",
    "program",
    "position",
    "job",
    "type",
    "reff",
    "referral",
    "date",
    "progress",
    "status",
    "reason",
    "notes",
  ];

  for (let r = 1; r <= Math.min(15, worksheet.rowCount); r++) {
    const row = worksheet.getRow(r);
    let matched = 0;
    row.eachCell((cell) => {
      const val = getCellValue(cell).toLowerCase();
      if (keywordList.some((kw) => val.includes(kw))) {
        matched++;
      }
    });
    if (matched > maxMatchedKeywords) {
      maxMatchedKeywords = matched;
      headerRowIndex = r;
    }
  }

  const headerRow = worksheet.getRow(headerRowIndex);
  const headers: { col: string; title: string; index: number }[] = [];

  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    const title = getCellValue(cell);
    if (title) {
      // Column letter
      const colLetter = worksheet.getColumn(colNumber).letter || String(colNumber);
      headers.push({
        col: colLetter,
        title,
        index: colNumber,
      });
    }
  });

  const autoMapping = detectColumnMappings(headers);
  const mapping: Partial<ColumnMappingConfig> = {
    ...autoMapping,
    ...customMapping,
  };

  const applications: JobApplication[] = [];
  let totalRowsRead = 0;
  let skippedCount = 0;

  // Find column indices
  const getColIndex = (colKey?: string): number | null => {
    if (!colKey) return null;
    const found = headers.find((h) => h.col.toUpperCase() === colKey.toUpperCase());
    if (found) return found.index;
    const num = Number(colKey);
    if (!isNaN(num)) return num;
    return null;
  };

  const companyIndex = getColIndex(mapping.companyCol) ?? 4; // Col D default
  const positionIndex = getColIndex(mapping.positionCol) ?? 5; // Col E default
  const typeIndex = getColIndex(mapping.jobTypeCol) ?? 6; // Col F default
  const reffIndex = getColIndex(mapping.referralCol) ?? 7; // Col G default
  const dateIndex = getColIndex(mapping.dateCol) ?? 8; // Col H default
  const statusIndex = getColIndex(mapping.statusCol) ?? 9; // Col I default
  const notesIndex = getColIndex(mapping.notesCol) ?? 10; // Col J default

  const startDataRow = headerRowIndex + 1;
  const rawRows: Record<string, any>[] = [];

  for (let r = startDataRow; r <= worksheet.rowCount; r++) {
    const row = worksheet.getRow(r);
    const company = getCellValue(row.getCell(companyIndex));
    const position = getCellValue(row.getCell(positionIndex));

    // Check if this row is empty or contains instructions
    if (!company && !position) {
      continue;
    }

    // Ignore known instruction rows
    if (
      company.toLowerCase().includes("silakan hapus") ||
      company.toLowerCase().includes("tutor ->") ||
      company.toLowerCase().includes("tanggal di isi")
    ) {
      continue;
    }

    totalRowsRead++;

    if (!company) {
      skippedCount++;
      continue;
    }

    const rawDate = row.getCell(dateIndex).value;
    const appliedDate = parseDateValue(rawDate);
    const rawProgress = getCellValue(row.getCell(statusIndex));
    const jobType = getCellValue(row.getCell(typeIndex)) || "Fulltime";
    const referralSource = getCellValue(row.getCell(reffIndex)) || "LinkedIn";
    const notes = getCellValue(row.getCell(notesIndex));

    const status = normalizeStatus(rawProgress);

    const app: JobApplication = {
      id: `app_${Date.now()}_${r}_${Math.random().toString(36).substring(2, 7)}`,
      company: company.trim(),
      position: position.trim() || "Untitled Position",
      jobType,
      referralSource,
      appliedDate,
      status,
      detailedProgress: rawProgress || status,
      notes: notes || undefined,
      rowNumber: r,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    applications.push(app);
    rawRows.push({
      row: r,
      company,
      position,
      jobType,
      referralSource,
      appliedDate,
      status: app.status,
      detailedProgress: app.detailedProgress,
      notes,
    });
  }

  return {
    applications,
    totalRowsRead,
    validCount: applications.length,
    skippedCount,
    sheetNames,
    selectedSheet: selectedSheetName,
    headers,
    detectedMapping: mapping,
    rawRows,
    templateFileBuffer: buffer,
  };
}

