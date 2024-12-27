import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from '../styles/commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const TestQueryScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('test'); // 'test' veya 'patient'
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');
  const [tcNo, setTcNo] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);
  };

  const renderTestQuery = () => (
    <>
      <View style={[commonStyles.card, styles.searchCard]}>
        <Text style={styles.sectionTitle}>Test Ara</Text>
        <View style={styles.divider} />
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Doğum Tarihi</Text>
          <TouchableOpacity 
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {birthDate.toLocaleDateString('tr-TR')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tetkik Adı</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTest}
              onValueChange={(itemValue) => setSelectedTest(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Tetkik Seçiniz" value="" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={[commonStyles.card, styles.resultCard]}>
        <Text style={styles.sectionTitle}>Test Sonuçları</Text>
        <View style={styles.divider} />
        <View style={styles.resultContainer}>
          <Text style={styles.noResultText}>Henüz sonuç bulunmamaktadır.</Text>
        </View>
      </View>
    </>
  );

  const renderPatientQuery = () => (
    <>
      <View style={[commonStyles.card, styles.searchCard]}>
        <Text style={styles.sectionTitle}>Hasta Ara</Text>
        <View style={styles.divider} />
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>T.C. Kimlik No</Text>
          <TextInput
            style={styles.textInput}
            value={tcNo}
            onChangeText={setTcNo}
            placeholder="T.C. Kimlik No giriniz"
            keyboardType="numeric"
            maxLength={11}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tetkik Adı</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTest}
              onValueChange={(itemValue) => setSelectedTest(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Tetkik Seçiniz" value="" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={[commonStyles.card, styles.resultCard]}>
        <Text style={styles.sectionTitle}>Hasta ve Test Sonuçları</Text>
        <View style={styles.divider} />
        <View style={styles.resultContainer}>
          <Text style={styles.noResultText}>Hasta bilgisi bulunamadı.</Text>
        </View>
      </View>

      <View style={[commonStyles.card, styles.resultCard]}>
        <Text style={styles.sectionTitle}>Test Sonuçları</Text>
        <View style={styles.divider} />
        <View style={styles.resultContainer}>
          <Text style={styles.noResultText}>Test sonucu bulunamadı.</Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={[commonStyles.container, styles.container]}>
      <View style={commonStyles.header}>
        <TouchableOpacity 
          style={commonStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={commonStyles.backButtonText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Test Sorgulama</Text>
      </View>

      <ScrollView style={commonStyles.contentContainer}>
        <View style={[commonStyles.card, styles.welcomeCard]}>
          <Text style={styles.welcomeText}>Test Sorgulama</Text>
          <Text style={styles.descriptionText}>
            Bu sayfada laboratuvar test sonuçlarını ve istatistiklerini sorgulayabilirsiniz.
          </Text>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, activeTab === 'test' && styles.activeFilter]}
            onPress={() => setActiveTab('test')}
          >
            <Text style={activeTab === 'test' ? styles.activeFilterText : styles.filterText}>
              Test Sorgulama
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, activeTab === 'patient' && styles.activeFilter]}
            onPress={() => setActiveTab('patient')}
          >
            <Text style={activeTab === 'patient' ? styles.activeFilterText : styles.filterText}>
              Hasta Sorgulama
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'test' ? renderTestQuery() : renderPatientQuery()}

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  searchCard: {
    marginBottom: 20,
  },
  resultCard: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
  resultContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default TestQueryScreen;
