import React, { useState } from 'react';
import { MonitoringRecord, Jabatan, Qism } from '../types';
import { Plus, Trash, Edit2, Check, X, BookOpen, Calendar, Filter, Star, Clipboard } from 'lucide-react';

interface MonitoringSectionProps {
  records: MonitoringRecord[];
  jabatans: Jabatan[];
  qisms: Qism[];
  onAddRecord: (record: MonitoringRecord) => void;
  onUpdateRecord: (record: MonitoringRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export default function MonitoringSection({
  records,
  jabatans,
  qisms,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
}: MonitoringSectionProps) {
  // Filters
  const [filterType, setFilterType] = useState<string>('all');
  const [filterId, setFilterId] = useState<string>('all');

  // Add state
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    targetType: 'qism' as 'jabatan' | 'qism',
    targetId: '',
    monitoredAspect: '',
    status: 'Baik' as MonitoringRecord['status'],
    notes: '',
    actionTaken: '',
    monitoredBy: ''
  });

  // Automatically set targetId once qisms are available
  React.useEffect(() => {
    if (qisms.length > 0 && !formData.targetId) {
      setFormData(prev => ({ ...prev, targetId: qisms[0].id }));
    }
  }, [qisms, formData.targetId]);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<MonitoringRecord | null>(null);

  const getTargetLabel = (type: 'jabatan' | 'qism', id: string) => {
    if (type === 'jabatan') {
      return jabatans.find((j) => j.id === id)?.title || 'Pengurus OSIS';
    } else {
      return qisms.find((q) => q.id === id)?.title || 'Departemen Qism';
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.monitoredAspect.trim()) {
      alert('Aspek yang dimonitor wajib diisi!');
      return;
    }

    const newRecord: MonitoringRecord = {
      id: 'mon-' + Date.now(),
      date: formData.date,
      targetType: formData.targetType,
      targetId: formData.targetId || (formData.targetType === 'qism' ? qisms[0]?.id : jabatans[0]?.id) || '',
      monitoredAspect: formData.monitoredAspect.trim(),
      status: formData.status,
      notes: formData.notes.trim(),
      actionTaken: formData.actionTaken.trim(),
      monitoredBy: formData.monitoredBy.trim() || 'Evaluator OSIS'
    };

    onAddRecord(newRecord);
    setIsAdding(false);
    // Reset Form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      targetType: 'qism',
      targetId: qisms[0]?.id || '',
      monitoredAspect: '',
      status: 'Baik',
      notes: '',
      actionTaken: '',
      monitoredBy: ''
    });
  };

  const handleStartEdit = (rec: MonitoringRecord) => {
    setEditingId(rec.id);
    setEditFormData({ ...rec });
  };

  const handleSaveEdit = () => {
    if (!editFormData || !editFormData.monitoredAspect.trim()) {
      alert('Aspek monitoring wajib diisi!');
      return;
    }

    onUpdateRecord(editFormData);
    setEditingId(null);
    setEditFormData(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan monitoring ini secara permanen?')) {
      onDeleteRecord(id);
    }
  };

  const filteredRecords = records.filter((rec) => {
    const matchType = filterType === 'all' || rec.targetType === filterType;
    const matchId = filterId === 'all' || rec.targetId === filterId;
    return matchType && matchId;
  }).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-natural-border-light shadow-sm">
        <div>
          <h3 className="text-lg font-serif font-bold text-natural-text flex items-center gap-2">
            <BookOpen className="text-natural-primary" size={20} />
            <span>Buku Monitoring Pengurus & Qism</span>
          </h3>
          <p className="text-xs text-natural-muted">Evaluasi berkala mengenai mutu ibadah, kebersihan, bahasa, ketertiban, dan tindak lanjut perbaikan.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-natural-primary hover:bg-natural-primary-hover active:bg-[#2c3327] text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
        >
          {isAdding ? <X size={14} /> : <Plus size={14} />}
          <span>{isAdding ? 'Tutup Evaluasi' : 'Buat Evaluasi Baru'}</span>
        </button>
      </div>

      {/* Form: Add Record */}
      {isAdding && (
        <form onSubmit={handleSubmitAdd} className="bg-white p-6 rounded-2xl border border-natural-border-light shadow-md space-y-4 max-w-3xl animate-in fade-in slide-in-from-top-4 duration-200">
          <h4 className="font-serif font-bold text-natural-text text-sm border-b border-natural-border-light/60 pb-2">Formulir Buku Monitoring</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            {/* Tanggal */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Tanggal Evaluasi</label>
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
              <label className="block text-xs font-bold text-natural-muted mb-1">Kategori Evaluasi</label>
              <select
                value={formData.targetType}
                onChange={(e) => {
                  const val = e.target.value as 'jabatan' | 'qism';
                  const defaultId = val === 'jabatan' ? (jabatans[0]?.id || '') : (qisms[0]?.id || '');
                  setFormData({ ...formData, targetType: val, targetId: defaultId });
                }}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white"
              >
                <option value="qism">Bidang Departemen (Qism)</option>
                <option value="jabatan">Jabatan Pengurus Inti</option>
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

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Predikat / Hasil Kerja</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as MonitoringRecord['status'] })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white"
              >
                <option value="Sangat Baik">🟢 Sangat Baik</option>
                <option value="Baik">🔵 Baik</option>
                <option value="Cukup">🟡 Cukup</option>
                <option value="Kurang">🔴 Kurang</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Aspek yang dipantau */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Aspek / Kegiatan yang Dipantau</label>
              <input
                type="text"
                value={formData.monitoredAspect}
                onChange={(e) => setFormData({ ...formData, monitoredAspect: e.target.value })}
                placeholder="misal: Ketertiban Antrean Prasmanan / Disiplin Kerapian Peci"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
                required
              />
            </div>

            {/* Nama Evaluator */}
            <div>
              <label className="block text-xs font-bold text-natural-muted mb-1">Nama Pemantau / Pembina / Ketua</label>
              <input
                type="text"
                value={formData.monitoredBy}
                onChange={(e) => setFormData({ ...formData, monitoredBy: e.target.value })}
                placeholder="misal: Ust. Jundi Abdul Syahid, S.Pd. / Ketua OSIS"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              />
            </div>
          </div>

          {/* Temuan Evaluasi */}
          <div>
            <label className="block text-xs font-bold text-natural-muted mb-1">Catatan Hasil Pengamatan (Temuan Lapangan)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tuliskan temuan positif atau negatif yang terpantau secara jujur..."
              rows={3}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
            />
          </div>

          {/* Solusi & Tindak Lanjut */}
          <div>
            <label className="block text-xs font-bold text-natural-muted mb-1">Rekomendasi / Solusi Tindak Lanjut</label>
            <textarea
              value={formData.actionTaken}
              onChange={(e) => setFormData({ ...formData, actionTaken: e.target.value })}
              placeholder="Tuliskan solusi nyata agar ada perbaikan ke depannya..."
              rows={2}
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
              Simpan Evaluasi
            </button>
          </div>
        </form>
      )}

      {/* Saring Filter */}
      <div className="bg-white p-4 rounded-2xl border border-natural-border-light shadow-sm flex flex-col sm:flex-row gap-3 items-center">
        <span className="text-xs font-bold text-natural-text uppercase flex items-center gap-1 shrink-0">
          <Filter size={12} /> Saring:
        </span>
        <div className="flex flex-wrap gap-2 w-full">
          <button
            onClick={() => { setFilterType('all'); setFilterId('all'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              filterType === 'all'
                ? 'bg-natural-primary text-white border-natural-primary shadow-sm'
                : 'bg-natural-light/40 text-natural-text border-natural-border-light hover:bg-[#d6cfb7]'
            }`}
          >
            Semua Bidang
          </button>
          <button
            onClick={() => { setFilterType('qism'); setFilterId('all'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              filterType === 'qism' && filterId === 'all'
                ? 'bg-natural-primary text-white border-natural-primary shadow-sm'
                : 'bg-natural-light/40 text-natural-text border-natural-border-light hover:bg-[#d6cfb7]'
            }`}
          >
            Hanya Departemen (Qism)
          </button>
          <button
            onClick={() => { setFilterType('jabatan'); setFilterId('all'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              filterType === 'jabatan' && filterId === 'all'
                ? 'bg-natural-primary text-white border-natural-primary shadow-sm'
                : 'bg-natural-light/40 text-natural-text border-natural-border-light hover:bg-[#d6cfb7]'
            }`}
          >
            Hanya Pengurus Inti
          </button>
        </div>
      </div>

      {/* Monitoring Grid */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-natural-border-light">
          <p className="text-natural-muted text-sm">Tidak ada catatan evaluasi monitoring ditemukan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((rec) => {
            const isEditing = editingId === rec.id;

            // Status style
            let badgeStyle = 'bg-natural-light/40 text-natural-text border-natural-border-light';
            if (rec.status === 'Sangat Baik') badgeStyle = 'bg-natural-light text-natural-primary border-natural-border-light';
            else if (rec.status === 'Baik') badgeStyle = 'bg-[#e6ebdf] text-natural-primary border-[#cbd3c5]';
            else if (rec.status === 'Cukup') badgeStyle = 'bg-[#f4ebd0]/70 text-[#7a6435] border-[#dfd4b8]';
            else if (rec.status === 'Kurang') badgeStyle = 'bg-red-50 text-red-700 border-red-250';

            return (
              <div key={rec.id} className="bg-white p-5 rounded-2xl border border-natural-border-light shadow-sm hover:border-natural-border-dark/40 transition-all group">
                
                {isEditing && editFormData ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Aspek Monitoring</label>
                        <input
                          type="text"
                          value={editFormData.monitoredAspect}
                          onChange={(e) => setEditFormData({ ...editFormData, monitoredAspect: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-natural-muted uppercase">Predikat Evaluasi</label>
                        <select
                          value={editFormData.status}
                          onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as MonitoringRecord['status'] })}
                          className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                        >
                          <option value="Sangat Baik">Sangat Baik</option>
                          <option value="Baik">Baik</option>
                          <option value="Cukup">Cukup</option>
                          <option value="Kurang">Kurang</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-natural-muted uppercase">Temuan Hasil Pengamatan</label>
                      <textarea
                        value={editFormData.notes}
                        onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                        rows={2}
                        className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-natural-muted uppercase">Solusi / Tindak Lanjut</label>
                      <textarea
                        value={editFormData.actionTaken}
                        onChange={(e) => setEditFormData({ ...editFormData, actionTaken: e.target.value })}
                        rows={2}
                        className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-natural-muted uppercase">Nama Evaluator</label>
                      <input
                        type="text"
                        value={editFormData.monitoredBy}
                        onChange={(e) => setEditFormData({ ...editFormData, monitoredBy: e.target.value })}
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase bg-natural-light/70 text-natural-primary px-2.5 py-0.5 rounded border border-natural-border-light/60 font-mono">
                          {getTargetLabel(rec.targetType, rec.targetId)}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border font-mono ${badgeStyle}`}>
                          ★ {rec.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-natural-muted font-mono flex items-center gap-1">
                        <Calendar size={11} />
                        {rec.date}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-natural-text text-sm flex items-center gap-1.5">
                        <Clipboard size={14} className="text-natural-primary" />
                        <span>{rec.monitoredAspect}</span>
                      </h4>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f7f5ee] p-4 rounded-xl border border-natural-border-light">
                        <div>
                          <span className="text-[10px] font-bold text-natural-muted uppercase tracking-wide">Temuan Hasil Pemantauan</span>
                          <p className="text-xs text-natural-text mt-1 leading-relaxed">{rec.notes || 'Nihil temuan khusus'}</p>
                        </div>
                        <div className="border-t md:border-t-0 md:border-l border-natural-border-light/60 pt-3 md:pt-0 md:pl-4">
                          <span className="text-[10px] font-bold text-natural-primary uppercase tracking-wide">Tindak Lanjut & Solusi</span>
                          <p className="text-xs text-natural-text mt-1 leading-relaxed font-medium">{rec.actionTaken || 'Belum memerlukan tindak lanjut khusus'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-natural-border-light/50">
                      <span className="text-[10px] text-natural-muted font-medium">
                        Dievaluasi oleh: <strong className="text-natural-text">{rec.monitoredBy}</strong>
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

    </div>
  );
}
