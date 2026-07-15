import React, { useState } from 'react';
import { Qism, Task, Agenda } from '../types';
import LucideIcon from './LucideIcon';
import { 
  Plus, 
  Trash, 
  Trash2,
  Edit2, 
  Check, 
  X, 
  Shield, 
  Calendar, 
  CheckSquare, 
  Clock,
  Layers,
  UserPlus,
  Users
} from 'lucide-react';

interface QismSectionProps {
  qisms: Qism[];
  onAddQism: (newQism: Qism) => void;
  onUpdateQism: (updated: Qism) => void;
  onDeleteQism: (id: string) => void;
}

export default function QismSection({ 
  qisms = [], 
  onAddQism, 
  onUpdateQism, 
  onDeleteQism 
}: QismSectionProps) {
  const [selectedGender, setSelectedGender] = useState<'ikhwan' | 'akhwat'>('ikhwan');
  const [selectedId, setSelectedId] = useState<string>('ibadah_ikhwan');
  const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'agendas' | 'members'>('tasks');

  // For tasks CRUD
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>('');
  const [newTaskText, setNewTaskText] = useState<string>('');

  // For agendas CRUD
  const [editingAgendaId, setEditingAgendaId] = useState<string | null>(null);
  const [editedAgendaTitle, setEditedAgendaTitle] = useState<string>('');
  const [editedAgendaDesc, setEditedAgendaDesc] = useState<string>('');
  const [editedAgendaStatus, setEditedAgendaStatus] = useState<Agenda['status']>('Belum Terlaksana');

  // For adding agenda
  const [newAgendaTitle, setNewAgendaTitle] = useState<string>('');
  const [newAgendaDesc, setNewAgendaDesc] = useState<string>('');

  // For members CRUD
  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null);
  const [editedMemberName, setEditedMemberName] = useState<string>('');
  const [newMemberName, setNewMemberName] = useState<string>('');

  // --- NEW: Unified & Paten Manage State ---
  const [isAddingNewQism, setIsAddingNewQism] = useState<boolean>(false);
  const [newQismTitle, setNewQismTitle] = useState<string>('');
  const [newQismOfficer, setNewQismOfficer] = useState<string>('');
  const [newQismDesc, setNewQismDesc] = useState<string>('');

  // Inline Row Editor for Each Qism to guarantee independent editing & saving
  const [editingQismId, setEditingQismId] = useState<string | null>(null);
  const [editQismTitle, setEditQismTitle] = useState<string>('');
  const [editQismOfficer, setEditQismOfficer] = useState<string>('');
  const [editQismDesc, setEditQismDesc] = useState<string>('');

  const filteredQisms = qisms.filter((q) => q.gender === selectedGender);

  const activeId = filteredQisms.some((q) => q.id === selectedId)
    ? selectedId
    : (filteredQisms[0]?.id || '');

  const currentQism = qisms.find((q) => q.id === activeId) || filteredQisms[0] || qisms[0];

  const handleSelectGender = (gender: 'ikhwan' | 'akhwat') => {
    setSelectedGender(gender);
    const items = qisms.filter((q) => q.gender === gender);
    if (items.length > 0) {
      setSelectedId(items[0].id);
    }
    setEditingTaskId(null);
    setEditingAgendaId(null);
    setEditingMemberIndex(null);
    setNewTaskText('');
    setNewAgendaTitle('');
    setNewAgendaDesc('');
    setNewMemberName('');
    setEditingQismId(null);
    setIsAddingNewQism(false);
  };

  const handleSelectQism = (id: string) => {
    setSelectedId(id);
    setEditingTaskId(null);
    setEditingAgendaId(null);
    setEditingMemberIndex(null);
    setNewTaskText('');
    setNewAgendaTitle('');
    setNewAgendaDesc('');
    setNewMemberName('');
  };

  // Row edit triggers
  const startEditQism = (q: Qism) => {
    setEditingQismId(q.id);
    setEditQismTitle(q.title);
    setEditQismOfficer(q.officerName);
    setEditQismDesc(q.description);
  };

  const cancelEditQism = () => {
    setEditingQismId(null);
  };

  // Paten Save Button handler
  const saveQismRow = (id: string) => {
    if (!editQismTitle.trim()) {
      alert('Nama bidang/qism tidak boleh kosong!');
      return;
    }
    const orig = qisms.find((q) => q.id === id);
    if (!orig) return;

    onUpdateQism({
      ...orig,
      title: editQismTitle.trim(),
      officerName: editQismOfficer.trim() || 'Belum ditentukan',
      description: editQismDesc.trim() || ''
    });
    setEditingQismId(null);
  };

  const deleteQismRow = (id: string) => {
    const orig = qisms.find((q) => q.id === id);
    if (!orig) return;

    if (window.confirm(`Apakah Anda yakin ingin menghapus bidang Qism "${orig.title}" beserta seluruh data tugas, agenda kerja, dan anggotanya secara permanen?`)) {
      onDeleteQism(id);
      // Select another tab
      const remaining = qisms.filter((q) => q.id !== id && q.gender === selectedGender);
      if (remaining.length > 0) {
        setSelectedId(remaining[0].id);
      } else {
        setSelectedId('');
      }
    }
  };

  const handleAddNewQism = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQismTitle.trim()) {
      alert('Nama bidang Qism wajib diisi!');
      return;
    }

    const newQ: Qism = {
      id: 'qism-' + Date.now(),
      title: newQismTitle.trim(),
      officerName: newQismOfficer.trim() || 'Belum ditentukan',
      description: newQismDesc.trim() || 'Tugas pokok dan fungsi bidang.',
      iconName: 'Layers',
      gender: selectedGender,
      tasks: [
        { id: 'task-q-1', text: 'Mengkoordinasikan program kerja sesuai dengan bidang departemen.' }
      ],
      agendas: [],
      members: []
    };

    onAddQism(newQ);
    setSelectedId(newQ.id);
    setIsAddingNewQism(false);
    // Reset Form
    setNewQismTitle('');
    setNewQismOfficer('');
    setNewQismDesc('');
  };

  // Member CRUD helpers
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const updatedMembers = [...(currentQism.members || []), newMemberName.trim()];

    onUpdateQism({
      ...currentQism,
      members: updatedMembers
    });
    setNewMemberName('');
  };

  const startEditMember = (index: number, name: string) => {
    setEditingMemberIndex(index);
    setEditedMemberName(name);
  };

  const saveMember = (index: number) => {
    if (!editedMemberName.trim()) return;

    const updatedMembers = [...(currentQism.members || [])];
    updatedMembers[index] = editedMemberName.trim();

    onUpdateQism({
      ...currentQism,
      members: updatedMembers
    });
    setEditingMemberIndex(null);
  };

  const handleDeleteMember = (index: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      const updatedMembers = (currentQism.members || []).filter((_, idx) => idx !== index);
      onUpdateQism({
        ...currentQism,
        members: updatedMembers
      });
    }
  };

  // Task CRUD
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: 'task-' + Date.now(),
      text: newTaskText.trim()
    };

    onUpdateQism({
      ...currentQism,
      tasks: [...currentQism.tasks, newTask]
    });
    setNewTaskText('');
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTaskText(task.text);
  };

  const saveTask = (taskId: string) => {
    if (!editedTaskText.trim()) return;

    const updatedTasks = currentQism.tasks.map((t) =>
      t.id === taskId ? { ...t, text: editedTaskText.trim() } : t
    );

    onUpdateQism({
      ...currentQism,
      tasks: updatedTasks
    });
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas utama ini?')) {
      const updatedTasks = currentQism.tasks.filter((t) => t.id !== taskId);
      onUpdateQism({
        ...currentQism,
        tasks: updatedTasks
      });
    }
  };

  // Agenda CRUD
  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgendaTitle.trim()) return;

    const newAgenda: Agenda = {
      id: 'agenda-' + Date.now(),
      title: newAgendaTitle.trim(),
      description: newAgendaDesc.trim() || 'Tidak ada catatan tambahan',
      isIslamic: true,
      status: 'Belum Terlaksana'
    };

    onUpdateQism({
      ...currentQism,
      agendas: [...currentQism.agendas, newAgenda]
    });
    setNewAgendaTitle('');
    setNewAgendaDesc('');
  };

  const startEditAgenda = (agenda: Agenda) => {
    setEditingAgendaId(agenda.id);
    setEditedAgendaTitle(agenda.title);
    setEditedAgendaDesc(agenda.description);
    setEditedAgendaStatus(agenda.status);
  };

  const saveAgenda = (agendaId: string) => {
    if (!editedAgendaTitle.trim()) return;

    const updatedAgendas = currentQism.agendas.map((a) =>
      a.id === agendaId
        ? {
            ...a,
            title: editedAgendaTitle.trim(),
            description: editedAgendaDesc.trim(),
            status: editedAgendaStatus
          }
        : a
    );

    onUpdateQism({
      ...currentQism,
      agendas: updatedAgendas
    });
    setEditingAgendaId(null);
  };

  const handleDeleteAgenda = (agendaId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus agenda kerja ini?')) {
      const updatedAgendas = currentQism.agendas.filter((a) => a.id !== agendaId);
      onUpdateQism({
        ...currentQism,
        agendas: updatedAgendas
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
          <span>👨 Qism Ikhwan</span>
        </button>
        <button
          onClick={() => handleSelectGender('akhwat')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedGender === 'akhwat'
              ? 'bg-natural-primary text-white shadow-md font-bold'
              : 'text-natural-muted hover:bg-natural-light/40 hover:text-natural-text font-medium'
          }`}
        >
          <span>👩 Qism Akhwat</span>
        </button>
      </div>

      {/* --- NEW SECTION: Unified Paten Qism Management Card --- */}
      <div className="bg-white p-6 rounded-2xl border border-natural-border-light shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-natural-border-light pb-3">
          <div>
            <h3 className="font-serif font-bold text-natural-text text-base flex items-center gap-2">
              <Layers size={18} className="text-natural-primary" />
              <span>Daftar & Pengaturan Ketua Qism OSIS ({selectedGender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'})</span>
            </h3>
            <p className="text-xs text-natural-muted">
              Gunakan tombol <strong>Simpan</strong> paten pada setiap baris untuk memperbarui nama koordinator secara mandiri tanpa memengaruhi Qism lainnya.
            </p>
          </div>
          {!isAddingNewQism && (
            <button
              onClick={() => setIsAddingNewQism(true)}
              className="flex items-center gap-1.5 px-4.5 py-2 bg-natural-primary hover:bg-natural-primary-hover text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <UserPlus size={14} />
              <span>Tambah Bidang Qism Baru</span>
            </button>
          )}
        </div>

        {/* Add New Qism Form */}
        {isAddingNewQism && (
          <form onSubmit={handleAddNewQism} className="p-4 bg-stone-50 border border-natural-border-light rounded-xl space-y-3 max-w-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <span className="text-xs font-bold text-natural-primary uppercase">Form Bidang Qism Baru ({selectedGender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'})</span>
              <button
                type="button"
                onClick={() => setIsAddingNewQism(false)}
                className="text-natural-muted hover:text-natural-text"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Nama Bidang Qism</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Qism Kesehatan, Qism Informasi..."
                  value={newQismTitle}
                  onChange={(e) => setNewQismTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Ketua Qism (Koordinator)</label>
                <input
                  type="text"
                  placeholder="Nama Siswa..."
                  value={newQismOfficer}
                  onChange={(e) => setNewQismOfficer(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-natural-muted uppercase mb-1">Deskripsi Ringkas Bidang</label>
              <input
                type="text"
                placeholder="Tulis tujuan bidang..."
                value={newQismDesc}
                onChange={(e) => setNewQismDesc(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-natural-border-light rounded-lg focus:outline-none focus:border-natural-primary bg-white"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsAddingNewQism(false)}
                className="px-3.5 py-1.5 border border-natural-border-light rounded-lg text-xs font-bold hover:bg-stone-200/50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-natural-primary hover:bg-natural-primary-hover text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Simpan Bidang
              </button>
            </div>
          </form>
        )}

        {/* List of Qisms with independent editors */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredQisms.length === 0 ? (
            <div className="text-center py-6 text-natural-muted text-xs">Belum ada departemen Qism terdaftar untuk kategori ini.</div>
          ) : (
            filteredQisms.map((q) => {
              const isRowEditing = editingQismId === q.id;
              return (
                <div 
                  key={q.id} 
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
                        <label className="block text-[9px] font-bold text-natural-muted uppercase">Nama Bidang Qism</label>
                        <input
                          type="text"
                          value={editQismTitle}
                          onChange={(e) => setEditQismTitle(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-xs border border-natural-border-dark rounded bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-natural-muted uppercase">Koordinator (Siswa)</label>
                        <input
                          type="text"
                          value={editQismOfficer}
                          onChange={(e) => setEditQismOfficer(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-xs border border-natural-border-dark rounded bg-white font-semibold text-natural-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-natural-muted uppercase">Deskripsi Ringkas</label>
                        <input
                          type="text"
                          value={editQismDesc}
                          onChange={(e) => setEditQismDesc(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-xs border border-natural-border-dark rounded bg-white text-natural-muted"
                        />
                      </div>
                    </div>
                  ) : (
                    // View Row
                    <div className="flex-1 flex gap-3 items-center min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 text-natural-primary flex items-center justify-center shrink-0">
                        <LucideIcon name={q.iconName} size={15} />
                      </div>
                      <div className="min-w-0 flex-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center">
                        <div className="truncate">
                          <p className="text-xs font-bold text-natural-text truncate">{q.title}</p>
                          <span className="text-[10px] text-natural-muted font-mono">ID: {q.id}</span>
                        </div>
                        <div className="truncate bg-natural-light/50 px-2.5 py-1 rounded-lg border border-natural-border-light/65 inline-block sm:block max-w-fit">
                          <span className="text-xs font-extrabold text-natural-primary truncate">👑 {q.officerName}</span>
                        </div>
                        <p className="text-[11px] text-natural-muted truncate hidden sm:block">{q.description}</p>
                      </div>
                    </div>
                  )}

                  {/* Row Actions */}
                  <div className="flex gap-2 justify-end shrink-0">
                    {isRowEditing ? (
                      <>
                        <button
                          onClick={() => saveQismRow(q.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm"
                        >
                          <Check size={13} />
                          <span>Simpan</span>
                        </button>
                        <button
                          onClick={cancelEditQism}
                          className="flex items-center gap-1 px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-natural-text text-xs font-semibold rounded-lg cursor-pointer"
                        >
                          <X size={13} />
                          <span>Batal</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditQism(q)}
                          className="flex items-center gap-1 px-2.5 py-1.5 border border-natural-border-light hover:border-natural-primary text-natural-muted hover:text-natural-primary text-xs font-bold rounded-lg cursor-pointer transition-colors bg-white"
                        >
                          <Edit2 size={11} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteQismRow(q.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 border border-natural-border-light hover:border-red-600 text-natural-muted hover:text-red-600 text-xs font-bold rounded-lg cursor-pointer transition-colors bg-white"
                        >
                          <Trash size={11} />
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

      {/* Qism horizontal tab list */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase text-natural-primary tracking-wide block">Lihat Detail Program & Anggota Qism</span>
        <div className="flex flex-wrap gap-2">
          {filteredQisms.map((q) => {
            const isActive = q.id === activeId;
            return (
              <button
                key={q.id}
                onClick={() => handleSelectQism(q.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border shadow-sm cursor-pointer ${
                  isActive
                    ? 'bg-natural-primary text-white border-natural-border-dark shadow-md transform -translate-y-0.5'
                    : 'bg-white hover:bg-natural-light/35 text-natural-text border-natural-border-light hover:border-natural-border-dark/60'
                }`}
              >
                <LucideIcon name={q.iconName} size={15} />
                <span>{q.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Qism Card */}
      {currentQism ? (
        <div className="bg-white rounded-2xl shadow-sm border border-natural-border-light overflow-hidden">
          
          {/* Top Meta info */}
          <div className="bg-natural-light/40 p-6 border-b border-natural-border-light/75">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-natural-primary text-white rounded-xl shadow-md">
                  <LucideIcon name={currentQism.iconName} size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-natural-text">{currentQism.title}</h3>
                  <div>
                    <span className="text-sm font-bold text-natural-primary bg-natural-light/60 px-3 py-1 rounded-full border border-natural-border-light/80">
                      Koordinator: <strong className="text-natural-primary-hover font-extrabold">{currentQism.officerName}</strong>
                    </span>
                    <p className="text-xs text-natural-muted mt-2 max-w-2xl leading-relaxed">
                      {currentQism.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation for Qism Details (Tasks / Agendas / Members) */}
          <div className="flex border-b border-natural-border-light/60 bg-stone-50 px-4">
            <button
              onClick={() => setActiveSubTab('tasks')}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'tasks'
                  ? 'border-natural-primary text-natural-primary font-bold'
                  : 'border-transparent text-natural-muted hover:text-natural-text'
              }`}
            >
              📋 Tugas Utama Qism
            </button>
            <button
              onClick={() => setActiveSubTab('agendas')}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'agendas'
                  ? 'border-natural-primary text-natural-primary font-bold'
                  : 'border-transparent text-natural-muted hover:text-natural-text'
              }`}
            >
              📅 Agenda & Proker (Qur'ani)
            </button>
            <button
              onClick={() => setActiveSubTab('members')}
              className={`px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeSubTab === 'members'
                  ? 'border-natural-primary text-natural-primary font-bold'
                  : 'border-transparent text-natural-muted hover:text-natural-text'
              }`}
            >
              👥 Anggota Bidang ({currentQism.members?.length || 0})
            </button>
          </div>

          {/* Subtab Contents */}
          <div className="p-6">
            
            {/* Subtab: Tasks */}
            {activeSubTab === 'tasks' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-natural-text text-sm sm:text-base flex items-center gap-2">
                    <Shield size={16} className="text-natural-primary" />
                    <span>Daftar Tugas Utama Bidang ({currentQism.tasks.length})</span>
                  </h4>
                  <p className="text-xs text-natural-muted">Tugas-tugas pokok yang harus dilakukan oleh pengurus bidang Qism.</p>
                </div>

                <form onSubmit={handleAddTask} className="flex gap-2 max-w-xl">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder={`Tambah tugas baru untuk ${currentQism.title}...`}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-natural-primary hover:bg-natural-primary-hover active:bg-[#2c3327] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus size={14} />
                    <span>Tambah</span>
                  </button>
                </form>

                {currentQism.tasks.length === 0 ? (
                  <div className="text-center py-12 bg-natural-light/10 rounded-2xl border border-dashed border-natural-border-light">
                    <p className="text-natural-muted text-xs">Belum ada tugas pokok. Silakan tambahkan tugas baru di atas.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQism.tasks.map((task, index) => (
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
                                  className="text-[10px] font-bold text-natural-primary flex items-center gap-0.5 bg-natural-light px-2 py-0.5 rounded border border-natural-border-light cursor-pointer"
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
            )}

            {/* Subtab: Agendas */}
            {activeSubTab === 'agendas' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-natural-text text-sm sm:text-base flex items-center gap-2">
                    <Calendar size={16} className="text-natural-primary" />
                    <span>Agenda Kerja Qism ({currentQism.agendas.length})</span>
                  </h4>
                  <p className="text-xs text-natural-muted">Program Kerja Riil berlandaskan nilai syari'at yang dikoordinasikan oleh Bidang ini.</p>
                </div>

                {/* Form Agenda baru */}
                <form onSubmit={handleAddAgenda} className="bg-natural-light/10 p-5 rounded-2xl border border-natural-border-light/65 space-y-3 max-w-xl">
                  <span className="text-[10px] font-extrabold uppercase text-natural-primary">Tambah Agenda Kerja Baru</span>
                  <div className="grid grid-cols-1 gap-2">
                    <input
                      type="text"
                      value={newAgendaTitle}
                      onChange={(e) => setNewAgendaTitle(e.target.value)}
                      placeholder="Nama Program Kerja (misal: Tahfidz Camp Akhir Semester)..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white"
                      required
                    />
                    <input
                      type="text"
                      value={newAgendaDesc}
                      onChange={(e) => setNewAgendaDesc(e.target.value)}
                      placeholder="Deskripsi singkat target, karakteristik, atau tujuannya..."
                      className="w-full px-3 py-2 text-xs border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4.5 py-2 bg-natural-primary hover:bg-natural-primary-hover text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Simpan Program Kerja</span>
                  </button>
                </form>

                {currentQism.agendas.length === 0 ? (
                  <div className="text-center py-12 bg-natural-light/10 rounded-2xl border border-dashed border-natural-border-light max-w-xl">
                    <p className="text-natural-muted text-xs">Belum ada agenda kerja bidang. Buat agenda baru di atas.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQism.agendas.map((agenda) => {
                      const isEditingAgenda = editingAgendaId === agenda.id;

                      return (
                        <div
                          key={agenda.id}
                          className="p-5 bg-white border border-natural-border-light rounded-2xl shadow-sm flex flex-col justify-between hover:border-natural-border-dark/40 transition-all group"
                        >
                          {isEditingAgenda ? (
                            <div className="space-y-3 flex-1">
                              <div>
                                <label className="block text-[10px] font-bold text-natural-muted uppercase">Judul Program Kerja</label>
                                <input
                                  type="text"
                                  value={editedAgendaTitle}
                                  onChange={(e) => setEditedAgendaTitle(e.target.value)}
                                  className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-dark rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-natural-muted uppercase">Deskripsi Agenda</label>
                                <textarea
                                  value={editedAgendaDesc}
                                  onChange={(e) => setEditedAgendaDesc(e.target.value)}
                                  className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-dark rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                                  rows={2}
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-natural-muted uppercase">Status Pelaksanaan</label>
                                <select
                                  value={editedAgendaStatus}
                                  onChange={(e) => setEditedAgendaStatus(e.target.value as Agenda['status'])}
                                  className="w-full mt-1 px-3 py-1.5 text-xs border border-natural-border-dark rounded-lg focus:outline-none focus:border-natural-primary bg-white"
                                >
                                  <option value="Belum Terlaksana">Belum Terlaksana</option>
                                  <option value="Sedang Berjalan">Sedang Berjalan</option>
                                  <option value="Selesai">Selesai</option>
                                </select>
                              </div>
                              <div className="flex gap-2 pt-1">
                                <button
                                  onClick={() => saveAgenda(agenda.id)}
                                  className="text-xs font-bold text-white bg-natural-primary hover:bg-natural-primary-hover px-3 py-1.5 rounded-lg cursor-pointer"
                                >
                                  <Check size={12} className="inline mr-1" /> Simpan
                                </button>
                                <button
                                  onClick={() => setEditingAgendaId(null)}
                                  className="text-xs font-semibold text-natural-text bg-natural-light hover:bg-[#d6cfb7] px-3 py-1.5 rounded-lg cursor-pointer border border-natural-border-light"
                                >
                                  <X size={12} className="inline mr-1" /> Batal
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <span className="text-[9px] font-extrabold uppercase bg-[#f5efe0] text-[#7c6a46] px-2.5 py-0.5 rounded-md border border-[#ede3cb] flex items-center gap-1">
                                    <CheckSquare size={10} /> Syari'at Compliance
                                  </span>
                                  <span
                                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${
                                      agenda.status === 'Selesai'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : agenda.status === 'Sedang Berjalan'
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-stone-50 text-stone-600 border-stone-200'
                                    }`}
                                  >
                                    {agenda.status}
                                  </span>
                                </div>
                                <h5 className="font-serif font-bold text-natural-text text-sm">{agenda.title}</h5>
                                <p className="text-xs text-natural-muted leading-relaxed">{agenda.description}</p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-natural-border-light/55 flex justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                  onClick={() => startEditAgenda(agenda)}
                                  className="p-1.5 text-natural-muted hover:text-natural-primary hover:bg-natural-light/60 rounded transition-colors cursor-pointer"
                                  title="Edit Agenda Kerja"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteAgenda(agenda.id)}
                                  className="p-1.5 text-natural-muted hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                  title="Hapus Agenda Kerja"
                                >
                                  <Trash size={12} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Subtab: Members */}
            {activeSubTab === 'members' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-natural-text text-sm sm:text-base flex items-center gap-2">
                    <Users size={16} className="text-natural-primary" />
                    <span>Anggota Departemen & Koordinator</span>
                  </h4>
                  <p className="text-xs text-natural-muted">Kelola nama Ketua Qism (Koordinator) beserta anggota departemen aktif. Anda dapat menambah, menyunting, maupun menghapus anggota secara fleksibel.</p>
                </div>

                {/* Coordinator Box */}
                <div className="bg-[#f7f5ee] p-4 rounded-xl border border-natural-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-2xl">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-natural-primary tracking-wide">Ketua Qism / Koordinator</span>
                    <p className="text-sm font-bold text-natural-text mt-0.5">{currentQism.officerName || 'Belum ditentukan'}</p>
                  </div>
                  <div className="text-xs text-natural-muted italic">
                    Gunakan panel "Ketua Qism" di bagian atas halaman untuk menyunting nama koordinator secara langsung.
                  </div>
                </div>

                {/* Form to add member */}
                <form onSubmit={handleAddMember} className="flex gap-2 max-w-xl">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder={`Tambah anggota baru untuk ${currentQism.title}...`}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm border border-natural-border-light rounded-xl focus:outline-none focus:border-natural-primary bg-natural-light/20"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-natural-primary hover:bg-natural-primary-hover active:bg-[#2c3327] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus size={14} />
                    <span>Tambah Anggota</span>
                  </button>
                </form>

                {/* Members List */}
                {!(currentQism.members && currentQism.members.length > 0) ? (
                  <div className="text-center py-12 bg-natural-light/10 rounded-2xl border border-dashed border-natural-border-light max-w-2xl">
                    <p className="text-natural-muted text-xs">Belum ada anggota terdaftar. Tambahkan 3-4 anggota untuk membantu koordinator.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                    {currentQism.members.map((member, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-xl border border-natural-border-light bg-natural-light/5 hover:bg-natural-light/20 hover:border-natural-border-dark/45 transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex gap-2.5 items-center flex-1">
                          <div className="w-7 h-7 rounded-lg bg-natural-primary/10 text-natural-primary flex items-center justify-center text-xs font-bold font-mono shrink-0">
                            {index + 1}
                          </div>

                          {editingMemberIndex === index ? (
                            <div className="flex-1 space-y-1">
                              <input
                                type="text"
                                value={editedMemberName}
                                onChange={(e) => setEditedMemberName(e.target.value)}
                                className="w-full px-2 py-1 text-xs border border-natural-border-dark rounded focus:outline-none focus:border-natural-primary bg-white"
                                autoFocus
                              />
                              <div className="flex gap-2 mt-1">
                                <button
                                  onClick={() => saveMember(index)}
                                  className="text-[10px] font-bold text-natural-primary flex items-center gap-0.5 bg-natural-light px-2 py-0.5 rounded border border-natural-border-light cursor-pointer"
                                >
                                  <Check size={10} /> Simpan
                                </button>
                                <button
                                  onClick={() => setEditingMemberIndex(null)}
                                  className="text-[10px] font-semibold text-natural-muted flex items-center gap-0.5 bg-natural-light/40 px-2 py-0.5 rounded cursor-pointer border border-natural-border-light/50"
                                >
                                  <X size={10} /> Batal
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm text-natural-text font-semibold">
                              {member}
                            </p>
                          )}
                        </div>

                        {editingMemberIndex !== index && (
                          <div className="flex gap-1 shrink-0 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditMember(index, member)}
                              title="Edit Anggota"
                              className="p-1 text-natural-muted hover:text-natural-primary hover:bg-natural-light/60 rounded transition-colors cursor-pointer"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(index)}
                              title="Hapus Anggota"
                              className="p-1 text-natural-muted hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            >
                              <Trash size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-natural-border-light">
          <p className="text-natural-muted text-xs">Pilih atau tambah bidang Qism di atas.</p>
        </div>
      )}

    </div>
  );
}
