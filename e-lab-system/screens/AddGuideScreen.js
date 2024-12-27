import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from '../styles/commonStyles';

const AddGuideScreen = () => {
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
        <Text style={commonStyles.headerTitle}>Kılavuz Ekle</Text>
      </View>

      <ScrollView style={commonStyles.contentContainer}>
        <View style={[commonStyles.card, styles.welcomeCard]}>
          <Text style={styles.welcomeText}>Kılavuz Ekleme Sayfası</Text>
          <Text style={styles.descriptionText}>
            Bu sayfada sisteme yeni kılavuzlar ve dökümanlar ekleyebilirsiniz.
          </Text>
        </View>

        <View style={[commonStyles.card, styles.formCard]}>
          <Text style={styles.sectionTitle}>Yeni Kılavuz</Text>
          <View style={styles.divider} />
          <Text style={styles.helperText}>
            Lütfen eklemek istediğiniz kılavuz bilgilerini giriniz.
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
});

export default AddGuideScreen;
