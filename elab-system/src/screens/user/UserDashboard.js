import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const UserDashboard = ({ navigation }) => {
  const labResults = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'IgG',
      value: 15.2,
      status: 'high',
    },
    {
      id: 2,
      date: '2024-01-15',
      type: 'IgA',
      value: 2.1,
      status: 'normal',
    },
    {
      id: 3,
      date: '2024-01-15',
      type: 'IgM',
      value: 0.8,
      status: 'low',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'high':
        return '#ff4444';
      case 'low':
        return '#ffbb33';
      default:
        return '#00C851';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>My Lab Results</Title>
      {labResults.map((result) => (
        <Card key={result.id} style={styles.card}>
          <Card.Content>
            <Title>{result.type}</Title>
            <Paragraph>Date: {result.date}</Paragraph>
            <Paragraph style={{ color: getStatusColor(result.status) }}>
              Value: {result.value} ({result.status})
            </Paragraph>
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
  card: {
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default UserDashboard;
