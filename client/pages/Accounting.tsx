import { useState } from "react";
import Layout from "@/components/Layout";
import {
  DollarSign,
  Search,
  Plus,
  Download,
  Receipt,
  CreditCard,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  students,
  payments,
  getTotalReceivables,
  getTotalCollections,
  getStudentsWithBalance,
  formatPHP,
} from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Accounting() {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedStudentForPayment, setSelectedStudentForPayment] = useState<string>("");

  const totalReceivables = getTotalReceivables();
  const totalCollections = getTotalCollections();
  const studentsWithBalance = getStudentsWithBalance();

  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout role="admin">
      <div className="p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Accounting</h1>
            <p className="text-muted-foreground">
              Manage payments, fees, and student accounts
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" />
                Record Payment
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Student
                  </label>
                  <select
                    className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={selectedStudentForPayment}
                    onChange={(e) => setSelectedStudentForPayment(e.target.value)}
                  >
                    <option value="">Select student...</option>
                    {studentsWithBalance.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} - Balance: {formatPHP(student.balance)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="0.00"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Payment Method
                  </label>
                  <select
                    className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="online">Online Payment</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Payment description..."
                  />
                </div>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                  Process Payment
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Total Collections</p>
            <p className="text-2xl font-bold text-green-600">
              {formatPHP(totalCollections)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Total Receivables</p>
            <p className="text-2xl font-bold text-orange-600">
              {formatPHP(totalReceivables)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-2xl font-bold text-foreground">
              {payments.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">With Balance</p>
            <p className="text-2xl font-bold text-foreground">
              {studentsWithBalance.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="receivables">Accounts Receivable</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by student name or OR number..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      OR Number
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Student
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Description
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Method
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-border hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">
                        {payment.orNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {payment.studentName}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {payment.description}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold capitalize">
                          {payment.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">
                        {formatPHP(payment.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Accounts Receivable Tab */}
          <TabsContent value="receivables" className="space-y-4">
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Student ID
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Year Level
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Total Fees
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Paid
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Balance
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-border hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-foreground">
                        {student.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {student.yearLevel}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {formatPHP(student.totalFees)}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                        {formatPHP(student.paid)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {student.balance > 0 ? (
                          <span className="text-orange-600 font-bold">
                            {formatPHP(student.balance)}
                          </span>
                        ) : (
                          <span className="text-green-600 font-bold">₱0</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {student.balance === 0 ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-orange-600">
                            <AlertCircle className="w-4 h-4" />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="bg-primary-50 rounded-xl border border-primary-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground">Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {studentsWithBalance.length} students with outstanding balance
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Total Outstanding
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatPHP(totalReceivables)}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
