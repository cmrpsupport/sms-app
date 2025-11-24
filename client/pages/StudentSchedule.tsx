import { useRef } from "react";
import Layout from "@/components/Layout";
import { Download, Printer, MapPin } from "lucide-react";
import { subjects } from "@/lib/mockData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function StudentSchedule() {
  const scheduleRef = useRef<HTMLDivElement>(null);

  // Mock student's enrolled subjects
  const enrolledSubjects = subjects.slice(0, 5).map(s => ({
    ...s,
    day: s.schedule.includes("MWF") ? ["Mon", "Wed", "Fri"] : ["Tue", "Thu"],
    time: s.schedule.replace(/[A-Z]/g, "").trim(),
  }));

  const scheduleMatrix = [
    { time: "7:00 - 8:00 AM", slots: [] as typeof enrolledSubjects },
    { time: "8:00 - 9:00 AM", slots: [] as typeof enrolledSubjects },
    { time: "9:00 - 10:00 AM", slots: [] as typeof enrolledSubjects },
    { time: "10:00 - 11:00 AM", slots: [] as typeof enrolledSubjects },
    { time: "11:00 - 12:00 PM", slots: [] as typeof enrolledSubjects },
    { time: "1:00 - 2:00 PM", slots: [] as typeof enrolledSubjects },
    { time: "2:00 - 3:00 PM", slots: [] as typeof enrolledSubjects },
    { time: "3:00 - 4:00 PM", slots: [] as typeof enrolledSubjects },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const getSubjectForSlot = (day: string, timeSlot: string) => {
    return enrolledSubjects.find(s => {
      const hasDay = s.day.includes(day);
      const schedTime = s.schedule.toLowerCase();
      const slotHour = parseInt(timeSlot.split(":")[0]);

      // Simple time matching
      if (schedTime.includes("8:00") && slotHour === 8) return hasDay;
      if (schedTime.includes("9:00") && slotHour === 9) return hasDay;
      if (schedTime.includes("10:00") && slotHour === 10) return hasDay;
      if (schedTime.includes("1:00") && slotHour === 1) return hasDay;
      if (schedTime.includes("2:00") && slotHour === 2) return hasDay;
      return false;
    });
  };

  const colors = [
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-pink-100 text-pink-700 border-pink-200",
  ];

  const getColorForSubject = (code: string) => {
    const index = enrolledSubjects.findIndex(s => s.code === code);
    return colors[index % colors.length];
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = async () => {
    if (!scheduleRef.current) return;

    try {
      const canvas = await html2canvas(scheduleRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add header
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(37, 99, 235);
      pdf.text("St. Mary's Academy", pageWidth / 2, 12, { align: "center" });

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text("123 Education Street, Manila, Philippines", pageWidth / 2, 17, { align: "center" });

      // Add student info
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text("Student: ", 15, 25);
      pdf.setFont("helvetica", "normal");
      pdf.text("Juan Dela Cruz (2024-00001)", 32, 25);

      pdf.setFont("helvetica", "bold");
      pdf.text("Year Level: ", 15, 30);
      pdf.setFont("helvetica", "normal");
      pdf.text("Grade 11 - STEM", 37, 30);

      // Calculate image dimensions to fit
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the schedule image
      pdf.addImage(imgData, "PNG", 10, 35, imgWidth, Math.min(imgHeight, pageHeight - 50));

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Generated on ${new Date().toLocaleDateString("en-PH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        15,
        pageHeight - 8
      );

      pdf.save("my_schedule.pdf");
    } catch (error) {
      console.error("Error exporting schedule:", error);
    }
  };

  return (
    <Layout role="student">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Class Schedule</h1>
            <p className="text-muted-foreground">
              1st Semester, AY 2024-2025
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Schedule Grid */}
        <div ref={scheduleRef} className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-border px-4 py-3 text-sm font-semibold text-left w-32">
                    Time
                  </th>
                  {days.map(day => (
                    <th key={day} className="border border-border px-4 py-3 text-sm font-semibold text-center">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleMatrix.map((row, i) => (
                  <tr key={i}>
                    <td className="border border-border px-4 py-3 text-sm font-semibold bg-gray-50">
                      {row.time}
                    </td>
                    {days.map(day => {
                      const subject = getSubjectForSlot(day, row.time);
                      return (
                        <td key={day} className="border border-border p-2 h-24">
                          {subject && (
                            <div className={`p-2 rounded border text-xs h-full ${getColorForSubject(subject.code)}`}>
                              <p className="font-bold">{subject.code}</p>
                              <p className="text-[11px] leading-tight">{subject.name}</p>
                              <p className="text-[10px] mt-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {subject.room}
                              </p>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject List */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Enrolled Subjects</h3>
          <div className="space-y-3">
            {enrolledSubjects.map((subject, i) => (
              <div key={subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${colors[i % colors.length].split(" ")[0]}`} />
                  <div>
                    <p className="font-semibold">{subject.code} - {subject.name}</p>
                    <p className="text-sm text-muted-foreground">{subject.instructor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{subject.schedule}</p>
                  <p className="text-xs text-muted-foreground">{subject.room}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{subject.units} units</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">Total Subjects: {enrolledSubjects.length}</span>
            <span className="font-bold">Total Units: {enrolledSubjects.reduce((sum, s) => sum + s.units, 0)}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
