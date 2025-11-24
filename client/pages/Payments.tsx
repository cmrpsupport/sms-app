import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  CreditCard,
  Search,
  Receipt,
  DollarSign,
  FileText,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  Wallet,
  Building,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";
import ExportDropdown from "@/components/ExportDropdown";
import { exportToPDF, exportToExcel, exportToCSV, formatPHPForExport } from "@/lib/exportUtils";

interface Payment {
  id: string;
  orNumber: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentMethod: string;
  date: string;
  time: string;
  items: string[];
  cashier: string;
}

export default function Payments() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get("role") as "admin" | "faculty" | "student" | "parent") || "admin";

  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: string;
    name: string;
    balance: number;
    items: { description: string; amount: number }[];
  } | null>(null);

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "cash",
    reference: "",
  });

  // Mock students with balances
  const studentsWithBalance = [
    {
      id: "2024-0001",
      name: "Maria Santos Cruz",
      yearLevel: "Grade 10",
      section: "10-A",
      balance: 15000,
      items: [
        { description: "Tuition Fee - 2nd Quarter", amount: 10000 },
        { description: "Miscellaneous Fee", amount: 3000 },
        { description: "Laboratory Fee", amount: 2000 },
      ],
    },
    {
      id: "2024-0002",
      name: "Juan Dela Cruz",
      yearLevel: "Grade 11",
      section: "11-STEM-A",
      balance: 25600,
      items: [
        { description: "Tuition Fee - 2nd Quarter", amount: 18000 },
        { description: "Miscellaneous Fee", amount: 5000 },
        { description: "Laboratory Fee", amount: 2600 },
      ],
    },
    {
      id: "2024-0003",
      name: "Ana Reyes",
      yearLevel: "Grade 9",
      section: "9-B",
      balance: 8500,
      items: [
        { description: "Tuition Fee - 2nd Quarter", amount: 6000 },
        { description: "Miscellaneous Fee", amount: 2500 },
      ],
    },
  ];

  // Recent payments
  const [payments] = useState<Payment[]>([
    {
      id: "1",
      orNumber: "OR-2024-001245",
      studentId: "2024-0005",
      studentName: "Pedro Gonzales",
      amount: 12000,
      paymentMethod: "Cash",
      date: "2024-11-21",
      time: "9:30 AM",
      items: ["Tuition Fee", "Miscellaneous Fee"],
      cashier: "Maria Admin",
    },
    {
      id: "2",
      orNumber: "OR-2024-001244",
      studentId: "2024-0008",
      studentName: "Rosa Martinez",
      amount: 5000,
      paymentMethod: "GCash",
      date: "2024-11-21",
      time: "9:15 AM",
      items: ["Tuition Fee"],
      cashier: "Maria Admin",
    },
    {
      id: "3",
      orNumber: "OR-2024-001243",
      studentId: "2024-0012",
      studentName: "Carlos Santos",
      amount: 18500,
      paymentMethod: "Bank Transfer",
      date: "2024-11-20",
      time: "3:45 PM",
      items: ["Tuition Fee", "Laboratory Fee", "Miscellaneous Fee"],
      cashier: "Juan Staff",
    },
    {
      id: "4",
      orNumber: "OR-2024-001242",
      studentId: "2024-0015",
      studentName: "Elena Villanueva",
      amount: 7500,
      paymentMethod: "Maya",
      date: "2024-11-20",
      time: "2:00 PM",
      items: ["Miscellaneous Fee", "Laboratory Fee"],
      cashier: "Maria Admin",
    },
  ]);

  const filteredStudents = studentsWithBalance.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectStudent = (student: typeof studentsWithBalance[0]) => {
    setSelectedStudent({
      id: student.id,
      name: student.name,
      balance: student.balance,
      items: student.items,
    });
    setPaymentForm({ ...paymentForm, amount: student.balance.toString() });
    setShowPaymentModal(true);
  };

  const handleProcessPayment = () => {
    if (!paymentForm.amount || parseFloat(paymentForm.amount) <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }

    const orNumber = `OR-2024-${String(Math.floor(Math.random() * 10000)).padStart(6, "0")}`;
    toast.success(`Payment processed successfully! OR #: ${orNumber}`);
    setShowPaymentModal(false);
    setSelectedStudent(null);
    setPaymentForm({ amount: "", method: "cash", reference: "" });
  };

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    const headers = ["OR Number", "Student ID", "Student Name", "Amount", "Method", "Date", "Cashier"];
    const data = payments.map((p) => [
      p.orNumber,
      p.studentId,
      p.studentName,
      formatPHPForExport(p.amount),
      p.paymentMethod,
      `${p.date} ${p.time}`,
      p.cashier,
    ]);

    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

    if (format === "pdf") {
      exportToPDF({
        title: "Payment Transactions Report",
        headers,
        data,
        filename: "payment-transactions",
        summary: [
          { label: "Total Transactions", value: payments.length.toString() },
          { label: "Total Amount", value: formatPHPForExport(totalAmount) },
        ],
      });
    } else if (format === "excel") {
      exportToExcel({
        title: "Payment Transactions",
        headers,
        data,
        filename: "payment-transactions",
      });
    } else {
      exportToCSV({
        headers,
        data,
        filename: "payment-transactions",
      });
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return <Wallet className="w-4 h-4" />;
      case "gcash":
      case "maya":
        return <Smartphone className="w-4 h-4" />;
      case "bank transfer":
        return <Building className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  // Today's summary
  const todayPayments = payments.filter((p) => p.date === "2024-11-21");
  const todayTotal = todayPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout role={role}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments & Cashiering</h1>
            <p className="text-muted-foreground">Process payments and view transaction history</p>
          </div>
          <ExportDropdown onExport={handleExport} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Collection</p>
                <p className="text-xl font-bold">{formatPHPForExport(todayTotal)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Transactions</p>
                <p className="text-xl font-bold">{todayPayments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-xl font-bold">{studentsWithBalance.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Receivables</p>
                <p className="text-xl font-bold">
                  {formatPHPForExport(studentsWithBalance.reduce((sum, s) => sum + s.balance, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Process Payment Section */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Process Payment</h2>

            {/* Search Student */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by student ID or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Students with Balance */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No students found</p>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                    onClick={() => handleSelectStudent(student)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.id} • {student.yearLevel} - {student.section}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">{formatPHPForExport(student.balance)}</p>
                        <p className="text-xs text-muted-foreground">Balance Due</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-3 max-h-[450px] overflow-y-auto">
              {payments.map((payment) => (
                <div key={payment.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{payment.studentName}</p>
                        <p className="text-sm text-muted-foreground">{payment.orNumber}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getMethodIcon(payment.paymentMethod)}
                          <span className="text-xs text-muted-foreground">{payment.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{formatPHPForExport(payment.amount)}</p>
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                      <p className="text-xs text-muted-foreground">{payment.time}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Items: {payment.items.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Process Payment</h2>

            {/* Student Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="font-semibold">{selectedStudent.name}</p>
              <p className="text-sm text-muted-foreground">{selectedStudent.id}</p>
            </div>

            {/* Items Breakdown */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Items to Pay</h3>
              <div className="space-y-2">
                {selectedStudent.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.description}</span>
                    <span>{formatPHPForExport(item.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t border-border">
                  <span>Total Balance</span>
                  <span>{formatPHPForExport(selectedStudent.balance)}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payment Amount *</label>
                <input
                  type="number"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="cash">Cash</option>
                  <option value="gcash">GCash</option>
                  <option value="maya">Maya</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>

              {paymentForm.method !== "cash" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Reference Number</label>
                  <input
                    type="text"
                    value={paymentForm.reference}
                    onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter reference number"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedStudent(null);
                  }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessPayment}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  Process Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
