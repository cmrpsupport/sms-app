import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExportOptions {
  title: string;
  subtitle?: string;
  filename: string;
  headers: string[];
  data: (string | number)[][];
  orientation?: "portrait" | "landscape";
  schoolName?: string;
  additionalInfo?: { label: string; value: string }[];
  summary?: { label: string; value: string }[];
}

// School branding
const SCHOOL_NAME = "St. Mary's Academy";
const SCHOOL_ADDRESS = "123 Education Street, Manila, Philippines";
const PRIMARY_COLOR: [number, number, number] = [37, 99, 235]; // Blue

// Format currency for PDF (PHP prefix since jsPDF fonts don't support ₱ symbol)
export const formatPHPForExport = (amount: number): string => {
  return `PHP ${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const exportToPDF = (options: ExportOptions) => {
  const {
    title,
    subtitle,
    filename,
    headers,
    data,
    orientation = "portrait",
    schoolName = SCHOOL_NAME,
    additionalInfo,
    summary,
  } = options;

  const doc = new jsPDF({
    orientation,
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 15;

  // Header with school name
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(schoolName, pageWidth / 2, yPos, { align: "center" });
  yPos += 6;

  // School address
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(SCHOOL_ADDRESS, pageWidth / 2, yPos, { align: "center" });
  yPos += 10;

  // Divider line
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 8;

  // Document title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(title, pageWidth / 2, yPos, { align: "center" });
  yPos += 6;

  // Subtitle
  if (subtitle) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(subtitle, pageWidth / 2, yPos, { align: "center" });
    yPos += 6;
  }

  // Additional info (e.g., student name, date, etc.)
  if (additionalInfo && additionalInfo.length > 0) {
    yPos += 4;
    doc.setFontSize(10);
    additionalInfo.forEach((info) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${info.label}: `, 15, yPos);
      const labelWidth = doc.getTextWidth(`${info.label}: `);
      doc.setFont("helvetica", "normal");
      doc.text(info.value, 15 + labelWidth, yPos);
      yPos += 5;
    });
    yPos += 2;
  }

  // Table
  autoTable(doc, {
    startY: yPos,
    head: [headers],
    body: data,
    theme: "grid",
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [50, 50, 50],
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    columnStyles: {
      0: { fontStyle: "bold" },
    },
    margin: { left: 15, right: 15 },
  });

  // Summary section
  if (summary && summary.length > 0) {
    const finalY = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(10);

    summary.forEach((item, index) => {
      const summaryY = finalY + (index * 7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      const labelText = `${item.label}:`;
      doc.text(labelText, pageWidth - 100, summaryY);
      doc.setFont("helvetica", "normal");
      doc.text(item.value, pageWidth - 35, summaryY, { align: "right" });
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated on ${new Date().toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      15,
      doc.internal.pageSize.getHeight() - 10
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 15,
      doc.internal.pageSize.getHeight() - 10,
      { align: "right" }
    );
  }

  doc.save(`${filename}.pdf`);
};

export const exportToExcel = (options: ExportOptions) => {
  const { title, filename, headers, data, additionalInfo, summary } = options;

  // Create workbook
  const wb = XLSX.utils.book_new();

  // Prepare data with headers
  const wsData: (string | number)[][] = [];

  // Title row
  wsData.push([title]);
  wsData.push([]);

  // Additional info
  if (additionalInfo) {
    additionalInfo.forEach((info) => {
      wsData.push([info.label, info.value]);
    });
    wsData.push([]);
  }

  // Headers and data
  wsData.push(headers);
  data.forEach((row) => wsData.push(row));

  // Summary
  if (summary) {
    wsData.push([]);
    summary.forEach((item) => {
      wsData.push([item.label, item.value]);
    });
  }

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Set column widths
  const colWidths = headers.map((h) => ({ wch: Math.max(h.length + 2, 15) }));
  ws["!cols"] = colWidths;

  // Merge title cell
  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }];

  XLSX.utils.book_append_sheet(wb, ws, "Data");

  // Generate buffer and save
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, `${filename}.xlsx`);
};

export const exportToCSV = (options: ExportOptions) => {
  const { filename, headers, data, additionalInfo, summary } = options;

  const csvRows: string[] = [];

  // Additional info
  if (additionalInfo) {
    additionalInfo.forEach((info) => {
      csvRows.push(`${info.label},${info.value}`);
    });
    csvRows.push("");
  }

  // Headers and data
  csvRows.push(headers.join(","));
  data.forEach((row) => {
    const escapedRow = row.map((cell) => {
      const cellStr = String(cell);
      if (cellStr.includes(",") || cellStr.includes('"') || cellStr.includes("\n")) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    });
    csvRows.push(escapedRow.join(","));
  });

  // Summary
  if (summary) {
    csvRows.push("");
    summary.forEach((item) => {
      csvRows.push(`${item.label},${item.value}`);
    });
  }

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${filename}.csv`);
};

export type ExportFormat = "pdf" | "excel" | "csv";

export const exportData = (format: ExportFormat, options: ExportOptions) => {
  switch (format) {
    case "pdf":
      exportToPDF(options);
      break;
    case "excel":
      exportToExcel(options);
      break;
    case "csv":
      exportToCSV(options);
      break;
  }
};
