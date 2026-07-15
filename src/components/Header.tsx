import React from 'react';
import { Sparkles, Users, Download, Upload, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function Header({ onExport, onImport, onReset }: HeaderProps) {
  return (
    <header className="bg-natural-primary text-natural-text-light shadow-md border-b border-natural-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-natural-primary-hover/80 rounded-2xl border border-white/15 shadow-inner flex items-center justify-center text-emerald-200">
              <Users size={32} className="text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-[#5a6e4e] text-natural-text-light px-2.5 py-0.5 rounded-full border border-white/10 font-mono">
                  Sistem Informasi & Manajemen
                </span>
                <span className="text-xs font-semibold bg-[#e8e4d9] text-natural-text px-2 py-0.5 rounded-full font-mono">
                  No-Auth Portal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-2 text-white">
                OSIS SMP IT UBK
              </h1>
              <p className="text-xs sm:text-sm text-natural-text-light/85 mt-1 font-medium">
                Penyusun: <span className="text-[#d9f99d] font-bold underline decoration-emerald-400">Jundi Abdul Syahid, S.Pd.</span>{' '}
                <span className="text-xs bg-[#2c3327]/60 px-2 py-0.5 rounded-md text-[#f1ede4] font-normal">
                  (Orang Dalam Genetik Jawa)
                </span>
              </p>
            </div>
          </div>

          {/* Quick Modern Utility Buttons */}
          <div className="flex flex-wrap items-center gap-2 md:self-end">
            {/* Backup JSON Button */}
            <button
              onClick={onExport}
              title="Ekspor Seluruh Data ke Berkas JSON"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-natural-primary-hover hover:bg-[#3a4a31] active:bg-[#2c3327] text-white rounded-xl transition-all border border-white/10 shadow-sm cursor-pointer"
            >
              <Download size={14} />
              <span>Ekspor Backup</span>
            </button>

            {/* Restore JSON File Upload */}
            <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-natural-primary-hover hover:bg-[#3a4a31] active:bg-[#2c3327] text-white rounded-xl transition-all border border-white/10 shadow-sm cursor-pointer">
              <Upload size={14} />
              <span>Impor Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={onImport}
                className="hidden"
              />
            </label>

            {/* Reset Defaults Button */}
            <button
              onClick={onReset}
              title="Kembalikan ke Setelan Awal"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-100 rounded-xl transition-all border border-red-800/40 shadow-sm cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset Data</span>
            </button>
          </div>
          
        </div>
        
        {/* Subtle Bottom Note */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-natural-text-light/70 gap-1.5">
          <p>🏫 Portal OSIS Sekolah Fullday (Bukan Pondok Pesantren) — Pengisian Mandiri Tanpa Akun & Kata Sandi.</p>
          <p className="font-mono bg-[#2c3327]/60 px-2 py-0.5 rounded text-yellow-100">Seluruh data tersimpan otomatis di browser lokal Anda.</p>
        </div>
      </div>
    </header>
  );
}
