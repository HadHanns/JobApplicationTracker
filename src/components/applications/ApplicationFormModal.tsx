"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { JobApplication, ApplicationStatus } from "@/types/application";
import { useApplications } from "@/lib/application-context";

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationToEdit?: JobApplication | null;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose,
  applicationToEdit,
}) => {
  const { addApplication, updateApplication, createModalDefaultStatus } = useApplications();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>(createModalDefaultStatus || "Applied");
  const [detailedProgress, setDetailedProgress] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("Fulltime");
  const [referralSource, setReferralSource] = useState("LinkedIn");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (applicationToEdit) {
      setCompany(applicationToEdit.company || "");
      setPosition(applicationToEdit.position || "");
      setJobUrl(applicationToEdit.jobUrl || "");
      setAppliedDate(applicationToEdit.appliedDate || new Date().toISOString().slice(0, 10));
      setStatus(applicationToEdit.status || "Applied");
      setDetailedProgress(applicationToEdit.detailedProgress || applicationToEdit.status || "Applied");
      setLocation(applicationToEdit.location || "");
      setSalary(applicationToEdit.salary || "");
      setJobType(applicationToEdit.jobType || "Fulltime");
      setReferralSource(applicationToEdit.referralSource || "LinkedIn");
      setNotes(applicationToEdit.notes || "");
      setFollowUpDate(applicationToEdit.followUpDate || "");
    } else {
      setCompany("");
      setPosition("");
      setJobUrl("");
      setAppliedDate(new Date().toISOString().slice(0, 10));
      setStatus(createModalDefaultStatus || "Applied");
      setDetailedProgress(createModalDefaultStatus || "Applied");
      setLocation("");
      setSalary("");
      setJobType("Fulltime");
      setReferralSource("LinkedIn");
      setNotes("");
      setFollowUpDate("");
    }
    setError("");
  }, [applicationToEdit, isOpen, createModalDefaultStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!company.trim()) {
      setError("Company name is required.");
      return;
    }
    if (!position.trim()) {
      setError("Job position / title is required.");
      return;
    }

    const appData = {
      company: company.trim(),
      position: position.trim(),
      jobUrl: jobUrl.trim() || undefined,
      appliedDate: appliedDate || new Date().toISOString().slice(0, 10),
      status,
      detailedProgress: detailedProgress.trim() || status,
      location: location.trim() || undefined,
      salary: salary.trim() || undefined,
      jobType,
      referralSource,
      notes: notes.trim() || undefined,
      followUpDate: followUpDate || undefined,
      interviews: applicationToEdit?.interviews || [],
    };

    setIsSubmitting(true);
    try {
      if (applicationToEdit) {
        await updateApplication(applicationToEdit.id, appData);
      } else {
        await addApplication(appData);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={applicationToEdit ? "Edit Job Application" : "New Job Application"}
      description="Record details about the company, position, timeline, and current recruitment stage."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company Name *"
            placeholder="e.g. Google, Unilever, Bank Sinarmas"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <Input
            label="Job Position / Role *"
            placeholder="e.g. Product Manager, Software Engineer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Recruitment Stage"
            value={status}
            onChange={(e) => {
              const newStatus = e.target.value as ApplicationStatus;
              setStatus(newStatus);
              if (!detailedProgress || detailedProgress === status) {
                setDetailedProgress(newStatus);
              }
            }}
          >
            <option value="Wishlist">Wishlist</option>
            <option value="Applied">Applied / Submitted</option>
            <option value="Assessment">Assessment / Test</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer / Offering</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
          </Select>

          <Input
            label="Detailed Progress Note"
            placeholder="e.g. HR - Intv, User - Intv, Offering"
            value={detailedProgress}
            onChange={(e) => setDetailedProgress(e.target.value)}
            helperText="Matches Excel Progress column"
          />

          <Input
            label="Application Date"
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Job Type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="Fulltime">Fulltime</option>
            <option value="MT">Management Trainee (MT)</option>
            <option value="Intern">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Part-time">Part-time</option>
          </Select>

          <Select
            label="Referral / Source"
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value)}
          >
            <option value="LinkedIn">LinkedIn</option>
            <option value="Jobstreet">Jobstreet</option>
            <option value="Job Fair">Job Fair</option>
            <option value="Company Website">Company Website</option>
            <option value="Deals">Deals / Referral Portal</option>
            <option value="Friends">Friends / Internal Referral</option>
            <option value="Glints">Glints</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Job Posting URL"
            type="url"
            placeholder="https://linkedin.com/jobs/..."
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
          />

          <Input
            label="Planned Follow-up Date"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            helperText="Get automated reminder on dashboard"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Location"
            placeholder="e.g. Jakarta Pusat, Hybrid, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Input
            label="Expected / Listed Salary"
            placeholder="e.g. Rp 12.000.000 / bln"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <Textarea
          label="Personal Notes & Details"
          placeholder="Key requirements, recruiter contacts, tech stack, or case study topics..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {applicationToEdit ? "Saving..." : "Creating..."}
              </span>
            ) : (
              applicationToEdit ? "Save Changes" : "Create Application"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

