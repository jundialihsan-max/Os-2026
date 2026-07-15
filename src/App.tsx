import React, { useState, useEffect } from 'react';
import { 
  getInitialJabatans, 
  getInitialQisms, 
  getInitialDailyReports, 
  getInitialMonitoringRecords, 
  getInitialRewardPunishments 
} from './initialData';
import { getInitialLdkChapters } from './initialLdkData';
import { OSISState, Jabatan, Qism, DailyReport, MonitoringRecord, RewardPunishment, LdkChapter } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import JabatanSection from './components/JabatanSection';
import QismSection from './components/QismSection';
import DailyReportsSection from './components/DailyReportsSection';
import MonitoringSection from './components/MonitoringSection';
import RewardPunishmentSection from './components/RewardPunishmentSection';
import LdkSection from './components/LdkSection';
import PrintSection from './components/PrintSection';
import { 
  Home, 
  Users, 
  Layers, 
  FileEdit, 
  Eye, 
  Trophy, 
  CheckCircle2, 
  AlertCircle,
  BookMarked,
  Printer
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'osis_smp_it_ubk_state_v2';

export default function App() {
  const [state, setState] = useState<OSISState>({
    jabatans: [],
    qisms: [],
    dailyReports: [],
    monitoringRecords: [],
    rewardPunishments: [],
    ldkChapters: [],
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Verify structure has keys
        if (parsed.jabatans && parsed.qisms) {
          if (!parsed.ldkChapters || parsed.ldkChapters.length === 0) {
            parsed.ldkChapters = getInitialLdkChapters();
          }
          setState(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }

    // Default fallbacks if empty or invalid
    const defaultState: OSISState = {
      jabatans: getInitialJabatans(),
      qisms: getInitialQisms(),
      dailyReports: getInitialDailyReports(),
      monitoringRecords: getInitialMonitoringRecords(),
      rewardPunishments: getInitialRewardPunishments(),
      ldkChapters: getInitialLdkChapters(),
    };
    setState(defaultState);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultState));
  }, []);

  // Show Toast helper
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Save state helper
  const saveState = (newState: OSISState) => {
    setState(newState);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  };

  // Updaters
  const handleAddJabatan = (newJabatan: Jabatan) => {
    const nextJabatans = [...state.jabatans, newJabatan];
    const nextState = { ...state, jabatans: nextJabatans };
    saveState(nextState);
    showToast(`Jabatan "${newJabatan.title}" berhasil ditambahkan!`);
  };

  const handleUpdateJabatan = (updated: Jabatan) => {
    const nextJabatans = state.jabatans.map((j) => (j.id === updated.id ? updated : j));
    const nextState = { ...state, jabatans: nextJabatans };
    saveState(nextState);
    showToast(`Data ${updated.title} berhasil diperbarui!`);
  };

  const handleDeleteJabatan = (id: string) => {
    const nextJabatans = state.jabatans.filter((j) => j.id !== id);
    const nextState = { ...state, jabatans: nextJabatans };
    saveState(nextState);
    showToast(`Jabatan berhasil dihapus.`);
  };

  const handleAddQism = (newQism: Qism) => {
    const nextQisms = [...state.qisms, newQism];
    const nextState = { ...state, qisms: nextQisms };
    saveState(nextState);
    showToast(`Bidang Qism "${newQism.title}" berhasil ditambahkan!`);
  };

  const handleUpdateQism = (updated: Qism) => {
    const nextQisms = state.qisms.map((q) => (q.id === updated.id ? updated : q));
    const nextState = { ...state, qisms: nextQisms };
    saveState(nextState);
    showToast(`Data ${updated.title} berhasil diperbarui!`);
  };

  const handleDeleteQism = (id: string) => {
    const nextQisms = state.qisms.filter((q) => q.id !== id);
    const nextState = { ...state, qisms: nextQisms };
    saveState(nextState);
    showToast(`Bidang Qism berhasil dihapus.`);
  };

  // Daily reports CRUD
  const handleAddDailyReport = (report: DailyReport) => {
    const nextReports = [report, ...state.dailyReports];
    const nextState = { ...state, dailyReports: nextReports };
    saveState(nextState);
    showToast('Laporan harian baru berhasil ditambahkan!');
  };

  const handleUpdateDailyReport = (report: DailyReport) => {
    const nextReports = state.dailyReports.map((r) => (r.id === report.id ? report : r));
    const nextState = { ...state, dailyReports: nextReports };
    saveState(nextState);
    showToast('Laporan harian berhasil disunting!');
  };

  const handleDeleteDailyReport = (id: string) => {
    const nextReports = state.dailyReports.filter((r) => r.id !== id);
    const nextState = { ...state, dailyReports: nextReports };
    saveState(nextState);
    showToast('Laporan harian berhasil dihapus.');
  };

  // Monitoring CRUD
  const handleAddMonitoringRecord = (record: MonitoringRecord) => {
    const nextRecords = [record, ...state.monitoringRecords];
    const nextState = { ...state, monitoringRecords: nextRecords };
    saveState(nextState);
    showToast('Catatan monitoring berhasil ditambahkan!');
  };

  const handleUpdateMonitoringRecord = (record: MonitoringRecord) => {
    const nextRecords = state.monitoringRecords.map((r) => (r.id === record.id ? record : r));
    const nextState = { ...state, monitoringRecords: nextRecords };
    saveState(nextState);
    showToast('Catatan monitoring berhasil disunting!');
  };

  const handleDeleteMonitoringRecord = (id: string) => {
    const nextRecords = state.monitoringRecords.filter((r) => r.id !== id);
    const nextState = { ...state, monitoringRecords: nextRecords };
    saveState(nextState);
    showToast('Catatan monitoring berhasil dihapus.');
  };

  // Reward/Punishment CRUD
  const handleAddRewardPunishment = (record: RewardPunishment) => {
    const nextRecords = [record, ...state.rewardPunishments];
    const nextState = { ...state, rewardPunishments: nextRecords };
    saveState(nextState);
    showToast(`Catatan ${record.type === 'reward' ? 'Prestasi' : 'Sanksi'} baru berhasil disimpan!`);
  };

  const handleUpdateRewardPunishment = (record: RewardPunishment) => {
    const nextRecords = state.rewardPunishments.map((r) => (r.id === record.id ? record : r));
    const nextState = { ...state, rewardPunishments: nextRecords };
    saveState(nextState);
    showToast(`Catatan ${record.type === 'reward' ? 'Prestasi' : 'Sanksi'} berhasil disunting!`);
  };

  const handleDeleteRewardPunishment = (id: string) => {
    const nextRecords = state.rewardPunishments.filter((r) => r.id !== id);
    const nextState = { ...state, rewardPunishments: nextRecords };
    saveState(nextState);
    showToast('Catatan kedisiplinan/prestasi berhasil dihapus.');
  };

  // LDK CRUD
  const handleAddLdkChapter = (chapter: LdkChapter) => {
    const nextChapters = [...(state.ldkChapters || []), chapter];
    const nextState = { ...state, ldkChapters: nextChapters };
    saveState(nextState);
    showToast('Bab materi LDK baru berhasil ditambahkan!');
  };

  const handleUpdateLdkChapter = (chapter: LdkChapter) => {
    const nextChapters = (state.ldkChapters || []).map((c) => (c.id === chapter.id ? chapter : c));
    const nextState = { ...state, ldkChapters: nextChapters };
    saveState(nextState);
    showToast(`Bab ${chapter.chapterNumber} berhasil diperbarui!`);
  };

  const handleDeleteLdkChapter = (id: string) => {
    const nextChapters = (state.ldkChapters || []).filter((c) => c.id !== id);
    const nextState = { ...state, ldkChapters: nextChapters };
    saveState(nextState);
    showToast('Materi LDK berhasil dihapus.');
  };

  // Export JSON Backup
  const handleExportData = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `backup_osis_smp_it_ubk_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Seluruh data berhasil diekspor ke berkas JSON!');
    } catch (e) {
      console.error(e);
      showToast('Gagal melakukan ekspor data.', 'error');
    }
  };

  // Import JSON Backup
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const parsed = JSON.parse(result);
          // Verify required fields
          if (parsed.jabatans && parsed.qisms && parsed.dailyReports) {
            saveState(parsed);
            showToast('Seluruh data berhasil diimpor dari cadangan!');
          } else {
            showToast('Struktur berkas cadangan tidak valid!', 'error');
          }
        }
      } catch (err) {
        console.error(err);
        showToast('Gagal mengurai isi berkas cadangan JSON.', 'error');
      }
    };
    reader.readAsText(file);
    // clear the input value so user can upload the same file again
    e.target.value = '';
  };

  // Reset to initial
  const handleResetData = () => {
    const confirmReset = window.confirm(
      'Apakah Anda benar-benar ingin menghapus seluruh data yang telah Anda masukkan dan kembali ke setelan awal pabrik?'
    );
    if (confirmReset) {
      const defaultState: OSISState = {
        jabatans: getInitialJabatans(),
        qisms: getInitialQisms(),
        dailyReports: getInitialDailyReports(),
        monitoringRecords: getInitialMonitoringRecords(),
        rewardPunishments: getInitialRewardPunishments(),
        ldkChapters: getInitialLdkChapters(),
      };
      saveState(defaultState);
      showToast('Aplikasi berhasil dikembalikan ke setelan awal!', 'success');
    }
  };

  // Render Section helper
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} setActiveTab={setActiveTab} />;
      case 'jabatan':
        return (
          <JabatanSection 
            jabatans={state.jabatans} 
            onAddJabatan={handleAddJabatan}
            onUpdateJabatan={handleUpdateJabatan} 
            onDeleteJabatan={handleDeleteJabatan}
          />
        );
      case 'qism':
        return (
          <QismSection 
            qisms={state.qisms} 
            onAddQism={handleAddQism}
            onUpdateQism={handleUpdateQism} 
            onDeleteQism={handleDeleteQism}
          />
        );
      case 'reports':
        return (
          <DailyReportsSection
            reports={state.dailyReports}
            jabatans={state.jabatans}
            qisms={state.qisms}
            onAddReport={handleAddDailyReport}
            onUpdateReport={handleUpdateDailyReport}
            onDeleteReport={handleDeleteDailyReport}
          />
        );
      case 'monitoring':
        return (
          <MonitoringSection
            records={state.monitoringRecords}
            jabatans={state.jabatans}
            qisms={state.qisms}
            onAddRecord={handleAddMonitoringRecord}
            onUpdateRecord={handleUpdateMonitoringRecord}
            onDeleteRecord={handleDeleteMonitoringRecord}
          />
        );
      case 'reward-punishment':
        return (
          <RewardPunishmentSection
            records={state.rewardPunishments}
            onAddRecord={handleAddRewardPunishment}
            onUpdateRecord={handleUpdateRewardPunishment}
            onDeleteRecord={handleDeleteRewardPunishment}
          />
        );
      case 'ldk':
        return (
          <LdkSection
            chapters={state.ldkChapters || []}
            onAddChapter={handleAddLdkChapter}
            onUpdateChapter={handleUpdateLdkChapter}
            onDeleteChapter={handleDeleteLdkChapter}
          />
        );
      case 'cetak':
        return <PrintSection state={state} />;
      default:
        return <Dashboard state={state} setActiveTab={setActiveTab} />;
    }
  };

  // Navigation config
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: Home },
    { id: 'jabatan', label: 'Tugas Jabatan', icon: Users },
    { id: 'qism', label: 'Program Qism', icon: Layers },
    { id: 'reports', label: 'Laporan Harian', icon: FileEdit },
    { id: 'monitoring', label: 'Buku Monitoring', icon: Eye },
    { id: 'reward-punishment', label: 'Reward & Sanksi', icon: Trophy },
    { id: 'ldk', label: 'Materi LDK', icon: BookMarked },
    { id: 'cetak', label: 'Cetak Laporan / PDF', icon: Printer },
  ];

  return (
    <div className="min-h-screen bg-natural-bg font-sans text-natural-text flex flex-col selection:bg-emerald-200 selection:text-emerald-900 pb-12">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-bottom-5 duration-300 bg-[#2c3327] text-white border-natural-border-dark">
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} className="text-emerald-400" />
          ) : (
            <AlertCircle size={18} className="text-red-400" />
          )}
          <span className="text-xs font-bold font-sans">{toast.message}</span>
        </div>
      )}

      {/* Main Header Component */}
      <Header 
        onExport={handleExportData} 
        onImport={handleImportData} 
        onReset={handleResetData} 
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Vertical/Horizontal Sidebar Nav */}
          <nav className="w-full lg:w-64 bg-natural-primary rounded-2xl border border-natural-border-dark p-3 shadow-md flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 shrink-0 scrollbar-none text-natural-text-light">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-natural-primary-hover text-white border border-white/10 shadow-sm font-semibold'
                      : 'text-natural-text-light/80 hover:text-white hover:bg-natural-primary-hover/50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Main workspace view */}
          <div className="flex-1 w-full min-w-0">
            {renderActiveSection()}
          </div>

        </div>
      </main>

    </div>
  );
}
