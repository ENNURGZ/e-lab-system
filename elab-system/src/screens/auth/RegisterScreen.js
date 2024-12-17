// Kayıt ekranı bileşeni
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  // Form state yönetimi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Kayıt işlemi
  const handleRegister = async () => {
    // TODO: Firebase ile kullanıcı kaydı yapılacak
    try {
      // Geçici yönlendirme (Firebase entegrasyonu sonrası değişecek)
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      {/* İsim-soyisim giriş alanı */}
      <TextInput
        label="Tam İsim"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
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
        label="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      {/* Kayıt butonu */}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Kayıt Ol
      </Button>
      {/* Giriş sayfasına dönüş butonu */}
      <Button
        mode="text"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        Giriş Sayfasına Dön
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

export default RegisterScreen;
