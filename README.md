# OSIS SMP IT UBK - Sistem Informasi & Manajemen Terintegrasi

Sistem Informasi & Manajemen OSIS SMP IT UBK adalah aplikasi berbasis web modern yang dirancang khusus untuk memfasilitasi koordinasi, pelaporan harian, monitoring kedisiplinan, dan pencatatan prestasi/kebajikan serta sanksi edukatif bagi pengurus OSIS di lingkungan sekolah fullday/pesantren.

Aplikasi ini mengadopsi prinsip pemisahan gender (**Ikhwan & Akhwat**) yang ketat namun selaras, serta dilengkapi dengan manajemen kepengurusan yang dinamis, andal, dan responsif.

---

## ✨ Fitur Unggulan

### 1. 👥 Portal Terpisah Gender (Ikhwan & Akhwat)
* **Tugas Jabatan**: Pembagian peran kepengurusan inti (Ketua, Wakil, Sekretaris, Bendahara) yang terbagi menjadi divisi **Ikhwan** (Laki-laki) dan **Akhwat** (Perempuan) secara independen.
* **Program Qism (Departemen)**: Setiap departemen atau Qism terbagi secara khusus untuk melayani dan dipimpin oleh masing-masing gender (Ikhwan/Akhwat), mencegah tumpang tindih instruksi dan menjaga batas ukhuwah Islami.

### 2. 🏛️ Struktur Organisasi & Qism Islami
Terdapat 5 Qism (Departemen) utama yang bergerak aktif di lingkungan sekolah:
* **Qism Ibadah**: Pembinaan ketakwaan, ketertiban shalat berjamaah, dzikir pagi, dan kajian muslimah.
* **Qism Nadzhofah**: Departemen Kebersihan, keasrian kelas, dan gerakan Jumat bersih berkah.
* **Qism Lughoh**: Pembiasaan percakapan (Muhadatsah) bahasa Arab dan bahasa Inggris harian.
* **Qism Riyadhoh & Mading**: Olahraga sunnah (seperti memanah), kesehatan fisik, serta kreativitas majalah dinding.
* **Qism Amn**: Keamanan, adab, ketertiban seragam/atribut, serta pencegahan perundungan.

### 3. 👥 Manajemen Anggota Qism Dinamis (CRUD Penuh)
Setiap Qism dilengkapi dengan tab **Anggota Departemen** yang mendukung operasi data penuh tanpa bug:
* **Ketua Qism**: Pengubahan nama koordinator secara langsung pada panel metadata.
* **Tambah Anggota**: Memungkinkan penambahan 3-4 anggota aktif (atau lebih) secara dinamis.
* **Sunting & Hapus Anggota**: Pengeditan langsung di tempat (*inline editing*) untuk mengoreksi nama anggota dan tombol hapus instan yang aman.

### 4. 📝 Laporan Aktivitas Harian (Daily Reports)
* Pengurus OSIS dapat membuat catatan laporan harian berdasarkan Jabatan maupun Qism spesifik yang menangani tugas tersebut.
* Dilengkapi filter pencarian cepat berdasarkan judul kegiatan atau nama pelapor.

### 5. 🔍 Monitoring & Checklist Harian
* Penilaian berkala aspek kebersihan, ketertiban atribut jilbab/peci, kerapian barisan shalat, dan kondusivitas kelas.
* Menyimpan rekam medis tindakan yang diambil (*Action Taken*) untuk setiap temuan di lapangan.

### 6. 🏆 Buku Reward & Punishment (Sanksi Edukatif)
* **Reward (Apresiasi)**: Pencatatan prestasi akademik, perilaku terpuji, atau keaktifan positif siswa disertai apresiasi mendidik.
* **Punishment (Kedisiplinan)**: Pencatatan pelanggaran tata tertib dengan penekanan pada **sanksi edukatif Islami** (seperti menyetorkan hafalan surat, merapikan shaf shalat, atau merawat tanaman hias), tanpa kekerasan fisik maupun verbal.

---

## 🛠️ Teknologi yang Digunakan

* **Frontend**: React 19 (Functional Components & Hooks)
* **Build Tool**: Vite 6
* **Bahasa Pemrograman**: TypeScript (Type Safe)
* **Styling**: Tailwind CSS v4 (Desain visual bernuansa alam/natural, hangat, dan kontras tinggi)
* **Ikon**: Lucide React
* **Animasi**: Framer Motion (Motion)
* **Penyimpanan Lokal**: `localStorage` (Presistensi data otomatis sehingga data tidak hilang saat halaman disegarkan)

---

## 🚀 Panduan Memulai Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer Anda:

### Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 18 atau lebih baru) dan npm di perangkat Anda.

### 1. Klon Repositori
```bash
git clone <url-repositori-github-anda>
cd <nama-folder-repositori>
```

### 2. Instal Dependensi
Gunakan npm atau bun untuk menginstal seluruh paket pustaka:
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Development)
Jalankan aplikasi dalam mode pengembangan lokal:
```bash
npm run dev
```
Setelah dijalankan, buka peramban Anda dan akses alamat `http://localhost:3000` atau yang tertera di terminal Anda.

### 4. Kompilasi untuk Produksi (Build)
Untuk membuat versi build produksi yang optimal dan siap dideploy ke hosting statis (seperti GitHub Pages, Vercel, Netlify, atau Cloud Run):
```bash
npm run build
```
Hasil kompilasi akan berada di dalam direktori `/dist`.

### 5. Linter & Validasi Tipe Data
Untuk memastikan seluruh kode bebas dari galat sintaksis dan aman secara tipe data TypeScript:
```bash
npm run lint
```

---

## 📁 Struktur Direktori Penting

```text
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx              # Halaman beranda utama OSIS
│   │   ├── JabatanSection.tsx         # Manajemen tugas pengurus inti (Ikhwan/Akhwat)
│   │   ├── QismSection.tsx            # Manajemen Qism beserta anggota & agenda (Ikhwan/Akhwat)
│   │   ├── DailyReportsSection.tsx    # Formulir & list laporan harian aktivitas
│   │   ├── MonitoringSection.tsx      # Pencatatan audit/monitoring berkala
│   │   └── RewardPunishmentSection.tsx# Sistem Buku Prestasi & Sanksi Edukatif
│   ├── types.ts                       # Definisi tipe data & antarmuka TypeScript
│   ├── initialData.ts                 # Data awal default (Ikhwan & Akhwat)
│   ├── App.tsx                        # Komponen utama pengatur state & rute menu
│   └── index.css                      # Konfigurasi Tailwind CSS global
├── .gitignore                         # Daftar berkas yang diabaikan oleh Git
├── tsconfig.json                      # Konfigurasi compiler TypeScript
└── vite.config.ts                     # Konfigurasi bundler Vite
```

---

## 📜 Panduan Etika OSIS Sekolah Fullday
Selaras dengan prinsip pendidikan karakter Islami di SMP IT UBK:
1. **Saling Menghargai**: Segala bentuk penertiban (sanksi) wajib disampaikan dengan tutur kata yang santun dan diniatkan untuk mendidik.
2. **Kemandirian**: Pengurus OSIS dilatih mandiri dalam menyusun laporan harian dan memonitor aktivitas tanpa bergantung pada intervensi guru secara berlebihan.
3. **Pemisahan Hijab**: Menjaga ukhuwah dan batasan komunikasi antara pengurus Ikhwan dan Akhwat demi kemaslahatan bersama.

---

*Disusun oleh Jundi Abdul Syahid, S.Pd. untuk kemudahan koordinasi organisasi siswa intra sekolah di SMP IT UBK.*
