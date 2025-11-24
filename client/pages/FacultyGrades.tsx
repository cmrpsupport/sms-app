import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Save,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import ExportDropdown from "@/components/ExportDropdown";
import { exportData, ExportFormat } from "@/lib/exportUtils";

import { sectionStudents } from "@/lib/mockData";

interface GradeEntry {
  studentId: string;
  studentName: string;
  prelim: string;
  midterm: string;
  finals: string;
  finalGrade: string;
  remarks: string;
}

export default function FacultyGrades() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") || "BIO101";
  const initialSection = searchParams.get("section") || "10-A";

  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [gradingPeriod, setGradingPeriod] = useState("midterm");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getInitialGrades = (section: string): GradeEntry[] => {
    const sectionList = sectionStudents[section] || sectionStudents["10-A"];
    return sectionList.map((s) => ({
      studentId: s.id,
      studentName: s.name,
      prelim: Math.floor(Math.random() * 15 + 80).toString(),
      midterm: "",
      finals: "",
      finalGrade: "",
      remarks: "",
    }));
  };

  const [grades, setGrades] = useState<GradeEntry[]>(
    getInitialGrades(initialSection)
  );

  // Update grades list when section changes
  useEffect(() => {
    setGrades(getInitialGrades(selectedSection));
    setIsSubmitted(false);
  }, [selectedSection]);

  const subjects = [
    { code: "BIO101", name: "Biology 101" },
    { code: "CHEM101", name: "Chemistry 101" },
    { code: "PHYS101", name: "Physics 101" },
  ];

  // Sections available per subject
  const subjectSections: Record<string, string[]> = {
    "BIO101": ["10-A", "10-B"],
    "CHEM101": ["11-A"],
    "PHYS101": ["10-A", "11-A"],
  };

  const availableSections = subjectSections[selectedSubject] || ["10-A"];

  // Reset section when subject changes if current section not available
  useEffect(() => {
    if (!availableSections.includes(selectedSection)) {
      setSelectedSection(availableSections[0]);
    }
  }, [selectedSubject]);

  const handleGradeChange = (studentId: string, field: string, value: string) => {
    setGrades(grades.map(g => {
      if (g.studentId === studentId) {
        const updated = { ...g, [field]: value };
        // Auto-compute final grade
        const prelim = parseFloat(updated.prelim) || 0;
        const midterm = parseFloat(updated.midterm) || 0;
        const finals = parseFloat(updated.finals) || 0;
        if (prelim && midterm && finals) {
          const avg = (prelim * 0.3 + midterm * 0.3 + finals * 0.4);
          updated.finalGrade = avg.toFixed(1);
          updated.remarks = avg >= 75 ? "PASSED" : "FAILED";
        }
        return updated;
      }
      return g;
    }));
  };

  const handleSaveDraft = () => {
    toast.success("Grades saved as draft", {
      description: "You can continue editing and submit later.",
    });
  };

  const handleSubmit = () => {
    if (confirm("Are you sure you want to submit these grades? Once submitted, they cannot be edited without admin approval.")) {
      setIsSubmitted(true);
      toast.success("Grades submitted successfully!", {
        description: "Students can now view their grades in their portal.",
      });
    }
  };

  const handleExport = (format: ExportFormat) => {
    const subjectName = subjects.find(s => s.code === selectedSubject)?.name || selectedSubject;

    exportData(format, {
      title: "Grade Sheet",
      subtitle: `${subjectName} - Section ${selectedSection}`,
      filename: `grades_${selectedSubject}_${selectedSection}_${gradingPeriod}`,
      headers: ["Student ID", "Student Name", "Prelim", "Midterm", "Finals", "Final Grade", "Remarks"],
      data: grades.map(g => [
        g.studentId,
        g.studentName,
        g.prelim || "-",
        g.midterm || "-",
        g.finals || "-",
        g.finalGrade || "-",
        g.remarks || "-"
      ]),
      additionalInfo: [
        { label: "Subject", value: `${selectedSubject} - ${subjectName}` },
        { label: "Section", value: selectedSection },
        { label: "Grading Period", value: gradingPeriod.charAt(0).toUpperCase() + gradingPeriod.slice(1) },
        { label: "Academic Year", value: "2024-2025" },
      ],
      summary: [
        { label: "Total Students", value: grades.length.toString() },
      ],
    });
  };

  return (
    <Layout role="faculty">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Grade Entry</h1>
            <p className="text-muted-foreground">
              Enter and submit student grades
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Subject
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((s, i) => (
                  <option key={i} value={s.code}>
                    {s.code} - {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Section
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {availableSections.map((section) => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Grading Period
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={gradingPeriod}
                onChange={(e) => setGradingPeriod(e.target.value)}
              >
                <option value="prelim">Prelim</option>
                <option value="midterm">Midterm</option>
                <option value="finals">Finals</option>
              </select>
            </div>

            <div className="flex items-end">
              <ExportDropdown onExport={handleExport} />
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Grades Submitted</p>
              <p className="text-sm text-green-700">
                Submitted on Nov 20, 2025 at 10:30 AM. Contact registrar to make changes.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-800">Deadline: Nov 25, 2025</p>
              <p className="text-sm text-orange-700">
                Please submit grades before the deadline. Save draft to continue later.
              </p>
            </div>
          </div>
        )}

        {/* Grade Entry Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Student ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Name
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Prelim (30%)
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Midterm (30%)
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Finals (40%)
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Final Grade
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr
                    key={grade.studentId}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-foreground">
                      {grade.studentId}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {grade.studentName}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-20 px-3 py-1 text-center border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={grade.prelim}
                        onChange={(e) => handleGradeChange(grade.studentId, "prelim", e.target.value)}
                        disabled={isSubmitted}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-20 px-3 py-1 text-center border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={grade.midterm}
                        onChange={(e) => handleGradeChange(grade.studentId, "midterm", e.target.value)}
                        disabled={isSubmitted}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-20 px-3 py-1 text-center border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={grade.finals}
                        onChange={(e) => handleGradeChange(grade.studentId, "finals", e.target.value)}
                        disabled={isSubmitted}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-lg">
                        {grade.finalGrade || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {grade.remarks && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            grade.remarks === "PASSED"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {grade.remarks}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          {!isSubmitted && (
            <div className="flex items-center justify-end gap-4 p-4 border-t border-border bg-gray-50">
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-white transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Grades
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold">{grades.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Grades Entered</p>
            <p className="text-2xl font-bold">
              {grades.filter(g => g.finalGrade).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Passing</p>
            <p className="text-2xl font-bold text-green-600">
              {grades.filter(g => g.remarks === "PASSED").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Failing</p>
            <p className="text-2xl font-bold text-red-600">
              {grades.filter(g => g.remarks === "FAILED").length}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
