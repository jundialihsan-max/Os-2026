import React, { useState } from 'react';
import { DailyReport, Jabatan, Qism } from '../types';
import { Plus, Trash, Edit2, Check, X, FileText, Calendar, Filter, User } from 'lucide-react';

interface DailyReportsSectionProps {
  reports: DailyReport[];
  jabatans: Jabatan[];
  qisms: Qism[];
  onAddReport: (report: DailyReport) => void;
  onUpdateReport: (report: DailyReport) => void;
  onDeleteReport: (id: string) => void;
}

export default function DailyReportsSection({
  reports,
  jabatans,
  qisms,
  onAddReport,
  onUpdateReport,
  onDeleteReport,
}: DailyReportsSectionProps) {
  // Filter states
  const [filterType, setFilterType] = useState<string>('all');
  const [filterId, setFilterId] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');

  // Form states
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    targetType: 'jabatan' as 'jabatan' | 'qism',
    targetId: '',
    title: '',
    activityDetails: '',
    notes: '',
    reportedBy: ''
  });

  // Automatically set targetId once jabatans are available
  React.useEffect(() => {
    if (jabatans.length > 0 && !formData.targetId) {
      setFormData(prev => ({ ...prev, targetId: jabatans[0].id }));
    }
  }, [jabatans, formData.targetId]);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<DailyReport | null>(null);

  // Helper to get name of reporter targets
  const getTargetLabel = (type: 'jabatan' | 'qism', id: string) => {
    if (type === 'jabatan') {
      return jabatans.find((j) => j.id === id)?.title || 'Pengurus OSIS';
    } else {
      return qisms.find((q) => q.id === id)?.title || 'Departemen Qism';
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.activityDetails.trim()) {
      alert('Judul laporan dan detail kegiatan wajib diisi!');
      return;
    }

    const newReport: DailyReport = {
      id: 'rep-' + Date.now(),
      date: formData.date,
      targetType: formData.targetType,
      targetId: formData.targetId || (formData.targetType === 'jabatan' ? jabatans[0]?.id : qisms[0]?.id) || '',
      title: formData.title.trim(),
      activityDetails: formData.activityDetails.trim(),
      notes: formData.notes.trim(),
      reportedBy: formData.reportedBy.trim() || 'Hamba Allah'
    };

    onAddReport(newReport);
    setIsAdding(false);
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      targetType: 'jabatan',
      targetId: jabatans[0]?.id || '',
      title: '',
      activityDetails: '',
      notes: '',
      reportedBy: ''
    });
  };

  const handleStartEdit = (report: DailyReport) => {
    setEditingId(report.id);
    setEditFormData({ ...report });
  };

  const handleSaveEdit = () => {
    if (!editFormData || !editFormData.title.trim() || !editFormData.activityDetails.trim()) {
      alert('Judul laporan dan detail kegiatan wajib diisi!');
      return;
    }

    onUpdateReport(editFormData);
    setEditingId(null);
    setEditFormData(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus laporan harian ini secara permanen?')) {
      onDeleteReport(id);
    }
  };

  // Filtered reports
  const filteredReports = reports.filter((rep) => {
    const matchType = filterType === 'all' || rep.targetType === filterType;
    const matchId = filterId === 'all' || rep.targetId === filterId;
    const matchDate = !filterDate || rep.date === filterDate;
    return matchType && matchId && matchDate;
  }).sort((a, b) => b.date.localeCompare(a.date)); // Sort newer first

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-natural-border-light shadow-sm">
        <div>
          <h3 className="text-lg font-serif font-bold text-natural-text flex items-center gap-2">
            <FileText className="text-natural-primary" size={20} />
            <span>Laporan Harian OSIS & Qism</span>
          </h3>
          <p className="text-xs text-natural-muted">Formulir pencatatan harian untuk memantau aktivitas riil, kendala lapangan, serta tindak lanjut harian.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-natural-primary hover:bg-natural-primary-hover active:bg-[#2c3327] text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
        >
          {isAdding ? <X size={14} /> : <Plus size={14} />}
          <span>{isAdding ? 'Tutup Formulir' : 'Tulis Laporan Baru'}</span>
        </button>
      </div>

      {/* Form: Add New Report */}
      {isAdding && (
        <form onSubmit={handleSubmitAdd} className="bg-white p-6 rounded-2xl border border-natural-border-light shadow-md space-y-4 max-w-3xl animate-in fade-in slide-in-from-top-4 duration-200">
          <h4 className="font-serif font-bold text-natural-text text-sm border-b border-natural-border-light/60 pb-2">Formulir Laporan Baru</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Tanggal */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Tanggal Kegiatan</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
                required
              />
            </div>

            {/* Target Tipe */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Kategori Pelapor</label>
              <select
                value={formData.targetType}
                onChange={(e) => {
                  const val = e.target.value as 'jabatan' | 'qism';
                  const defaultId = val === 'jabatan' ? (jabatans[0]?.id || '') : (qisms[0]?.id || '');
                  setFormData({ ...formData, targetType: val, targetId: defaultId });
                }}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white"
              >
                <option value="jabatan">Jabatan Pengurus Inti</option>
                <option value="qism">Bidang Departemen (Qism)</option>
              </select>
            </div>

            {/* Target ID */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Nama Jabatan / Qism</label>
              <select
                value={formData.targetId}
                onChange={(e) => setFormData({ ...formData, targetId: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white"
              >
                {formData.targetType === 'jabatan' ? (
                  jabatans.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)
                ) : (
                  qisms.map((q) => <option key={q.id} value={q.id}>{q.title}</option>)
                )}
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Judul */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Judul Laporan</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="misal: Pelaksanaan Shalat Ashar Berjamaah"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
                required
              />
            </div>

            {/* Nama Pelapor */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Nama Pembuat Laporan</label>
              <input
                type="text"
                value={formData.reportedBy}
                onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                placeholder="Nama Anda..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              />
            </div>
          </div>

          {/* Detail Kegiatan */}
          <div>
            <label className="block text-xs font-bold text-natural-muted mb-1">Detail Kegiatan / Hasil Lapangan</label>
            <textarea
              value={formData.activityDetails}
              onChange={(e) => setFormData({ ...formData, activityDetails: e.target.value })}
              placeholder="Deskripsikan secara detail jalannya kegiatan, hasil pencapaian, jumlah peserta, atau kondisi riil di lapangan..."
              rows={4}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              required
            />
          </div>

          {/* Catatan / Hambatan */}
          <div>
            <label className="block text-xs font-bold text-natural-muted mb-1">Hambatan / Catatan Evaluasi (Opsional)</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="misal: Ada kendala mic masjid mati saat kultum"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
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
              Simpan Laporan
            </button>
          </div>
        </form>
      )}

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl border border-natural-border-light shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-natural-text uppercase flex items-center gap-1.5">
          <Filter size={14} />
          <span>Saring Laporan</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div>
            <label className="block text-[10px] font-bold text-natural-muted mb-0.5">Kategori</label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterId('all');
              }}
              className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
            >
              <option value="all">Semua Kategori</option>
              <option value="jabatan">Jabatan Pengurus Inti</option>
              <option value="qism">Bidang Departemen (Qism)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-natural-muted mb-0.5">Nama Bidang</label>
            <select
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
              disabled={filterType === 'all'}
              className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white disabled:bg-natural-light/10"
            >
              <option value="all">Semua Jabatan/Qism</option>
              {filterType === 'jabatan' && (
                jabatans.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)
              )}
              {filterType === 'qism' && (
                qisms.map((q) => <option key={q.id} value={q.id}>{q.title}</option>)
              )}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-natural-muted mb-0.5">Saring Berdasarkan Tanggal</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
              />
              {filterDate && (
                <button
                  type="button"
                  onClick={() => setFilterDate('')}
                  className="px-2 py-1.5 text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg cursor-pointer"
                >
                  Bersih
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-natural-border-light">
            <p className="text-natural-muted text-sm">Tidak ada laporan harian yang cocok dengan kriteria saringan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.map((rep) => {
              const isEditing = editingId === rep.id;

              return (
                <div key={rep.id} className="bg-white p-5 rounded-2xl border border-natural-border-light hover:border-natural-border-dark/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                  
                  {isEditing && editFormData ? (
                    <div className="space-y-3 flex-1">
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Judul Laporan</label>
                        <input
                          type="text"
                          value={editFormData.title}
                          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-dark rounded-lg focus:outline-none focus:border-natural-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Detail Kegiatan</label>
                        <textarea
                          value={editFormData.activityDetails}
                          onChange={(e) => setEditFormData({ ...editFormData, activityDetails: e.target.value })}
                          rows={3}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-dark rounded-lg focus:outline-none focus:border-natural-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Hambatan / Catatan</label>
                        <input
                          type="text"
                          value={editFormData.notes}
                          onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-dark rounded-lg focus:outline-none focus:border-natural-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Pelapor</label>
                        <input
                          type="text"
                          value={editFormData.reportedBy}
                          onChange={(e) => setEditFormData({ ...editFormData, reportedBy: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-dark rounded-lg focus:outline-none focus:border-natural-primary"
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
                    <>
                      {/* View Mode */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold uppercase bg-natural-light/70 text-natural-primary px-2.5 py-0.5 rounded border border-natural-border-light/60 font-mono">
                            {getTargetLabel(rep.targetType, rep.targetId)}
                          </span>
                          <span className="text-[10px] text-natural-muted font-mono flex items-center gap-1">
                            <Calendar size={10} />
                            {rep.date}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-serif font-bold text-natural-text text-sm leading-snug">{rep.title}</h4>
                          <p className="text-xs text-natural-muted mt-2 whitespace-pre-wrap leading-relaxed">
                            {rep.activityDetails}
                          </p>
                        </div>

                        {rep.notes && (
                          <div className="p-2.5 bg-[#edeae1]/60 border border-natural-border-light/70 rounded-xl text-[11px] text-natural-text">
                            <strong>Hambatan/Evaluasi:</strong> {rep.notes}
                          </div>
                        )}
                      </div>

                      {/* Footer Info */}
                      <div className="mt-4 pt-3 border-t border-natural-border-light/50 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-natural-muted flex items-center gap-1">
                          <User size={11} />
                          <span>Oleh: <strong className="text-natural-text">{rep.reportedBy}</strong></span>
                        </span>

                        <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleStartEdit(rep)}
                            title="Edit Laporan"
                            className="p-1 text-natural-muted hover:text-natural-primary hover:bg-natural-light/60 rounded transition-colors cursor-pointer"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(rep.id)}
                            title="Hapus Laporan"
                            className="p-1 text-natural-muted hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash size={12} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
