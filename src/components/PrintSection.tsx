import React, { useState } from 'react';
import { OSISState, Jabatan, Qism, DailyReport, MonitoringRecord, RewardPunishment } from '../types';
import { 
  Printer, 
  FileText, 
  Settings, 
  HelpCircle, 
  Wifi, 
  Bluetooth, 
  Download, 
  CheckCircle,
  FileCheck,
  Award,
  BookOpen,
  Calendar,
  Layers,
  Users
} from 'lucide-react';

interface PrintSectionProps {
  state: OSISState;
}

export default function PrintSection({ state }: PrintSectionProps) {
  // Print configurations
  const [reportType, setReportType] = useState<'complete' | 'jabatan' | 'qism' | 'daily' | 'monitoring' | 'reward-punishment'>('complete');
  const [genderFilter, setGenderFilter] = useState<'all' | 'ikhwan' | 'akhwat'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Signature Block States
  const [kepalaSekolah, setKepalaSekolah] = useState<string>('H. Ahmad Fauzi, M.Pd.');
  const [nipKepalaSekolah, setNipKepalaSekolah] = useState<string>('19780512 200501 1 003');
  const [pembinaOsis, setPembinaOsis] = useState<string>('Jundi Abdul Syahid, S.Pd.');
  const [ketuaOsis, setKetuaOsis] = useState<string>('M. Fatih Rizqi');
  const [nisnKetuaOsis, setNisnKetuaOsis] = useState<string>('0087654321');
  const [kotaPenerbit, setKotaPenerbit] = useState<string>('Bandung');

  // Trigger Native Browser Print Dialog
  const handlePrint = () => {
    window.print();
  };

  // Date Filtering logic helper
  const filterByDate = (dateStr: string) => {
    if (dateFilter === 'all') return true;
    const itemDate = new Date(dateStr);
    const today = new Date();
    
    // Set hours to 0 to compare dates only
    today.setHours(0, 0, 0, 0);

    if (dateFilter === 'today') {
      const compareDate = new Date(today);
      return itemDate.toDateString() === compareDate.toDateString();
    }
    
    if (dateFilter === 'week') {
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return itemDate >= oneWeekAgo;
    }
    
    if (dateFilter === 'month') {
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
      return itemDate >= oneMonthAgo;
    }
    
    if (dateFilter === 'custom') {
      if (!startDate && !endDate) return true;
      const start = startDate ? new Date(startDate) : new Date('1970-01-01');
      const end = endDate ? new Date(endDate) : new Date('2099-12-31');
      // Set end date to end of day
      end.setHours(23, 59, 59, 999);
      return itemDate >= start && itemDate <= end;
    }

    return true;
  };

  // Gender filtering logic helper
  const filterByGender = (gender?: 'ikhwan' | 'akhwat') => {
    if (genderFilter === 'all') return true;
    return gender === genderFilter;
  };

  // Get active data based on filters
  const getFilteredJabatans = () => {
    return state.jabatans.filter(j => filterByGender(j.gender));
  };

  const getFilteredQisms = () => {
    return state.qisms.filter(q => filterByGender(q.gender));
  };

  const getFilteredDailyReports = () => {
    return state.dailyReports.filter(report => {
      // Find parent to inspect gender
      let gender: 'ikhwan' | 'akhwat' | undefined;
      if (report.targetType === 'jabatan') {
        gender = state.jabatans.find(j => j.id === report.targetId)?.gender;
      } else {
        gender = state.qisms.find(q => q.id === report.targetId)?.gender;
      }
      return filterByGender(gender) && filterByDate(report.date);
    });
  };

  const getFilteredMonitoringRecords = () => {
    return state.monitoringRecords.filter(record => {
      let gender: 'ikhwan' | 'akhwat' | undefined;
      if (record.targetType === 'jabatan') {
        gender = state.jabatans.find(j => j.id === record.targetId)?.gender;
      } else {
        gender = state.qisms.find(q => q.id === record.targetId)?.gender;
      }
      return filterByGender(gender) && filterByDate(record.date);
    });
  };

  const getFilteredRewardPunishments = () => {
    return state.rewardPunishments.filter(rp => filterByDate(rp.date));
  };

  // Format date helper
  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getTodayDateIndo = () => {
    return formatDateIndo(new Date().toISOString().split('T')[0]);
  };

  // Calculate target counts for preview header
  const filteredJabatans = getFilteredJabatans();
  const filteredQisms = getFilteredQisms();
  const filteredDailyReports = getFilteredDailyReports();
  const filteredMonitoringRecords = getFilteredMonitoringRecords();
  const filteredRewardPunishments = getFilteredRewardPunishments();

  return (
    <div className="space-y-6">
      
      {/* CSS Styling to inject exclusively for print layout overrides */}
      <style>{`
        @media print {
          /* Hide non-print elements */
          body {
            background-color: white !important;
            color: black !important;
            font-family: 'Georgia', 'Times New Roman', serif !important;
          }
          header, nav, .no-print, button, form, input, select, label, .alert, .toast {
            display: none !important;
          }
          main {
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .lg\\:w-64, .flex-1, .space-y-6, .max-w-7xl {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          /* Print container setup */
          #print-document {
            display: block !important;
            width: 100% !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .print-break-before {
            page-break-before: always !important;
          }
          .print-break-inside-avoid {
            page-break-inside: avoid !important;
          }
          /* Standard tables for ink-saver black/white */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin-bottom: 20px !important;
          }
          th, td {
            border: 1px solid #000000 !important;
            padding: 6px 10px !important;
            font-size: 10pt !important;
            text-align: left !important;
            color: #000000 !important;
          }
          th {
            background-color: #f2f2f2 !important;
            font-weight: bold !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .kop-border {
            border-bottom: 4px double #000000 !important;
          }
        }
      `}</style>

      {/* Screen Layout - Header with Quick Information */}
      <div className="bg-white p-6 rounded-2xl border border-natural-border-light shadow-sm no-print">
        <div className="flex items-center gap-3 border-b border-natural-border-light pb-4">
          <div className="p-3 bg-natural-primary text-white rounded-xl shadow-md">
            <Printer size={24} />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-natural-text">Cetak Laporan & Dokumen PDF</h2>
            <p className="text-xs text-natural-muted">
              Ekspor seluruh data tugas, kegiatan harian, catatan kedisiplinan, dan penghargaan OSIS ke berkas PDF fisik atau hubungkan langsung ke printer WiFi/Bluetooth Anda.
            </p>
          </div>
        </div>

        {/* Dynamic Settings and Printing Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Column 1: Print Settings Form */}
          <div className="space-y-4 bg-stone-50 p-5 rounded-xl border border-natural-border-light">
            <h3 className="text-xs font-extrabold uppercase text-natural-primary flex items-center gap-1.5 border-b border-stone-200 pb-2">
              <Settings size={14} />
              <span>Pengaturan Laporan</span>
            </h3>
            
            {/* Report Selection */}
            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Jenis Laporan / Dokumen</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white font-medium"
              >
                <option value="complete">📑 Laporan Lengkap OSIS (Buku Besar)</option>
                <option value="jabatan">👥 Daftar Tugas Jabatan Pengurus</option>
                <option value="qism">📁 Program Kerja & Agenda Qism</option>
                <option value="daily">📝 Laporan Harian Aktivitas</option>
                <option value="monitoring">👁️ Buku Monitoring Kedisiplinan</option>
                <option value="reward-punishment">🏆 Rekapitulasi Reward & Sanksi</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Sektor Pengurus</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGenderFilter('all')}
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg cursor-pointer border ${
                    genderFilter === 'all'
                      ? 'bg-natural-primary text-white border-natural-primary'
                      : 'bg-white text-natural-text border-natural-border-light hover:bg-natural-light/30'
                  }`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setGenderFilter('ikhwan')}
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg cursor-pointer border ${
                    genderFilter === 'ikhwan'
                      ? 'bg-natural-primary text-white border-natural-primary'
                      : 'bg-white text-natural-text border-natural-border-light hover:bg-natural-light/30'
                  }`}
                >
                  👨 Ikhwan
                </button>
                <button
                  type="button"
                  onClick={() => setGenderFilter('akhwat')}
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg cursor-pointer border ${
                    genderFilter === 'akhwat'
                      ? 'bg-natural-primary text-white border-natural-primary'
                      : 'bg-white text-natural-text border-natural-border-light hover:bg-natural-light/30'
                  }`}
                >
                  👩 Akhwat
                </button>
              </div>
            </div>

            {/* Date Filtering Options */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-0.5">Rentang Waktu Laporan</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white font-medium"
              >
                <option value="all">🗓️ Seluruh Tanggal Tersedia</option>
                <option value="today">📅 Hari Ini</option>
                <option value="week">📅 7 Hari Terakhir</option>
                <option value="month">📅 30 Hari Terakhir</option>
                <option value="custom">🛠️ Rentang Tanggal Kustom</option>
              </select>

              {dateFilter === 'custom' && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[9px] font-semibold text-natural-muted">Dari</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-natural-border-light rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold text-natural-muted">Sampai</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-natural-border-light rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Custom signatures fields */}
            <div className="space-y-2 border-t border-stone-200 pt-3">
              <span className="block text-[10px] font-bold text-natural-muted uppercase tracking-wide">Nama Pejabat Penandatangan</span>
              
              <div>
                <label className="block text-[9px] text-natural-muted mb-0.5">Kepala Sekolah & NIP</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    value={kepalaSekolah}
                    onChange={(e) => setKepalaSekolah(e.target.value)}
                    placeholder="Nama Kepala Sekolah"
                    className="px-2 py-1 text-xs border border-natural-border-light rounded bg-white font-medium"
                  />
                  <input
                    type="text"
                    value={nipKepalaSekolah}
                    onChange={(e) => setNipKepalaSekolah(e.target.value)}
                    placeholder="NIP / Identitas"
                    className="px-2 py-1 text-xs border border-natural-border-light rounded bg-white text-natural-muted"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-natural-muted mb-0.5">Pembina OSIS & Kota</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    value={pembinaOsis}
                    onChange={(e) => setPembinaOsis(e.target.value)}
                    placeholder="Nama Pembina OSIS"
                    className="px-2 py-1 text-xs border border-natural-border-light rounded bg-white font-medium"
                  />
                  <input
                    type="text"
                    value={kotaPenerbit}
                    onChange={(e) => setKotaPenerbit(e.target.value)}
                    placeholder="Kota Penerbit"
                    className="px-2 py-1 text-xs border border-natural-border-light rounded bg-white text-natural-muted"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-natural-muted mb-0.5">Ketua OSIS & NISN</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    value={ketuaOsis}
                    onChange={(e) => setKetuaOsis(e.target.value)}
                    placeholder="Nama Ketua OSIS"
                    className="px-2 py-1 text-xs border border-natural-border-light rounded bg-white font-medium"
                  />
                  <input
                    type="text"
                    value={nisnKetuaOsis}
                    onChange={(e) => setNisnKetuaOsis(e.target.value)}
                    placeholder="NISN"
                    className="px-2 py-1 text-xs border border-natural-border-light rounded bg-white text-natural-muted"
                  />
                </div>
              </div>
            </div>

            {/* Direct Trigger Button */}
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-3 bg-natural-primary hover:bg-natural-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer mt-4"
            >
              <Printer size={16} />
              <span>MULAI CETAK & SAVE PDF</span>
            </button>
          </div>

          {/* Column 2: Wifi / Bluetooth Help Instructions */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Guide Board */}
            <div className="bg-[#fcfbf7] p-5 rounded-xl border border-[#ece7d5] space-y-4">
              <h4 className="font-serif font-bold text-natural-text text-sm flex items-center gap-1.5 border-b border-natural-border-light pb-2">
                <HelpCircle size={16} className="text-natural-primary" />
                <span>Panduan Menghubungkan Printer & Menyimpan PDF</span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Wifi Print Option */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Wifi size={14} />
                    </div>
                    <span className="text-xs font-extrabold text-natural-text">Printer WiFi (AirPrint/Network)</span>
                  </div>
                  <p className="text-[11px] text-natural-muted leading-relaxed">
                    1. Pastikan HP/Tablet/Laptop Anda terhubung ke <strong>WiFi yang sama</strong> dengan printer kantor sekolah.<br />
                    2. Klik tombol <strong>Mulai Cetak</strong> di sebelah kiri.<br />
                    3. Pada pilihan <i>Destination / Printer</i>, pilih nama printer WiFi Anda (misal: Epson L3250, Brother, HP Smart, dll) lalu cetak langsung.
                  </p>
                </div>

                {/* Bluetooth Print Option */}
                <div className="p-3.5 bg-white border border-stone-200 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Bluetooth size={14} />
                    </div>
                    <span className="text-xs font-extrabold text-natural-text">Printer Bluetooth / Thermal</span>
                  </div>
                  <p className="text-[11px] text-natural-muted leading-relaxed">
                    1. Aktifkan Bluetooth pada HP/Tablet Anda dan pasangkan (pair) dengan printer Bluetooth portable.<br />
                    2. Gunakan spooler bawaan sistem operasi Anda atau aplikasi jembatan cetak seperti <strong>RawBT</strong> atau <strong>Bluetooth Print</strong> (Android/iOS) jika printer memerlukan driver khusus.<br />
                    3. Klik tombol cetak dan salurkan ke printer bluetooth terdaftar.
                  </p>
                </div>

              </div>

              {/* Digital PDF Save */}
              <div className="p-3 bg-[#f2ede4] border border-natural-border-dark rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 bg-natural-primary text-white rounded shrink-0 mt-0.5">
                  <Download size={13} />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-natural-text block">Menyimpan Sebagai Berkas PDF Digital</span>
                  <p className="text-[10.5px] text-natural-muted mt-0.5 leading-normal">
                    Jika tidak ingin mencetak ke kertas fisik, Anda dapat memilih <strong>"Simpan sebagai PDF" / "Save as PDF"</strong> pada pilihan Printer Tujuan di kotak dialog browser. Ini akan menghasilkan dokumen PDF berkualitas tinggi yang siap dikirim lewat WhatsApp atau diunggah ke Google Drive sekolah.
                  </p>
                </div>
              </div>

              {/* Layout Checklist Card */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5">
                <div className="p-1.5 bg-emerald-700 text-white rounded shrink-0 mt-0.5">
                  <CheckCircle size={13} />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-emerald-800 block">Saran Pengaturan Layout Halaman</span>
                  <p className="text-[10.5px] text-emerald-700 mt-0.5 leading-normal">
                    Untuk hasil terbaik, pastikan Anda mencentang opsi <strong>"Grafik Latar Belakang / Background Graphics"</strong> pada pengaturan cetak browser agar garis tabel, warna kop surat, dan badge status tercetak dengan sempurna! Gunakan ukuran kertas <strong>A4</strong>.
                  </p>
                </div>
              </div>

            </div>

            {/* Live Counter Info */}
            <div className="bg-stone-100 p-4 rounded-xl border border-natural-border-light flex flex-wrap gap-4 items-center justify-around text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-natural-muted block">Tugas Jabatan</span>
                <span className="text-lg font-serif font-extrabold text-natural-text">{filteredJabatans.length}</span>
              </div>
              <div className="w-px h-8 bg-stone-300"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-natural-muted block">Program Qism</span>
                <span className="text-lg font-serif font-extrabold text-natural-text">{filteredQisms.length}</span>
              </div>
              <div className="w-px h-8 bg-stone-300"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-natural-muted block">Laporan Aktivitas</span>
                <span className="text-lg font-serif font-extrabold text-natural-text">{filteredDailyReports.length}</span>
              </div>
              <div className="w-px h-8 bg-stone-300"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-natural-muted block">Catatan Monitoring</span>
                <span className="text-lg font-serif font-extrabold text-natural-text">{filteredMonitoringRecords.length}</span>
              </div>
              <div className="w-px h-8 bg-stone-300"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-natural-muted block">Reward & Sanksi</span>
                <span className="text-lg font-serif font-extrabold text-natural-text">{filteredRewardPunishments.length}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER - A4 Paper Layout styled on screen */}
      <div className="space-y-2 no-print">
        <span className="text-xs font-extrabold uppercase text-natural-primary tracking-wide flex items-center gap-1.5">
          <FileCheck size={14} />
          <span>Pratinjau Dokumen Resmi (Kertas A4 Terformat)</span>
        </span>
        <p className="text-[11px] text-natural-muted">
          Berikut adalah tampilan riil kertas yang akan dicetak/disimpan sebagai PDF. Halaman navigasi, sidebar, dan tombol pengaturan di atas tidak akan ikut tercetak.
        </p>
      </div>

      {/* PRINT-ONLY & ON-SCREEN PREVIEW CONTAINER */}
      <div 
        id="print-document" 
        className="bg-white p-8 sm:p-12 rounded-2xl border border-natural-border-light shadow-md max-w-4xl mx-auto text-black font-serif overflow-x-auto min-h-[1100px] print:border-none print:shadow-none print:p-0 print:m-0"
      >
        {/* --- DYNAMIC REPORT RENDERER --- */}
        
        {/* REPORT TYPE: COMPLETE / BUKU BESAR COMPILATION */}
        {reportType === 'complete' && (
          <div className="space-y-12">
            
            {/* Section 1: COVER / HOMEPAGE */}
            <div className="flex flex-col justify-between min-h-[900px] text-center border-4 border-double border-black p-8 sm:p-12">
              <div className="space-y-4">
                <span className="text-xs font-bold font-mono tracking-widest uppercase text-stone-600 block">DOKUMEN RESMI SEKOLAH</span>
                <div className="w-20 h-20 bg-stone-100 rounded-full border border-black flex items-center justify-center mx-auto">
                  <Award size={40} className="text-black" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase font-serif">
                  LAPORAN PERTANGGUNGJAWABAN KOMPREHENSIF<br />
                  DAN DOKUMEN ADMINISTRASI OSIS
                </h1>
                <p className="text-base font-bold font-serif uppercase tracking-wide">
                  ORGANISASI SISWA INTRA SEKOLAH (OSIS)
                </p>
                <p className="text-lg font-extrabold font-serif text-stone-800">
                  SMP IT UBK (UMMUL QURA BANDUNG KULON)
                </p>
                <div className="w-40 h-1 bg-black mx-auto my-6"></div>
                <p className="text-xs text-stone-500 font-mono italic">
                  Dicetak secara otomatis melalui Portal Informasi Manajemen OSIS Digital
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left text-xs font-serif bg-stone-50 p-4 border border-stone-300 rounded">
                  <span className="font-bold text-stone-700">Sektor Wilayah:</span>
                  <span>{genderFilter === 'all' ? 'Semua Wilayah (Ikhwan & Akhwat)' : genderFilter === 'ikhwan' ? 'Sektor Ikhwan (Putra)' : 'Sektor Akhwat (Putri)'}</span>
                  
                  <span className="font-bold text-stone-700">Rentang Laporan:</span>
                  <span>{dateFilter === 'all' ? 'Seluruh Masa Jabatan' : dateFilter === 'today' ? 'Hari Ini' : dateFilter === 'week' ? '1 Minggu Terakhir' : dateFilter === 'month' ? '1 Bulan Terakhir' : 'Periode Kustom'}</span>
                  
                  <span className="font-bold text-stone-700">Tanggal Cetak:</span>
                  <span>{getTodayDateIndo()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold">DISUSUN OLEH:</p>
                <p className="text-base font-extrabold underline">PENGURUS HARIAN OSIS SMP IT UBK</p>
                <p className="text-xs text-stone-600">
                  Konsultan & Pembina Teknis: <strong className="text-black">Jundi Abdul Syahid, S.Pd.</strong>
                </p>
                <p className="text-xs text-stone-500 font-mono">Tahun Ajaran 2026/2027</p>
              </div>
            </div>

            {/* Page Break for printing */}
            <div className="print-break-before space-y-6">
              {/* Render Kop Surat */}
              <KopSurat />
              <div className="text-center space-y-1">
                <h2 className="text-base font-extrabold uppercase underline">BAB I : DAFTAR TUGAS JABATAN PENGURUS</h2>
                <p className="text-[11px] text-stone-500 font-serif">Rincian tanggung jawab dan tugas pokok peranan fungsional OSIS</p>
              </div>
              <JabatanPrintTable jabatans={filteredJabatans} />
            </div>

            {/* Page Break for printing */}
            <div className="print-break-before space-y-6">
              <KopSurat />
              <div className="text-center space-y-1">
                <h2 className="text-base font-extrabold uppercase underline">BAB II : PROGRAM KERJA & AGENDA QISM</h2>
                <p className="text-[11px] text-stone-500 font-serif">Daftar agenda kerja berlandaskan syari'at yang dikoordinasikan oleh tiap Bidang Qism</p>
              </div>
              <QismPrintTable qisms={filteredQisms} />
            </div>

            {/* Page Break for printing */}
            <div className="print-break-before space-y-6">
              <KopSurat />
              <div className="text-center space-y-1">
                <h2 className="text-base font-extrabold uppercase underline">BAB III : CATATAN LAPORAN AKTIVITAS HARIAN</h2>
                <p className="text-[11px] text-stone-500 font-serif">Rekapitulasi laporan implementasi program kerja dan operasional harian pengurus</p>
              </div>
              <DailyReportsPrintTable reports={filteredDailyReports} jabatans={state.jabatans} qisms={state.qisms} />
            </div>

            {/* Page Break for printing */}
            <div className="print-break-before space-y-6">
              <KopSurat />
              <div className="text-center space-y-1">
                <h2 className="text-base font-extrabold uppercase underline">BAB IV : BUKU MONITORING KEDISIPLINAN</h2>
                <p className="text-[11px] text-stone-500 font-serif">Catatan evaluasi pengawas eksternal/internal terhadap kinerja dan kedisiplinan pengurus</p>
              </div>
              <MonitoringPrintTable records={filteredMonitoringRecords} jabatans={state.jabatans} qisms={state.qisms} />
            </div>

            {/* Page Break for printing */}
            <div className="print-break-before space-y-6">
              <KopSurat />
              <div className="text-center space-y-1">
                <h2 className="text-base font-extrabold uppercase underline">BAB V : DAFTAR REWARD & SANKSI MENDIDIK</h2>
                <p className="text-[11px] text-stone-500 font-serif">Rekapitulasi pencapaian prestasi (reward) dan sanksi pendisiplinan (punishment) siswa</p>
              </div>
              <RewardPunishmentPrintTable records={filteredRewardPunishments} />
              
              {/* Validation signature lines */}
              <div className="print-break-inside-avoid mt-12 pt-6">
                <LembarPengesahan 
                  kepalaSekolah={kepalaSekolah}
                  nipKepalaSekolah={nipKepalaSekolah}
                  pembinaOsis={pembinaOsis}
                  ketuaOsis={ketuaOsis}
                  nisnKetuaOsis={nisnKetuaOsis}
                  kotaPenerbit={kotaPenerbit}
                />
              </div>
            </div>

          </div>
        )}

        {/* REPORT TYPE: TUGAS JABATAN ONLY */}
        {reportType === 'jabatan' && (
          <div className="space-y-6">
            <KopSurat />
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold uppercase underline">DAFTAR TUGAS JABATAN PENGURUS OSIS</h2>
              <span className="text-xs uppercase font-bold text-stone-600 block">Sektor: {genderFilter === 'all' ? 'Ikhwan & Akhwat' : genderFilter === 'ikhwan' ? 'Ikhwan' : 'Akhwat'}</span>
            </div>
            
            <JabatanPrintTable jabatans={filteredJabatans} />
            
            <div className="print-break-inside-avoid pt-8">
              <LembarPengesahan 
                kepalaSekolah={kepalaSekolah}
                nipKepalaSekolah={nipKepalaSekolah}
                pembinaOsis={pembinaOsis}
                ketuaOsis={ketuaOsis}
                nisnKetuaOsis={nisnKetuaOsis}
                kotaPenerbit={kotaPenerbit}
              />
            </div>
          </div>
        )}

        {/* REPORT TYPE: PROGRAM KERJA QISM ONLY */}
        {reportType === 'qism' && (
          <div className="space-y-6">
            <KopSurat />
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold uppercase underline">DAFTAR PROGRAM KERJA & AGENDA QISM OSIS</h2>
              <span className="text-xs uppercase font-bold text-stone-600 block">Sektor: {genderFilter === 'all' ? 'Ikhwan & Akhwat' : genderFilter === 'ikhwan' ? 'Ikhwan' : 'Akhwat'}</span>
            </div>
            
            <QismPrintTable qisms={filteredQisms} />
            
            <div className="print-break-inside-avoid pt-8">
              <LembarPengesahan 
                kepalaSekolah={kepalaSekolah}
                nipKepalaSekolah={nipKepalaSekolah}
                pembinaOsis={pembinaOsis}
                ketuaOsis={ketuaOsis}
                nisnKetuaOsis={nisnKetuaOsis}
                kotaPenerbit={kotaPenerbit}
              />
            </div>
          </div>
        )}

        {/* REPORT TYPE: DAILY REPORTS ONLY */}
        {reportType === 'daily' && (
          <div className="space-y-6">
            <KopSurat />
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold uppercase underline">LAPORAN AKTIVITAS HARIAN PENGURUS OSIS</h2>
              <span className="text-xs uppercase font-bold text-stone-600 block">Periode Laporan: {dateFilter === 'all' ? 'Masa Jabatan Lengkap' : 'Rentang Tanggal Khusus'}</span>
            </div>
            
            <DailyReportsPrintTable reports={filteredDailyReports} jabatans={state.jabatans} qisms={state.qisms} />
            
            <div className="print-break-inside-avoid pt-8">
              <LembarPengesahan 
                kepalaSekolah={kepalaSekolah}
                nipKepalaSekolah={nipKepalaSekolah}
                pembinaOsis={pembinaOsis}
                ketuaOsis={ketuaOsis}
                nisnKetuaOsis={nisnKetuaOsis}
                kotaPenerbit={kotaPenerbit}
              />
            </div>
          </div>
        )}

        {/* REPORT TYPE: MONITORING ONLY */}
        {reportType === 'monitoring' && (
          <div className="space-y-6">
            <KopSurat />
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold uppercase underline">BUKU MONITORING & EVALUASI KEDISIPLINAN OSIS</h2>
              <span className="text-xs uppercase font-bold text-stone-600 block">Status Filter: {genderFilter === 'all' ? 'Semua Sektor' : genderFilter === 'ikhwan' ? 'Ikhwan' : 'Akhwat'}</span>
            </div>
            
            <MonitoringPrintTable records={filteredMonitoringRecords} jabatans={state.jabatans} qisms={state.qisms} />
            
            <div className="print-break-inside-avoid pt-8">
              <LembarPengesahan 
                kepalaSekolah={kepalaSekolah}
                nipKepalaSekolah={nipKepalaSekolah}
                pembinaOsis={pembinaOsis}
                ketuaOsis={ketuaOsis}
                nisnKetuaOsis={nisnKetuaOsis}
                kotaPenerbit={kotaPenerbit}
              />
            </div>
          </div>
        )}

        {/* REPORT TYPE: REWARD & PUNISHMENT ONLY */}
        {reportType === 'reward-punishment' && (
          <div className="space-y-6">
            <KopSurat />
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold uppercase underline">REKAPITULASI DAFTAR REWARD & SANKSI SISWA</h2>
              <span className="text-xs uppercase font-bold text-stone-600 block">SMP IT UBK — Dicetak pada: {getTodayDateIndo()}</span>
            </div>
            
            <RewardPunishmentPrintTable records={filteredRewardPunishments} />
            
            <div className="print-break-inside-avoid pt-8">
              <LembarPengesahan 
                kepalaSekolah={kepalaSekolah}
                nipKepalaSekolah={nipKepalaSekolah}
                pembinaOsis={pembinaOsis}
                ketuaOsis={ketuaOsis}
                nisnKetuaOsis={nisnKetuaOsis}
                kotaPenerbit={kotaPenerbit}
              />
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

// ==========================================
// STATIC/HELPER SUBCOMPONENTS FOR CLEAN PDF
// ==========================================

// Official Indonesian School Kop Surat (Letter Header)
function KopSurat() {
  return (
    <div className="flex items-center gap-4 text-center pb-3 border-b-4 border-double border-black kop-border">
      {/* Decorative Stamp Circle */}
      <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center shrink-0 font-serif font-bold text-xs uppercase leading-none p-1">
        OSIS UBK
      </div>
      
      {/* Official Text Lines */}
      <div className="flex-1 space-y-0.5">
        <span className="text-xs font-bold uppercase tracking-wider block">YAYASAN PENDIDIKAN ISLAM TERPADU UMMUL QURA</span>
        <span className="text-sm font-extrabold uppercase tracking-widest block">SEKOLAH MENENGAH PERTAMA ISLAM TERPADU</span>
        <span className="text-base font-black uppercase tracking-wider text-stone-900 block">SMP IT UBK (UMMUL QURA BANDUNG KULON)</span>
        <span className="text-[11px] block font-serif text-stone-600">
          Izin Operasional No: 421.3/2324-Disdik/2021 | NSS: 202020202020 | NPSN: 69992020
        </span>
        <span className="text-[10px] block font-serif text-stone-500 italic">
          Alamat: Kompleks Pendidikan UBK, Jl. Raya Kebon Kopi No. 12, Bandung, Jawa Barat | Telepon: (022) 543210 | Email: osis@smpit-ubk.sch.id
        </span>
      </div>
    </div>
  );
}

// Lembar Pengesahan (Official Signing Blocks at the footer of documents)
interface SignatureBlockProps {
  kepalaSekolah: string;
  nipKepalaSekolah: string;
  pembinaOsis: string;
  ketuaOsis: string;
  nisnKetuaOsis: string;
  kotaPenerbit: string;
}

function LembarPengesahan({ 
  kepalaSekolah, 
  nipKepalaSekolah, 
  pembinaOsis, 
  ketuaOsis, 
  nisnKetuaOsis, 
  kotaPenerbit 
}: SignatureBlockProps) {
  const todayFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-6 text-xs text-black font-serif mt-10">
      
      {/* Header Info */}
      <div className="flex justify-between items-center border-t border-dashed border-stone-300 pt-4">
        <p className="italic text-[10px] text-stone-500">Lembar Pengesahan Administrasi Resmi OSIS SMP IT UBK</p>
        <p className="font-semibold">{kotaPenerbit}, {todayFormatted}</p>
      </div>

      {/* Grid containing signatures */}
      <div className="grid grid-cols-2 gap-8 text-center pt-2">
        
        {/* Left column: Pembina OSIS */}
        <div className="space-y-16">
          <div className="space-y-0.5">
            <p>Mengetahui,</p>
            <p className="font-bold">Pembina OSIS SMP IT UBK</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-bold underline uppercase">{pembinaOsis}</p>
            <p className="text-[10px] text-stone-600">Penasihat Utama OSIS</p>
          </div>
        </div>

        {/* Right column: Ketua OSIS */}
        <div className="space-y-16">
          <div className="space-y-0.5">
            <p>Disusun oleh,</p>
            <p className="font-bold">Ketua OSIS SMP IT UBK</p>
          </div>
          <div className="space-y-0.5">
            <p className="font-bold underline uppercase">{ketuaOsis}</p>
            <p className="text-[10px] text-stone-600">NISN. {nisnKetuaOsis || 'Belum diisi'}</p>
          </div>
        </div>

      </div>

      {/* Center column: Kepala Sekolah approval */}
      <div className="text-center pt-8 max-w-xs mx-auto space-y-16">
        <div className="space-y-0.5">
          <p>Mengesahkan,</p>
          <p className="font-bold uppercase tracking-wide">Kepala Sekolah SMP IT UBK</p>
        </div>
        <div className="space-y-0.5">
          <p className="font-bold underline uppercase">{kepalaSekolah}</p>
          <p className="text-[10px] text-stone-600">NIP. {nipKepalaSekolah || 'Belum diisi'}</p>
        </div>
      </div>

    </div>
  );
}

// Subcomponent: JABATAN Table renderer
function JabatanPrintTable({ jabatans }: { jabatans: Jabatan[] }) {
  if (jabatans.length === 0) {
    return <p className="text-xs italic text-stone-500 text-center py-4">Tidak ada data jabatan pengurus yang sesuai filter.</p>;
  }

  return (
    <div className="space-y-6">
      {jabatans.map((j) => (
        <div key={j.id} className="border border-stone-400 p-4 rounded bg-stone-50/40 space-y-3 print-break-inside-avoid">
          <div className="flex justify-between items-start border-b border-stone-300 pb-2">
            <div>
              <h3 className="text-sm font-extrabold uppercase font-serif text-black">{j.title}</h3>
              <p className="text-[11px] text-stone-600 font-serif">Deskripsi: {j.description}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold bg-stone-200 border border-stone-400 px-2.5 py-0.5 rounded uppercase font-mono">
                👤 {j.officerName}
              </span>
              <span className="text-[9px] text-stone-500 block uppercase font-mono mt-1">Sektor: {j.gender || 'Ikhwan'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-stone-800">Daftar Tugas Utama:</p>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                  <th>Uraian Tugas Pokok & Tanggung Jawab Peranan</th>
                </tr>
              </thead>
              <tbody>
                {j.tasks.map((task, idx) => (
                  <tr key={task.id}>
                    <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                    <td className="font-serif leading-relaxed text-xs">{task.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

// Subcomponent: QISM Table renderer
function QismPrintTable({ qisms }: { qisms: Qism[] }) {
  if (qisms.length === 0) {
    return <p className="text-xs italic text-stone-500 text-center py-4">Tidak ada data program kerja Qism yang sesuai filter.</p>;
  }

  return (
    <div className="space-y-8">
      {qisms.map((q) => (
        <div key={q.id} className="border border-stone-400 p-5 rounded space-y-4 print-break-inside-avoid">
          
          {/* Title & Koordinator Header */}
          <div className="flex justify-between items-start border-b border-stone-300 pb-2.5">
            <div>
              <h3 className="text-sm font-black uppercase text-black">{q.title}</h3>
              <p className="text-xs text-stone-600 font-serif italic">{q.description}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold bg-stone-200 border border-stone-400 px-2.5 py-0.5 rounded font-mono">
                Koordinator: {q.officerName}
              </span>
              <p className="text-[9px] text-stone-500 uppercase block font-mono mt-1">Sektor: {q.gender || 'Ikhwan'}</p>
            </div>
          </div>

          {/* Members list block */}
          {q.members && q.members.length > 0 && (
            <div className="space-y-1 text-xs">
              <span className="font-extrabold text-stone-800 uppercase block text-[10px]">Struktur Anggota Departemen:</span>
              <p className="font-serif text-stone-700">
                {q.members.join(', ')}
              </p>
            </div>
          )}

          {/* Tasks table */}
          <div className="space-y-1.5">
            <span className="font-extrabold text-stone-800 uppercase block text-[10px]">I. Tugas Pokok Departemen</span>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                  <th>Uraian Tugas Pokok Bidang / Qism</th>
                </tr>
              </thead>
              <tbody>
                {q.tasks.map((task, idx) => (
                  <tr key={task.id}>
                    <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                    <td className="text-xs font-serif leading-relaxed">{task.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Agendas list table */}
          <div className="space-y-1.5">
            <span className="font-extrabold text-stone-800 uppercase block text-[10px]">II. Rencana Agenda & Program Kerja (Syari'at Compliance)</span>
            {q.agendas.length === 0 ? (
              <p className="text-xs italic text-stone-500 pl-4">Belum ada agenda kerja yang didaftarkan.</p>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th style={{ width: '40px', textAlign: 'center' }}>No</th>
                    <th>Nama Program Kerja / Agenda</th>
                    <th>Deskripsi & Target Pelaksanaan</th>
                    <th style={{ width: '130px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {q.agendas.map((agenda, idx) => (
                    <tr key={agenda.id}>
                      <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                      <td className="text-xs font-serif font-bold">{agenda.title}</td>
                      <td className="text-xs font-serif">{agenda.description}</td>
                      <td style={{ textAlign: 'center' }} className="text-xs font-mono font-bold">
                        {agenda.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}

// Subcomponent: DAILY REPORTS Table renderer
interface ReportsTableProps {
  reports: DailyReport[];
  jabatans: Jabatan[];
  qisms: Qism[];
}

function DailyReportsPrintTable({ reports, jabatans, qisms }: ReportsTableProps) {
  if (reports.length === 0) {
    return <p className="text-xs italic text-stone-500 text-center py-4">Tidak ada data laporan harian pengurus yang sesuai filter.</p>;
  }

  const getTargetName = (type: 'jabatan' | 'qism', id: string) => {
    if (type === 'jabatan') {
      return jabatans.find(j => j.id === id)?.title || `Jabatan: ${id}`;
    } else {
      return qisms.find(q => q.id === id)?.title || `Qism: ${id}`;
    }
  };

  const formatDateIndo = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th style={{ width: '100px' }}>Tanggal</th>
          <th style={{ width: '130px' }}>Penanggung Jawab</th>
          <th style={{ width: '140px' }}>Sasaran Instansi</th>
          <th>Nama Kegiatan & Deskripsi Pelaksanaan</th>
          <th style={{ width: '150px' }}>Catatan / Evaluasi</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r.id}>
            <td className="font-mono text-xs">{formatDateIndo(r.date)}</td>
            <td className="text-xs font-bold">{r.reportedBy || 'OSIS Officer'}</td>
            <td className="text-xs">{getTargetName(r.targetType, r.targetId)}</td>
            <td className="text-xs font-serif">
              <strong className="block text-black mb-1">{r.title}</strong>
              <span className="leading-relaxed block text-stone-700">{r.activityDetails}</span>
            </td>
            <td className="text-xs font-serif italic text-stone-800">{r.notes || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Subcomponent: MONITORING Table renderer
interface MonitoringTableProps {
  records: MonitoringRecord[];
  jabatans: Jabatan[];
  qisms: Qism[];
}

function MonitoringPrintTable({ records, jabatans, qisms }: MonitoringTableProps) {
  if (records.length === 0) {
    return <p className="text-xs italic text-stone-500 text-center py-4">Tidak ada data buku monitoring kedisiplinan yang sesuai filter.</p>;
  }

  const getTargetName = (type: 'jabatan' | 'qism', id: string) => {
    if (type === 'jabatan') {
      return jabatans.find(j => j.id === id)?.title || `Jabatan: ${id}`;
    } else {
      return qisms.find(q => q.id === id)?.title || `Qism: ${id}`;
    }
  };

  const formatDateIndo = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th style={{ width: '90px' }}>Tanggal</th>
          <th style={{ width: '110px' }}>Pengawas</th>
          <th style={{ width: '130px' }}>Aspek Dipantau</th>
          <th style={{ width: '100px', textAlign: 'center' }}>Predikat</th>
          <th>Uraian Kendala / Kondisi Lapangan</th>
          <th>Tindakan Lanjut / Solusi Guru</th>
        </tr>
      </thead>
      <tbody>
        {records.map((rec) => (
          <tr key={rec.id}>
            <td className="font-mono text-xs">{formatDateIndo(rec.date)}</td>
            <td className="text-xs font-semibold text-stone-800">{rec.monitoredBy}</td>
            <td className="text-xs font-bold">{getTargetName(rec.targetType, rec.targetId)}</td>
            <td style={{ textAlign: 'center' }} className="text-xs font-mono font-bold">
              {rec.status}
            </td>
            <td className="text-xs font-serif">{rec.notes}</td>
            <td className="text-xs font-serif text-emerald-900">{rec.actionTaken || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Subcomponent: REWARD & PUNISHMENT Table renderer
function RewardPunishmentPrintTable({ records }: { records: RewardPunishment[] }) {
  if (records.length === 0) {
    return <p className="text-xs italic text-stone-500 text-center py-4">Tidak ada data rekapitulasi reward & sanksi yang sesuai filter.</p>;
  }

  const formatDateIndo = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th style={{ width: '90px' }}>Tanggal</th>
          <th style={{ width: '140px' }}>Nama Siswa / Kelas</th>
          <th style={{ width: '100px', textAlign: 'center' }}>Kategori</th>
          <th>Bentuk Prestasi / Pelanggaran Aturan</th>
          <th>Apresiasi Hadiah / Sanksi Mendidik</th>
          <th style={{ width: '110px' }}>Petugas Penanggung Jawab</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id}>
            <td className="font-mono text-xs">{formatDateIndo(r.date)}</td>
            <td className="text-xs">
              <strong className="block text-black">{r.studentName}</strong>
              <span className="text-stone-600 block text-[10px]">Kelas: {r.classRoom}</span>
            </td>
            <td style={{ textAlign: 'center' }} className="text-xs font-mono font-bold uppercase">
              {r.type === 'reward' ? '🏆 REWARD' : '⚠️ SANKSI'}
            </td>
            <td className="text-xs font-serif leading-relaxed">{r.behaviorOrAchievement}</td>
            <td className="text-xs font-serif font-bold text-emerald-950">{r.consequenceOrReward}</td>
            <td className="text-xs font-semibold">{r.officerInCharge}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
