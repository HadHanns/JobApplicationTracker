# Offerly — Smart Job Application Tracker

Offerly adalah aplikasi personal job application tracker & career pipeline modern yang dirancang untuk mengelola seluruh tahapan pencarian kerja secara terstruktur, privat, dan efisien. Aplikasi ini terinspirasi dari desain SaaS minimalis dengan aksen ungu, Kanban board drag-and-drop, integrasi ExcelJS template import & export, autentikasi aman menggunakan **Google OAuth 2.0**, serta isolasi data pengguna berbasis database **Prisma + SQLite**.

---

## ✨ Fitur Utama

### 1. 🔐 Google OAuth 2.0 & Isolasi Data Pengguna
- **Sign in with Google**: Autentikasi aman menggunakan Google OAuth 2.0 melalui NextAuth.js.
- **Data Isolation**: Setiap data lamaran kerja, wawancara, dan preferensi terikat langsung dengan `userId` dari sesi Google. Pengguna lain tidak dapat membaca, mengubah, atau menghapus data milik akun lain.
- **Route & API Protection**: Halaman dan endpoint `/api/applications` dilindungi middleware dan verifikasi sesi server (`getServerSession`). Akses tanpa autentikasi otomatis dialihkan ke halaman login (`/login`).
- **Penanganan Error Ramah Pengguna**: Notifikasi kegagalan login (pembatalan izin, masalah jaringan, atau konfigurasi belum lengkap) ditampilkan dengan pesan bahasa Indonesia yang jelas.

### 2. 📋 Kanban Board & Manajemen Pipeline
- 6 kolom status dengan aksen visual yang proporsional:
  - **Wishlist** (Hijau mint)
  - **Applied** (Ungu SaaS)
  - **Assessment** (Kuning amber)
  - **Interviewing** (Biru)
  - **Offer** (Teal)
  - **Rejected** (Merah lembut)
- **HTML5 Drag-and-Drop**: Pindahkan kartu lamaran antar status dengan drag-and-drop responsif dan tersimpan langsung ke database.
- **Tampilan Fleksibel**: Beralih seketika antara tampilan Kanban Board dan Tabel Aplikasi (Table View).
- **CRUD Lengkap**: Tambah lamaran baru, edit detail perusahaan, posisi, gaji, tipe pekerjaan, follow-up date, dan hapus lamaran dengan konfirmasi.

### 3. 📑 ExcelJS Template Import & Export
- **Smart Column Mapping**: Deteksi otomatis kolom header spreadsheet Excel (Company, Program/Position, Type, Reff, Date, Progress, Reason/Notes).
- **Template-Preserving Export**: Mengekspor data ke file template Excel asli (`.xlsx`) dengan mempertahankan header, layout, dan style sel, serta pembersihan shared formula yang aman untuk menghindari kerusakan file.
- **Mode Fleksibel**: Pilihan untuk *Append* (menambahkan data baru) atau *Replace* (menggantikan seluruh data).
- **Backup & Restore JSON**: Fitur pencadangan data instan format JSON untuk arsip mandiri.

### 4. 📅 Jadwal & Manajemen Wawancara (Interviews)
- Catat tahapan wawancara (HR Interview, User Interview, Technical, Presentation).
- Tanggal, jam, nama interviewer, tautan Google Meet/Zoom, dan catatan persiapan.
- Checklist status selesai (*Completed*) dengan integrasi otomatis ke kartu lamaran.

### 5. 📊 Dashboard Analytics & Statistik
- KPI Ringkasan: Total lamaran, active pipeline, tingkat interview, dan tawaran kerja.
- Conversion Funnel visual dari Applied hingga Offer.
- Tracking sumber rujukan lamaran (LinkedIn, Jobstreet, Deals, Friends, Website).
- Pengingat follow-up pending dan interview yang akan datang.

### 6. 🌓 Personalisasi & Dark Mode
- Dukungan Light Mode dan Dark Mode dengan transisi halus.
- Workspace title dan target lamaran harian yang dapat disesuaikan dan tersimpan di database.

---

## 🛠️ Tech Stack

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 14.2 (App Router) | React Server Components & API Routes |
| **Bahasa** | TypeScript 5 | Strict typing di seluruh layer |
| **Styling** | Tailwind CSS | SaaS styling, subtle shadows, custom bg-dots |
| **Autentikasi** | NextAuth.js v4 + Google Provider | Google OAuth 2.0 flow |
| **Database & ORM** | SQLite + Prisma 6 | Database lokal persisten per akun pengguna |
| **Excel Engine** | ExcelJS | Manipulasi workbook & preservasi template Excel |
| **Icons** | Lucide React | Minimalist icon set |

---

## ⚙️ Panduan Konfigurasi Google OAuth 2.0

Untuk mengaktifkan fitur **Sign in with Google**:

### 1. Buat Kredensial di Google Cloud Console
1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat project baru (misal: `Offerly Job Tracker`).
3. Buka menu **APIs & Services** > **OAuth consent screen**:
   - Pilih User Type: **External**.
   - Masukkan App name (`Offerly`) dan User support email Anda.
4. Buka menu **APIs & Services** > **Credentials**:
   - Klik **Create Credentials** > **OAuth client ID**.
   - Application type: **Web application**.
   - Name: `Offerly Web Client`.
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
5. Salin **Client ID** dan **Client Secret** yang dihasilkan.

### 2. Atur File Environment (`.env`)
Buat atau edit file `.env` di root project:

```bash
# SQLite Database Connection
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="c1ca333e664d738aa00118a132615619a62ff80bd1b4b7ae4e50bc0808dfe6cb"

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID="<YOUR_GOOGLE_CLIENT_ID>"
GOOGLE_CLIENT_SECRET="<YOUR_GOOGLE_CLIENT_SECRET>"
```

*(Template tersedia di `.env.example`)*

---

## 🚀 Menjalankan Project

### 1. Install Dependensi
```bash
npm install
```

### 2. Migrasi / Sinkronisasi Database SQLite
```bash
npx prisma db push
```

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000). Anda akan diarahkan ke halaman login untuk masuk dengan akun Google Anda.

---

## 🧪 Pengujian & Kualitas Kode

Proyek ini telah melalui verifikasi menyeluruh:

- **Linting**:
  ```bash
  npm run lint
  ```
  *(0 warnings, 0 errors)*

- **Unit & Excel Tests**:
  ```bash
  npm test
  ```
  *(Memverifikasi struktur sheet, pemetaan header, proteksi shared formula, dan re-read workbook)*

- **Production Build**:
  ```bash
  npm run build
  ```
  *(Kompilasi TypeScript, routing dinamis, dan optimasi aset berhasil 100%)*
