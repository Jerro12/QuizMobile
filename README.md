# Quiz Pemrograman Mobile - React Native & Expo

Aplikasi ini dibuat untuk memenuhi tugas Quiz Pemrograman Mobile yang mencakup 3 studi kasus:

1. **Aplikasi Operasi Matematika** (Kalkulator Sederhana)
2. **Aplikasi Penggajian Karyawan** (dengan tambahan 3 input data)
3. **Aplikasi Laundry & Laporan Transaksi Laundry**

---

## 📱 Daftar Fitur & Implementasi

### 1. Soal 1: Operasi Matematika
- **Lokasi File:** `src/components/quiz/Soal1Matematika.tsx`
- **Fitur:**
  - Input `Angka 1` dan `Angka 2`.
  - Dropdown operator matematika:
    - `+` (Penjumlahan)
    - `-` (Pengurangan)
    - `*` (Perkalian)
    - `/` (Pembagian)
  - Tombol **Hitung** untuk memproses hasil operasi.
  - Tampilan teks `Hasil: [nilai]` dengan tipografi yang menyerupai mockup soal.
  - Validasi error input kosong dan pembagian dengan angka 0.

### 2. Soal 2: Aplikasi Penggajian Karyawan
- **Lokasi File:** `src/components/quiz/Soal2Penggajian.tsx`
- **Komponen Form Standar (Sesuai Mockup):**
  - ID Pegawai (default: `STFK2134`)
  - Nama Karyawan (default: `Andri Budiarto`)
  - Jabatan (default: `Staf Keuangan`)
  - Gaji Pokok (default: `200`)
  - Tunjangan (default: `100`)
  - Bonus (default: `80`)
- **3 Komponen `TextInput` Tambahan Sesuai Soal:**
  1. `tunjangan_istri` (Tunjangan Istri)
  2. `tunjangan_anak` (Tunjangan Anak)
  3. `kasbon` (Kasbon / Pinjaman)
- **Rumus Perhitungan:**
  ```
  Total Pendapatan = (Gaji Pokok + Tunjangan + Bonus + Tunjangan Istri + Tunjangan Anak) - Kasbon
  ```
- **Tampilan Hasil:**
  - Card "Rincian Pendapatan" dengan styling background biru muda (`#eaf4fe`) dan border aksen biru di sisi kiri.
  - Rincian detail pendapatan serta baris `Total: Rp [total]`.

### 3. Soal 3: Aplikasi Laundry & Laporan Transaksi
- **Lokasi File:** `src/components/quiz/Soal3Laundry.tsx`
- **Data yang Diminta:**
  - Nomor Transaksi
  - Tanggal Masuk
  - Pelanggan
  - Paket Laundry (`regular` Rp 7.000/Kg, `express` Rp 12.000/Kg)
  - Berat (Kg)
  - Status (`lagi proses`, `selesai`)
- **Perhitungan Biaya:**
  ```
  Total Biaya = Berat (Kg) × Harga Paket
  ```
- **Laporan Transaksi Laundry:**
  - Ringkasan statistik (Total transaksi, total berat cucian, total pendapatan).
  - Filter status (Semua, Lagi Proses, Selesai).
  - Daftar riwayat transaksi lengkap dengan badge status berwarna, tombol ubah status, dan tombol hapus transaksi.

---

## 🚀 Cara Menjalankan Aplikasi

1. Masuk ke direktori proyek:
   ```bash
   cd QuizMobile
   ```

2. Jalankan Expo development server:
   ```bash
   npx expo start
   ```

3. Pilih perangkat tampilan:
   - Tekan **`w`** di keyboard untuk membuka di **Web Browser**.
   - Tekan **`a`** untuk membuka di **Android Emulator**.
   - Atau scan QR Code di terminal menggunakan aplikasi **Expo Go** pada smartphone Anda.
