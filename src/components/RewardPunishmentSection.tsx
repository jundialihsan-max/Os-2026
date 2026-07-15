import React, { useState } from 'react';
import { RewardPunishment } from '../types';
import { Plus, Trash, Edit2, Check, X, Trophy, ShieldAlert, Calendar, Filter, ThumbsUp, AlertTriangle } from 'lucide-react';

interface RewardPunishmentSectionProps {
  records: RewardPunishment[];
  onAddRecord: (record: RewardPunishment) => void;
  onUpdateRecord: (record: RewardPunishment) => void;
  onDeleteRecord: (id: string) => void;
}

export default function RewardPunishmentSection({
  records,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
}: RewardPunishmentSectionProps) {
  // Filter states
  const [filterType, setFilterType] = useState<'all' | 'reward' | 'punishment'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Add state
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    type: 'reward' as 'reward' | 'punishment',
    date: new Date().toISOString().split('T')[0],
    studentName: '',
    classRoom: '',
    behaviorOrAchievement: '',
    consequenceOrReward: '',
    officerInCharge: ''
  });

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<RewardPunishment | null>(null);

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.behaviorOrAchievement.trim() || !formData.consequenceOrReward.trim()) {
      alert('Nama siswa, kasus/pencapaian, dan hadiah/sanksi wajib diisi!');
      return;
    }

    const newRecord: RewardPunishment = {
      id: 'rp-' + Date.now(),
      type: formData.type,
      date: formData.date,
      studentName: formData.studentName.trim(),
      classRoom: formData.classRoom.trim() || 'Umum',
      behaviorOrAchievement: formData.behaviorOrAchievement.trim(),
      consequenceOrReward: formData.consequenceOrReward.trim(),
      officerInCharge: formData.officerInCharge.trim() || 'Bagian Keamanan (Amn)'
    };

    onAddRecord(newRecord);
    setIsAdding(false);
    // Reset Form
    setFormData({
      type: 'reward',
      date: new Date().toISOString().split('T')[0],
      studentName: '',
      classRoom: '',
      behaviorOrAchievement: '',
      consequenceOrReward: '',
      officerInCharge: ''
    });
  };

  const handleStartEdit = (rec: RewardPunishment) => {
    setEditingId(rec.id);
    setEditFormData({ ...rec });
  };

  const handleSaveEdit = () => {
    if (!editFormData || !editFormData.studentName.trim() || !editFormData.behaviorOrAchievement.trim() || !editFormData.consequenceOrReward.trim()) {
      alert('Nama siswa, kasus/pencapaian, dan hadiah/sanksi wajib diisi!');
      return;
    }

    onUpdateRecord(editFormData);
    setEditingId(null);
    setEditFormData(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan kedisiplinan ini secara permanen?')) {
      onDeleteRecord(id);
    }
  };

  // Filter & Search records
  const filteredRecords = records.filter((rec) => {
    const matchType = filterType === 'all' || rec.type === filterType;
    const matchSearch = rec.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        rec.behaviorOrAchievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        rec.classRoom.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  }).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-natural-border-light shadow-sm">
        <div>
          <h3 className="text-lg font-serif font-bold text-natural-text flex items-center gap-2">
            <Trophy className="text-natural-primary animate-bounce" size={20} />
            <span>Sistem Buku Reward & Punishment</span>
          </h3>
          <p className="text-xs text-natural-muted">Pencatatan prestasi/kebajikan siswa (Reward) serta pendisiplinan sanksi edukatif (Punishment) secara adil.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-natural-primary hover:bg-natural-primary-hover active:bg-[#2c3327] text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
        >
          {isAdding ? <X size={14} /> : <Plus size={14} />}
          <span>{isAdding ? 'Tutup Formulir' : 'Catat Prestasi/Sanksi'}</span>
        </button>
      </div>

      {/* Form: Add Record */}
      {isAdding && (
        <form onSubmit={handleSubmitAdd} className="bg-white p-6 rounded-2xl border border-natural-border-light shadow-md space-y-4 max-w-3xl animate-in fade-in slide-in-from-top-4 duration-200">
          <h4 className="font-serif font-bold text-natural-text text-sm border-b border-natural-border-light/60 pb-2">Formulir Catatan Baru</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            {/* Jenis Catatan */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1 font-sans">Kategori Catatan</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'reward' | 'punishment' })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white"
              >
                <option value="reward">🏆 Prestasi & Kebaikan (Reward)</option>
                <option value="punishment">⚠️ Pelanggaran Tata Tertib (Punishment)</option>
              </select>
            </div>

            {/* Tanggal */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Tanggal Kejadian</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
                required
              />
            </div>

            {/* Nama Siswa */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-natural-muted mb-1">Nama Siswa yang Bersangkutan</label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                placeholder="Masukkan nama lengkap siswa..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
                required
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Kelas */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Kelas (misal: VII-A, VIII-B, IX-C)</label>
              <input
                type="text"
                value={formData.classRoom}
                onChange={(e) => setFormData({ ...formData, classRoom: e.target.value })}
                placeholder="Kelas..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              />
            </div>

            {/* Petugas Penanggung Jawab */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-natural-muted mb-1 font-sans">Peturus OSIS / Guru yang Menangani</label>
              <input
                type="text"
                value={formData.officerInCharge}
                onChange={(e) => setFormData({ ...formData, officerInCharge: e.target.value })}
                placeholder="misal: Koordinator Qism Amn / Pembina OSIS"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              />
            </div>
          </div>

          {/* Perilaku atau Prestasi */}
          <div>
            <label className="block text-xs font-bold text-natural-muted mb-1">
              {formData.type === 'reward' ? 'Deskripsi Prestasi / Kebaikan' : 'Kronologi / Detail Pelanggaran'}
            </label>
            <textarea
              value={formData.behaviorOrAchievement}
              onChange={(e) => setFormData({ ...formData, behaviorOrAchievement: e.target.value })}
              placeholder={formData.type === 'reward' ? 'Sebutkan prestasi, perilaku terpuji, atau keaktifan positif siswa yang bersangkutan...' : 'Sebutkan jenis pelanggaran yang dilakukan beserta kronologi singkat di lingkungan sekolah...'}
              rows={3}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              required
            />
          </div>

          {/* Konsekuensi atau Apresiasi */}
          <div>
            <label className="block text-xs font-bold text-natural-muted mb-1">
              {formData.type === 'reward' ? 'Bentuk Apresiasi / Hadiah' : 'Sanksi Edukatif & Pembinaan'}
            </label>
            <textarea
              value={formData.consequenceOrReward}
              onChange={(e) => setFormData({ ...formData, consequenceOrReward: e.target.value })}
              placeholder={formData.type === 'reward' ? 'misal: Piagam penghargaan, beasiswa kantin sehat, atau pujian resmi di apel.' : 'misal: Membantu Qism Ibadah merapikan sandal masjid / setoran hafalan Surah Juz 30. (Sanksi harus mendidik & islami)'}
              rows={2}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-natural-light hover:bg-[#d6cfb7] text-natural-text text-xs font-bold rounded-xl transition-colors cursor-pointer border border-natural-border-light"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-natural-primary hover:bg-natural-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Simpan Catatan
            </button>
          </div>
        </form>
      )}

      {/* Saring & Pencarian */}
      <div className="bg-white p-4 rounded-2xl border border-natural-border-light shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Saring Tab Buttons */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              filterType === 'all'
                ? 'bg-natural-primary text-white border-natural-primary shadow-sm'
                : 'bg-natural-light/40 text-natural-text hover:bg-[#d6cfb7] border-natural-border-light'
            }`}
          >
            Semua Catatan
          </button>
          <button
            onClick={() => setFilterType('reward')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
              filterType === 'reward'
                ? 'bg-[#e3cb96] text-natural-text border-[#ceb37c] shadow-sm'
                : 'bg-[#fcfaf2] text-[#7a6435] hover:bg-[#f4ebd0] border-[#dfd4b8]'
            }`}
          >
            <ThumbsUp size={12} />
            <span>Hanya Reward</span>
          </button>
          <button
            onClick={() => setFilterType('punishment')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
              filterType === 'punishment'
                ? 'bg-[#bf6554] text-white border-[#a44b3b] shadow-sm'
                : 'bg-red-50 text-red-800 hover:bg-red-100 border-red-200'
            }`}
          >
            <AlertTriangle size={12} />
            <span>Hanya Sanksi</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama siswa, kelas, tindakan..."
            className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-natural-light/20"
          />
        </div>

      </div>

      {/* Grid of Cards */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-natural-border-light">
          <p className="text-natural-muted text-sm">Tidak ada catatan prestasi atau pelanggaran yang cocok.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((rec) => {
            const isEditing = editingId === rec.id;
            const isReward = rec.type === 'reward';

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-2xl bg-white border-2 shadow-sm transition-all group flex flex-col justify-between ${
                  isReward
                    ? 'border-[#dfd4b8]/70 hover:border-[#dfd4b8]'
                    : 'border-[#e3d1cc]/70 hover:border-[#bf6554]/50'
                }`}
              >
                {isEditing && editFormData ? (
                  <div className="space-y-3 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Nama Siswa</label>
                        <input
                          type="text"
                          value={editFormData.studentName}
                          onChange={(e) => setEditFormData({ ...editFormData, studentName: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Kelas</label>
                        <input
                          type="text"
                          value={editFormData.classRoom}
                          onChange={(e) => setEditFormData({ ...editFormData, classRoom: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-natural-muted uppercase">
                        {editFormData.type === 'reward' ? 'Detail Prestasi' : 'Detail Pelanggaran'}
                      </label>
                      <textarea
                        value={editFormData.behaviorOrAchievement}
                        onChange={(e) => setEditFormData({ ...editFormData, behaviorOrAchievement: e.target.value })}
                        rows={3}
                        className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-natural-muted uppercase">
                        {editFormData.type === 'reward' ? 'Apresiasi' : 'Sanksi Edukatif'}
                      </label>
                      <textarea
                        value={editFormData.consequenceOrReward}
                        onChange={(e) => setEditFormData({ ...editFormData, consequenceOrReward: e.target.value })}
                        rows={2}
                        className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-natural-muted uppercase">Penanggung Jawab</label>
                      <input
                        type="text"
                        value={editFormData.officerInCharge}
                        onChange={(e) => setEditFormData({ ...editFormData, officerInCharge: e.target.value })}
                        className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleSaveEdit}
                        className="text-xs font-bold text-white bg-natural-primary hover:bg-natural-primary-hover px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        <Check size={12} className="inline mr-1" /> Simpan
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs font-semibold text-natural-text bg-natural-light hover:bg-[#d6cfb7] px-3 py-1.5 rounded-lg cursor-pointer border border-natural-border-light"
                      >
                        <X size={12} className="inline mr-1" /> Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      
                      {/* Top labels */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border font-mono flex items-center gap-1 ${
                          isReward 
                            ? 'bg-[#f4ebd0] text-[#7a6435] border-[#dfd4b8]' 
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {isReward ? <Trophy size={10} /> : <ShieldAlert size={10} />}
                          <span>{isReward ? 'Apresiasi (Reward)' : 'Kedisiplinan (Sanksi)'}</span>
                        </span>
                        
                        <span className="text-[10px] text-natural-muted font-mono flex items-center gap-1">
                          <Calendar size={11} />
                          {rec.date}
                        </span>
                      </div>

                      {/* Student metadata */}
                      <div>
                        <h4 className="font-serif font-bold text-natural-text text-sm">{rec.studentName}</h4>
                        <span className="text-[11px] font-bold text-natural-text bg-[#edeae1] px-2 py-0.5 rounded font-mono">
                          Kelas {rec.classRoom}
                        </span>
                      </div>

                      {/* Content block */}
                      <div className="space-y-2.5">
                        <div>
                          <span className="text-[10px] font-bold text-natural-muted uppercase tracking-wide">
                            {isReward ? 'Pencapaian / Perilaku Terpuji' : 'Jenis Pelanggaran Tata Tertib'}
                          </span>
                          <p className="text-xs text-natural-text leading-relaxed font-medium mt-1">
                            {rec.behaviorOrAchievement}
                          </p>
                        </div>
                        
                        <div className={`p-3 rounded-xl border ${
                          isReward 
                            ? 'bg-[#fbf9f4] border-[#dfd4b8]/50 text-[#7a6435]' 
                            : 'bg-red-50/40 border-red-200/65 text-red-900'
                        }`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider block">
                            {isReward ? 'Hadiah / Penghargaan:' : 'Pembinaan / Sanksi Mendidik:'}
                          </span>
                          <p className="text-xs font-bold leading-relaxed mt-1">
                            {rec.consequenceOrReward}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Card Actions & Footer */}
                    <div className="mt-4 pt-3 border-t border-natural-border-light/50 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-natural-muted">
                        Diproses oleh: <strong className="text-natural-text">{rec.officerInCharge}</strong>
                      </span>

                      <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleStartEdit(rec)}
                          title="Edit Catatan"
                          className="p-1 text-natural-muted hover:text-natural-primary hover:bg-natural-light/60 rounded transition-colors cursor-pointer"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(rec.id)}
                          title="Hapus Catatan"
                          className="p-1 text-natural-muted hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Islam Guideline Box */}
      <div className="bg-natural-light/40 border border-natural-border-light p-4 rounded-xl text-xs text-natural-text leading-relaxed">
        💡 <strong>Panduan Sekolah Fullday:</strong> Sanksi harus mendidik dan bernilai ibadah (seperti merapikan buku perpustakaan, menyiram taman, merapikan barisan shaf shalat, menyetorkan hafalan doa harian/ayat Al-Qur&apos;an). Tidak diperkenankan melakukan hukuman fisik atau kekerasan verbal.
      </div>

    </div>
  );
}
