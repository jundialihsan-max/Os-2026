export interface Task {
  id: string;
  text: string;
}

export interface Agenda {
  id: string;
  title: string;
  description: string;
  isIslamic: boolean;
  status: 'Belum Terlaksana' | 'Sedang Berjalan' | 'Selesai';
}

export interface Jabatan {
  id: string; // e.g., 'ketua_ikhwan', 'ketua_akhwat'
  title: string;
  officerName: string;
  description: string;
  iconName: string;
  tasks: Task[];
  gender?: 'ikhwan' | 'akhwat';
}

export interface Qism {
  id: string; // e.g., 'ibadah_ikhwan', 'ibadah_akhwat'
  title: string;
  officerName: string; // This serves as the Ketua Qism
  description: string;
  iconName: string;
  tasks: Task[];
  agendas: Agenda[];
  gender?: 'ikhwan' | 'akhwat';
  members?: string[]; // List of 3-4 members (or more/less) that can be added, edited, or deleted
}

export interface DailyReport {
  id: string;
  date: string;
  targetType: 'jabatan' | 'qism';
  targetId: string; // references Jabatan ID or Qism ID
  title: string;
  activityDetails: string;
  notes: string;
  reportedBy: string;
}

export interface MonitoringRecord {
  id: string;
  date: string;
  targetType: 'jabatan' | 'qism';
  targetId: string; // references Jabatan ID or Qism ID
  monitoredAspect: string;
  status: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  notes: string;
  actionTaken: string;
  monitoredBy: string;
}

export interface RewardPunishment {
  id: string;
  type: 'reward' | 'punishment';
  date: string;
  studentName: string;
  classRoom: string;
  behaviorOrAchievement: string;
  consequenceOrReward: string; // Hadiah / Sanksi Mendidik
  officerInCharge: string;
}

export interface LdkChapter {
  id: string;
  chapterNumber: number;
  title: string;
  objective: string; // Tujuan implementasi nyata
  characteristics: string[]; // Karakteristik kepemimpinan
  content: string; // Materi detail dan panjang
  fieldImplementation: string; // Langkah nyata di lapangan
}

export interface OSISState {
  jabatans: Jabatan[];
  qisms: Qism[];
  dailyReports: DailyReport[];
  monitoringRecords: MonitoringRecord[];
  rewardPunishments: RewardPunishment[];
  ldkChapters?: LdkChapter[]; // Optional or required, we will make sure it is initialized
}
