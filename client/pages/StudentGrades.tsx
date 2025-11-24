import Layout from "@/components/Layout";
import { Printer, TrendingUp, Award } from "lucide-react";
import ExportDropdown from "@/components/ExportDropdown";
import { exportData, ExportFormat } from "@/lib/exportUtils";

export default function StudentGrades() {
  // Mock student grades data
  const currentTerm = "1st Semester, AY 2024-2025";

  const grades = [
    {
      code: "BIO101",
      name: "Biology 101",
      units: 3,
      instructor: "Dr. Rodriguez",
      prelim: 88,
      midterm: 85,
      finals: 90,
      finalGrade: 87.9,
      remarks: "PASSED",
    },
    {
      code: "MATH101",
      name: "Mathematics 101",
      units: 3,
      instructor: "Prof. Garcia",
      prelim: 82,
      midterm: 78,
      finals: 85,
      finalGrade: 81.9,
      remarks: "PASSED",
    },
    {
      code: "ENG101",
      name: "English Literature",
      units: 3,
      instructor: "Mrs. Santos",
      prelim: 92,
      midterm: 94,
      finals: 96,
      finalGrade: 94.4,
      remarks: "PASSED",
    },
    {
      code: "CHEM101",
      name: "Chemistry 101",
      units: 3,
      instructor: "Prof. Reyes",
      prelim: 75,
      midterm: 72,
      finals: 78,
      finalGrade: 75.3,
      remarks: "PASSED",
    },
    {
      code: "HIST101",
      name: "Philippine History",
      units: 3,
      instructor: "Mr. Lopez",
      prelim: 85,
      midterm: 88,
      finals: 90,
      finalGrade: 88.1,
      remarks: "PASSED",
    },
    {
      code: "PE101",
      name: "Physical Education",
      units: 2,
      instructor: "Coach Martinez",
      prelim: 95,
      midterm: 92,
      finals: 94,
      finalGrade: 93.5,
      remarks: "PASSED",
    },
  ];

  const totalUnits = grades.reduce((sum, g) => sum + g.units, 0);
  const gpa = grades.reduce((sum, g) => sum + (g.finalGrade * g.units), 0) / totalUnits;

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 85) return "text-blue-600";
    if (grade >= 80) return "text-primary";
    if (grade >= 75) return "text-orange-600";
    return "text-red-600";
  };

  const getLetterGrade = (grade: number) => {
    if (grade >= 95) return "A+";
    if (grade >= 90) return "A";
    if (grade >= 85) return "B+";
    if (grade >= 80) return "B";
    if (grade >= 75) return "C";
    return "F";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = (format: ExportFormat) => {
    exportData(format, {
      title: "Academic Report Card",
      subtitle: currentTerm,
      filename: `grades_${currentTerm.replace(/[^a-zA-Z0-9]/g, "_")}`,
      headers: ["Subject Code", "Subject Name", "Units", "Prelim", "Midterm", "Finals", "Final Grade", "Remarks"],
      data: grades.map(g => [
        g.code,
        g.name,
        g.units,
        g.prelim,
        g.midterm,
        g.finals,
        g.finalGrade.toFixed(1),
        g.remarks
      ]),
      additionalInfo: [
        { label: "Student Name", value: "Maria Santos" },
        { label: "Student ID", value: "2024-0001" },
        { label: "Year Level", value: "Grade 10" },
        { label: "Section", value: "10-A" },
      ],
      summary: [
        { label: "Total Units", value: totalUnits.toString() },
        { label: "General Weighted Average", value: gpa.toFixed(2) },
      ],
    });
  };

  return (
    <Layout role="student">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
            <p className="text-muted-foreground">{currentTerm}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <ExportDropdown onExport={handleExport} label="Download" />
          </div>
        </div>

        {/* GPA Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Term GPA</p>
            <p className="text-3xl font-bold text-primary">{gpa.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Total Units</p>
            <p className="text-3xl font-bold">{totalUnits}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground mb-2">Academic Standing</p>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              Good Standing
            </span>
            <p className="text-xs text-muted-foreground mt-2">
              {gpa >= 85 ? "Dean's List Candidate" : "Regular Standing"}
            </p>
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                    Subject
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-foreground">
                    Units
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-foreground">
                    Prelim
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-foreground">
                    Midterm
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-foreground">
                    Finals
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-foreground">
                    Final Grade
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-foreground">
                    Letter
                  </th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-foreground">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr
                    key={grade.code}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          {grade.code}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {grade.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {grade.instructor}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {grade.units}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {grade.prelim}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {grade.midterm}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {grade.finals}
                    </td>
                    <td className={`px-4 py-4 text-center text-lg font-bold ${getGradeColor(grade.finalGrade)}`}>
                      {grade.finalGrade.toFixed(1)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`font-bold ${getGradeColor(grade.finalGrade)}`}>
                        {getLetterGrade(grade.finalGrade)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        grade.remarks === "PASSED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {grade.remarks}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="p-4 bg-gray-50 border-t border-border">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Grading: Prelim (30%) + Midterm (30%) + Finals (40%)
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground mr-4">
                  Total Units: <strong>{totalUnits}</strong>
                </span>
                <span className="text-sm">
                  GPA: <strong className="text-lg text-primary">{gpa.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Scale Reference */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Grading Scale</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="font-bold text-green-600">A+ / A</p>
              <p className="text-xs text-muted-foreground">90-100</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded">
              <p className="font-bold text-blue-600">B+</p>
              <p className="text-xs text-muted-foreground">85-89</p>
            </div>
            <div className="text-center p-2 bg-primary-50 rounded">
              <p className="font-bold text-primary">B</p>
              <p className="text-xs text-muted-foreground">80-84</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <p className="font-bold text-orange-600">C</p>
              <p className="text-xs text-muted-foreground">75-79</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded">
              <p className="font-bold text-red-600">F</p>
              <p className="text-xs text-muted-foreground">Below 75</p>
            </div>
            <div className="text-center p-2 bg-gray-100 rounded">
              <p className="font-bold">Passing</p>
              <p className="text-xs text-muted-foreground">75 and above</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
