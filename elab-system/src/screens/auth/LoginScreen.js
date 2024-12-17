// Giriş ekranı bileşeni
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  // Form state yönetimi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Giriş işlemi
  const handleLogin = async () => {
    // TODO: Firebase authentication entegrasyonu yapılacak
    try {
      // Geçici yönlendirme mantığı (gerçek auth ile değiştirilecek)
      if (email === 'admin@elab.com') {
        navigation.replace('AdminDashboard');
      } else {
        navigation.replace('UserDashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Lab System</Text>
      {/* Email giriş alanı */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      {/* Şifre giriş alanı */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      {/* Giriş butonu */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      {/* Kayıt sayfasına yönlendirme butonu */}
      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      >
        Register
      </Button>
    </View>
  );
};

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
