import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronDown,
  Copy,
  Archive,
} from "lucide-react";
import { toast } from "sonner";

type TabType = "academic-year" | "sections" | "grading" | "curriculum" | "scholarships";

interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "archived";
  terms: { name: string; startDate: string; endDate: string }[];
}

interface Section {
  id: string;
  code: string;
  name: string;
  yearLevel: string;
  capacity: number;
  enrolled: number;
  adviser: string;
  status: "active" | "inactive";
}

interface Subject {
  id: string;
  code: string;
  name: string;
  units: number;
  yearLevel: string;
  semester: string;
  type: "major" | "minor" | "elective" | "ge";
  prerequisites: string[];
}

interface Scholarship {
  id: string;
  name: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  slots: number;
  used: number;
  criteria: string;
  status: "active" | "inactive";
}

export default function AcademicSetup() {
  const [activeTab, setActiveTab] = useState<TabType>("academic-year");

  // Academic Years
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([
    {
      id: "1",
      name: "2024-2025",
      startDate: "2024-06-03",
      endDate: "2025-03-28",
      status: "active",
      terms: [
        { name: "1st Semester", startDate: "2024-06-03", endDate: "2024-10-25" },
        { name: "2nd Semester", startDate: "2024-11-04", endDate: "2025-03-28" },
      ],
    },
    {
      id: "2",
      name: "2023-2024",
      startDate: "2023-06-05",
      endDate: "2024-03-29",
      status: "archived",
      terms: [
        { name: "1st Semester", startDate: "2023-06-05", endDate: "2023-10-27" },
        { name: "2nd Semester", startDate: "2023-11-06", endDate: "2024-03-29" },
      ],
    },
  ]);

  // Sections
  const [sections, setSections] = useState<Section[]>([
    { id: "1", code: "7-A", name: "Grade 7 - Section A", yearLevel: "Grade 7", capacity: 40, enrolled: 38, adviser: "Mrs. Santos", status: "active" },
    { id: "2", code: "7-B", name: "Grade 7 - Section B", yearLevel: "Grade 7", capacity: 40, enrolled: 40, adviser: "Mr. Reyes", status: "active" },
    { id: "3", code: "8-A", name: "Grade 8 - Section A", yearLevel: "Grade 8", capacity: 40, enrolled: 35, adviser: "Mrs. Garcia", status: "active" },
    { id: "4", code: "8-B", name: "Grade 8 - Section B", yearLevel: "Grade 8", capacity: 40, enrolled: 39, adviser: "Mr. Cruz", status: "active" },
    { id: "5", code: "9-A", name: "Grade 9 - Section A", yearLevel: "Grade 9", capacity: 40, enrolled: 36, adviser: "Mrs. Mendoza", status: "active" },
    { id: "6", code: "9-B", name: "Grade 9 - Section B", yearLevel: "Grade 9", capacity: 40, enrolled: 37, adviser: "Mr. Torres", status: "active" },
    { id: "7", code: "10-A", name: "Grade 10 - Section A", yearLevel: "Grade 10", capacity: 40, enrolled: 34, adviser: "Mrs. Villanueva", status: "active" },
    { id: "8", code: "10-B", name: "Grade 10 - Section B", yearLevel: "Grade 10", capacity: 40, enrolled: 38, adviser: "Mr. Gonzales", status: "active" },
  ]);

  // Grading System
  const [gradingConfig, setGradingConfig] = useState({
    scale: "numerical",
    passingGrade: 75,
    weights: {
      writtenWork: 25,
      performanceTask: 50,
      quarterlyExam: 25,
    },
    honors: [
      { name: "With Highest Honors", minGPA: 98 },
      { name: "With High Honors", minGPA: 95 },
      { name: "With Honors", minGPA: 90 },
    ],
    gradeEquivalents: [
      { min: 90, max: 100, equivalent: "Outstanding" },
      { min: 85, max: 89, equivalent: "Very Satisfactory" },
      { min: 80, max: 84, equivalent: "Satisfactory" },
      { min: 75, max: 79, equivalent: "Fairly Satisfactory" },
      { min: 0, max: 74, equivalent: "Did Not Meet Expectations" },
    ],
  });

  // Subjects/Curriculum
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", code: "ENG101", name: "English 101", units: 3, yearLevel: "Grade 7", semester: "1st", type: "major", prerequisites: [] },
    { id: "2", code: "MATH101", name: "Mathematics 101", units: 3, yearLevel: "Grade 7", semester: "1st", type: "major", prerequisites: [] },
    { id: "3", code: "SCI101", name: "Science 101", units: 3, yearLevel: "Grade 7", semester: "1st", type: "major", prerequisites: [] },
    { id: "4", code: "FIL101", name: "Filipino 101", units: 3, yearLevel: "Grade 7", semester: "1st", type: "major", prerequisites: [] },
    { id: "5", code: "AP101", name: "Araling Panlipunan 101", units: 3, yearLevel: "Grade 7", semester: "1st", type: "major", prerequisites: [] },
    { id: "6", code: "MAPEH101", name: "MAPEH 101", units: 2, yearLevel: "Grade 7", semester: "1st", type: "minor", prerequisites: [] },
    { id: "7", code: "TLE101", name: "TLE 101", units: 2, yearLevel: "Grade 7", semester: "1st", type: "minor", prerequisites: [] },
    { id: "8", code: "ENG102", name: "English 102", units: 3, yearLevel: "Grade 7", semester: "2nd", type: "major", prerequisites: ["ENG101"] },
    { id: "9", code: "MATH102", name: "Mathematics 102", units: 3, yearLevel: "Grade 7", semester: "2nd", type: "major", prerequisites: ["MATH101"] },
  ]);

  // Scholarships
  const [scholarships, setScholarships] = useState<Scholarship[]>([
    { id: "1", name: "Academic Excellence", code: "ACAD-EX", type: "percentage", value: 100, slots: 10, used: 8, criteria: "GPA >= 95", status: "active" },
    { id: "2", name: "Academic Achievement", code: "ACAD-ACH", type: "percentage", value: 50, slots: 20, used: 15, criteria: "GPA >= 90", status: "active" },
    { id: "3", name: "Financial Assistance", code: "FIN-ASST", type: "fixed", value: 10000, slots: 50, used: 42, criteria: "Income <= 200k/year", status: "active" },
    { id: "4", name: "Athletic Scholarship", code: "ATH-SCH", type: "percentage", value: 75, slots: 15, used: 12, criteria: "Varsity member", status: "active" },
  ]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleSaveGrading = () => {
    const total = gradingConfig.weights.writtenWork + gradingConfig.weights.performanceTask + gradingConfig.weights.quarterlyExam;
    if (total !== 100) {
      toast.error(`Weights must total 100% (currently ${total}%)`);
      return;
    }
    toast.success("Grading configuration saved!");
  };

  const handleAddSection = () => {
    toast.success("Section added successfully!");
    setShowAddModal(false);
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    toast.success("Section deleted");
  };

  const handleAddSubject = () => {
    toast.success("Subject added successfully!");
    setShowAddModal(false);
  };

  const tabs = [
    { id: "academic-year" as TabType, label: "Academic Year", icon: Calendar },
    { id: "sections" as TabType, label: "Sections", icon: Users },
    { id: "grading" as TabType, label: "Grading System", icon: GraduationCap },
    { id: "curriculum" as TabType, label: "Curriculum", icon: BookOpen },
    { id: "scholarships" as TabType, label: "Scholarships", icon: Settings },
  ];

  return (
    <Layout role="admin">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Academic Setup</h1>
          <p className="text-muted-foreground">Configure academic year, sections, grading, and curriculum</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-border">
          <div className="border-b border-border">
            <div className="flex gap-1 p-1 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Academic Year Tab */}
            {activeTab === "academic-year" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Academic Years</h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Academic Year
                  </button>
                </div>

                <div className="space-y-4">
                  {academicYears.map((year) => (
                    <div
                      key={year.id}
                      className={`p-4 rounded-lg border ${
                        year.status === "active" ? "border-green-200 bg-green-50" : "border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{year.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              year.status === "active" ? "bg-green-100 text-green-700" :
                              year.status === "upcoming" ? "bg-blue-100 text-blue-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {year.status.charAt(0).toUpperCase() + year.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(year.startDate).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })} - {new Date(year.endDate).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Copy to new year">
                            <Copy className="w-4 h-4" />
                          </button>
                          {year.status !== "active" && (
                            <button className="p-2 hover:bg-red-50 rounded-lg text-red-500" title="Archive">
                              <Archive className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Terms/Semesters:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {year.terms.map((term, i) => (
                            <div key={i} className="p-3 bg-white rounded-lg border border-border">
                              <p className="font-medium text-sm">{term.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(term.startDate).toLocaleDateString("en-PH", { month: "short", day: "numeric" })} - {new Date(term.endDate).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sections Tab */}
            {activeTab === "sections" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Class Sections</h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Section
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-semibold">Code</th>
                        <th className="text-left p-3 text-sm font-semibold">Name</th>
                        <th className="text-left p-3 text-sm font-semibold">Year Level</th>
                        <th className="text-left p-3 text-sm font-semibold">Capacity</th>
                        <th className="text-left p-3 text-sm font-semibold">Enrolled</th>
                        <th className="text-left p-3 text-sm font-semibold">Adviser</th>
                        <th className="text-left p-3 text-sm font-semibold">Status</th>
                        <th className="text-left p-3 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sections.map((section) => (
                        <tr key={section.id} className="border-b border-border hover:bg-gray-50">
                          <td className="p-3 font-medium">{section.code}</td>
                          <td className="p-3">{section.name}</td>
                          <td className="p-3">{section.yearLevel}</td>
                          <td className="p-3">{section.capacity}</td>
                          <td className="p-3">
                            <span className={section.enrolled >= section.capacity ? "text-red-600 font-semibold" : ""}>
                              {section.enrolled}
                            </span>
                          </td>
                          <td className="p-3">{section.adviser}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              section.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                            }`}>
                              {section.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSection(section.id)}
                                className="p-1 hover:bg-red-50 rounded text-red-500"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Grading System Tab */}
            {activeTab === "grading" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Grading Configuration</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Settings */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Basic Settings</h3>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Grading Scale</label>
                      <select
                        value={gradingConfig.scale}
                        onChange={(e) => setGradingConfig({ ...gradingConfig, scale: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                      >
                        <option value="numerical">Numerical (0-100)</option>
                        <option value="gpa">GPA (1.0-5.0)</option>
                        <option value="letter">Letter Grades (A-F)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Passing Grade</label>
                      <input
                        type="number"
                        value={gradingConfig.passingGrade}
                        onChange={(e) => setGradingConfig({ ...gradingConfig, passingGrade: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Component Weights */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Component Weights (must total 100%)</h3>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Written Work (%)</label>
                      <input
                        type="number"
                        value={gradingConfig.weights.writtenWork}
                        onChange={(e) => setGradingConfig({
                          ...gradingConfig,
                          weights: { ...gradingConfig.weights, writtenWork: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Performance Task (%)</label>
                      <input
                        type="number"
                        value={gradingConfig.weights.performanceTask}
                        onChange={(e) => setGradingConfig({
                          ...gradingConfig,
                          weights: { ...gradingConfig.weights, performanceTask: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Quarterly Exam (%)</label>
                      <input
                        type="number"
                        value={gradingConfig.weights.quarterlyExam}
                        onChange={(e) => setGradingConfig({
                          ...gradingConfig,
                          weights: { ...gradingConfig.weights, quarterlyExam: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total: {gradingConfig.weights.writtenWork + gradingConfig.weights.performanceTask + gradingConfig.weights.quarterlyExam}%
                    </p>
                  </div>
                </div>

                {/* Grade Equivalents */}
                <div>
                  <h3 className="font-medium mb-3">Grade Equivalents</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold">Range</th>
                          <th className="text-left p-3 text-sm font-semibold">Equivalent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradingConfig.gradeEquivalents.map((ge, i) => (
                          <tr key={i} className="border-t border-gray-200">
                            <td className="p-3">{ge.min} - {ge.max}</td>
                            <td className="p-3">{ge.equivalent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Honors Criteria */}
                <div>
                  <h3 className="font-medium mb-3">Honors Criteria</h3>
                  <div className="space-y-2">
                    {gradingConfig.honors.map((honor, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{honor.name}</span>
                        <span className="text-muted-foreground">GPA ≥ {honor.minGPA}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSaveGrading}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Save Configuration
                </button>
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === "curriculum" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Subjects/Courses</h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Subject
                  </button>
                </div>

                <div className="flex gap-4 mb-4">
                  <select className="px-3 py-2 border border-border rounded-lg text-sm">
                    <option value="">All Year Levels</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                  </select>
                  <select className="px-3 py-2 border border-border rounded-lg text-sm">
                    <option value="">All Semesters</option>
                    <option value="1st">1st Semester</option>
                    <option value="2nd">2nd Semester</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-semibold">Code</th>
                        <th className="text-left p-3 text-sm font-semibold">Subject Name</th>
                        <th className="text-left p-3 text-sm font-semibold">Units</th>
                        <th className="text-left p-3 text-sm font-semibold">Year Level</th>
                        <th className="text-left p-3 text-sm font-semibold">Semester</th>
                        <th className="text-left p-3 text-sm font-semibold">Type</th>
                        <th className="text-left p-3 text-sm font-semibold">Prerequisites</th>
                        <th className="text-left p-3 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject) => (
                        <tr key={subject.id} className="border-b border-border hover:bg-gray-50">
                          <td className="p-3 font-medium">{subject.code}</td>
                          <td className="p-3">{subject.name}</td>
                          <td className="p-3">{subject.units}</td>
                          <td className="p-3">{subject.yearLevel}</td>
                          <td className="p-3">{subject.semester}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              subject.type === "major" ? "bg-blue-100 text-blue-700" :
                              subject.type === "minor" ? "bg-purple-100 text-purple-700" :
                              subject.type === "elective" ? "bg-green-100 text-green-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {subject.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-sm">
                            {subject.prerequisites.length > 0 ? subject.prerequisites.join(", ") : "None"}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-red-50 rounded text-red-500" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Scholarships Tab */}
            {activeTab === "scholarships" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Scholarship Programs</h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Scholarship
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="p-4 bg-white border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{scholarship.name}</h3>
                          <p className="text-sm text-muted-foreground">{scholarship.code}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          scholarship.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                          {scholarship.status}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Discount:</span>
                          <span className="font-medium">
                            {scholarship.type === "percentage" ? `${scholarship.value}%` : `₱${scholarship.value.toLocaleString()}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Slots:</span>
                          <span className="font-medium">{scholarship.used}/{scholarship.slots}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Criteria:</span>
                          <span className="font-medium">{scholarship.criteria}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex justify-end gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-red-50 rounded text-red-500" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Add {activeTab === "academic-year" ? "Academic Year" :
                     activeTab === "sections" ? "Section" :
                     activeTab === "curriculum" ? "Subject" : "Scholarship"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-muted-foreground mb-4">
              Form fields for adding new {activeTab.replace("-", " ")} would go here.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeTab === "sections") handleAddSection();
                  else if (activeTab === "curriculum") handleAddSubject();
                  else {
                    toast.success("Item added successfully!");
                    setShowAddModal(false);
                  }
                }}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
