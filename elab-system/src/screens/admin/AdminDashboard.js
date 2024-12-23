import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';

const AdminDashboard = () => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 25,
      results: [
        
        {
          date: '2024-01-15',
          type: 'IgG',
          value: 15.2,
          trend: 'up',
        },
        {
          date: '2024-01-01',
          type: 'IgG',
          value: 14.1,
          trend: 'stable',
        },
      ],
    },
  ]);

  const getTrendSymbol = (trend) => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '↔';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Admin Dashboard</Title>
      
      <Card style={styles.searchCard}>
        <Card.Content>
          <Title>Search Patient Records</Title>
          <TextInput
            label="Patient Name"
            value={patientName}
            onChangeText={setPatientName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Patient Age"
            value={patientAge}
            onChangeText={setPatientAge}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={() => {/* TODO: Implement search */}}>
            Search
          </Button>
        </Card.Content>
      </Card>

      {searchResults.map((patient) => (
        <Card key={patient.id} style={styles.resultCard}>
          <Card.Content>
            <Title>{patient.name}</Title>
            <Paragraph>Age: {patient.age}</Paragraph>
            
            {patient.results.map((result, index) => (
              <View key={index} style={styles.resultItem}>
                <Paragraph>
                  {result.date} - {result.type}: {result.value} {getTrendSymbol(result.trend)}
                </Paragraph>
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}

      <Button
        mode="contained"
        onPress={() => {/* TODO: Implement logout */}}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchCard: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  resultCard: {
    marginBottom: 10,
  },
  resultItem: {
    marginTop: 5,
    paddingLeft: 10,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default AdminDashboard;
