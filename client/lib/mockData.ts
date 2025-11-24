// Mock data store for SMS MVP demonstration

export interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  yearLevel: string;
  section: string;
  status: "active" | "inactive" | "graduated" | "dropped";
  gpa: number;
  balance: number;
  totalFees: number;
  paid: number;
  enrollmentDate: string;
  phone: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  units: number;
  instructor: string;
  schedule: string;
  room: string;
  enrolledCount: number;
  capacity: number;
}

export interface Section {
  id: string;
  code: string;
  name: string;
  yearLevel: string;
  capacity: number;
  enrolled: number;
  adviser: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  method: "cash" | "check" | "online" | "bank";
  orNumber: string;
  description: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
}

// Currency formatter for PHP
export const formatPHP = (amount: number) =>
  `₱${amount.toLocaleString('en-PH')}`;

// Sample students data (amounts in PHP)
export const students: Student[] = [
  {
    id: "2024-0001",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    program: "Secondary",
    yearLevel: "Grade 10",
    section: "10-A",
    status: "active",
    gpa: 3.6,
    balance: 15000,
    totalFees: 45000,
    paid: 30000,
    enrollmentDate: "2024-08-15",
    phone: "09171234567",
  },
  {
    id: "2024-0002",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    program: "Secondary",
    yearLevel: "Grade 10",
    section: "10-A",
    status: "active",
    gpa: 3.4,
    balance: 0,
    totalFees: 45000,
    paid: 45000,
    enrollmentDate: "2024-08-15",
    phone: "09181234567",
  },
  {
    id: "2024-0003",
    name: "Ana Reyes",
    email: "ana.reyes@email.com",
    program: "Secondary",
    yearLevel: "Grade 11",
    section: "11-A",
    status: "active",
    gpa: 3.8,
    balance: 22000,
    totalFees: 52000,
    paid: 30000,
    enrollmentDate: "2024-08-14",
    phone: "09191234567",
  },
  {
    id: "2024-0004",
    name: "Pedro Garcia",
    email: "pedro.garcia@email.com",
    program: "Secondary",
    yearLevel: "Grade 11",
    section: "11-B",
    status: "active",
    gpa: 3.2,
    balance: 12000,
    totalFees: 52000,
    paid: 40000,
    enrollmentDate: "2024-08-16",
    phone: "09201234567",
  },
  {
    id: "2024-0005",
    name: "Carmen Lopez",
    email: "carmen.lopez@email.com",
    program: "Secondary",
    yearLevel: "Grade 9",
    section: "9-A",
    status: "active",
    gpa: 3.9,
    balance: 0,
    totalFees: 42000,
    paid: 42000,
    enrollmentDate: "2024-08-15",
    phone: "09211234567",
  },
  {
    id: "2024-0006",
    name: "Roberto Tan",
    email: "roberto.tan@email.com",
    program: "Secondary",
    yearLevel: "Grade 12",
    section: "12-A",
    status: "active",
    gpa: 3.5,
    balance: 28000,
    totalFees: 55000,
    paid: 27000,
    enrollmentDate: "2024-08-14",
    phone: "09221234567",
  },
  {
    id: "2024-0007",
    name: "Isabella Cruz",
    email: "isabella.cruz@email.com",
    program: "Secondary",
    yearLevel: "Grade 10",
    section: "10-B",
    status: "active",
    gpa: 3.7,
    balance: 8000,
    totalFees: 45000,
    paid: 37000,
    enrollmentDate: "2024-08-15",
    phone: "09231234567",
  },
  {
    id: "2024-0008",
    name: "Miguel Fernandez",
    email: "miguel.fernandez@email.com",
    program: "Secondary",
    yearLevel: "Grade 9",
    section: "9-B",
    status: "inactive",
    gpa: 2.8,
    balance: 42000,
    totalFees: 42000,
    paid: 0,
    enrollmentDate: "2024-08-16",
    phone: "09241234567",
  },
];

// Sample subjects data
export const subjects: Subject[] = [
  {
    id: "SUBJ-001",
    code: "BIO101",
    name: "Biology 101",
    units: 3,
    instructor: "Dr. Rodriguez",
    schedule: "MWF 8:00-9:00 AM",
    room: "Lab 2",
    enrolledCount: 32,
    capacity: 40,
  },
  {
    id: "SUBJ-002",
    code: "MATH101",
    name: "Mathematics 101",
    units: 3,
    instructor: "Prof. Garcia",
    schedule: "TTH 10:00-11:30 AM",
    room: "Room 105",
    enrolledCount: 35,
    capacity: 40,
  },
  {
    id: "SUBJ-003",
    code: "ENG101",
    name: "English Literature",
    units: 3,
    instructor: "Mrs. Santos",
    schedule: "MWF 9:00-10:00 AM",
    room: "Room 210",
    enrolledCount: 28,
    capacity: 35,
  },
  {
    id: "SUBJ-004",
    code: "CHEM101",
    name: "Chemistry 101",
    units: 3,
    instructor: "Prof. Reyes",
    schedule: "TTH 1:00-2:30 PM",
    room: "Lab 1",
    enrolledCount: 30,
    capacity: 35,
  },
  {
    id: "SUBJ-005",
    code: "HIST101",
    name: "Philippine History",
    units: 3,
    instructor: "Mr. Lopez",
    schedule: "MWF 2:00-3:00 PM",
    room: "Room 301",
    enrolledCount: 38,
    capacity: 40,
  },
  {
    id: "SUBJ-006",
    code: "PE101",
    name: "Physical Education",
    units: 2,
    instructor: "Coach Martinez",
    schedule: "TTH 8:00-9:30 AM",
    room: "Gym",
    enrolledCount: 45,
    capacity: 50,
  },
  {
    id: "SUBJ-007",
    code: "PHYS101",
    name: "Physics 101",
    units: 3,
    instructor: "Dr. Santos",
    schedule: "MWF 10:00-11:00 AM",
    room: "Lab 3",
    enrolledCount: 28,
    capacity: 35,
  },
];

// Section students data - used across Faculty Attendance, Grade Entry, etc.
export const sectionStudents: Record<string, { id: string; name: string }[]> = {
  "10-A": [
    { id: "2024-0001", name: "Maria Santos" },
    { id: "2024-0002", name: "Juan Dela Cruz" },
    { id: "2024-0010", name: "Pedro Reyes" },
    { id: "2024-0011", name: "Ana Garcia" },
    { id: "2024-0012", name: "Carlos Mendoza" },
    { id: "2024-0013", name: "Sofia Lim" },
  ],
  "10-B": [
    { id: "2024-0007", name: "Isabella Cruz" },
    { id: "2024-0014", name: "Miguel Torres" },
    { id: "2024-0015", name: "Rafael Santos" },
    { id: "2024-0016", name: "Carmen Reyes" },
    { id: "2024-0017", name: "Antonio Garcia" },
  ],
  "11-A": [
    { id: "2024-0003", name: "Ana Reyes" },
    { id: "2024-0018", name: "Gabriel Fernandez" },
    { id: "2024-0019", name: "Victoria Ramos" },
    { id: "2024-0020", name: "Diego Martinez" },
    { id: "2024-0021", name: "Lucia Villanueva" },
    { id: "2024-0022", name: "Andres Pascual" },
    { id: "2024-0023", name: "Elena Bautista" },
  ],
};

// Sample sections data
export const sections: Section[] = [
  {
    id: "SEC-001",
    code: "9-A",
    name: "Grade 9 - Section A",
    yearLevel: "Grade 9",
    capacity: 40,
    enrolled: 35,
    adviser: "Mrs. Santos",
  },
  {
    id: "SEC-002",
    code: "9-B",
    name: "Grade 9 - Section B",
    yearLevel: "Grade 9",
    capacity: 40,
    enrolled: 38,
    adviser: "Mr. Lopez",
  },
  {
    id: "SEC-003",
    code: "10-A",
    name: "Grade 10 - Section A",
    yearLevel: "Grade 10",
    capacity: 40,
    enrolled: 32,
    adviser: "Prof. Garcia",
  },
  {
    id: "SEC-004",
    code: "10-B",
    name: "Grade 10 - Section B",
    yearLevel: "Grade 10",
    capacity: 40,
    enrolled: 36,
    adviser: "Dr. Rodriguez",
  },
  {
    id: "SEC-005",
    code: "11-A",
    name: "Grade 11 - Section A",
    yearLevel: "Grade 11",
    capacity: 35,
    enrolled: 30,
    adviser: "Prof. Reyes",
  },
  {
    id: "SEC-006",
    code: "11-B",
    name: "Grade 11 - Section B",
    yearLevel: "Grade 11",
    capacity: 35,
    enrolled: 33,
    adviser: "Mrs. Cruz",
  },
  {
    id: "SEC-007",
    code: "12-A",
    name: "Grade 12 - Section A",
    yearLevel: "Grade 12",
    capacity: 35,
    enrolled: 28,
    adviser: "Mr. Tan",
  },
];

// Sample payments data (amounts in PHP)
export const payments: Payment[] = [
  {
    id: "PAY-001",
    studentId: "2024-0001",
    studentName: "Maria Santos",
    amount: 15000,
    date: "2024-08-15",
    method: "cash",
    orNumber: "OR-2024-0001",
    description: "Down payment - 1st semester",
  },
  {
    id: "PAY-002",
    studentId: "2024-0001",
    studentName: "Maria Santos",
    amount: 15000,
    date: "2024-09-15",
    method: "online",
    orNumber: "OR-2024-0045",
    description: "2nd installment",
  },
  {
    id: "PAY-003",
    studentId: "2024-0002",
    studentName: "Juan Dela Cruz",
    amount: 45000,
    date: "2024-08-15",
    method: "bank",
    orNumber: "OR-2024-0002",
    description: "Full payment - 1st semester",
  },
  {
    id: "PAY-004",
    studentId: "2024-0003",
    studentName: "Ana Reyes",
    amount: 30000,
    date: "2024-08-14",
    method: "check",
    orNumber: "OR-2024-0003",
    description: "Down payment - 1st semester",
  },
  {
    id: "PAY-005",
    studentId: "2024-0005",
    studentName: "Carmen Lopez",
    amount: 42000,
    date: "2024-08-15",
    method: "cash",
    orNumber: "OR-2024-0005",
    description: "Full payment - 1st semester",
  },
];

// Helper functions
export const getStudentById = (id: string) => students.find((s) => s.id === id);

export const getStudentsBySection = (section: string) =>
  students.filter((s) => s.section === section);

export const getStudentsWithBalance = () =>
  students.filter((s) => s.balance > 0);

export const getTotalReceivables = () =>
  students.reduce((sum, s) => sum + s.balance, 0);

export const getTotalCollections = () =>
  payments.reduce((sum, p) => sum + p.amount, 0);

export const getRecentPayments = (limit: number = 5) =>
  [...payments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
