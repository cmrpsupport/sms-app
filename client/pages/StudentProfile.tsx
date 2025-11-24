import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  CreditCard,
  FileText,
  Heart,
  Users,
  Edit2,
  Save,
  X,
  Camera,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export default function StudentProfile() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get("role") as "admin" | "faculty" | "student" | "parent") || "student";
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "academic" | "family" | "medical">("personal");

  const [studentData, setStudentData] = useState({
    // Personal Info
    studentId: "2024-0001",
    firstName: "Maria",
    middleName: "Santos",
    lastName: "Cruz",
    suffix: "",
    email: "maria.cruz@school.edu.ph",
    phone: "09171234567",
    birthdate: "2008-05-15",
    birthplace: "Manila, Philippines",
    gender: "Female",
    civilStatus: "Single",
    religion: "Roman Catholic",
    nationality: "Filipino",
    address: "123 Rizal Street, Brgy. San Antonio",
    city: "Quezon City",
    province: "Metro Manila",
    zipCode: "1100",

    // Academic Info
    yearLevel: "Grade 10",
    section: "10-A",
    program: "Junior High School",
    lrn: "123456789012",
    admissionDate: "2020-06-15",
    previousSchool: "ABC Elementary School",
    gpa: "89.5",
    status: "Enrolled",

    // Emergency Contact
    emergencyName: "Juan Cruz",
    emergencyRelation: "Father",
    emergencyPhone: "09181234567",
  });

  const familyData = {
    father: {
      name: "Juan Santos Cruz",
      occupation: "Engineer",
      company: "ABC Corporation",
      phone: "09181234567",
      email: "juan.cruz@email.com",
      education: "College Graduate",
    },
    mother: {
      name: "Rosa Santos Cruz",
      occupation: "Teacher",
      company: "XYZ High School",
      phone: "09191234567",
      email: "rosa.cruz@email.com",
      education: "College Graduate",
    },
    guardian: {
      name: "",
      relation: "",
      phone: "",
      address: "",
    },
    siblings: [
      { name: "Pedro Cruz", age: 18, school: "State University" },
      { name: "Ana Cruz", age: 8, school: "ABC Elementary School" },
    ],
  };

  const medicalData = {
    bloodType: "O+",
    height: "155 cm",
    weight: "45 kg",
    allergies: ["Dust", "Pollen"],
    conditions: [],
    medications: [],
    immunizations: [
      { name: "Hepatitis B", date: "2008-06-01" },
      { name: "BCG", date: "2008-05-20" },
      { name: "MMR", date: "2009-05-15" },
      { name: "DPT", date: "2009-05-15" },
    ],
    clinicVisits: [
      { date: "2024-09-15", reason: "Headache", treatment: "Paracetamol given" },
      { date: "2024-08-20", reason: "Minor cut", treatment: "First aid applied" },
    ],
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const canEdit = role === "admin" || role === "student";

  return (
    <Layout role={role}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Profile</h1>
            <p className="text-muted-foreground">View and manage student information</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            {canEdit && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {studentData.firstName} {studentData.middleName} {studentData.lastName} {studentData.suffix}
              </h2>
              <p className="text-muted-foreground">{studentData.studentId}</p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Year Level</p>
                  <p className="font-semibold">{studentData.yearLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Section</p>
                  <p className="font-semibold">{studentData.section}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">GPA</p>
                  <p className="font-semibold">{studentData.gpa}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    {studentData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-border">
          <div className="border-b border-border">
            <div className="flex gap-1 p-1">
              {[
                { id: "personal", label: "Personal Info", icon: User },
                { id: "academic", label: "Academic", icon: GraduationCap },
                { id: "family", label: "Family", icon: Users },
                { id: "medical", label: "Medical", icon: Heart },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">First Name</label>
                      <input
                        type="text"
                        value={studentData.firstName}
                        onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={studentData.middleName}
                        onChange={(e) => setStudentData({ ...studentData, middleName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Last Name</label>
                      <input
                        type="text"
                        value={studentData.lastName}
                        onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Email</label>
                      <input
                        type="email"
                        value={studentData.email}
                        onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                      <input
                        type="tel"
                        value={studentData.phone}
                        onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Birthdate</label>
                      <input
                        type="date"
                        value={studentData.birthdate}
                        onChange={(e) => setStudentData({ ...studentData, birthdate: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Gender</label>
                      <select
                        value={studentData.gender}
                        onChange={(e) => setStudentData({ ...studentData, gender: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Religion</label>
                      <input
                        type="text"
                        value={studentData.religion}
                        onChange={(e) => setStudentData({ ...studentData, religion: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Nationality</label>
                      <input
                        type="text"
                        value={studentData.nationality}
                        onChange={(e) => setStudentData({ ...studentData, nationality: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-muted-foreground mb-1">Street Address</label>
                      <input
                        type="text"
                        value={studentData.address}
                        onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">City</label>
                      <input
                        type="text"
                        value={studentData.city}
                        onChange={(e) => setStudentData({ ...studentData, city: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Province</label>
                      <input
                        type="text"
                        value={studentData.province}
                        onChange={(e) => setStudentData({ ...studentData, province: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Contact Name</label>
                      <input
                        type="text"
                        value={studentData.emergencyName}
                        onChange={(e) => setStudentData({ ...studentData, emergencyName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Relationship</label>
                      <input
                        type="text"
                        value={studentData.emergencyRelation}
                        onChange={(e) => setStudentData({ ...studentData, emergencyRelation: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                      <input
                        type="tel"
                        value={studentData.emergencyPhone}
                        onChange={(e) => setStudentData({ ...studentData, emergencyPhone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Tab */}
            {activeTab === "academic" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Student ID</label>
                      <input
                        type="text"
                        value={studentData.studentId}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">LRN</label>
                      <input
                        type="text"
                        value={studentData.lrn}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Program</label>
                      <input
                        type="text"
                        value={studentData.program}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Year Level</label>
                      <input
                        type="text"
                        value={studentData.yearLevel}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Section</label>
                      <input
                        type="text"
                        value={studentData.section}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Admission Date</label>
                      <input
                        type="text"
                        value={new Date(studentData.admissionDate).toLocaleDateString("en-PH")}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Previous School</label>
                      <input
                        type="text"
                        value={studentData.previousSchool}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Current GPA</label>
                      <input
                        type="text"
                        value={studentData.gpa}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Status</label>
                      <input
                        type="text"
                        value={studentData.status}
                        disabled
                        className="w-full px-3 py-2 border border-border rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Family Tab */}
            {activeTab === "family" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Father's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                      <input
                        type="text"
                        value={familyData.father.name}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Occupation</label>
                      <input
                        type="text"
                        value={familyData.father.occupation}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Company</label>
                      <input
                        type="text"
                        value={familyData.father.company}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                      <input
                        type="tel"
                        value={familyData.father.phone}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Email</label>
                      <input
                        type="email"
                        value={familyData.father.email}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Education</label>
                      <input
                        type="text"
                        value={familyData.father.education}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Mother's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                      <input
                        type="text"
                        value={familyData.mother.name}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Occupation</label>
                      <input
                        type="text"
                        value={familyData.mother.occupation}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Company</label>
                      <input
                        type="text"
                        value={familyData.mother.company}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                      <input
                        type="tel"
                        value={familyData.mother.phone}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Email</label>
                      <input
                        type="email"
                        value={familyData.mother.email}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Education</label>
                      <input
                        type="text"
                        value={familyData.mother.education}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Siblings</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold">Name</th>
                          <th className="text-left p-3 text-sm font-semibold">Age</th>
                          <th className="text-left p-3 text-sm font-semibold">School/Occupation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {familyData.siblings.map((sibling, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="p-3">{sibling.name}</td>
                            <td className="p-3">{sibling.age}</td>
                            <td className="p-3">{sibling.school}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Medical Tab */}
            {activeTab === "medical" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Medical Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Blood Type</label>
                      <input
                        type="text"
                        value={medicalData.bloodType}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Height</label>
                      <input
                        type="text"
                        value={medicalData.height}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Weight</label>
                      <input
                        type="text"
                        value={medicalData.weight}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-border rounded-lg disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {medicalData.allergies.length > 0 ? (
                      medicalData.allergies.map((allergy, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No known allergies</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Immunization Records</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold">Vaccine</th>
                          <th className="text-left p-3 text-sm font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicalData.immunizations.map((imm, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="p-3">{imm.name}</td>
                            <td className="p-3">{new Date(imm.date).toLocaleDateString("en-PH")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Clinic Visits</h3>
                  <div className="space-y-3">
                    {medicalData.clinicVisits.map((visit, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{visit.reason}</p>
                            <p className="text-sm text-muted-foreground">{visit.treatment}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(visit.date).toLocaleDateString("en-PH")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
