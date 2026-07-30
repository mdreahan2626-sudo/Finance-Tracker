"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Sparkles, Loader2, FileText } from "lucide-react";
import { getRagStatementData } from "@/actions/rag-exporter";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Exporter() {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingCsv, setIsExportingCsv] = useState(false);

  // One-Click CSV Exporter
  const handleExportCsv = async () => {
    try {
      setIsExportingCsv(true);
      const res = await getRagStatementData();

      if (!res.success || !res.transactions) {
        toast.error(res.error || "Failed to retrieve ledger data.");
        return;
      }

      const headers = ["Date", "Type", "Category", "Amount ($)", "Description", "Account"];
      const rows = res.transactions.map((tx) => [
        `"${tx.date}"`,
        `"${tx.type}"`,
        `"${tx.category}"`,
        tx.amount.toFixed(2),
        `"${(tx.description || "").replace(/"/g, '""')}"`,
        `"${tx.accountName}"`,
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `welth_ledger_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV Statement downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error generating CSV export.");
    } finally {
      setIsExportingCsv(false);
    }
  };

  // One-Click RAG AI PDF Statement Exporter
  const handleExportPdf = async () => {
    try {
      setIsExportingPdf(true);
      toast.info("Running RAG LangChain AI analysis on your ledger...");
      const res = await getRagStatementData();

      if (!res.success || !res.transactions) {
        toast.error(res.error || "Failed to retrieve ledger data.");
        return;
      }

      const doc = new jsPDF();
      const { user, summary, transactions } = res;

      // Primary Title Header
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("WELTH AI FINANCIAL STATEMENT", 14, 22);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("RAG Augmented Tax Audit & Expense Ledger", 14, 30);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 30);

      // User & Summary Section
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`Account Holder: ${user.name} (${user.email})`, 14, 48);

      // Metrics Summary Table
      autoTable(doc, {
        startY: 52,
        head: [["Total Income", "Total Expenses", "Net Savings", "Est. Tax Deductions"]],
        body: [[
          `+$${summary.totalIncome.toFixed(2)}`,
          `-$${summary.totalExpenses.toFixed(2)}`,
          `$${summary.netSavings.toFixed(2)}`,
          `$${summary.estimatedTaxDeductions.toFixed(2)}`,
        ]],
        theme: "striped",
        headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 10, cellPadding: 4, halign: "center" },
      });

      // RAG AI Audit Section Box
      let currentY = doc.lastAutoTable.finalY + 10;
      doc.setFillColor(241, 245, 249);
      doc.rect(14, currentY, 182, 32, "F");

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(29, 78, 216); // blue-700
      doc.text("RAG LangChain AI Tax & Audit Summary:", 18, currentY + 8);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      const splitAudit = doc.splitTextToSize(summary.ragAuditSummary || "Ledger verified.", 174);
      doc.text(splitAudit, 18, currentY + 16);

      // Itemized Transactions Table
      currentY = currentY + 38;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Itemized Transaction Ledger", 14, currentY);

      const tableData = transactions.map((tx) => [
        tx.date,
        tx.type,
        tx.category,
        `$${tx.amount.toFixed(2)}`,
        tx.description.substring(0, 35),
      ]);

      autoTable(doc, {
        startY: currentY + 4,
        head: [["Date", "Type", "Category", "Amount", "Description"]],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: { fontSize: 8, cellPadding: 3 },
      });

      doc.save(`welth_rag_statement_${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("RAG AI PDF Statement generated and downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Error generating PDF statement.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Export CSV Button */}
      <Button
        onClick={handleExportCsv}
        disabled={isExportingCsv}
        variant="outline"
        className="h-10 px-4 rounded-xl border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
      >
        {isExportingCsv ? (
          <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
        ) : (
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
        )}
        <span>Export CSV</span>
      </Button>

      {/* Export PDF Button with RAG AI Audit */}
      <Button
        onClick={handleExportPdf}
        disabled={isExportingPdf}
        className="h-10 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
      >
        {isExportingPdf ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <>
            <FileText className="w-4 h-4 text-blue-200" />
            <span>Export RAG PDF Statement</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </>
        )}
      </Button>
    </div>
  );
}
