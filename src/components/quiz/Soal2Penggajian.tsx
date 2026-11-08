import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

interface RincianData {
  idPegawai: string;
  namaKaryawan: string;
  jabatan: string;
  gajiPokok: number;
  tunjangan: number;
  bonus: number;
  tunjanganIstri: number;
  tunjanganAnak: number;
  kasbon: number;
  total: number;
}

export default function Soal2Penggajian() {
  // State form input sesuai foto dan tambahan 3 komponen
  const [idPegawai, setIdPegawai] = useState<string>('STFK2134');
  const [namaKaryawan, setNamaKaryawan] = useState<string>('Andri Budiarto');
  const [jabatan, setJabatan] = useState<string>('Staf Keuangan');
  const [gajiPokok, setGajiPokok] = useState<string>('200');
  const [tunjangan, setTunjangan] = useState<string>('100');
  const [bonus, setBonus] = useState<string>('80');

  // 3 Komponen TextInput tambahan sesuai soal:
  const [tunjanganIstri, setTunjanganIstri] = useState<string>('0');
  const [tunjanganAnak, setTunjanganAnak] = useState<string>('0');
  const [kasbon, setKasbon] = useState<string>('0');

  // State untuk menampung rincian hasil perhitungan
  const [rincian, setRincian] = useState<RincianData | null>({
    idPegawai: 'STFK2134',
    namaKaryawan: 'Andri Budiarto',
    jabatan: 'Staf Keuangan',
    gajiPokok: 200,
    tunjangan: 100,
    bonus: 80,
    tunjanganIstri: 0,
    tunjanganAnak: 0,
    kasbon: 0,
    total: 380, // Default persis seperti pada gambar soal
  });

  const hitungTotalPendapatan = () => {
    const gapokNum = parseFloat(gajiPokok) || 0;
    const tunjanganNum = parseFloat(tunjangan) || 0;
    const bonusNum = parseFloat(bonus) || 0;
    const tunjIstriNum = parseFloat(tunjanganIstri) || 0;
    const tunjAnakNum = parseFloat(tunjanganAnak) || 0;
    const kasbonNum = parseFloat(kasbon) || 0;

    // Perhitungan total:
    // Total = Gaji Pokok + Tunjangan + Bonus + Tunjangan Istri + Tunjangan Anak - Kasbon
    const totalPendapatan =
      gapokNum +
      tunjanganNum +
      bonusNum +
      tunjIstriNum +
      tunjAnakNum -
      kasbonNum;

    setRincian({
      idPegawai: idPegawai.trim() || '-',
      namaKaryawan: namaKaryawan.trim() || 'Karyawan',
      jabatan: jabatan.trim() || '-',
      gajiPokok: gapokNum,
      tunjangan: tunjanganNum,
      bonus: bonusNum,
      tunjanganIstri: tunjIstriNum,
      tunjanganAnak: tunjAnakNum,
      kasbon: kasbonNum,
      total: totalPendapatan,
    });
  };

  const resetForm = () => {
    setIdPegawai('');
    setNamaKaryawan('');
    setJabatan('');
    setGajiPokok('');
    setTunjangan('');
    setBonus('');
    setTunjanganIstri('');
    setTunjanganAnak('');
    setKasbon('');
    setRincian(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Aplikasi Penggajian */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aplikasi Penggajian</Text>
      </View>

      {/* Card Form Utama */}
      <View style={styles.cardForm}>
        {/* Field ID Pegawai */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ID Pegawai</Text>
          <TextInput
            style={styles.textInput}
            value={idPegawai}
            onChangeText={setIdPegawai}
            placeholder="Masukkan ID Pegawai"
            placeholderTextColor="#999"
          />
        </View>

        {/* Field Nama Karyawan */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Karyawan</Text>
          <TextInput
            style={styles.textInput}
            value={namaKaryawan}
            onChangeText={setNamaKaryawan}
            placeholder="Masukkan Nama Karyawan"
            placeholderTextColor="#999"
          />
        </View>

        {/* Field Jabatan */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Jabatan</Text>
          <TextInput
            style={styles.textInput}
            value={jabatan}
            onChangeText={setJabatan}
            placeholder="Masukkan Jabatan"
            placeholderTextColor="#999"
          />
        </View>

        {/* Field Gaji Pokok */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gaji Pokok</Text>
          <TextInput
            style={styles.textInput}
            value={gajiPokok}
            onChangeText={setGajiPokok}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Field Tunjangan */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tunjangan</Text>
          <TextInput
            style={styles.textInput}
            value={tunjangan}
            onChangeText={setTunjangan}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Field Bonus */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bonus</Text>
          <TextInput
            style={styles.textInput}
            value={bonus}
            onChangeText={setBonus}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* ============================================================== */}
        {/* 3 KOMPONEN TAMBAHAN SESUAI PERINTAH SOAL */}
        {/* ============================================================== */}
        <View style={styles.additionalBadge}>
          <Text style={styles.additionalBadgeText}>
            ★ 3 Input Tambahan (Soal 2):
          </Text>
        </View>

        {/* Field 1 Tambahan: Tunjangan Istri */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tunjangan Istri (tunjangan_istri)</Text>
          <TextInput
            style={[styles.textInput, styles.additionalInput]}
            value={tunjanganIstri}
            onChangeText={setTunjanganIstri}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Field 2 Tambahan: Tunjangan Anak */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tunjangan Anak (tunjangan_anak)</Text>
          <TextInput
            style={[styles.textInput, styles.additionalInput]}
            value={tunjanganAnak}
            onChangeText={setTunjanganAnak}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Field 3 Tambahan: Kasbon */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kasbon / Pinjaman (kasbon)</Text>
          <TextInput
            style={[styles.textInput, styles.additionalInput]}
            value={kasbon}
            onChangeText={setKasbon}
            placeholder="0 (memotong gaji)"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Tombol Hitung Total Pendapatan */}
        <TouchableOpacity
          style={styles.btnHitung}
          onPress={hitungTotalPendapatan}
          activeOpacity={0.8}>
          <Text style={styles.btnHitungText}>Hitung Total Pendapatan</Text>
        </TouchableOpacity>

        {/* Tombol Reset */}
        <TouchableOpacity style={styles.btnReset} onPress={resetForm}>
          <Text style={styles.btnResetText}>Kosongkan Form</Text>
        </TouchableOpacity>
      </View>

      {/* Card Rincian Pendapatan (Persis Desain Screenshot) */}
      {rincian && (
        <View style={styles.resultCard}>
          <View style={styles.accentBorder} />
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>Rincian Pendapatan</Text>
            <Text style={styles.resultRowText}>Nama: {rincian.namaKaryawan}</Text>
            <Text style={styles.resultRowText}>ID: {rincian.idPegawai}</Text>
            <Text style={styles.resultRowText}>Jabatan: {rincian.jabatan}</Text>

            {/* Rincian Komponen Perhitungan */}
            <View style={styles.divider} />
            <View style={styles.detailList}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>• Gaji Pokok:</Text>
                <Text style={styles.detailVal}>Rp {rincian.gajiPokok.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>• Tunjangan:</Text>
                <Text style={styles.detailVal}>Rp {rincian.tunjangan.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>• Bonus:</Text>
                <Text style={styles.detailVal}>Rp {rincian.bonus.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>• Tunjangan Istri:</Text>
                <Text style={styles.detailVal}>Rp {rincian.tunjanganIstri.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>• Tunjangan Anak:</Text>
                <Text style={styles.detailVal}>Rp {rincian.tunjanganAnak.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: '#dc2626' }]}>• Kasbon (Potongan):</Text>
                <Text style={[styles.detailVal, { color: '#dc2626' }]}>
                  - Rp {rincian.kasbon.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />

            {/* Total Pendapatan */}
            <Text style={styles.totalText}>
              Total: Rp {rincian.total.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 18,
    paddingBottom: 70,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    marginVertical: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#334155',
    letterSpacing: 0.3,
  },
  cardForm: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
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
  textInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 9,
    fontSize: 15,
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  additionalBadge: {
    backgroundColor: '#eff6ff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 12,
    marginTop: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  additionalBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  additionalInput: {
    backgroundColor: '#f8fafc',
    borderColor: '#93c5fd',
  },
  btnHitung: {
    backgroundColor: '#0070f3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0070f3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  btnHitungText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  btnReset: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnResetText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#eaf4fe',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  accentBorder: {
    width: 6,
    backgroundColor: '#0070f3',
  },
  resultContent: {
    flex: 1,
    padding: 16,
  },
  resultTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  resultRowText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#cbd5e1',
    marginVertical: 10,
  },
  detailList: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    color: '#475569',
  },
  detailVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0070f3',
    marginTop: 4,
  },
});

