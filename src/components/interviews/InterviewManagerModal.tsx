"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { JobApplication } from "@/types/application";
import { useApplications } from "@/lib/application-context";

interface InterviewManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: JobApplication | null;
}

export const InterviewManagerModal: React.FC<InterviewManagerModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  const { applications, addInterview } = useApplications();

  const [selectedAppId, setSelectedAppId] = useState(application?.id || "");
  const [stage, setStage] = useState("HR - Intv");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [interviewer, setInterviewer] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (application) {
      setSelectedAppId(application.id);
    } else if (applications.length > 0) {
      setSelectedAppId((prev) => (prev ? prev : applications[0].id));
    }
    setDate(new Date().toISOString().slice(0, 10));
    setStage("HR - Intv");
    setTime("10:00");
    setInterviewer("");
    setMeetingLink("");
    setNotes("");
    setError("");
  }, [application, applications, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) {
      setError("Please select a job application.");
      return;
    }
    if (!date) {
      setError("Interview date is required.");
      return;
    }

    addInterview(selectedAppId, {
      stage,
      date,
      time: time || undefined,
      interviewer: interviewer.trim() || undefined,
      meetingLink: meetingLink.trim() || undefined,
      notes: notes.trim() || undefined,
      completed: false,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Interview Round"
      description="Record interview schedule, stage details, meeting links, and preparation notes."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        {!application && (
          <Select
            label="Target Application *"
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
          >
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.company} — {app.position}
              </option>
            ))}
          </Select>
        )}

        {application && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500">Scheduling round for:</span>
            <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
              {application.company} — {application.position}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Interview Stage *"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          >
            <option value="HR - Intv">HR Interview / Screening</option>
            <option value="User - Intv">User / Hiring Manager Interview</option>
            <option value="Presentation">Case Presentation</option>
            <option value="Technical Interview">Technical / System Design</option>
            <option value="Coding Assessment">Live Coding / Pair Programming</option>
            <option value="Culture Fit">Culture & Values Interview</option>
            <option value="Offering Discussion">Offering / Negotiation Discussion</option>
          </Select>

          <Input
            label="Interviewer Name / Title"
            placeholder="e.g. Sarah (HRBP) / VP of Eng"
            value={interviewer}
            onChange={(e) => setInterviewer(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date *"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <Input
            label="Time (WIB / Local)"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <Input
          label="Meeting URL or Location"
          type="url"
          placeholder="https://meet.google.com/... or Office Room 4B"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
        />

        <Textarea
          label="Preparation Notes & Focus"
          placeholder="Topics to study, questions to ask the interviewer, presentation deck link..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Schedule Round
          </Button>
        </div>
      </form>
    </Modal>
  );
};
