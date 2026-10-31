export type ApplicationStatus =
  | "Wishlist"
  | "Applied"
  | "Assessment"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export type DetailedProgress =
  | "Wishlist"
  | "Submitted"
  | "Emailed Back"
  | "Assesment"
  | "HR - Intv"
  | "User - Intv"
  | "Presentation"
  | "Offering"
  | "Rejected"
  | "Not Proceed"
  | "Withdrawn"
  | string;

export interface InterviewSession {
  id: string;
  stage: string; // e.g. 'HR - Intv', 'User - Intv', 'Presentation', 'Technical'
  date: string; // ISO date YYYY-MM-DD
  time?: string; // HH:mm
  interviewer?: string;
  meetingLink?: string;
  notes?: string;
  completed?: boolean;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  jobUrl?: string;
  appliedDate: string; // YYYY-MM-DD
  status: ApplicationStatus;
  detailedProgress?: DetailedProgress;
  location?: string;
  salary?: string;
  jobType?: "Fulltime" | "Contract" | "Intern" | "MT" | "Freelance" | "Part-time" | string;
  referralSource?: "LinkedIn" | "Jobstreet" | "Job Fair" | "Company Website" | "Deals" | "Friends" | "Other" | string;
  notes?: string;
  followUpDate?: string; // YYYY-MM-DD
  interviews?: InterviewSession[];
  rowNumber?: number; // Original Excel row if imported
  createdAt: string;
  updatedAt: string;
}

export interface ColumnMappingConfig {
  companyCol: string;
  positionCol: string;
  dateCol: string;
  statusCol: string;
  jobTypeCol?: string;
  referralCol?: string;
  notesCol?: string;
  sheetName?: string;
  headerRow?: number;
  startDataRow?: number;
}

export interface ExcelImportResult {
  applications: JobApplication[];
  totalRowsRead: number;
  validCount: number;
  skippedCount: number;
  sheetNames: string[];
  selectedSheet: string;
  headers: { col: string; title: string; index: number }[];
  detectedMapping: Partial<ColumnMappingConfig>;
  rawRows?: Record<string, any>[];
  templateFileBuffer?: ArrayBuffer;
  templateFileName?: string;
}

export type ViewMode = "table" | "pipeline" | "interviews";

