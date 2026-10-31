import ExcelJS from "exceljs";
import { JobApplication } from "@/types/application";

export async function exportToTemplate(
  applications: JobApplication[],
  templateBuffer: ArrayBuffer
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(templateBuffer);

  const trackerSheet =
    workbook.getWorksheet("Tracker") ||
    workbook.worksheets.find((ws) => ws.name.toLowerCase().includes("tracker")) ||
    workbook.worksheets[0];

  if (!trackerSheet) {
    throw new Error("Could not find Tracker sheet in the template.");
  }

  // Clear shared formula attributes across all rows in application columns C..J
  // to avoid ExcelJS shared formula master/clone synchronization errors
  const maxRow = Math.max(255, trackerSheet.rowCount);
  for (let r = 6; r <= maxRow; r++) {
    const row = trackerSheet.getRow(r);
    for (let c = 3; c <= 10; c++) {
      const cell = row.getCell(c);
      const model = cell.model as any;
      if (model) {
        delete model.shareType;
        delete model.ref;
        delete model.formula;
        delete model.sharedFormula;
      }
      cell.value = null;
    }
  }

  // Write new applications
  applications.forEach((app, index) => {
    const rowNum = 6 + index;
    const row = trackerSheet.getRow(rowNum);

    // Col C: Number
    row.getCell(3).value = index + 1;

    // Col D: Company
    row.getCell(4).value = app.company || "";

    // Col E: Program / Position
    row.getCell(5).value = app.position || "";

    // Col F: Job Type
    row.getCell(6).value = app.jobType || "Fulltime";

    // Col G: Reff / Referral Source
    row.getCell(7).value = app.referralSource || "LinkedIn";

    // Col H: Applied Date
    if (app.appliedDate) {
      try {
        const d = new Date(app.appliedDate);
        if (!isNaN(d.getTime())) {
          row.getCell(8).value = d;
          row.getCell(8).numFmt = "yyyy-mm-dd";
        } else {
          row.getCell(8).value = app.appliedDate;
        }
      } catch {
        row.getCell(8).value = app.appliedDate;
      }
    } else {
      row.getCell(8).value = new Date();
      row.getCell(8).numFmt = "yyyy-mm-dd";
    }

    // Col I: Progress / Status
    row.getCell(9).value = app.detailedProgress || app.status || "Applied";

    // Col J: Reason / Notes
    row.getCell(10).value = app.notes || "";

    row.commit();
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer);
}

export async function exportToCleanWorkbook(
  applications: JobApplication[]
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Offerly";
  workbook.lastModifiedBy = "Offerly";
  workbook.created = new Date();
  workbook.modified = new Date();

  const ws = workbook.addWorksheet("Job Applications", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  ws.columns = [
    { header: "No", key: "no", width: 8 },
    { header: "Company", key: "company", width: 28 },
    { header: "Position", key: "position", width: 32 },
    { header: "Status", key: "status", width: 16 },
    { header: "Detailed Progress", key: "detailedProgress", width: 20 },
    { header: "Type", key: "jobType", width: 16 },
    { header: "Referral Source", key: "referralSource", width: 18 },
    { header: "Applied Date", key: "appliedDate", width: 16 },
    { header: "Location", key: "location", width: 20 },
    { header: "Salary", key: "salary", width: 18 },
    { header: "Follow-Up Date", key: "followUpDate", width: 16 },
    { header: "Job URL", key: "jobUrl", width: 35 },
    { header: "Notes", key: "notes", width: 40 },
  ];

  // Header styling
  const headerRow = ws.getRow(1);
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1E293B" }, // Slate 800
    };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    cell.border = {
      bottom: { style: "medium", color: { argb: "FF0F172A" } },
    };
  });

  // Populate data
  applications.forEach((app, idx) => {
    const row = ws.addRow({
      no: idx + 1,
      company: app.company,
      position: app.position,
      status: app.status,
      detailedProgress: app.detailedProgress || app.status,
      jobType: app.jobType || "Fulltime",
      referralSource: app.referralSource || "LinkedIn",
      appliedDate: app.appliedDate || "-",
      location: app.location || "-",
      salary: app.salary || "-",
      followUpDate: app.followUpDate || "-",
      jobUrl: app.jobUrl || "-",
      notes: app.notes || "-",
    });

    row.height = 22;
    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "left" };
      cell.border = {
        bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
      };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer);
}

export function triggerDownload(buffer: Uint8Array, filename: string): void {
  const blob = new Blob([buffer as any], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
