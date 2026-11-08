# Quiz Pemrograman Mobile - React Native & Expo

Repositori ini berisi pengerjaan tugas **Quiz Pemrograman Mobile** menggunakan framework **React Native** dan **Expo (TypeScript)**. Di dalam aplikasi ini telah diimplementasikan 3 studi kasus kuis yang terintegrasi rapi dengan navigasi tab switcher.

---

## 👥 Panduan Instalasi (Cloning hingga Running)

Ikuti langkah-langkah di bawah ini untuk mengklon dan menjalankan proyek ini di laptop/komputer lain:

### 1. Prasyarat Sistem
Pastikan laptop sudah terinstall:
- **Node.js** (versi LTS v18, v20, atau v22) &rarr; [Download Node.js](https://nodejs.org/)
- **Git** &rarr; [Download Git](https://git-scm.com/)

Cek apakah sudah terpasang dengan mengetik perintah berikut di terminal:
```bash
node -v
npm -v
git --version
```

---

### 2. Langkah-Langkah Menjalankan Proyek

#### Langkah 1: Kloning Repositori
Buka Terminal / PowerShell / Git Bash, lalu jalankan:
```bash
git clone https://github.com/Jerro12/QuizMobile.git
```

#### Langkah 2: Masuk ke Folder Proyek
```bash
cd QuizMobile
```

#### Langkah 3: Install Seluruh Dependensi (Library)
Karena folder `node_modules` tidak disertakan di GitHub, install seluruh pustaka dependensi proyek:
```bash
npm install
```
*Tunggu proses download library selesai hingga muncul konfirmasi.*

#### Langkah 4: Jalankan Development Server Expo
```bash
npx expo start
```

---

### 3. Cara Membuka / Menjalankan Aplikasi

Setelah perintah `npx expo start` dijalankan dan muncul **QR Code** di terminal:

| Media Preview | Cara Menjalankan |
| :--- | :--- |
| **Web Browser (Laptop)** | Tekan tombol **`w`** di keyboard terminal. Browser akan otomatis terbuka di `http://localhost:8081`. |
| **HP via Expo Go** | 1. Buka aplikasi **Expo Go** di Android/iOS.<br>2. Hubungkan HP dan laptop ke **Wi-Fi yang sama**.<br>3. Scan QR Code di layar terminal. |
| **HP via Browser Chrome** | Buka browser Chrome di HP, ketik: `http://<IP_LAPTOP>:8081` (misal: `http://192.168.1.20:8081`). |
| **Mode Tunnel (Anti-Gagal)** | Jika Wi-Fi memblokir koneksi lokal, jalankan perintah: <br>`npx expo start --tunnel` lalu scan QR Code baru. |
| **Android Emulator** | Tekan tombol **`a`** di keyboard terminal (pastikan Android Studio / emulator sudah siap). |

---

## 📝 Rincian Soal Quiz & Pembahasan

Di halaman utama aplikasi (`src/app/index.tsx`), terdapat navigasi tab di bagian header atas untuk langsung berpindah antar soal:

```
[ 1. Matematika ]   [ 2. Penggajian ]   [ 3. Laundry ]
```

---

### 1. Soal 1: Aplikasi Operasi Matematika
- **Lokasi Kode:** `src/components/quiz/Soal1Matematika.tsx`
- **Deskripsi Soal:**
  Membuat aplikasi operasi matematika sederhana (penjumlahan, pengurangan, perkalian, dan pembagian) sesuai mockup gambar soal.
- **Komponen & Fitur:**
  - Input `Angka 1` (`TextInput`)
  - Input `Angka 2` (`TextInput`)
  - Dropdown Operator di sebelah kanan sejajar Angka 2:
    - `+` (Penjumlahan)
    - `-` (Pengurangan)
    - `*` (Perkalian)
    - `/` (Pembagian)
  - Tombol **Hitung** untuk memproses hasil.
  - Tampilan teks `Hasil: [nilai]` dengan tipografi yang menyerupai mockup soal.
  - **Validasi Khusus:** Dilengkapi validasi input kosong serta proteksi pembagian dengan angka 0 (*Zero Division Error*).
  - Dilengkapi tombol reset nilai dan pemilihan operator cepat.

---

### 2. Soal 2: Aplikasi Penggajian Karyawan
- **Lokasi Kode:** `src/components/quiz/Soal2Penggajian.tsx`
- **Deskripsi Soal:**
  Mendesain form penggajian karyawan sesuai gambar soal, dan **menambahkan 3 komponen `TextInput`** untuk meminta data `tunjangan_istri`, `tunjangan_anak`, dan `kasbon`.
- **Komponen Form:**
  - `ID Pegawai` (default: `STFK2134`)
  - `Nama Karyawan` (default: `Andri Budiarto`)
  - `Jabatan` (default: `Staf Keuangan`)
  - `Gaji Pokok` (default: `200`)
  - `Tunjangan` (default: `100`)
  - `Bonus` (default: `80`)
  - ⭐ **3 Input Tambahan Sesuai Permintaan Soal:**
    1. `Tunjangan Istri` (`tunjangan_istri`)
    2. `Tunjangan Anak` (`tunjangan_anak`)
    3. `Kasbon / Pinjaman` (`kasbon`)
- **Rumus Perhitungan:**
  $$\text{Total Pendapatan} = (\text{Gaji Pokok} + \text{Tunjangan} + \text{Bonus} + \text{Tunjangan Istri} + \text{Tunjangan Anak}) - \text{Kasbon}$$
  *(Kasbon merupakan pinjaman yang memotong gaji karyawan).*
- **Tampilan Hasil (Rincian Pendapatan):**
  - Card berwarna biru muda (`#eaf4fe`) dengan garis vertikal aksen biru di sebelah kiri (`#0070f3`) persis mockup soal.
  - Menampilkan Nama, ID Pegawai, Jabatan, rincian tiap komponen gaji, dan baris tebal **Total: Rp [total]**.

---

### 3. Soal 3: Aplikasi Laundry & Laporan Transaksi
- **Lokasi Kode:** `src/components/quiz/Soal3Laundry.tsx`
- **Deskripsi Soal:**
  Membuat sistem kasir dan pencatatan transaksi laundry beserta pembuatan Laporan Transaksi Laundry.
- **Komponen Data yang Diminta:**
  - `Nomor Transaksi`: Kode unik transaksi (auto-generate / editable).
  - `Tanggal Masuk`: Tanggal penerimaan cucian (default tanggal hari ini).
  - `Pelanggan`: Nama pelanggan laundry.
  - `Paket Laundry`: Pilihan radio/chip:
    - **Regular:** Rp 7.000 / Kg (Estimasi 2-3 hari)
    - **Express:** Rp 12.000 / Kg (Estimasi 1 hari)
  - `Berat (Kg)`: Input angka berat cucian.
  - `Total Biaya`: Terhitung secara otomatis dan realtime.
  - `Status`: Pilihan status cucian (*Lagi Proses* / *Selesai*).
- **Rumus Perhitungan:**
  $$\text{Total Biaya} = \text{Berat (Kg)} \times \text{Harga Paket}$$
- **Fitur Laporan Transaksi Laundry:**
  - **Statistik Rekapitulasi:** Total seluruh transaksi, akumulasi berat cucian (Kg), dan total pendapatan (Rp).
  - **Filter Status:** Filter tampilan transaksi berdasarkan *Semua*, *Lagi Proses*, atau *Selesai*.
  - **Riwayat Transaksi:** Daftar kartu transaksi dengan badge status berwarna (kuning untuk proses, hijau untuk selesai).
  - **Aksi Transaksi:** Tombol ubah status (*Selesaikan/Proses*) dan tombol hapus data transaksi.
  - Sudah dilengkapi data awal (dummy data) sehingga tabel laporan langsung terisi saat didemokan.

---

## 📁 Struktur Direktori Utama

```text
QuizMobile/
├── assets/                  # Asset gambar dan icon aplikasi
├── src/
│   ├── app/
│   │   ├── _layout.tsx      # Layout utama (Stack Navigator)
│   │   ├── index.tsx        # Halaman utama dengan Tab Switcher Soal 1-3
│   │   └── explore.tsx      # Halaman dokumentasi rincian fitur
│   └── components/
│       └── quiz/
│           ├── Soal1Matematika.tsx   # Komponen Soal 1: Kalkulator
│           ├── Soal2Penggajian.tsx   # Komponen Soal 2: Penggajian Karyawan
│           └── Soal3Laundry.tsx      # Komponen Soal 3: Laundry & Laporan
├── app.json                 # Konfigurasi aplikasi Expo
├── package.json             # Manifest dependensi & script proyek
├── tsconfig.json            # Konfigurasi TypeScript
└── README.md                # Dokumentasi lengkap proyek
```

---

## 👨‍💻 Pengembang
- **Nama / Akun GitHub:** [@Jerro12](https://github.com/Jerro12)
- **Repository:** [https://github.com/Jerro12/QuizMobile](https://github.com/Jerro12/QuizMobile)
