import { useState } from 'react';
import { Download, FileText, FileJson, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Lottery } from '../../types';
import { exportToCSV, exportToJSON, exportToPDF } from '../../lib/export';

interface ExportMenuProps {
  data: Lottery[];
  disabled?: boolean;
}

export const ExportMenu = ({ data, disabled }: ExportMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (type: 'csv' | 'json' | 'pdf') => {
    setIsOpen(false);
    try {
      switch (type) {
        case 'csv':
          exportToCSV(data);
          toast.success('CSV exported successfully!');
          break;
        case 'json':
          exportToJSON(data, 'lotteries.json');
          toast.success('JSON exported successfully!');
          break;
        case 'pdf':
          exportToPDF(data);
          toast.success('PDF exported successfully!');
          break;
      }
    } catch {
      toast.error('Failed to export data');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Download className="w-4 h-4" />
        <span>Export</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-xl z-20 overflow-hidden">
            <button
              onClick={() => handleExport('csv')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-green-400" />
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('json')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <FileJson className="w-4 h-4 text-yellow-400" />
              Export as JSON
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
            >
              <FileText className="w-4 h-4 text-red-400" />
              Export as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportMenu;