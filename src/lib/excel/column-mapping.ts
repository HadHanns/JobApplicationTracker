import { ColumnMappingConfig } from "@/types/application";

export const DEFAULT_KEYWORD_MAP: Record<keyof Omit<ColumnMappingConfig, "sheetName" | "headerRow" | "startDataRow">, string[]> = {
  companyCol: ["company", "perusahaan", "nama perusahaan", "employer", "organization"],
  positionCol: ["program", "position", "posisi", "role", "job title", "title", "job", "jabatan"],
  dateCol: ["date", "tanggal", "applied date", "apply date", "application date", "tanggal daftar"],
  statusCol: ["progress", "status", "stage", "tahapan", "state", "hasil"],
  jobTypeCol: ["type", "job type", "tipe", "employment type", "jenis"],
  referralCol: ["reff", "referral", "source", "platform", "sumber", "portal"],
  notesCol: ["reason", "notes", "catatan", "alasan", "remarks", "keterangan"],
};

export function detectColumnMappings(
  headers: { col: string; title: string; index: number }[]
): Partial<ColumnMappingConfig> {
  const result: Partial<ColumnMappingConfig> = {};

  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  for (const [key, keywords] of Object.entries(DEFAULT_KEYWORD_MAP)) {
    const matched = headers.find((h) => {
      const hClean = clean(h.title);
      return keywords.some((kw) => {
        const kwClean = clean(kw);
        return hClean === kwClean || hClean.includes(kwClean) || kwClean.includes(hClean);
      });
    });

    if (matched) {
      (result as any)[key] = matched.col;
    }
  }

  return result;
}

