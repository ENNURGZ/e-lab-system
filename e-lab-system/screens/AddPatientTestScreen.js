import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from '../styles/commonStyles';

const AddPatientTestScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={[commonStyles.container, styles.container]}>
      <View style={commonStyles.header}>
        <TouchableOpacity 
          style={commonStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={commonStyles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Yeni Test Ekle</Text>
      </View>

      <ScrollView style={commonStyles.contentContainer}>
        <View style={[commonStyles.card, styles.welcomeCard]}>
          <Text style={styles.welcomeText}>Yeni Hasta Testi Ekleme</Text>
          <Text style={styles.descriptionText}>
            Bu sayfada hastalara ait yeni test sonuçlarını sisteme ekleyebilirsiniz.
          </Text>
        </View>

        <View style={[commonStyles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Test Bilgileri</Text>
          <View style={styles.divider} />
          <Text style={styles.helperText}>
            Lütfen test ve hasta bilgilerini eksiksiz doldurunuz.
          </Text>
        </View>

        <View style={[commonStyles.card, styles.infoCard]}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
          <Text style={styles.infoText}>
            Test sonuçları sisteme eklendikten sonra düzenlenemez. Lütfen bilgileri 
            dikkatli bir şekilde kontrol ediniz.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcomeCard: {
    backgroundColor: colors.primary,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
  formCard: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 15,
  },
  helperText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  infoCard: {
    marginTop: 20,
    backgroundColor: '#FFF9C4',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIconText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
});

export default AddPatientTestScreen;
