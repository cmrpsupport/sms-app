import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Clock,
  MapPin,
  User,
  CheckCircle,
  AlertCircle,
  Send,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import ExportDropdown from "@/components/ExportDropdown";
import { exportData, ExportFormat, formatPHPForExport } from "@/lib/exportUtils";
import { formatPHP } from "@/lib/mockData";

interface CurriculumSubject {
  code: string;
  name: string;
  units: number;
  instructor: string;
  schedule: string;
  room: string;
  type: "core" | "elective" | "specialized";
}

interface GradeCurriculum {
  gradeLevel: string;
  subjects: CurriculumSubject[];
  tuitionPerUnit: number;
  miscFees: number;
  labFees: number;
}

export default function StudentEnrollment() {
  const currentTerm = "2nd Semester, AY 2024-2025";
  const enrollmentStatus = "open"; // open, closed, pending
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Student info (would come from auth/profile in real app)
  // Student only sees their own grade level - no switching
  const studentInfo = {
    name: "Maria Santos",
    id: "2024-0001",
    currentGradeLevel: "Grade 10",
    previousGPA: 87.5,
    section: "10-A",
    isEligible: true,
    remarks: "",
  };

  // Curriculum by grade level
  const curriculumData: Record<string, GradeCurriculum> = {
    "Grade 9": {
      gradeLevel: "Grade 9",
      tuitionPerUnit: 1200,
      miscFees: 4000,
      labFees: 2500,
      subjects: [
        { code: "FIL9", name: "Filipino 9", units: 3, instructor: "Mrs. Reyes", schedule: "MWF 7:30-8:30 AM", room: "Room 101", type: "core" },
        { code: "ENG9", name: "English 9", units: 3, instructor: "Ms. Cruz", schedule: "MWF 8:30-9:30 AM", room: "Room 102", type: "core" },
        { code: "MATH9", name: "Mathematics 9", units: 3, instructor: "Mr. Aquino", schedule: "TTH 7:30-9:00 AM", room: "Room 103", type: "core" },
        { code: "SCI9", name: "Science 9", units: 3, instructor: "Ms. Villanueva", schedule: "TTH 9:00-10:30 AM", room: "Lab 1", type: "core" },
        { code: "AP9", name: "Araling Panlipunan 9", units: 3, instructor: "Mr. Santos", schedule: "MWF 9:30-10:30 AM", room: "Room 104", type: "core" },
        { code: "ESP9", name: "Edukasyon sa Pagpapakatao 9", units: 2, instructor: "Mrs. Garcia", schedule: "TTH 10:30-11:30 AM", room: "Room 105", type: "core" },
        { code: "TLE9", name: "Technology and Livelihood Education 9", units: 3, instructor: "Mr. Lopez", schedule: "MWF 10:30-11:30 AM", room: "TLE Room", type: "specialized" },
        { code: "MAPEH9", name: "MAPEH 9", units: 2, instructor: "Coach Martinez", schedule: "TTH 1:00-2:00 PM", room: "Gym", type: "core" },
      ],
    },
    "Grade 10": {
      gradeLevel: "Grade 10",
      tuitionPerUnit: 1300,
      miscFees: 4500,
      labFees: 3000,
      subjects: [
        { code: "FIL10", name: "Filipino 10", units: 3, instructor: "Mrs. Reyes", schedule: "MWF 7:30-8:30 AM", room: "Room 201", type: "core" },
        { code: "ENG10", name: "English 10", units: 3, instructor: "Mrs. Santos", schedule: "MWF 8:30-9:30 AM", room: "Room 202", type: "core" },
        { code: "MATH10", name: "Mathematics 10", units: 3, instructor: "Prof. Garcia", schedule: "TTH 7:30-9:00 AM", room: "Room 203", type: "core" },
        { code: "SCI10", name: "Science 10", units: 3, instructor: "Dr. Rodriguez", schedule: "TTH 9:00-10:30 AM", room: "Lab 2", type: "core" },
        { code: "AP10", name: "Araling Panlipunan 10", units: 3, instructor: "Mr. Lopez", schedule: "MWF 9:30-10:30 AM", room: "Room 204", type: "core" },
        { code: "ESP10", name: "Edukasyon sa Pagpapakatao 10", units: 2, instructor: "Mrs. Garcia", schedule: "TTH 10:30-11:30 AM", room: "Room 205", type: "core" },
        { code: "TLE10", name: "Technology and Livelihood Education 10", units: 3, instructor: "Mr. Mendoza", schedule: "MWF 10:30-11:30 AM", room: "TLE Room", type: "specialized" },
        { code: "MAPEH10", name: "MAPEH 10", units: 2, instructor: "Coach Martinez", schedule: "TTH 1:00-2:00 PM", room: "Gym", type: "core" },
      ],
    },
    "Grade 11": {
      gradeLevel: "Grade 11",
      tuitionPerUnit: 1500,
      miscFees: 5000,
      labFees: 3500,
      subjects: [
        { code: "ORAL-COMM", name: "Oral Communication", units: 3, instructor: "Mrs. Santos", schedule: "MWF 7:30-8:30 AM", room: "Room 301", type: "core" },
        { code: "KOMFIL", name: "Komunikasyon at Pananaliksik", units: 3, instructor: "Mrs. Reyes", schedule: "TTH 7:30-9:00 AM", room: "Room 302", type: "core" },
        { code: "GEN-MATH", name: "General Mathematics", units: 3, instructor: "Prof. Garcia", schedule: "MWF 8:30-9:30 AM", room: "Room 303", type: "core" },
        { code: "EARTH-SCI", name: "Earth and Life Science", units: 3, instructor: "Dr. Rodriguez", schedule: "TTH 9:00-10:30 AM", room: "Lab 1", type: "core" },
        { code: "21ST-LIT", name: "21st Century Literature", units: 3, instructor: "Ms. Cruz", schedule: "MWF 9:30-10:30 AM", room: "Room 304", type: "core" },
        { code: "CONTEMP", name: "Contemporary Philippine Arts", units: 2, instructor: "Mr. Bautista", schedule: "TTH 10:30-11:30 AM", room: "Art Room", type: "core" },
        { code: "PE-11", name: "Physical Education 11", units: 2, instructor: "Coach Martinez", schedule: "MWF 10:30-11:30 AM", room: "Gym", type: "core" },
        { code: "ENTREP", name: "Entrepreneurship", units: 3, instructor: "Mr. Tan", schedule: "TTH 1:00-2:30 PM", room: "Room 305", type: "specialized" },
      ],
    },
    "Grade 12": {
      gradeLevel: "Grade 12",
      tuitionPerUnit: 1500,
      miscFees: 5500,
      labFees: 4000,
      subjects: [
        { code: "ENG-ACAD", name: "English for Academic Purposes", units: 3, instructor: "Mrs. Santos", schedule: "MWF 7:30-8:30 AM", room: "Room 401", type: "core" },
        { code: "PAG-UNAWA", name: "Pagbasa at Pagsusuri", units: 3, instructor: "Mrs. Reyes", schedule: "TTH 7:30-9:00 AM", room: "Room 402", type: "core" },
        { code: "PRAC-RES", name: "Practical Research 2", units: 3, instructor: "Dr. Bautista", schedule: "MWF 8:30-9:30 AM", room: "Room 403", type: "core" },
        { code: "MEDIA-INFO", name: "Media and Information Literacy", units: 3, instructor: "Mr. Pascual", schedule: "TTH 9:00-10:30 AM", room: "Comp Lab", type: "core" },
        { code: "PE-12", name: "Physical Education 12", units: 2, instructor: "Coach Martinez", schedule: "MWF 9:30-10:30 AM", room: "Gym", type: "core" },
        { code: "INQUIRE", name: "Inquiries and Investigation", units: 3, instructor: "Dr. Rodriguez", schedule: "TTH 10:30-12:00 PM", room: "Lab 2", type: "specialized" },
        { code: "WORK-IMM", name: "Work Immersion", units: 4, instructor: "Mr. Tan", schedule: "To be scheduled", room: "Off-campus", type: "specialized" },
      ],
    },
  };

  const curriculum = curriculumData[studentInfo.currentGradeLevel];
  const totalUnits = curriculum.subjects.reduce((sum, s) => sum + s.units, 0);
  const tuitionFee = totalUnits * curriculum.tuitionPerUnit;
  const totalFees = tuitionFee + curriculum.miscFees + curriculum.labFees;

  const handleConfirmEnrollment = () => {
    if (!studentInfo.isEligible) {
      toast.error("Not eligible for enrollment", {
        description: "Please contact the registrar's office for assistance.",
      });
      return;
    }
    setIsEnrolled(true);
    toast.success("Enrollment confirmed!", {
      description: `You are now enrolled in ${studentInfo.currentGradeLevel}. Please proceed to payment.`,
    });
  };

  const handleExportCOR = (format: ExportFormat) => {
    exportData(format, {
      title: "Certificate of Registration",
      subtitle: currentTerm,
      filename: `COR_${studentInfo.id}_${studentInfo.currentGradeLevel.replace(" ", "")}`,
      headers: ["Subject Code", "Subject Name", "Units", "Schedule", "Room", "Type"],
      data: curriculum.subjects.map(s => [
        s.code,
        s.name,
        s.units,
        s.schedule,
        s.room,
        s.type.charAt(0).toUpperCase() + s.type.slice(1)
      ]),
      additionalInfo: [
        { label: "Student Name", value: studentInfo.name },
        { label: "Student ID", value: studentInfo.id },
        { label: "Grade Level", value: studentInfo.currentGradeLevel },
        { label: "Section", value: studentInfo.section },
      ],
      summary: [
        { label: "Total Units", value: totalUnits.toString() },
        { label: "Tuition Fee", value: formatPHPForExport(tuitionFee) },
        { label: "Miscellaneous Fees", value: formatPHPForExport(curriculum.miscFees) },
        { label: "Laboratory Fees", value: formatPHPForExport(curriculum.labFees) },
        { label: "Total Assessment", value: formatPHPForExport(totalFees) },
      ],
    });
  };

  return (
    <Layout role="student">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Enrollment</h1>
            <p className="text-muted-foreground">{currentTerm}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {studentInfo.currentGradeLevel}
            </span>
            <ExportDropdown onExport={handleExportCOR} label="Download COR" />
          </div>
        </div>

        {/* Enrollment Success Banner */}
        {isEnrolled && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Enrollment Confirmed!</p>
              <p className="text-sm text-green-700">
                You are now enrolled in {studentInfo.currentGradeLevel}, Section {studentInfo.section}.
                Total fees: {formatPHP(totalFees)}. Please proceed to the cashier or pay online.
              </p>
            </div>
          </div>
        )}

        {/* Eligibility Status */}
        {!isEnrolled && (
          studentInfo.isEligible ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Eligible for Enrollment</p>
                <p className="text-sm text-green-700">
                  Based on your previous grades (GPA: {studentInfo.previousGPA}), you are eligible to enroll in {studentInfo.currentGradeLevel}.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">Not Eligible for Enrollment</p>
                <p className="text-sm text-red-700">
                  {studentInfo.remarks || "Please contact the registrar's office for more information."}
                </p>
              </div>
            </div>
          )
        )}

        {/* Enrollment Status Banner */}
        {enrollmentStatus === "open" ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800">Enrollment Period Open</p>
              <p className="text-sm text-blue-700">
                Deadline: December 20, 2024. Please review your curriculum and confirm enrollment.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-800">Enrollment Closed</p>
              <p className="text-sm text-gray-700">
                Contact the registrar's office for late enrollment inquiries.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Curriculum */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                {studentInfo.currentGradeLevel} Curriculum
              </h2>
              <span className="text-sm text-muted-foreground">
                {curriculum.subjects.length} subjects • {totalUnits} units
              </span>
            </div>

            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Subject</th>
                    <th className="text-center px-4 py-3 text-sm font-semibold">Units</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Schedule</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold">Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {curriculum.subjects.map((subject, index) => (
                    <tr key={subject.code} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-foreground">{subject.code}</p>
                          <p className="text-sm text-muted-foreground">{subject.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-medium">{subject.units}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <p className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {subject.schedule}
                          </p>
                          <p className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {subject.room}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {subject.instructor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enrollment Summary */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Enrollment Summary</h2>

            <div className="bg-white rounded-xl border border-border p-4 space-y-4 sticky top-4">
              {/* Student Info */}
              <div className="pb-4 border-b border-border">
                <p className="font-semibold">{studentInfo.name}</p>
                <p className="text-sm text-muted-foreground">{studentInfo.id}</p>
                <p className="text-sm text-muted-foreground">Section: {studentInfo.section}</p>
              </div>

              {/* Academic Info */}
              <div className="pb-4 border-b border-border">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Previous GPA</span>
                  <span className="font-semibold">{studentInfo.previousGPA}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Units</span>
                  <span className="font-semibold">{totalUnits}</span>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="pb-4 border-b border-border">
                <p className="text-sm font-semibold mb-2">Fee Breakdown</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tuition ({totalUnits} units × {formatPHP(curriculum.tuitionPerUnit)})</span>
                    <span>{formatPHP(tuitionFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Miscellaneous Fees</span>
                    <span>{formatPHP(curriculum.miscFees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Laboratory Fees</span>
                    <span>{formatPHP(curriculum.labFees)}</span>
                  </div>
                </div>
              </div>

              <div className="pb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatPHP(totalFees)}</span>
                </div>
              </div>

              {isEnrolled ? (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4" />
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={handleConfirmEnrollment}
                  disabled={!studentInfo.isEligible}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Confirm Enrollment
                </button>
              )}

              <p className="text-xs text-muted-foreground text-center">
                {isEnrolled
                  ? "Please proceed to payment to complete your enrollment."
                  : "By confirming, you agree to the enrollment terms and payment schedule."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
