import React, { useState } from 'react';
import { Jabatan, Task } from '../types';
import LucideIcon from './LucideIcon';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Shield, 
  Award, 
  UserPlus, 
  CheckCircle,
  Briefcase
} from 'lucide-react';

interface JabatanSectionProps {
  jabatans: Jabatan[];
  onAddJabatan: (newJabatan: Jabatan) => void;
  onUpdateJabatan: (updated: Jabatan) => void;
  onDeleteJabatan: (id: string) => void;
}

export default function JabatanSection({ 
  jabatans = [], 
  onAddJabatan, 
  onUpdateJabatan, 
  onDeleteJabatan 
}: JabatanSectionProps) {
  const [selectedGender, setSelectedGender] = useState<'ikhwan' | 'akhwat'>('ikhwan');
  const [selectedId, setSelectedId] = useState<string>('ketua_ikhwan');
  
  // For tasks editing
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>('');
  const [newTaskText, setNewTaskText] = useState<string>('');

  // --- NEW: Unified & Paten Manage State ---
  const [isAddingNewPos, setIsAddingNewPos] = useState<boolean>(false);
  const [newPosTitle, setNewPosTitle] = useState<string>('');
  const [newPosOfficer, setNewPosOfficer] = useState<string>('');
  const [newPosDesc, setNewPosDesc] = useState<string>('');

  // Inline Row Editor for Each Position to guarantee independent editing & saving
  const [editingPosId, setEditingPosId] = useState<string | null>(null);
  const [editPosTitle, setEditPosTitle] = useState<string>('');
  const [editPosOfficer, setEditPosOfficer] = useState<string>('');
  const [editPosDesc, setEditPosDesc] = useState<string>('');

  const filteredJabatans = jabatans.filter((j) => j.gender === selectedGender);

  const activeId = filteredJabatans.some((j) => j.id === selectedId)
    ? selectedId
    : (filteredJabatans[0]?.id || '');

  const currentJabatan = jabatans.find((j) => j.id === activeId) || filteredJabatans[0] || jabatans[0];

  const handleSelectGender = (gender: 'ikhwan' | 'akhwat') => {
    setSelectedGender(gender);
    const items = jabatans.filter((j) => j.gender === gender);
    if (items.length > 0) {
      setSelectedId(items[0].id);
    }
    setEditingTaskId(null);
    setNewTaskText('');
    setEditingPosId(null);
    setIsAddingNewPos(false);
  };

  const handleSelectJabatan = (id: string) => {
    setSelectedId(id);
    setEditingTaskId(null);
    setNewTaskText('');
  };

  // Row edit triggers
  const startEditPos = (j: Jabatan) => {
    setEditingPosId(j.id);
    setEditPosTitle(j.title);
    setEditPosOfficer(j.officerName);
    setEditPosDesc(j.description);
  };

  const cancelEditPos = () => {
    setEditingPosId(null);
  };

  // Paten Save Button handler
  const savePosRow = (id: string) => {
    if (!editPosTitle.trim()) {
      alert('Nama jabatan tidak boleh kosong!');
      return;
    }
    const orig = jabatans.find((j) => j.id === id);
    if (!orig) return;

    onUpdateJabatan({
      ...orig,
      title: editPosTitle.trim(),
      officerName: editPosOfficer.trim() || 'Belum diisi',
      description: editPosDesc.trim() || ''
    });
    setEditingPosId(null);
  };

  const deletePosRow = (id: string) => {
    const orig = jabatans.find((j) => j.id === id);
    if (!orig) return;

    if (window.confirm(`Apakah Anda yakin ingin menghapus jabatan "${orig.title}" beserta seluruh daftar tugas utamanya secara permanen?`)) {
      onDeleteJabatan(id);
      // Select another tab
      const remaining = jabatans.filter((j) => j.id !== id && j.gender === selectedGender);
      if (remaining.length > 0) {
        setSelectedId(remaining[0].id);
      } else {
        setSelectedId('');
      }
    }
  };

  const handleAddNewPosition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPosTitle.trim()) {
      alert('Nama jabatan wajib diisi!');
      return;
    }

    const newJ: Jabatan = {
      id: 'jabatan-' + Date.now(),
      title: newPosTitle.trim(),
      officerName: newPosOfficer.trim() || 'Belum diisi',
      description: newPosDesc.trim() || 'Tugas dan tanggung jawab peranan.',
      iconName: 'Shield',
      gender: selectedGender,
      tasks: [
        { id: 'task-def-1', text: 'Melaksanakan tugas pokok koordinasi organisasi.' }
      ]
    };

    onAddJabatan(newJ);
    setSelectedId(newJ.id);
    setIsAddingNewPos(false);
    // Reset Form
    setNewPosTitle('');
    setNewPosOfficer('');
    setNewPosDesc('');
  };

  // Task CRUD operations
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: 'task-' + Date.now(),
      text: newTaskText.trim()
    };

    onUpdateJabatan({
      ...currentJabatan,
      tasks: [...currentJabatan.tasks, newTask]
    });
    setNewTaskText('');
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTaskText(task.text);
  };

  const saveTask = (taskId: string) => {
    if (!editedTaskText.trim()) return;
    
    const updatedTasks = currentJabatan.tasks.map((t) => 
      t.id === taskId ? { ...t, text: editedTaskText.trim() } : t
    );

    onUpdateJabatan({
      ...currentJabatan,
      tasks: updatedTasks
    });
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas utama ini?')) {
      const updatedTasks = currentJabatan.tasks.filter((t) => t.id !== taskId);
      onUpdateJabatan({
        ...currentJabatan,
        tasks: updatedTasks
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Gender Segregation Tab Selector */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-natural-border-light shadow-sm max-w-md">
        <button
          onClick={() => handleSelectGender('ikhwan')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedGender === 'ikhwan'
              ? 'bg-natural-primary text-white shadow-md font-bold'
              : 'text-natural-muted hover:bg-natural-light/40 hover:text-natural-text font-medium'
          }`}
        >
          <span>👨 OSIS Ikhwan</span>
        </button>
        <button
          onClick={() => handleSelectGender('akhwat')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedGender === 'akhwat'
              ? 'bg-natural-primary text-white shadow-md font-bold'
              : 'text-natural-muted hover:bg-natural-light/40 hover:text-natural-text font-medium'
          }`}
        >
          <span>👩 OSIS Akhwat</span>
        </button>
      </div>

      {/* --- NEW SECTION: Unified Paten Officer Management Card --- */}
      <div className="bg-white p-6 rounded-2xl border border-natural-border-light shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-natural-border-light pb-3">
          <div>
            <h3 className="font-serif font-bold text-natural-text text-base flex items-center gap-2">
              <Briefcase size={18} className="text-natural-primary" />
              <span>Daftar & Pengaturan Nama Pengurus OSIS ({selectedGender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'})</span>
            </h3>
            <p className="text-xs text-natural-muted">
              Gunakan tombol <strong>Simpan</strong> paten pada setiap baris untuk memperbarui nama pengurus secara mandiri tanpa memengaruhi posisi lainnya.
            </p>
          </div>
          {!isAddingNewPos && (
            <button
              onClick={() => setIsAddingNewPos(true)}
              className="flex items-center gap-1.5 px-4.5 py-2 bg-natural-primary hover:bg-natural-primary-hover text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <UserPlus size={14} />
              <span>Tambah Jabatan Baru</span>
            </button>
          )}
        </div>

        {/* Add New Position Form */}
        {isAddingNewPos && (
          <form onSubmit={handleAddNewPosition} className="p-4 bg-stone-50 border border-natural-border-light rounded-xl space-y-3 max-w-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <span className="text-xs font-bold text-natural-primary uppercase">Form Jabatan Baru ({selectedGender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'})</span>
              <button
                type="button"
                onClick={() => setIsAddingNewPos(false)}
                className="text-natural-muted hover:text-natural-text"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Nama Jabatan/Peran</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Humas (Ikhwan), Divisi Minat..."
                  value={newPosTitle}
                  onChange={(e) => setNewPosTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Nama Pengurus</label>
                <input
                  type="text"
                  placeholder="Nama Siswa..."
                  value={newPosOfficer}
                  onChange={(e) => setNewPosOfficer(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Deskripsi Ringkas Peran</label>
              <input
                type="text"
                placeholder="Tulis tanggung jawab utama..."
                value={newPosDesc}
                onChange={(e) => setNewPosDesc(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsAddingNewPos(false)}
                className="px-3.5 py-1.5 border border-natural-border-light rounded-lg text-xs font-bold hover:bg-stone-200/50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-natural-primary hover:bg-natural-primary-hover text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Simpan Jabatan
              </button>
            </div>
          </form>
        )}

        {/* List of Officers with independent editors */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredJabatans.length === 0 ? (
            <div className="text-center py-6 text-natural-muted text-xs">Belum ada jabatan terdaftar untuk kategori ini.</div>
          ) : (
            filteredJabatans.map((j) => {
              const isRowEditing = editingPosId === j.id;
              return (
                <div 
                  key={j.id} 
                  className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isRowEditing 
                      ? 'bg-[#fdfcf9] border-natural-primary shadow-sm' 
                      : 'bg-white border-stone-200 hover:border-natural-border-dark/30'
                  }`}
                >
                  {isRowEditing ? (
                    // Inline editor inputs with absolute control
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-natural-muted uppercase">Nama Jabatan</label>
                        <input
                          type="text"
                          value={editPosTitle}
                          onChange={(e) => setEditPosTitle(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-xs border border-natural-border-dark rounded bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-natural-muted uppercase">Nama Pengurus (Siswa)</label>
                        <input
                          type="text"
                          value={editPosOfficer}
                          onChange={(e) => setEditPosOfficer(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-xs border border-natural-border-dark rounded bg-white font-semibold text-natural-primary"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-[9px] font-bold text-natural-muted uppercase">Deskripsi Ringkas</label>
                        <input
                          type="text"
                          value={editPosDesc}
                          onChange={(e) => setEditPosDesc(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-xs border border-natural-border-dark rounded bg-white text-natural-muted"
                        />
                      </div>
                    </div>
                  ) : (
                    // View Row
                    <div className="flex-1 flex gap-3 items-center min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 text-natural-primary flex items-center justify-center shrink-0">
                        <LucideIcon name={j.iconName} size={16} />
                      </div>
                      <div className="min-w-0 flex-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center">
                        <div className="truncate">
                          <p className="text-xs font-bold text-natural-text truncate">{j.title}</p>
                          <span className="text-[10px] text-natural-muted">ID: {j.id}</span>
                        </div>
                        <div className="truncate bg-natural-light/50 px-2.5 py-1 rounded-lg border border-natural-border-light/65 inline-block sm:block max-w-fit">
                          <span className="text-xs font-extrabold text-natural-primary truncate">👤 {j.officerName}</span>
                        </div>
                        <p className="text-[11px] text-natural-muted truncate hidden sm:block">{j.description}</p>
                      </div>
                    </div>
                  )}

                  {/* Row Actions */}
                  <div className="flex gap-2 justify-end shrink-0">
                    {isRowEditing ? (
                      <>
                        <button
                          onClick={() => savePosRow(j.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm"
                        >
                          <Check size={13} />
                          <span>Simpan</span>
                        </button>
                        <button
                          onClick={cancelEditPos}
                          className="flex items-center gap-1 px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-natural-text text-xs font-semibold rounded-lg cursor-pointer"
                        >
                          <X size={13} />
                          <span>Batal</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditPos(j)}
                          className="flex items-center gap-1 px-2.5 py-1.5 border border-natural-border-light hover:border-natural-primary text-natural-muted hover:text-natural-primary text-xs font-bold rounded-lg cursor-pointer transition-colors bg-white"
                        >
                          <Edit2 size={11} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deletePosRow(j.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 border border-natural-border-light hover:border-red-600 text-natural-muted hover:text-red-600 text-xs font-bold rounded-lg cursor-pointer transition-colors bg-white"
                        >
                          <Trash2 size={11} />
                          <span>Hapus</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Tab Selector buttons */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase text-natural-primary tracking-wide block">Lihat Detail & Daftar Tugas Utama</span>
        <div className="flex flex-wrap gap-2">
          {filteredJabatans.map((j) => {
            const isActive = j.id === activeId;
            return (
              <button
                key={j.id}
                onClick={() => handleSelectJabatan(j.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer border ${
                  isActive
                    ? 'bg-natural-primary text-white border-natural-border-dark shadow-md transform -translate-y-0.5'
                    : 'bg-white hover:bg-natural-light/35 text-natural-text border-natural-border-light hover:border-natural-border-dark/60'
                }`}
              >
                <LucideIcon name={j.iconName} size={16} />
                <span>{j.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Detail Card */}
      {currentJabatan ? (
        <div className="bg-white rounded-2xl shadow-sm border border-natural-border-light overflow-hidden">
          
          {/* Banner with icon & title */}
          <div className="bg-natural-light/40 p-6 border-b border-natural-border-light/75">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-natural-primary text-white rounded-xl shadow-md">
                  <LucideIcon name={currentJabatan.iconName} size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-natural-text">{currentJabatan.title}</h3>
                  <div>
                    <span className="text-sm font-bold text-natural-primary bg-natural-light/60 px-3 py-1 rounded-full border border-natural-border-light/80">
                      Nama Pengurus: <strong className="text-natural-primary-hover font-extrabold">{currentJabatan.officerName}</strong>
                    </span>
                    <p className="text-xs text-natural-muted mt-2 max-w-2xl leading-relaxed">
                      {currentJabatan.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 10 Utama Tasks Section */}
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-natural-border-light/60 pb-3">
              <div>
                <h4 className="font-serif font-bold text-natural-text text-sm sm:text-base flex items-center gap-2">
                  <Shield size={16} className="text-natural-primary" />
                  <span>Tugas Utama {currentJabatan.title} ({currentJabatan.tasks.length})</span>
                </h4>
                <p className="text-xs text-natural-muted">Daftar tugas utama ini dapat diedit, dihapus, atau ditambah sesuai kebutuhan sekolah.</p>
              </div>
            </div>

            {/* New Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-2 max-w-xl">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder={`Tambah tugas utama baru untuk ${currentJabatan.title}...`}
                className="flex-1 px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 bg-natural-primary hover:bg-natural-primary-hover active:bg-[#2c3327] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus size={14} />
                <span>Tambah</span>
              </button>
            </form>

            {/* Tasks List */}
            {currentJabatan.tasks.length === 0 ? (
              <div className="text-center py-12 bg-natural-light/10 rounded-2xl border border-dashed border-natural-border-light">
                <p className="text-natural-muted text-xs">Belum ada tugas utama. Silakan tambahkan tugas baru di atas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentJabatan.tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className="p-4 rounded-xl border border-natural-border-light bg-natural-light/5 hover:bg-natural-light/20 hover:border-natural-border-dark/40 transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="flex gap-2.5 items-start flex-1">
                      <span className="w-5 h-5 rounded-full bg-natural-light text-natural-primary flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5 border border-natural-border-light">
                        {index + 1}
                      </span>
                      
                      {editingTaskId === task.id ? (
                        <div className="flex-1 space-y-1">
                          <input
                            type="text"
                            value={editedTaskText}
                            onChange={(e) => setEditedTaskText(e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-natural-border-dark rounded focus:outline-none focus:border-natural-primary bg-white"
                            autoFocus
                          />
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={() => saveTask(task.id)}
                              className="text-[10px] font-bold text-[#4b5e40] flex items-center gap-0.5 bg-natural-light px-2 py-0.5 rounded border border-natural-border-light cursor-pointer"
                            >
                              <Check size={10} /> Simpan
                            </button>
                            <button
                              onClick={() => setEditingTaskId(null)}
                              className="text-[10px] font-semibold text-natural-muted flex items-center gap-0.5 bg-natural-light/40 px-2 py-0.5 rounded cursor-pointer border border-natural-border-light/50"
                            >
                              <X size={10} /> Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-natural-text font-medium leading-relaxed">
                          {task.text}
                        </p>
                      )}
                    </div>

                    {editingTaskId !== task.id && (
                      <div className="flex gap-1 shrink-0 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditTask(task)}
                          title="Edit Tugas"
                          className="p-1 text-natural-muted hover:text-natural-primary hover:bg-natural-light/60 rounded transition-colors cursor-pointer"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          title="Hapus Tugas"
                          className="p-1 text-natural-muted hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-natural-border-light">
          <p className="text-natural-muted text-xs">Pilih atau tambah jabatan di atas.</p>
        </div>
      )}

    </div>
  );
}
