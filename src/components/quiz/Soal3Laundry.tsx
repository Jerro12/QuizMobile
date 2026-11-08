import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

export interface TransaksiLaundry {
  id: string;
  nomorTransaksi: string;
  tanggalMasuk: string;
  pelanggan: string;
  paketLaundry: 'regular' | 'express';
  hargaPaket: number;
  berat: number;
  totalBiaya: number;
  status: 'lagi proses' | 'selesai';
}

const HARGA_PAKET = {
  regular: 7000,
  express: 12000,
};

export default function Soal3Laundry() {
  // Tanggal hari ini
  const today = new Date().toISOString().split('T')[0];

  // State Form Transaksi
  const [nomorTransaksi, setNomorTransaksi] = useState<string>('TRX-003');
  const [tanggalMasuk, setTanggalMasuk] = useState<string>(today);
  const [pelanggan, setPelanggan] = useState<string>('');
  const [paketLaundry, setPaketLaundry] = useState<'regular' | 'express'>('regular');
  const [berat, setBerat] = useState<string>('');
  const [status, setStatus] = useState<'lagi proses' | 'selesai'>('lagi proses');

  // State Daftar Transaksi (Laporan Transaksi Laundry)
  // Menyediakan beberapa data awal agar laporan langsung terisi saat dites dosen
  const [daftarTransaksi, setDaftarTransaksi] = useState<TransaksiLaundry[]>([
    {
      id: '1',
      nomorTransaksi: 'TRX-001',
      tanggalMasuk: '2026-11-06',
      pelanggan: 'Budi Santoso',
      paketLaundry: 'regular',
      hargaPaket: 7000,
      berat: 4,
      totalBiaya: 28000,
      status: 'selesai',
    },
    {
      id: '2',
      nomorTransaksi: 'TRX-002',
      tanggalMasuk: '2026-11-07',
      pelanggan: 'Siti Rahma',
      paketLaundry: 'express',
      hargaPaket: 12000,
      berat: 2.5,
      totalBiaya: 30000,
      status: 'lagi proses',
    },
  ]);

  // Perhitungan Realtime Total Biaya = Berat × Harga Paket
  const beratNumber = parseFloat(berat) || 0;
  const hargaPerKg = HARGA_PAKET[paketLaundry];
  const estimasiTotalBiaya = beratNumber * hargaPerKg;

  // Filter tampilan laporan
  const [filterStatus, setFilterStatus] = useState<'semua' | 'lagi proses' | 'selesai'>('semua');

  const simpanTransaksi = () => {
    if (!nomorTransaksi.trim()) {
      alertMsg('Peringatan', 'Nomor Transaksi tidak boleh kosong');
      return;
    }
    if (!pelanggan.trim()) {
      alertMsg('Peringatan', 'Nama Pelanggan harus diisi');
      return;
    }
    if (beratNumber <= 0) {
      alertMsg('Peringatan', 'Berat cucian harus lebih besar dari 0 Kg');
      return;
    }

    const transaksiBaru: TransaksiLaundry = {
      id: Date.now().toString(),
      nomorTransaksi: nomorTransaksi.trim(),
      tanggalMasuk: tanggalMasuk.trim() || today,
      pelanggan: pelanggan.trim(),
      paketLaundry,
      hargaPaket: hargaPerKg,
      berat: beratNumber,
      totalBiaya: estimasiTotalBiaya,
      status,
    };

    setDaftarTransaksi([transaksiBaru, ...daftarTransaksi]);

    // Format auto increment nomor transaksi selanjutnya
    const nextNumber = daftarTransaksi.length + 4;
    setNomorTransaksi(`TRX-00${nextNumber}`);
    setPelanggan('');
    setBerat('');
    setStatus('lagi proses');

    alertMsg('Sukses', `Transaksi ${transaksiBaru.nomorTransaksi} berhasil ditambahkan ke Laporan!`);
  };

  const toggleStatusTransaksi = (id: string) => {
    setDaftarTransaksi((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'lagi proses' ? 'selesai' : 'lagi proses';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const hapusTransaksi = (id: string) => {
    setDaftarTransaksi((prev) => prev.filter((item) => item.id !== id));
  };

  const alertMsg = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Statistik untuk Laporan
  const totalTransaksi = daftarTransaksi.length;
  const totalPendapatan = daftarTransaksi.reduce((acc, curr) => acc + curr.totalBiaya, 0);
  const totalBerat = daftarTransaksi.reduce((acc, curr) => acc + curr.berat, 0);
  const prosesCount = daftarTransaksi.filter((t) => t.status === 'lagi proses').length;
  const selesaiCount = daftarTransaksi.filter((t) => t.status === 'selesai').length;

  const transaksiFiltered =
    filterStatus === 'semua'
      ? daftarTransaksi
      : daftarTransaksi.filter((t) => t.status === filterStatus);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Aplikasi */}
      <View style={styles.header}>
        <Text style={styles.title}>Soal 3: Aplikasi Laundry</Text>
        <Text style={styles.subtitle}>
          Form Input Transaksi & Laporan Transaksi Laundry
        </Text>
      </View>

      {/* ============================================================== */}
      {/* BAGIAN 1: FORM INPUT TRANSAKSI LAUNDRY */}
      {/* ============================================================== */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>Input Transaksi Laundry</Text>

        {/* Nomor Transaksi */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nomor Transaksi</Text>
          <TextInput
            style={styles.input}
            value={nomorTransaksi}
            onChangeText={setNomorTransaksi}
            placeholder="Contoh: TRX-001"
            placeholderTextColor="#999"
          />
        </View>

        {/* Tanggal Masuk */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tanggal Masuk</Text>
          <TextInput
            style={styles.input}
            value={tanggalMasuk}
            onChangeText={setTanggalMasuk}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </View>

        {/* Pelanggan */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pelanggan (Nama)</Text>
          <TextInput
            style={styles.input}
            value={pelanggan}
            onChangeText={setPelanggan}
            placeholder="Masukkan nama pelanggan"
            placeholderTextColor="#999"
          />
        </View>

        {/* Paket Laundry (Regular / Express) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Paket Laundry</Text>
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={[
                styles.radioBtn,
                paketLaundry === 'regular' && styles.radioBtnActive,
              ]}
              onPress={() => setPaketLaundry('regular')}>
              <Text
                style={[
                  styles.radioBtnText,
                  paketLaundry === 'regular' && styles.radioBtnTextActive,
                ]}>
                Regular (Rp 7.000 / Kg)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.radioBtn,
                paketLaundry === 'express' && styles.radioBtnActive,
              ]}
              onPress={() => setPaketLaundry('express')}>
              <Text
                style={[
                  styles.radioBtnText,
                  paketLaundry === 'express' && styles.radioBtnTextActive,
                ]}>
                Express (Rp 12.000 / Kg)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Berat (Kg) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Berat (Kg)</Text>
          <TextInput
            style={styles.input}
            value={berat}
            onChangeText={setBerat}
            placeholder="Contoh: 3.5"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Perhitungan Total Biaya = Berat × Harga Paket */}
        <View style={styles.calcPreviewCard}>
          <Text style={styles.calcFormulaText}>
            Rumus: {beratNumber || 0} Kg × Rp {hargaPerKg.toLocaleString('id-ID')}
          </Text>
          <View style={styles.totalBiayaRow}>
            <Text style={styles.totalBiayaLabel}>Total Biaya:</Text>
            <Text style={styles.totalBiayaValue}>
              Rp {estimasiTotalBiaya.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Status (Lagi Proses, Selesai) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status Laundry</Text>
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={[
                styles.statusChip,
                status === 'lagi proses' && styles.statusChipProsesActive,
              ]}
              onPress={() => setStatus('lagi proses')}>
              <Text
                style={[
                  styles.statusChipText,
                  status === 'lagi proses' && styles.statusChipTextActive,
                ]}>
                ⏳ Lagi Proses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusChip,
                status === 'selesai' && styles.statusChipSelesaiActive,
              ]}
              onPress={() => setStatus('selesai')}>
              <Text
                style={[
                  styles.statusChipText,
                  status === 'selesai' && styles.statusChipTextActive,
                ]}>
                ✓ Selesai
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tombol Simpan Transaksi */}
        <TouchableOpacity
          style={styles.btnSimpan}
          onPress={simpanTransaksi}
          activeOpacity={0.8}>
          <Text style={styles.btnSimpanText}>Simpan Transaksi</Text>
        </TouchableOpacity>
      </View>

      {/* ============================================================== */}
      {/* BAGIAN 2: LAPORAN TRANSAKSI LAUNDRY */}
      {/* ============================================================== */}
      <View style={styles.laporanSection}>
        <View style={styles.laporanHeader}>
          <Text style={styles.laporanTitle}>📋 Laporan Transaksi Laundry</Text>
          <Text style={styles.laporanSubtitle}>
            Rekapitulasi seluruh transaksi yang masuk & selesai
          </Text>
        </View>

        {/* Statistik Ringkasan */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Transaksi</Text>
            <Text style={styles.statValue}>{totalTransaksi}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Berat</Text>
            <Text style={styles.statValue}>{totalBerat} Kg</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxHighlight]}>
            <Text style={styles.statLabelHighlight}>Total Pendapatan</Text>
            <Text style={styles.statValueHighlight}>
              Rp {totalPendapatan.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Filter Status */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Filter:</Text>
          {(['semua', 'lagi proses', 'selesai'] as const).map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterBtn,
                filterStatus === f && styles.filterBtnActive,
              ]}
              onPress={() => setFilterStatus(f)}>
              <Text
                style={[
                  styles.filterBtnText,
                  filterStatus === f && styles.filterBtnTextActive,
                ]}>
                {f === 'semua'
                  ? `Semua (${totalTransaksi})`
                  : f === 'lagi proses'
                  ? `Proses (${prosesCount})`
                  : `Selesai (${selesaiCount})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List Transaksi */}
        {transaksiFiltered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada data transaksi</Text>
          </View>
        ) : (
          <View style={styles.transaksiList}>
            {transaksiFiltered.map((item) => (
              <View key={item.id} style={styles.transaksiCard}>
                <View style={styles.cardTopRow}>
                  <View>
                    <Text style={styles.trxNo}>{item.nomorTransaksi}</Text>
                    <Text style={styles.trxDate}>📅 {item.tanggalMasuk}</Text>
                  </View>
                  <View
                    style={[
                      styles.badgeStatus,
                      item.status === 'selesai'
                        ? styles.badgeStatusSelesai
                        : styles.badgeStatusProses,
                    ]}>
                    <Text
                      style={[
                        styles.badgeStatusText,
                        item.status === 'selesai'
                          ? styles.badgeStatusTextSelesai
                          : styles.badgeStatusTextProses,
                      ]}>
                      {item.status === 'selesai' ? '✓ Selesai' : '⏳ Lagi Proses'}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Detail Pelanggan & Paket */}
                <View style={styles.trxDetails}>
                  <View style={styles.trxRow}>
                    <Text style={styles.detailKey}>Pelanggan:</Text>
                    <Text style={styles.detailVal}>{item.pelanggan}</Text>
                  </View>
                  <View style={styles.trxRow}>
                    <Text style={styles.detailKey}>Paket:</Text>
                    <Text style={styles.detailVal}>
                      {item.paketLaundry === 'express' ? 'Express (1 Hari)' : 'Regular (2-3 Hari)'}
                    </Text>
                  </View>
                  <View style={styles.trxRow}>
                    <Text style={styles.detailKey}>Berat:</Text>
                    <Text style={styles.detailVal}>{item.berat} Kg</Text>
                  </View>
                  <View style={styles.trxRow}>
                    <Text style={styles.detailKey}>Biaya ({item.berat} × Rp {item.hargaPaket.toLocaleString('id-ID')}):</Text>
                    <Text style={styles.totalBiayaItem}>
                      Rp {item.totalBiaya.toLocaleString('id-ID')}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Tombol Aksi */}
                <View style={styles.trxActions}>
                  <TouchableOpacity
                    style={styles.btnToggleStatus}
                    onPress={() => toggleStatusTransaksi(item.id)}>
                    <Text style={styles.btnToggleStatusText}>
                      Ubah Status ({item.status === 'selesai' ? 'Set Proses' : 'Set Selesai'})
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnHapus}
                    onPress={() => hapusTransaksi(item.id)}>
                    <Text style={styles.btnHapusText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 70,
    backgroundColor: '#f8fafc',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 24,
  },
  cardSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 15,
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  radioRow: {
    flexDirection: 'row',
    gap: 10,
  },
  radioBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  radioBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  radioBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
  },
  radioBtnTextActive: {
    color: '#ffffff',
  },
  calcPreviewCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  calcFormulaText: {
    fontSize: 12,
    color: '#1e40af',
    marginBottom: 4,
  },
  totalBiayaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalBiayaLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  totalBiayaValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  statusChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  statusChipProsesActive: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  statusChipSelesaiActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#22c55e',
  },
  statusChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  statusChipTextActive: {
    color: '#0f172a',
  },
  btnSimpan: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  btnSimpanText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  laporanSection: {
    marginTop: 4,
  },
  laporanHeader: {
    marginBottom: 14,
  },
  laporanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  laporanSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  statBoxHighlight: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabelHighlight: {
    fontSize: 11,
    color: '#15803d',
    marginBottom: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statValueHighlight: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#15803d',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  filterLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  filterBtnActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  filterBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  filterBtnTextActive: {
    color: '#ffffff',
  },
  emptyContainer: {
    padding: 30,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  transaksiList: {
    gap: 12,
  },
  transaksiCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trxNo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  trxDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  badgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeStatusProses: {
    backgroundColor: '#fef3c7',
  },
  badgeStatusSelesai: {
    backgroundColor: '#dcfce7',
  },
  badgeStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeStatusTextProses: {
    color: '#b45309',
  },
  badgeStatusTextSelesai: {
    color: '#15803d',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 10,
  },
  trxDetails: {
    gap: 4,
  },
  trxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailKey: {
    fontSize: 13,
    color: '#64748b',
  },
  detailVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },
  totalBiayaItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
  trxActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  btnToggleStatus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
  },
  btnToggleStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  btnHapus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
  btnHapusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc2626',
  },
});

