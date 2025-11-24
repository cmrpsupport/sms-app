import Layout from "@/components/Layout";
import {
  Download,
  Printer,
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { formatPHP } from "@/lib/mockData";

export default function StudentAccount() {
  // Mock student account data
  const accountData = {
    studentId: "2024-0001",
    studentName: "Maria Santos",
    program: "Grade 10 - Section A",
    term: "1st Semester, AY 2024-2025",
    assessmentDate: "August 15, 2024",
  };

  const feeBreakdown = [
    { description: "Tuition Fee (18 units x ₱1,500)", amount: 27000 },
    { description: "Miscellaneous Fee", amount: 8000 },
    { description: "Laboratory Fee", amount: 5000 },
    { description: "Library Fee", amount: 2000 },
    { description: "Computer Fee", amount: 3000 },
  ];

  const totalFees = feeBreakdown.reduce((sum, f) => sum + f.amount, 0);
  const scholarship = 0; // No scholarship
  const netAmount = totalFees - scholarship;

  const payments = [
    {
      date: "Aug 15, 2024",
      orNumber: "OR-2024-0001",
      description: "Down payment",
      amount: 15000,
      method: "Cash",
    },
    {
      date: "Sep 15, 2024",
      orNumber: "OR-2024-0045",
      description: "2nd installment",
      amount: 15000,
      method: "Online",
    },
  ];

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = netAmount - totalPaid;

  const installmentSchedule = [
    { due: "Aug 15, 2024", amount: 15000, status: "paid" },
    { due: "Sep 15, 2024", amount: 15000, status: "paid" },
    { due: "Oct 15, 2024", amount: 15000, status: "due" },
  ];

  return (
    <Layout role="student">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Statement of Account</h1>
            <p className="text-muted-foreground">
              {accountData.term}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Account Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Total Assessment</p>
            <p className="text-2xl font-bold">{formatPHP(netAmount)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Total Paid</p>
            <p className="text-2xl font-bold text-green-600">{formatPHP(totalPaid)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className={`text-2xl font-bold ${balance > 0 ? "text-orange-600" : "text-green-600"}`}>
              {formatPHP(balance)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fee Breakdown */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Fee Breakdown</h3>
            <div className="space-y-3">
              {feeBreakdown.map((fee, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{fee.description}</span>
                  <span className="font-semibold">{formatPHP(fee.amount)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Total Fees</span>
                  <span className="font-bold">{formatPHP(totalFees)}</span>
                </div>
                {scholarship > 0 && (
                  <div className="flex justify-between text-sm text-green-600 mt-2">
                    <span>Scholarship Discount</span>
                    <span>-{formatPHP(scholarship)}</span>
                  </div>
                )}
                <div className="flex justify-between mt-2">
                  <span className="font-bold">Net Amount Due</span>
                  <span className="font-bold text-lg">{formatPHP(netAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Payment Schedule</h3>
            <div className="space-y-3">
              {installmentSchedule.map((inst, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {inst.status === "paid" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : inst.status === "due" ? (
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="font-semibold text-sm">Installment {i + 1}</p>
                      <p className="text-xs text-muted-foreground">Due: {inst.due}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPHP(inst.amount)}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      inst.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : inst.status === "due"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {inst.status === "paid" ? "Paid" : inst.status === "due" ? "Due" : "Upcoming"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {balance > 0 && (
              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                <CreditCard className="w-4 h-4" />
                Pay Online
              </button>
            )}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Payment History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">OR Number</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Description</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Method</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3 text-sm">{payment.date}</td>
                    <td className="px-4 py-3 text-sm font-mono text-primary">{payment.orNumber}</td>
                    <td className="px-4 py-3 text-sm">{payment.description}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-green-600">
                      {formatPHP(payment.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-border">
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-sm font-bold text-right">
                    Total Paid:
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-right text-green-600">
                    {formatPHP(totalPaid)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 mb-2">Payment Instructions</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>• <strong>Online Payment:</strong> Click "Pay Online" button to pay via GCash, PayMaya, or Bank Transfer</p>
            <p>• <strong>Over-the-counter:</strong> Visit the Cashier's Office with your SOA</p>
            <p>• <strong>Bank Deposit:</strong> BDO Account No. 1234-5678-9012, Account Name: Sample School Inc.</p>
            <p className="mt-3 text-xs">For inquiries, contact the Accounting Office at accounting@school.edu.ph</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
