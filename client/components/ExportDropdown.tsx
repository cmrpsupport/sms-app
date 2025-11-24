import { useState, useRef, useEffect } from "react";
import { Download, FileText, FileSpreadsheet, File, ChevronDown } from "lucide-react";
import { ExportFormat } from "@/lib/exportUtils";

interface ExportDropdownProps {
  onExport: (format: ExportFormat) => void;
  label?: string;
  className?: string;
}

export default function ExportDropdown({
  onExport,
  label = "Export",
  className = ""
}: ExportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExport = (format: ExportFormat) => {
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Download className="w-4 h-4" />
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border z-50">
          <div className="py-1">
            <button
              onClick={() => handleExport("pdf")}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <div>
                <p className="font-medium">PDF Document</p>
                <p className="text-xs text-muted-foreground">Best for printing</p>
              </div>
            </button>
            <button
              onClick={() => handleExport("excel")}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
              <div>
                <p className="font-medium">Excel Spreadsheet</p>
                <p className="text-xs text-muted-foreground">Best for analysis</p>
              </div>
            </button>
            <button
              onClick={() => handleExport("csv")}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
            >
              <File className="w-4 h-4 text-blue-500" />
              <div>
                <p className="font-medium">CSV File</p>
                <p className="text-xs text-muted-foreground">Universal format</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
