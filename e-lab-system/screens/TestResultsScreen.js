import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../context/AppContext';
import { commonStyles, colors } from '../styles/commonStyles';
import { useNavigation } from '@react-navigation/native';

const TEST_TYPES = [
  { label: 'Tüm Tetkiklerim', value: 'all' },
];

const TestResultsScreen = () => {
  const [testResults, setTestResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedTestType, setSelectedTestType] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user } = useApp();
  const navigation = useNavigation();

  useEffect(() => {
    fetchTestResults();
  }, []);

  useEffect(() => {
    filterResults();
  }, [selectedTestType, testResults]);

  const filterResults = () => {
    setFilteredResults(testResults);
  };

  const fetchTestResults = async () => {
    try {
      // Backend API'den test sonuçlarını çekme işlemi
      // Örnek olarak:
      // const response = await fetch(`${API_URL}/test-results/${user.id}`);
      // const data = await response.json();
      // setTestResults(data);
      
      // Şimdilik boş array
      const mockData = [];
      
      setTestResults(mockData);
      setFilteredResults(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Test sonuçları alınırken hata oluştu:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[commonStyles.container, styles.container]}>
      <View style={commonStyles.header}>
        <TouchableOpacity 
          style={commonStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={commonStyles.backButtonText}>Geri</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Test Sonuçlarım</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Tetkik Türü:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTestType}
            onValueChange={(itemValue) => setSelectedTestType(itemValue)}
            style={styles.picker}
          >
            {TEST_TYPES.map((type) => (
              <Picker.Item key={type.value} label={type.label} value={type.value} />
            ))}
          </Picker>
        </View>
      </View>

      <ScrollView style={commonStyles.contentContainer}>
        {filteredResults.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>Henüz test sonucunuz bulunmamaktadır.</Text>
          </View>
        ) : (
          filteredResults.map((test) => (
            <View key={test.id} style={[commonStyles.card, styles.testCard]}>
              <Text style={styles.testName}>{test.testName}</Text>
              <Text style={styles.testDate}>Tarih: {test.date}</Text>
              <Text style={styles.testStatus}>Durum: {test.status}</Text>
              
              <View style={styles.resultsContainer}>
                {Object.entries(test.results).map(([key, value]) => (
                  <View key={key} style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{key}:</Text>
                    <Text style={styles.resultValue}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
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
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
    color: '#333',
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  testCard: {
    padding: 15,
    marginBottom: 15,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  testDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  testStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  resultsContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  resultValue: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  noResultContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default TestResultsScreen;
