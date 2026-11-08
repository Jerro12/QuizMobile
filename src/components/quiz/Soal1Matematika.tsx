import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

export default function Soal1Matematika() {
  const [angka1, setAngka1] = useState<string>('');
  const [angka2, setAngka2] = useState<string>('');
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/'>('+');
  const [hasil, setHasil] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const operators: ('+' | '-' | '*' | '/')[] = ['+', '-', '*', '/'];

  const hitung = () => {
    if (angka1.trim() === '' || angka2.trim() === '') {
      setHasil('Masukkan kedua angka terlebih dahulu');
      return;
    }

    const num1 = parseFloat(angka1);
    const num2 = parseFloat(angka2);

    if (isNaN(num1) || isNaN(num2)) {
      setHasil('Input harus berupa angka yang valid');
      return;
    }

    let result = 0;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          setHasil('Error: Pembagian dengan 0 tidak diperbolehkan');
          return;
        }
        result = num1 / num2;
        break;
    }

    // Tampilkan format angka yang bersih (jika desimal panjang batasi 4 digit)
    const formattedResult = Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toFixed(4)).toString();

    setHasil(formattedResult);
  };

  const reset = () => {
    setAngka1('');
    setAngka2('');
    setOperator('+');
    setHasil(null);
    setDropdownOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Soal 1: Operasi Matematika</Text>
        <Text style={styles.subtitle}>
          Penjumlahan (+), Pengurangan (-), Perkalian (*), dan Pembagian (/)
        </Text>
      </View>

      {/* Box Tampilan Sesuai Screenshot */}
      <View style={styles.canvasCard}>
        <View style={styles.formRow}>
          {/* Sisi Kiri: Input Angka 1 dan Angka 2 */}
          <View style={styles.inputsColumn}>
            <TextInput
              style={styles.input}
              placeholder="Angka 1"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={angka1}
              onChangeText={(text) => {
                setAngka1(text);
                setHasil(null);
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Angka 2"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={angka2}
              onChangeText={(text) => {
                setAngka2(text);
                setHasil(null);
              }}
            />
          </View>

          {/* Sisi Kanan: Dropdown Operator & Tombol Hitung Sesuai Gambar */}
          <View style={styles.actionColumn}>
            {/* Operator Dropdown Trigger */}
            <View style={styles.operatorContainer}>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setDropdownOpen(!dropdownOpen)}
                activeOpacity={0.7}>
                <Text style={styles.dropdownTriggerText}>{operator}</Text>
                <Text style={styles.dropdownArrow}>▾</Text>
              </TouchableOpacity>

              {/* Tombol Hitung */}
              <TouchableOpacity
                style={styles.btnHitung}
                onPress={hitung}
                activeOpacity={0.8}>
                <Text style={styles.btnHitungText}>Hitung</Text>
              </TouchableOpacity>
            </View>

            {/* Menu Pop-up Pilihan Operator */}
            {dropdownOpen && (
              <View style={styles.dropdownMenu}>
                {operators.map((op) => (
                  <TouchableOpacity
                    key={op}
                    style={[
                      styles.dropdownItem,
                      operator === op && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setOperator(op);
                      setDropdownOpen(false);
                    }}>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        operator === op && styles.dropdownItemTextSelected,
                      ]}>
                      {op}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Tampilan Hasil */}
        <View style={styles.hasilContainer}>
          <Text style={styles.hasilLabel}>
            Hasil: {hasil !== null ? <Text style={styles.hasilValue}>{hasil}</Text> : ''}
          </Text>
        </View>
      </View>

      {/* Kontrol Tambahan & Petunjuk Operasi */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Pilih Operator Cepat:</Text>
        <View style={styles.quickOpsRow}>
          {operators.map((op) => (
            <TouchableOpacity
              key={op}
              style={[
                styles.quickOpBtn,
                operator === op && styles.quickOpBtnActive,
              ]}
              onPress={() => setOperator(op)}>
              <Text
                style={[
                  styles.quickOpText,
                  operator === op && styles.quickOpTextActive,
                ]}>
                {op === '+' && '+ (Tambah)'}
                {op === '-' && '- (Kurang)'}
                {op === '*' && '× (Kali)'}
                {op === '/' && '÷ (Bagi)'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.btnReset} onPress={reset}>
          <Text style={styles.btnResetText}>Reset Nilai</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  canvasCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    zIndex: 10,
  },
  inputsColumn: {
    flex: 1,
    maxWidth: 240,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    color: '#111',
    backgroundColor: '#fff',
    height: 40,
  },
  actionColumn: {
    position: 'relative',
    zIndex: 20,
  },
  operatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 48, // Sejajar dengan Angka 2 seperti di gambar soal
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 38,
    minWidth: 54,
    backgroundColor: '#fff',
  },
  dropdownTriggerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
  },
  btnHitung: {
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  btnHitungText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 90,
    left: 0,
    width: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 2,
    zIndex: 999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownItemSelected: {
    backgroundColor: '#0d6efd',
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dropdownItemTextSelected: {
    color: '#ffffff',
  },
  hasilContainer: {
    marginTop: 24,
    paddingTop: 12,
  },
  hasilLabel: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#000',
  },
  hasilValue: {
    fontWeight: 'bold',
    color: '#0d6efd',
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 10,
  },
  quickOpsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  quickOpBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  quickOpBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  quickOpText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  quickOpTextActive: {
    color: '#ffffff',
  },
  btnReset: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  btnResetText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
});

