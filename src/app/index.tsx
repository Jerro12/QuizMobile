import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Soal1Matematika from '@/components/quiz/Soal1Matematika';
import Soal2Penggajian from '@/components/quiz/Soal2Penggajian';
import Soal3Laundry from '@/components/quiz/Soal3Laundry';

type TabType = 'matematika' | 'penggajian' | 'laundry';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('matematika');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Header Aplikasi Quiz */}
      <View style={styles.appHeader}>
        <View>
          <Text style={styles.appTitle}>Quiz Mobile Programming</Text>
          <Text style={styles.appSubtitle}>React Native & Expo Development</Text>
        </View>
      </View>

      {/* Tab Navigasi Soal 1, Soal 2, Soal 3 */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'matematika' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('matematika')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'matematika' && styles.tabButtonTextActive,
            ]}>
            1. Matematika
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'penggajian' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('penggajian')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'penggajian' && styles.tabButtonTextActive,
            ]}>
            2. Penggajian
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'laundry' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('laundry')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'laundry' && styles.tabButtonTextActive,
            ]}>
            3. Laundry
          </Text>
        </TouchableOpacity>
      </View>

      {/* Konten Halaman Sesuai Tab Aktif */}
      <View style={styles.contentArea}>
        {activeTab === 'matematika' && <Soal1Matematika />}
        {activeTab === 'penggajian' && <Soal2Penggajian />}
        {activeTab === 'laundry' && <Soal3Laundry />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  appSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tabButtonActive: {
    backgroundColor: '#0070f3',
    borderColor: '#0070f3',
    shadowColor: '#0070f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  tabButtonTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  contentArea: {
    flex: 1,
  },
});
