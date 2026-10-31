CREATE TABLE "Account" (
  "id" TEXT NOT NULL PRIMARY KEY, "userId" TEXT NOT NULL, "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL, "providerAccountId" TEXT NOT NULL, "refresh_token" TEXT,
  "access_token" TEXT, "expires_at" INTEGER, "token_type" TEXT, "scope" TEXT,
  "id_token" TEXT, "session_state" TEXT,
  CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Session" (
  "id" TEXT NOT NULL PRIMARY KEY, "sessionToken" TEXT NOT NULL, "userId" TEXT NOT NULL,
  "expires" DATETIME NOT NULL,
  CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "User" (
  "id" TEXT NOT NULL PRIMARY KEY, "name" TEXT, "email" TEXT, "emailVerified" DATETIME, "image" TEXT,
  "workspaceTitle" TEXT NOT NULL DEFAULT 'Job Hunt 2026', "dailyGoalCurrent" INTEGER NOT NULL DEFAULT 12,
  "dailyGoalTarget" INTEGER NOT NULL DEFAULT 24, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);
CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL, "token" TEXT NOT NULL, "expires" DATETIME NOT NULL
);
CREATE TABLE "JobApplication" (
  "id" TEXT NOT NULL PRIMARY KEY, "userId" TEXT NOT NULL, "company" TEXT NOT NULL, "position" TEXT NOT NULL,
  "jobUrl" TEXT DEFAULT '', "appliedDate" TEXT NOT NULL, "status" TEXT NOT NULL DEFAULT 'Applied',
  "detailedProgress" TEXT DEFAULT 'Applied', "location" TEXT DEFAULT '', "salary" TEXT DEFAULT '',
  "jobType" TEXT DEFAULT 'Fulltime', "referralSource" TEXT DEFAULT 'LinkedIn', "notes" TEXT DEFAULT '',
  "followUpDate" TEXT DEFAULT '', "rowNumber" INTEGER, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "InterviewSession" (
  "id" TEXT NOT NULL PRIMARY KEY, "applicationId" TEXT NOT NULL, "stage" TEXT NOT NULL, "date" TEXT NOT NULL,
  "time" TEXT DEFAULT '', "interviewer" TEXT DEFAULT '', "meetingLink" TEXT DEFAULT '', "notes" TEXT DEFAULT '',
  "completed" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "InterviewSession_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "JobApplication" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
CREATE INDEX "JobApplication_userId_idx" ON "JobApplication"("userId");
CREATE INDEX "JobApplication_status_idx" ON "JobApplication"("status");
CREATE INDEX "InterviewSession_applicationId_idx" ON "InterviewSession"("applicationId");
