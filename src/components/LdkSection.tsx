import React, { useState } from 'react';
import { LdkChapter } from '../types';
import { 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Compass, 
  Flag, 
  CheckSquare, 
  BookMarked 
} from 'lucide-react';

interface LdkSectionProps {
  chapters: LdkChapter[];
  onAddChapter: (chapter: LdkChapter) => void;
  onUpdateChapter: (chapter: LdkChapter) => void;
  onDeleteChapter: (id: string) => void;
}

export default function LdkSection({ 
  chapters = [], 
  onAddChapter, 
  onUpdateChapter, 
  onDeleteChapter 
}: LdkSectionProps) {
  // Sort chapters by chapterNumber
  const sortedChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);

  const [selectedId, setSelectedId] = useState<string>(sortedChapters[0]?.id || '');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    chapterNumber: 1,
    objective: '',
    characteristicsText: '', // split by newline
    content: '',
    fieldImplementation: ''
  });

  const activeId = sortedChapters.some(c => c.id === selectedId)
    ? selectedId
    : (sortedChapters[0]?.id || '');

  const currentChapter = sortedChapters.find(c => c.id === activeId);

  const resetForm = () => {
    setFormData({
      title: '',
      chapterNumber: chapters.length > 0 ? Math.max(...chapters.map(c => c.chapterNumber)) + 1 : 1,
      objective: '',
      characteristicsText: '',
      content: '',
      fieldImplementation: ''
    });
  };

  const startAdd = () => {
    resetForm();
    setIsAdding(true);
    setIsEditing(false);
  };

  const startEdit = (ch: LdkChapter) => {
    setFormData({
      title: ch.title,
      chapterNumber: ch.chapterNumber,
      objective: ch.objective,
      characteristicsText: ch.characteristics.join('\n'),
      content: ch.content,
      fieldImplementation: ch.fieldImplementation
    });
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const chars = formData.characteristicsText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (isAdding) {
      const newCh: LdkChapter = {
        id: 'ldk-ch-' + Date.now(),
        chapterNumber: Number(formData.chapterNumber),
        title: formData.title.trim(),
        objective: formData.objective.trim(),
        characteristics: chars,
        content: formData.content.trim(),
        fieldImplementation: formData.fieldImplementation.trim()
      };
      onAddChapter(newCh);
      setSelectedId(newCh.id);
      setIsAdding(false);
    } else if (isEditing && currentChapter) {
      const updatedCh: LdkChapter = {
        ...currentChapter,
        chapterNumber: Number(formData.chapterNumber),
        title: formData.title.trim(),
        objective: formData.objective.trim(),
        characteristics: chars,
        content: formData.content.trim(),
        fieldImplementation: formData.fieldImplementation.trim()
      };
      onUpdateChapter(updatedCh);
      setIsEditing(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus bab materi LDK ini secara permanen?')) {
      onDeleteChapter(id);
      // Select another chapter if any
      const remaining = sortedChapters.filter(c => c.id !== id);
      if (remaining.length > 0) {
        setSelectedId(remaining[0].id);
      } else {
        setSelectedId('');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-natural-border-light shadow-sm">
        <div className="space-y-1">
          <h2 className="font-serif font-bold text-natural-text text-xl sm:text-2xl flex items-center gap-2">
            <BookMarked className="text-natural-primary" size={24} />
            <span>Kurikulum & Materi LDK OSIS</span>
          </h2>
          <p className="text-xs sm:text-sm text-natural-muted max-w-2xl">
            Panduan kepemimpinan dasar (Latihan Dasar Kepemimpinan) yang dirancang khusus untuk membekali pengurus OSIS dengan integritas Rabbani, kompetensi manajerial, dan kecakapan aksi nyata di lapangan.
          </p>
        </div>
        {!isAdding && !isEditing && (
          <button
            onClick={startAdd}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-natural-primary hover:bg-natural-primary-hover active:bg-[#2c3327] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Tambah Bab Baru</span>
          </button>
        )}
      </div>

      {/* Editor or Creator Form */}
      {(isAdding || isEditing) ? (
        <div className="bg-white p-6 rounded-2xl border border-natural-border-light shadow-sm">
          <div className="flex items-center justify-between border-b border-natural-border-light pb-4 mb-5">
            <h3 className="font-serif font-bold text-natural-text text-base sm:text-lg flex items-center gap-2">
              <BookOpen className="text-natural-primary" size={20} />
              <span>{isAdding ? 'Buat Bab Materi LDK Baru' : `Sunting Bab ${formData.chapterNumber}`}</span>
            </h3>
            <button
              onClick={() => {
                setIsAdding(false);
                setIsEditing(false);
              }}
              className="p-1.5 hover:bg-natural-light/40 rounded-lg text-natural-muted hover:text-natural-text transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">No. Bab</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.chapterNumber}
                  onChange={(e) => setFormData({ ...formData, chapterNumber: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/15"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Judul Bab Materi</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Manajemen Konflik & Pengambilan Keputusan..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/15"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Tujuan Pembelajaran (Objective)</label>
              <textarea
                rows={2}
                required
                placeholder="Tuliskan tujuan spesifik dan terukur bab ini yang siap diimplementasikan..."
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/15"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1 flex items-center justify-between">
                <span>Karakteristik Pemimpin yang Diharapkan</span>
                <span className="text-[9px] font-normal text-natural-muted lowercase">pisahkan dengan baris baru (Enter)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Contoh:&#10;Memiliki visi akhirat&#10;Bersikap jujur dalam ucapan dan laporan kerja&#10;Memiliki integritas spiritual"
                value={formData.characteristicsText}
                onChange={(e) => setFormData({ ...formData, characteristicsText: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/15 font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Materi Utama (Sangat Panjang & Mendalam)</label>
              <textarea
                rows={10}
                required
                placeholder="Tuliskan isi materi kepemimpinan dasar yang komprehensif..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/15 font-sans leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Langkah Implementasi Nyata di Lapangan</label>
              <textarea
                rows={3}
                required
                placeholder="Langkah taktis yang wajib dipraktikkan langsung di lingkungan sekolah..."
                value={formData.fieldImplementation}
                onChange={(e) => setFormData({ ...formData, fieldImplementation: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/15 font-sans"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-natural-border-light">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(false);
                }}
                className="px-4.5 py-2 border border-natural-border-light text-natural-text text-xs font-bold rounded-xl hover:bg-natural-light/40 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-natural-primary hover:bg-natural-primary-hover text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Check size={14} />
                <span>Simpan Materi</span>
              </button>
            </div>
          </form>
        </div>
      ) : sortedChapters.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-natural-border-light shadow-sm">
          <BookOpen size={48} className="mx-auto text-natural-muted mb-3 opacity-60" />
          <h3 className="font-serif font-bold text-natural-text text-base">Belum Ada Materi LDK</h3>
          <p className="text-xs text-natural-muted mt-1 max-w-md mx-auto">Silakan tambahkan bab materi dasar kepemimpinan pertama untuk melatih pengurus OSIS.</p>
          <button
            onClick={startAdd}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-natural-primary hover:bg-natural-primary-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Tambah Bab Pertama</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Navigation: List of Chapters */}
          <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-natural-border-light shadow-sm space-y-3 max-h-[600px] overflow-y-auto">
            <span className="text-[10px] font-extrabold uppercase text-natural-primary tracking-wide block px-1">Daftar Bab Kurikulum LDK</span>
            <div className="space-y-1.5">
              {sortedChapters.map((ch) => {
                const isActive = ch.id === activeId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedId(ch.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                      isActive
                        ? 'bg-natural-primary border-natural-primary text-white shadow-md'
                        : 'bg-white border-natural-border-light hover:border-natural-border-dark/45 text-natural-text hover:bg-natural-light/20'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isActive ? 'bg-white/15 text-white' : 'bg-natural-primary/10 text-natural-primary'
                    }`}>
                      {ch.chapterNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-natural-text'}`}>
                        {ch.title}
                      </p>
                      <p className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-white/80' : 'text-natural-muted'}`}>
                        {ch.objective}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Navigation: Chapter Content Viewer */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-natural-border-light shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            {currentChapter ? (
              <div>
                
                {/* Header of Content Viewer */}
                <div className="p-6 bg-natural-light/20 border-b border-natural-border-light/80 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-natural-primary/15 text-natural-primary text-[10px] font-extrabold rounded-full uppercase tracking-wide">
                        Bab {currentChapter.chapterNumber}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-natural-text text-base sm:text-lg lg:text-xl">
                      {currentChapter.title}
                    </h3>
                  </div>

                  {/* Actions: Edit, Delete */}
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => startEdit(currentChapter)}
                      title="Edit Bab"
                      className="p-2 text-natural-muted hover:text-natural-primary hover:bg-white rounded-xl border border-natural-border-light hover:shadow-sm transition-all cursor-pointer"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(currentChapter.id)}
                      title="Hapus Bab"
                      className="p-2 text-natural-muted hover:text-red-700 hover:bg-red-50 rounded-xl border border-natural-border-light hover:shadow-sm transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Body of Content Viewer */}
                <div className="p-6 space-y-6">
                  
                  {/* Objective Box */}
                  <div className="bg-[#fcfbf9] p-4 rounded-xl border border-natural-border-light flex gap-3 items-start">
                    <Compass className="text-natural-primary shrink-0 mt-0.5" size={18} />
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-natural-primary tracking-wider">Tujuan Implementasi Nyata</span>
                      <p className="text-xs sm:text-sm text-natural-text leading-relaxed font-sans font-medium">{currentChapter.objective}</p>
                    </div>
                  </div>

                  {/* Expected Characteristics Checklist */}
                  {currentChapter.characteristics && currentChapter.characteristics.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-natural-primary tracking-wider flex items-center gap-1.5">
                        <CheckSquare size={14} />
                        <span>Karakteristik Pemimpin yang Diharapkan</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentChapter.characteristics.map((c, idx) => (
                          <div key={idx} className="flex gap-2 items-start bg-natural-light/10 px-3.5 py-2.5 rounded-xl border border-natural-border-light/40">
                            <Check className="text-emerald-700 shrink-0 mt-0.5" size={14} />
                            <span className="text-xs text-natural-text font-semibold">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Content Paragraphs */}
                  <div className="space-y-3 pt-2 border-t border-natural-border-light/60">
                    <span className="text-[10px] font-extrabold uppercase text-natural-primary tracking-wider block">Materi Dasar Kepemimpinan</span>
                    <div className="text-xs sm:text-sm text-natural-text leading-relaxed whitespace-pre-line font-serif pr-2 max-h-[400px] overflow-y-auto bg-stone-50/40 p-4 rounded-xl border border-stone-100">
                      {currentChapter.content}
                    </div>
                  </div>

                  {/* Field Action Implementation */}
                  <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/65 flex gap-3 items-start mt-4">
                    <Flag className="text-emerald-800 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider">Implementasi Nyata di Lapangan</span>
                      <div className="text-xs sm:text-sm text-natural-text leading-relaxed whitespace-pre-line font-sans font-semibold">
                        {currentChapter.fieldImplementation}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-natural-muted">
                <BookOpen size={40} className="mb-2 opacity-50" />
                <p className="text-xs">Silakan pilih bab materi LDK di menu sebelah kiri untuk membaca pendalaman selengkapnya.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
