import { Jabatan, Qism, DailyReport, MonitoringRecord, RewardPunishment } from './types';

export const getInitialJabatans = (): Jabatan[] => [
  // IKHWAN JABATAN
  {
    id: 'ketua_ikhwan',
    title: 'Ketua OSIS (Ikhwan)',
    officerName: 'Abdullah Azzam',
    description: 'Pemimpin utama jalannya roda organisasi OSIS Ikhwan SMP IT UBK. Mengoordinasikan seluruh kebijakan, program kerja, dan menjalin sinergi dengan dewan guru.',
    iconName: 'Crown',
    gender: 'ikhwan',
    tasks: [
      { id: 'ki-1', text: 'Memimpin dan mengoordinasikan seluruh kegiatan pengurus OSIS Ikhwan.' },
      { id: 'ki-2', text: 'Menyusun program kerja tahunan berkolaborasi dengan Pembina OSIS.' },
      { id: 'ki-3', text: 'Menjadi jembatan komunikasi antara siswa Ikhwan dan dewan guru.' },
      { id: 'ki-4', text: 'Memimpin rapat pleno dan rapat evaluasi bulanan OSIS.' },
      { id: 'ki-5', text: 'Memantau pelaksanaan program kerja di setiap Qism Ikhwan.' }
    ]
  },
  {
    id: 'wakil_ikhwan',
    title: 'Wakil Ketua OSIS (Ikhwan)',
    officerName: 'Fatih Al-Ayyubi',
    description: 'Pendamping Ketua OSIS Ikhwan dalam kepemimpinan. Bertanggung jawab langsung atas efektivitas kinerja departemen (Qism).',
    iconName: 'UserCheck',
    gender: 'ikhwan',
    tasks: [
      { id: 'wi-1', text: 'Mendampingi Ketua OSIS Ikhwan dalam menjalankan roda organisasi.' },
      { id: 'wi-2', text: 'Menggantikan tugas Ketua OSIS Ikhwan apabila berhalangan hadir.' },
      { id: 'wi-3', text: 'Mengawasi secara langsung efektivitas kerja seluruh Qism Ikhwan.' }
    ]
  },
  {
    id: 'sekretaris_ikhwan',
    title: 'Sekretaris OSIS (Ikhwan)',
    officerName: 'Zaid bin Tsabit',
    description: 'Pusat administrasi, pengarsipan, dan dokumentasi OSIS Ikhwan. Mengatur surat menyurat dan notulensi rapat.',
    iconName: 'FileText',
    gender: 'ikhwan',
    tasks: [
      { id: 'si-1', text: 'Mengelola seluruh administrasi surat-menyurat masuk dan keluar OSIS.' },
      { id: 'si-2', text: 'Menyusun proposal kegiatan, laporan pertanggungjawaban (LPJ).' },
      { id: 'si-3', text: 'Membuat notulensi rapat resmi OSIS Ikhwan.' }
    ]
  },
  {
    id: 'bendahara_ikhwan',
    title: 'Bendahara OSIS (Ikhwan)',
    officerName: 'Abdurrahman bin Auf',
    description: 'Penanggung jawab transparansi finansial dan anggaran OSIS Ikhwan. Mengelola uang kas secara transparan.',
    iconName: 'DollarSign',
    gender: 'ikhwan',
    tasks: [
      { id: 'bi-1', text: 'Mengelola keuangan OSIS Ikhwan secara transparan dan akuntabel.' },
      { id: 'bi-2', text: 'Mencatat setiap transaksi keuangan dengan bukti kuitansi yang sah.' },
      { id: 'bi-3', text: 'Menyusun laporan keuangan bulanan untuk dipresentasikan.' }
    ]
  },

  // AKHWAT JABATAN
  {
    id: 'ketua_akhwat',
    title: 'Ketua OSIS (Akhwat)',
    officerName: 'Aisyah Humaira',
    description: 'Pemimpin utama jalannya roda organisasi OSIS Akhwat SMP IT UBK. Mengoordinasikan seluruh kebijakan, program kerja, dan menjalin sinergi dengan dewan guru.',
    iconName: 'Crown',
    gender: 'akhwat',
    tasks: [
      { id: 'ka-1', text: 'Memimpin dan mengoordinasikan seluruh kegiatan pengurus OSIS Akhwat.' },
      { id: 'ka-2', text: 'Menyusun program kerja tahunan berkolaborasi dengan Pembina OSIS.' },
      { id: 'ka-3', text: 'Menjadi jembatan komunikasi antara siswi Akhwat dan dewan guru.' },
      { id: 'ka-4', text: 'Memimpin rapat pleno dan rapat evaluasi bulanan OSIS.' },
      { id: 'ka-5', text: 'Memantau pelaksanaan program kerja di setiap Qism Akhwat.' }
    ]
  },
  {
    id: 'wakil_akhwat',
    title: 'Wakil Ketua OSIS (Akhwat)',
    officerName: 'Khadijah Al-Kubra',
    description: 'Pendamping Ketua OSIS Akhwat dalam kepemimpinan. Bertanggung jawab langsung atas efektivitas kinerja departemen (Qism).',
    iconName: 'UserCheck',
    gender: 'akhwat',
    tasks: [
      { id: 'wa-1', text: 'Mendampingi Ketua OSIS Akhwat dalam menjalankan roda organisasi.' },
      { id: 'wa-2', text: 'Menggantikan tugas Ketua OSIS Akhwat apabila berhalangan hadir.' },
      { id: 'wa-3', text: 'Mengawasi secara langsung efektivitas kerja seluruh Qism Akhwat.' }
    ]
  },
  {
    id: 'sekretaris_akhwat',
    title: 'Sekretaris OSIS (Akhwat)',
    officerName: 'Fatimah Az-Zahra',
    description: 'Pusat administrasi, pengarsipan, dan dokumentasi OSIS Akhwat. Mengatur surat menyurat dan notulensi rapat.',
    iconName: 'FileText',
    gender: 'akhwat',
    tasks: [
      { id: 'sa-1', text: 'Mengelola seluruh administrasi surat-menyurat masuk dan keluar OSIS.' },
      { id: 'sa-2', text: 'Menyusun proposal kegiatan, laporan pertanggungjawaban (LPJ).' },
      { id: 'sa-3', text: 'Membuat notulensi rapat resmi OSIS Akhwat.' }
    ]
  },
  {
    id: 'bendahara_akhwat',
    title: 'Bendahara OSIS (Akhwat)',
    officerName: 'Asma binti Abi Bakar',
    description: 'Penanggung jawab transparansi finansial dan anggaran OSIS Akhwat. Mengelola uang kas secara transparan.',
    iconName: 'DollarSign',
    gender: 'akhwat',
    tasks: [
      { id: 'ba-1', text: 'Mengelola keuangan OSIS Akhwat secara transparan dan akuntabel.' },
      { id: 'ba-2', text: 'Mencatat setiap transaksi keuangan dengan bukti kuitansi yang sah.' },
      { id: 'ba-3', text: 'Menyusun laporan keuangan bulanan untuk dipresentasikan.' }
    ]
  }
];

export const getInitialQisms = (): Qism[] => [
  // IKHWAN QISMS
  {
    id: 'ibadah_ikhwan',
    title: 'Qism Ibadah (Ikhwan)',
    officerName: 'Muadz bin Jabal',
    description: 'Fokus pada pembinaan ketakwaan, kedisiplinan ibadah, tahfidz, dan pembiasaan adab Islami bagi siswa Ikhwan.',
    iconName: 'HeartHandshake',
    gender: 'ikhwan',
    members: ['Ahmad Al-Ghifari', 'Hamzah bin Abdul Muthalib', 'Salman Al-Farisi', 'Bilal bin Rabah'],
    tasks: [
      { id: 'ibi-1', text: 'Mengoordinasikan dan memantau Shalat Dzuhur dan Ashar berjamaah di sekolah.' },
      { id: 'ibi-2', text: 'Mengatur jadwal petugas adzan dan iqomah bagi siswa.' },
      { id: 'ibi-3', text: 'Mengoordinasikan kegiatan Shalat Duha di pagi hari.' }
    ],
    agendas: [
      { id: 'ibai-1', title: 'Shalat Berjamaah Dzuhur & Ashar', description: 'Pengawasan shalat tepat waktu', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'ibai-2', title: 'Dzikir Pagi & Duha', description: 'Dilaksanakan sebelum KBM pukul 07.15', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'nadzhofah_ikhwan',
    title: 'Qism Nadzhofah (Ikhwan)',
    officerName: 'Abu Dzar Al-Ghifari',
    description: 'Departemen Kebersihan dan Lingkungan. Menjaga kerapian kelas dan keasrian lingkungan sekolah bagi Ikhwan.',
    iconName: 'Trash2',
    gender: 'ikhwan',
    members: ['Umar bin Khattab', 'Ali bin Abi Thalib', 'Talhah bin Ubaidillah', 'Zubair bin Awwam'],
    tasks: [
      { id: 'nzi-1', text: 'Mengawasi pelaksanaan piket kelas harian Ikhwan.' },
      { id: 'nzi-2', text: 'Melakukan sidak kebersihan kelas setiap pagi.' },
      { id: 'nzi-3', text: 'Mengatur kerja bakti (gotong royong) hari Jumat.' }
    ],
    agendas: [
      { id: 'nzai-1', title: 'Gerakan Semut Pagi', description: 'Aksi memungut sampah sebelum masuk kelas', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'nzai-2', title: 'Jumat Bersih Berkah', description: 'Kerja bakti halaman dan masjid', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'lughoh_ikhwan',
    title: 'Qism Lughoh (Ikhwan)',
    officerName: 'Zaid bin Tsabit',
    description: 'Departemen Bahasa. Mengembangkan kemampuan bahasa Arab dan Inggris bagi siswa Ikhwan.',
    iconName: 'Languages',
    gender: 'ikhwan',
    members: ['Khalid bin Walid', 'Amru bin Ash', 'Usamah bin Zaid', 'Sa\'ad bin Abi Waqqas'],
    tasks: [
      { id: 'lui-1', text: 'Mengampanyekan penggunaan Bahasa Arab & Inggris.' },
      { id: 'lui-2', text: 'Menulis Vocabulary of the Day di papan tulis.' },
      { id: 'lui-3', text: 'Melatih pidato tiga bahasa siswa Ikhwan.' }
    ],
    agendas: [
      { id: 'luai-1', title: 'Vocabulary of the Day', description: 'Menulis kosakata di papan tulis', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'luai-2', title: 'Language Day', description: 'Hari khusus interaksi bahasa asing', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'riyadhoh_mading_ikhwan',
    title: 'Qism Riyadhoh & Mading (Ikhwan)',
    officerName: 'Mush\'ab bin Umair',
    description: 'Olahraga, Kreativitas, dan Majalah Dinding. Mengoordinasikan olahraga sunnah dan mading islami.',
    iconName: 'Award',
    gender: 'ikhwan',
    members: ['Anas bin Malik', 'Abu Hurairah', 'Jabir bin Abdullah', 'Ibnu Abbas'],
    tasks: [
      { id: 'rmi-1', text: 'Mengatur jadwal penggunaan lapangan olahraga Ikhwan.' },
      { id: 'rmi-2', text: 'Mengoordinasikan senam kesegaran jasmani.' },
      { id: 'rmi-3', text: 'Mengelola isi papan Majalah Dinding Ikhwan.' }
    ],
    agendas: [
      { id: 'rmai-1', title: 'Senam Peregangan Pagi', description: 'Olahraga ringan 5 menit sebelum belajar', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'rmai-2', title: 'Latihan Memanah & Futsal', description: 'Olahraga sunnah memanah & futsal', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'amn_ikhwan',
    title: 'Qism Amn (Ikhwan)',
    officerName: 'Hamzah bin Abdul Muthalib',
    description: 'Departemen Keamanan, Adab, dan Kedisiplinan. Bertanggung jawab mengawal ketertiban siswa Ikhwan.',
    iconName: 'ShieldAlert',
    gender: 'ikhwan',
    members: ['Utsman bin Affan', 'Sa\'ad bin Mu\'adz', 'Miqdad bin Aswad', 'Abu Ubaidah bin Jarrah'],
    tasks: [
      { id: 'ami-1', text: 'Mengawasi kedisiplinan pakaian seragam dan atribut siswa.' },
      { id: 'ami-2', text: 'Membantu guru piket dalam menertibkan barisan siswa.' },
      { id: 'ami-3', text: 'Melakukan patroli istirahat mencegah perundungan.' }
    ],
    agendas: [
      { id: 'amai-1', title: 'Sambut Siswa di Gerbang Pagi', description: 'Pemeriksaan kerapian seragam dan peci', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'amai-2', title: 'Patroli Tertib Shalat', description: 'Merapikan shaf Shalat Dzuhur/Ashar', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },

  // AKHWAT QISMS
  {
    id: 'ibadah_akhwat',
    title: 'Qism Ibadah (Akhwat)',
    officerName: 'Fathimah Az-Zahra',
    description: 'Fokus pada pembinaan ketakwaan, kedisiplinan ibadah, tahfidz, dan pembiasaan adab Islami bagi siswi Akhwat.',
    iconName: 'HeartHandshake',
    gender: 'akhwat',
    members: ['Ummu Sulaim', 'Sumayyah binti Khayyat', 'Zainab binti Ali', 'Safiyyah binti Abdul Muthalib'],
    tasks: [
      { id: 'iba-1', text: 'Mengoordinasikan Shalat Dzuhur dan Ashar berjamaah di mushola Akhwat.' },
      { id: 'iba-2', text: 'Mengatur petugas kultum ba\'da Dzuhur dari kalangan Akhwat.' },
      { id: 'iba-3', text: 'Mengoordinasikan zikir pagi dan dhuha Akhwat.' }
    ],
    agendas: [
      { id: 'ibaa-1', title: 'Shalat Berjamaah Dzuhur & Ashar', description: 'Pengawasan barisan shalat dan kerapian mukena', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'ibaa-2', title: 'Kajian Muslimah Mingguan', description: 'Halaqah bertema fiqih wanita muslimah', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'nadzhofah_akhwat',
    title: 'Qism Nadzhofah (Akhwat)',
    officerName: 'Nusaibah binti Ka\'ab',
    description: 'Departemen Kebersihan dan Lingkungan. Menjaga kerapian kelas, kebersihan, dan kenyamanan area Akhwat.',
    iconName: 'Trash2',
    gender: 'akhwat',
    members: ['Asma binti Abi Bakar', 'Rufaidah Al-Aslamiyah', 'Zainab binti Jahsy', 'Juwayriyah binti al-Harith'],
    tasks: [
      { id: 'nza-1', text: 'Mengawasi pelaksanaan piket kelas harian Akhwat.' },
      { id: 'nza-2', text: 'Melakukan sidak kebersihan kelas Akhwat setiap pagi.' },
      { id: 'nza-3', text: 'Menyelenggarakan kompetisi kelas terbersih Akhwat.' }
    ],
    agendas: [
      { id: 'nzaa-1', title: 'Aksi Semut Bersih Kelas', description: 'Memungut sampah kecil sebelum bel masuk', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'nzaa-2', title: 'Pajangan Tanaman Hias Kelas', description: 'Penyediaan pot bunga di koridor Akhwat', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'lughoh_akhwat',
    title: 'Qism Lughoh (Akhwat)',
    officerName: 'Aisyah binti Abi Bakar',
    description: 'Departemen Bahasa. Mengembangkan kemampuan bahasa Arab dan Inggris bagi siswi Akhwat.',
    iconName: 'Languages',
    gender: 'akhwat',
    members: ['Hafsah binti Umar', 'Shifa binti Abdullah', 'Ummu Salamah', 'Siti Hajar'],
    tasks: [
      { id: 'lua-1', text: 'Mengampanyekan penggunaan Bahasa Arab & Inggris di area Akhwat.' },
      { id: 'lua-2', text: 'Menyusun mading kosakata harian Akhwat.' },
      { id: 'lua-3', text: 'Membimbing percakapan pagi (Muhadatsah) bagi Akhwat.' }
    ],
    agendas: [
      { id: 'luaa-1', title: 'Vocabulary of the Day Akhwat', description: 'Kosakata harian di mading bahasa', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'luaa-2', title: 'Arabic & English Speech Club', description: 'Latihan pidato bersama setiap hari Sabtu', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'riyadhoh_mading_akhwat',
    title: 'Qism Riyadhoh & Mading (Akhwat)',
    officerName: 'Zainab binti Ali',
    description: 'Olahraga, Kreativitas, dan Majalah Dinding Akhwat. Mengoordinasikan olahraga khusus akhwat dan publikasi mading.',
    iconName: 'Award',
    gender: 'akhwat',
    members: ['Fatimah binti Asad', 'Ummu Kultsum', 'Zaynab binti Khuzaymah', 'Mariyah Al-Qibthiyah'],
    tasks: [
      { id: 'rma-1', text: 'Mengoordinasikan senam bersama Akhwat di lapangan khusus.' },
      { id: 'rma-2', text: 'Mengelola isi dan estetika papan mading utama Akhwat.' },
      { id: 'rma-3', text: 'Menyelenggarakan lomba literasi dan kaligrafi Akhwat.' }
    ],
    agendas: [
      { id: 'rmaa-1', title: 'Senam Sehat Akhwat Pekanan', description: 'Peregangan fisik pekanan terpisah', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'rmaa-2', title: 'Penerbitan Mading Bertema Hijrah', description: 'Update mading setiap tanggal 1 awal bulan', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  },
  {
    id: 'amn_akhwat',
    title: 'Qism Amn (Akhwat)',
    officerName: 'Safiyyah binti Abdul Muthalib',
    description: 'Departemen Keamanan, Adab, dan Kedisiplinan Akhwat. Bertanggung jawab mengawal ketertiban siswi Akhwat.',
    iconName: 'ShieldAlert',
    gender: 'akhwat',
    members: ['Maimunah binti al-Harith', 'Ramlah binti Abi Sufyan', 'Sawdah binti Zam\'ah', 'Rayhanah binti Zayd'],
    tasks: [
      { id: 'ama-1', text: 'Mengawasi kedisiplinan kerudung, gamis, dan atribut siswi.' },
      { id: 'ama-2', text: 'Patroli istirahat untuk menjaga ukhuwah & mencegah perundungan.' },
      { id: 'ama-3', text: 'Membantu penertiban barisan saat apel Akhwat.' }
    ],
    agendas: [
      { id: 'amaa-1', title: 'Operasi Penertiban Hijab', description: 'Pemeriksaan kerapian jilbab dan kelengkapan kaos kaki', isIslamic: true, status: 'Sedang Berjalan' },
      { id: 'amaa-2', title: 'Sambut Siswi Pagi Hari', description: 'Senyum, salam, sapa di gerbang masuk Akhwat', isIslamic: true, status: 'Sedang Berjalan' }
    ]
  }
];

export const getInitialDailyReports = (): DailyReport[] => [
  {
    id: 'rep-1',
    date: '2026-07-14',
    targetType: 'qism',
    targetId: 'ibadah_ikhwan',
    title: 'Pelaksanaan Dzikir Pagi & Shalat Duha',
    activityDetails: 'Seluruh siswa berkumpul di lapangan jam 07.15 untuk berzikir bersama dilanjutkan Shalat Duha di mushola sebelum masuk kelas. Kegiatan dipantau langsung oleh pengurus Qism Ibadah Ikhwan.',
    notes: 'Ada 3 siswa yang terlambat mengikuti zikir pagi karena rantai sepedanya putus, sudah diizinkan masuk kelas dengan baik.',
    reportedBy: 'Abdullah Azzam'
  },
  {
    id: 'rep-2',
    date: '2026-07-14',
    targetType: 'jabatan',
    targetId: 'sekretaris_akhwat',
    title: 'Penyusunan Proposal Classmeeting',
    activityDetails: 'Sekretaris OSIS Akhwat menyelesaikan rancangan proposal kegiatan perlombaan tengah semester untuk diserahkan kepada Pembina OSIS.',
    notes: 'Memerlukan rincian RAB dari bendahara untuk melengkapi lampiran biaya perlombaan.',
    reportedBy: 'Fatimah Az-Zahra'
  }
];

export const getInitialMonitoringRecords = (): MonitoringRecord[] => [
  {
    id: 'mon-1',
    date: '2026-07-14',
    targetType: 'qism',
    targetId: 'nadzhofah_ikhwan',
    monitoredAspect: 'Kebersihan Kelas VII & VIII saat Istirahat',
    status: 'Baik',
    notes: 'Kondisi kelas bersih setelah istirahat pertama. Hanya tersisa sedikit remahan roti di pojok kelas VIII-B.',
    actionTaken: 'Mengingatkan petugas piket kelas VIII-B untuk menyapu ulang sebelum KBM jam ke-5 dimulai.',
    monitoredBy: 'Abu Dzar Al-Ghifari'
  },
  {
    id: 'mon-2',
    date: '2026-07-14',
    targetType: 'qism',
    targetId: 'amn_akhwat',
    monitoredAspect: 'Ketertiban Atribut Jilbab Akhwat Pagi Hari',
    status: 'Sangat Baik',
    notes: 'Hampir seluruh siswi mengenakan kerudung lebar rapi dan kaos kaki lengkap. Keributan barisan nihil.',
    actionTaken: 'Memberikan pujian lisan saat apel selesai dan mendata kelas terdisiplin.',
    monitoredBy: 'Safiyyah'
  }
];

export const getInitialRewardPunishments = (): RewardPunishment[] => [
  {
    id: 'rp-1',
    type: 'reward',
    date: '2026-07-13',
    studentName: 'Muhammad Salman',
    classRoom: 'IX-A',
    behaviorOrAchievement: 'Juara 1 Lomba Pidato Bahasa Arab tingkat Kabupaten & selalu menjadi muazin Shalat Dzuhur tepat waktu di sekolah.',
    consequenceOrReward: 'Pemberian piagam penghargaan dari sekolah dan voucer gratis jajan kantin sehat selama seminggu.',
    officerInCharge: 'Ketua OSIS (Ikhwan)'
  },
  {
    id: 'rp-2',
    type: 'punishment',
    date: '2026-07-14',
    studentName: 'Fajar Kurniawan',
    classRoom: 'VIII-C',
    behaviorOrAchievement: 'Membuang sampah bekas bungkus es di kolong meja kelas dan menolak menyapu saat diingatkan piket.',
    consequenceOrReward: 'Sanksi edukatif menyiram tanaman hias di taman depan kantor guru selama 3 hari berturut-turut didampingi Qism Nadzhofah.',
    officerInCharge: 'Qism Amn (Ikhwan)'
  }
];
