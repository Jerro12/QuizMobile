import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dokumentasi Quiz</Text>
          <Text style={styles.subtitle}>
            Rincian Implementasi Fitur & Rumus Perhitungan
          </Text>
        </View>

        {/* Soal 1 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.badge}>Soal 1</Text>
            <Text style={styles.cardTitle}>Operasi Matematika</Text>
          </View>
          <Text style={styles.cardDesc}>
            Aplikasi kalkulator dengan operasi dasar matematika sesuai desain mockup:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Input: Angka 1 dan Angka 2</Text>
            <Text style={styles.listItem}>
              • Operator Dropdown: Penjumlahan (+), Pengurangan (-), Perkalian (*), Pembagian (/)
            </Text>
            <Text style={styles.listItem}>
              • Penanganan error: Validasi input kosong dan proteksi pembagian dengan angka 0.
            </Text>
            <Text style={styles.listItem}>
              • Tombol Hitung & Output label "Hasil: [nilai]".
            </Text>
          </View>
        </View>

        {/* Soal 2 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[styles.badge, styles.badgeBlue]}>Soal 2</Text>
            <Text style={styles.cardTitle}>Aplikasi Penggajian</Text>
          </View>
          <Text style={styles.cardDesc}>
            Perhitungan gaji karyawan dengan tambahan 3 TextInput sesuai soal:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Komponen Form: ID Pegawai, Nama Karyawan, Jabatan</Text>
            <Text style={styles.listItem}>• Penghasilan: Gaji Pokok, Tunjangan, Bonus</Text>
            <Text style={styles.listItem}>
              • <Text style={styles.boldText}>3 Input Tambahan:</Text> tunjangan_istri, tunjangan_anak, dan kasbon
            </Text>
            <Text style={styles.listItem}>
              • <Text style={styles.boldText}>Rumus:</Text> (Gaji Pokok + Tunjangan + Bonus + Tunjangan Istri + Tunjangan Anak) - Kasbon
            </Text>
            <Text style={styles.listItem}>
              • Tampilan Card "Rincian Pendapatan" dengan border aksen biru dan rincian lengkap pendapatan karyawan.
            </Text>
          </View>
        </View>

        {/* Soal 3 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[styles.badge, styles.badgeGreen]}>Soal 3</Text>
            <Text style={styles.cardTitle}>Aplikasi & Laporan Laundry</Text>
          </View>
          <Text style={styles.cardDesc}>
            Manajemen transaksi laundry dan laporan rekapitulasi data:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              • Data: Nomor Transaksi, Tanggal Masuk, Pelanggan, Paket Laundry (Express / Regular), Berat (Kg), Status (Lagi Proses / Selesai)
            </Text>
            <Text style={styles.listItem}>
              • <Text style={styles.boldText}>Rumus Total Biaya:</Text> Berat (Kg) × Harga Paket
            </Text>
            <Text style={styles.listItem}>
              • Laporan Transaksi Laundry: Ringkasan pendapatan, total berat cucian, filter status, riwayat transaksi, dan aksi ubah status.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeBlue: {
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
  },
  badgeGreen: {
    backgroundColor: '#ecfdf5',
    color: '#047857',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  cardDesc: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 18,
  },
  list: {
    gap: 6,
    paddingLeft: 4,
  },
  listItem: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
    color: '#0f172a',
  },
});
