import { useState } from "react";
import Layout from "@/components/Layout";
import {
  BookOpen,
  Users,
  Calendar,
  Plus,
  Edit,
  Eye,
  Clock,
  UserPlus,
  ArrowLeftRight,
  Download,
} from "lucide-react";
import { sections, sectionStudents } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Academics() {
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("all");
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  const handleExportSections = () => {
    const headers = ["Section Code", "Section Name", "Grade Level", "Adviser", "Enrolled", "Capacity"];
    const csvContent = [
      headers.join(","),
      ...sections.map(s =>
        [s.code, `"${s.name}"`, s.gradeLevel, `"${s.adviser}"`, s.enrolled, s.capacity].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sections_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout role="admin">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Academics</h1>
            <p className="text-muted-foreground">
              Manage sections and student assignments
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportSections}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowAssignDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Assign Students
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sections.length}</p>
                <p className="text-sm text-muted-foreground">Total Sections</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {sections.reduce((sum, s) => sum + s.enrolled, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Enrolled</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2024-2025</p>
                <p className="text-sm text-muted-foreground">Academic Year</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1st Sem</p>
                <p className="text-sm text-muted-foreground">Current Term</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Level Filter */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">Filter by Grade Level:</span>
          <div className="flex gap-2">
            {["all", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedGradeLevel(level)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedGradeLevel === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {level === "all" ? "All" : level}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          </TabsList>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-4">
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-bold text-lg mb-4">Curriculum by Grade Level</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Each grade level follows the K-12 curriculum with fixed subjects. Students are automatically enrolled in all subjects for their grade level.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { grade: "Grade 9", subjects: 8, units: 22 },
                  { grade: "Grade 10", subjects: 8, units: 22 },
                  { grade: "Grade 11", subjects: 8, units: 22 },
                  { grade: "Grade 12", subjects: 7, units: 21 },
                ].map((item) => (
                  <div key={item.grade} className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{item.grade}</h4>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{item.subjects} subjects</span>
                      <span>{item.units} units</span>
                    </div>
                    <button className="mt-3 text-sm text-primary hover:underline">
                      View Curriculum →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sections Tab */}
          <TabsContent value="sections" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections
                .filter((s) => selectedGradeLevel === "all" || s.yearLevel === selectedGradeLevel)
                .map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-foreground text-lg">
                        {section.code}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {section.name}
                      </p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                      {section.yearLevel}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Class Adviser
                      </p>
                      <p className="text-sm font-semibold">{section.adviser}</p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Students Enrolled</span>
                        <span className="font-semibold">
                          {section.enrolled} / {section.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            section.enrolled / section.capacity > 0.9
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${(section.enrolled / section.capacity) * 100}%`,
                          }}
                        />
                      </div>
                      {section.enrolled / section.capacity > 0.9 && (
                        <p className="text-xs text-orange-600 mt-1">Near capacity</p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-3 h-3" />
                        View Students
                      </button>
                      <button className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-gray-50 transition-colors">
                        <ArrowLeftRight className="w-3 h-3" />
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Assign Students Dialog - placeholder */}
        {showAssignDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Assign Students to Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Select Section
                  </label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg">
                    {sections.map((s) => (
                      <option key={s.id} value={s.code}>{s.code} - {s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">
                    Students to Assign
                  </label>
                  <div className="border border-border rounded-lg p-3 max-h-48 overflow-y-auto">
                    <p className="text-sm text-muted-foreground">
                      Select unassigned students from the enrollment list...
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAssignDialog(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAssignDialog(false);
                    alert("Students assigned successfully!");
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
