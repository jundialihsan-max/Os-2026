import React from 'react';
import { OSISState } from '../types';
import { 
  Users, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

interface DashboardProps {
  state: OSISState;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ state, setActiveTab }: DashboardProps) {
  // Count total completed tasks / agendas
  const totalReports = state.dailyReports.length;
  const totalMonitoring = state.monitoringRecords.length;
  const totalRewards = state.rewardPunishments.filter(r => r.type === 'reward').length;
  const totalPunishments = state.rewardPunishments.filter(r => r.type === 'punishment').length;

  const totalAgendas = state.qisms.reduce((acc, q) => acc + q.agendas.length, 0);
  const completedAgendas = state.qisms.reduce(
    (acc, q) => acc + q.agendas.filter(a => a.status === 'Selesai').length, 0
  );
  
  const totalTasks = state.jabatans.reduce((acc, j) => acc + j.tasks.length, 0) + 
                     state.qisms.reduce((acc, q) => acc + q.tasks.length, 0);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-natural-primary to-natural-primary-hover text-natural-text-light rounded-2xl p-6 sm:p-8 shadow-md border border-natural-border-dark">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Users size={200} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1 bg-[#2c3327]/40 border border-white/10 text-[#d9f99d] font-mono text-xs px-3 py-1 rounded-full mb-3">
            <Sparkles size={12} />
            <span>Selamat Datang di Portal Manajemen OSIS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
            Kepemimpinan Islami, Berkarakter, & Berprestasi
          </h2>
          <p className="text-natural-text-light/90 text-sm sm:text-base mt-2 leading-relaxed">
            Selamat bekerja pengurus OSIS SMP IT UBK! Aplikasi ini disusun untuk memudahkan pemantauan program kerja, pelaporan harian, monitoring, serta penegakan reward dan punishment secara mandiri, aman, dan langsung tanpa kata sandi.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveTab('reports')}
              className="px-4 py-2 bg-natural-light hover:bg-natural-border-dark active:bg-natural-border-light text-natural-text font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer border border-natural-border-dark"
            >
              📝 Tulis Laporan Harian
            </button>
            <button 
              onClick={() => setActiveTab('reward-punishment')}
              className="px-4 py-2 bg-[#2c3327] hover:bg-[#3d4636] text-[#f1ede4] font-semibold text-xs rounded-xl transition-all cursor-pointer border border-[#3d4636]"
            >
              🏆 Catat Pelanggaran & Prestasi
            </button>
            <button 
              onClick={() => setActiveTab('cetak')}
              className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer border border-emerald-300 flex items-center gap-1.5"
            >
              🖨️ Cetak PDF & Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-natural-border-light flex items-center gap-3">
          <div className="p-3 bg-natural-light/60 text-natural-primary rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs text-natural-muted font-semibold">Laporan Harian</p>
            <p className="text-2xl font-serif font-bold text-natural-text">{totalReports}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-natural-border-light flex items-center gap-3">
          <div className="p-3 bg-natural-light/60 text-natural-primary rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs text-natural-muted font-semibold">Buku Monitoring</p>
            <p className="text-2xl font-serif font-bold text-natural-text">{totalMonitoring}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-natural-border-light flex items-center gap-3">
          <div className="p-3 bg-natural-light/60 text-natural-primary rounded-lg">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-xs text-natural-muted font-semibold">Siswa Berprestasi</p>
            <p className="text-2xl font-serif font-bold text-natural-text">{totalRewards}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-natural-border-light flex items-center gap-3">
          <div className="p-3 bg-natural-light/60 text-natural-primary rounded-lg">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-xs text-natural-muted font-semibold">Catatan Sanksi</p>
            <p className="text-2xl font-serif font-bold text-natural-text">{totalPunishments}</p>
          </div>
        </div>

      </div>

      {/* Quick Access Dashboard Navigation Tiles */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-natural-muted tracking-wider uppercase">Menu Navigasi Cepat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => setActiveTab('jabatan')}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-natural-border-light hover:border-natural-primary hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-natural-light/55 group-hover:bg-natural-light text-natural-primary flex items-center justify-center transition-all mb-4">
                <Users size={20} />
              </div>
              <h4 className="font-serif font-bold text-natural-text group-hover:text-natural-primary transition-colors text-base">
                Struktur & Tugas Utama
              </h4>
              <p className="text-xs text-natural-muted mt-1 leading-relaxed">
                Kelola 10 tugas utama untuk Ketua, Wakil, Sekretaris, dan Bendahara. Ganti nama pengurus secara langsung.
              </p>
            </div>
            <span className="text-xs font-semibold text-natural-primary group-hover:underline mt-4 flex items-center gap-1">
              Buka Pengurus &rarr;
            </span>
          </div>

          <div 
            onClick={() => setActiveTab('qism')}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-natural-border-light hover:border-natural-primary hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-natural-light/55 group-hover:bg-natural-light text-natural-primary flex items-center justify-center transition-all mb-4">
                <Calendar size={20} />
              </div>
              <h4 className="font-serif font-bold text-natural-text group-hover:text-natural-primary transition-colors text-base">
                5 Bidang Departemen (Qism)
              </h4>
              <p className="text-xs text-natural-muted mt-1 leading-relaxed">
                Kelola 15 tugas utama & agenda kerja islami untuk Qism Ibadah, Nadzhofah, Lughoh, Riyadhoh, & Amn.
              </p>
            </div>
            <span className="text-xs font-semibold text-natural-primary group-hover:underline mt-4 flex items-center gap-1">
              Buka Bidang Qism &rarr;
            </span>
          </div>

          <div 
            onClick={() => setActiveTab('monitoring')}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-natural-border-light hover:border-natural-primary hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-natural-light/55 group-hover:bg-natural-light text-natural-primary flex items-center justify-center transition-all mb-4">
                <BookOpen size={20} />
              </div>
              <h4 className="font-serif font-bold text-natural-text group-hover:text-natural-primary transition-colors text-base">
                Buku Monitoring Siswa
              </h4>
              <p className="text-xs text-natural-muted mt-1 leading-relaxed">
                Evaluasi kinerja berkala setiap pengurus dan departemen. Catat solusi dan rekomendasi perbaikan.
              </p>
            </div>
            <span className="text-xs font-semibold text-natural-primary group-hover:underline mt-4 flex items-center gap-1">
              Buka Buku Monitoring &rarr;
            </span>
          </div>

          <div 
            onClick={() => setActiveTab('ldk')}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-natural-border-light hover:border-natural-primary hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-natural-light/55 group-hover:bg-natural-light text-natural-primary flex items-center justify-center transition-all mb-4">
                <BookOpen size={20} className="text-emerald-800" />
              </div>
              <h4 className="font-serif font-bold text-natural-text group-hover:text-natural-primary transition-colors text-base">
                Kurikulum LDK OSIS
              </h4>
              <p className="text-xs text-natural-muted mt-1 leading-relaxed">
                Akses materi lengkap 10 bab dasar kepemimpinan Islam, manajemen krisis, public speaking, dan aksi lapangan.
              </p>
            </div>
            <span className="text-xs font-semibold text-natural-primary group-hover:underline mt-4 flex items-center gap-1">
              Akses Kurikulum &rarr;
            </span>
          </div>

        </div>
      </div>

      {/* Two Column Layout: Latest Reports & Latest Rewards/Punishments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Latest Reports Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-natural-border-light space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-natural-text flex items-center gap-2">
              <Clock className="text-natural-muted" size={18} />
              Laporan Harian Terbaru
            </h3>
            <button 
              onClick={() => setActiveTab('reports')} 
              className="text-xs text-natural-primary font-semibold hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>
          
          {state.dailyReports.length === 0 ? (
            <div className="text-center py-8 bg-natural-light/20 rounded-xl border border-dashed border-natural-border-dark/60 text-natural-muted text-xs">
              Belum ada laporan harian yang dicatat.
            </div>
          ) : (
            <div className="space-y-3">
              {state.dailyReports.slice(0, 3).map((rep) => {
                // Find name of source
                let sourceTitle = 'OSIS';
                if (rep.targetType === 'jabatan') {
                  sourceTitle = state.jabatans.find(j => j.id === rep.targetId)?.title || 'Pengurus';
                } else {
                  sourceTitle = state.qisms.find(q => q.id === rep.targetId)?.title || 'Qism';
                }

                return (
                  <div key={rep.id} className="p-3.5 bg-natural-light/20 rounded-xl border border-natural-border-light hover:bg-natural-light/55 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase bg-natural-primary text-white px-2 py-0.5 rounded font-mono">
                        {sourceTitle}
                      </span>
                      <span className="text-[10px] text-natural-muted font-mono">{rep.date}</span>
                    </div>
                    <h4 className="font-bold text-natural-text text-xs mt-1.5">{rep.title}</h4>
                    <p className="text-xs text-natural-muted mt-1 line-clamp-2 leading-relaxed">
                      {rep.activityDetails}
                    </p>
                    <div className="mt-2 text-[10px] text-natural-muted font-medium">
                      Dilaporkan oleh: <span className="font-semibold text-natural-text">{rep.reportedBy || 'Anonim'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Latest Reward & Punishment */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-natural-border-light space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-natural-text flex items-center gap-2">
              <Trophy className="text-[#4b5e40] animate-bounce" size={18} />
              Catatan Kedisiplinan & Prestasi Terbaru
            </h3>
            <button 
              onClick={() => setActiveTab('reward-punishment')} 
              className="text-xs text-natural-primary font-semibold hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          {state.rewardPunishments.length === 0 ? (
            <div className="text-center py-8 bg-natural-light/20 rounded-xl border border-dashed border-natural-border-dark/60 text-natural-muted text-xs">
              Belum ada catatan penghargaan atau sanksi.
            </div>
          ) : (
            <div className="space-y-3">
              {state.rewardPunishments.slice(0, 3).map((rp) => (
                <div key={rp.id} className="p-3.5 bg-natural-light/20 rounded-xl border border-natural-border-light hover:bg-natural-light/55 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${
                      rp.type === 'reward' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {rp.type === 'reward' ? '🏆 Penghargaan / Prestasi' : '⚠️ Sanksi / Pembinaan'}
                    </span>
                    <span className="text-[10px] text-natural-muted font-mono">{rp.date}</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-natural-text text-xs">{rp.studentName}</span>
                    <span className="text-xs text-natural-muted font-mono ml-1.5">({rp.classRoom})</span>
                  </div>
                  <p className="text-xs text-natural-muted mt-1 line-clamp-2 leading-relaxed">
                    <strong>Kasus/Pencapaian:</strong> {rp.behaviorOrAchievement}
                  </p>
                  <p className="text-xs text-natural-primary font-medium mt-1">
                    <strong>{rp.type === 'reward' ? 'Hadiah/Apresiasi:' : 'Sanksi Edukatif:'}</strong> {rp.consequenceOrReward}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Islamic Character Card */}
      <div className="bg-[#edeae1] border border-natural-border-dark/50 p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-start">
        <div className="p-3 bg-natural-primary/10 text-natural-primary rounded-xl">
          <AlertCircle size={22} />
        </div>
        <div>
          <h4 className="font-serif font-bold text-natural-text text-sm">Adab Kepemimpinan & Ketaatan dalam Islam</h4>
          <p className="text-xs text-natural-muted mt-1 leading-relaxed">
            Rasulullah SAW bersabda: <em>&quot;Setiap kalian adalah pemimpin dan akan dimintai pertanggungjawaban atas kepemimpinannya.&quot;</em> (HR. Bukhari & Muslim). Pengurus OSIS SMP IT UBK harus memprioritaskan kejujuran, amanah, dan keteladanan yang baik (Uswah Hasanah) dalam bertindak, baik dalam beribadah, menjaga kebersihan, berbahasa santun, berolahraga, maupun menegakkan aturan kedisiplinan sekolah.
          </p>
        </div>
      </div>

    </div>
  );
}
