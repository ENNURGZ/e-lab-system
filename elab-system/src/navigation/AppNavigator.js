// Ana navigasyon yapısını içeren dosya
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Ekran bileşenlerinin import edilmesi
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import UserDashboard from '../screens/user/UserDashboard';
import AdminDashboard from '../screens/admin/AdminDashboard';

// Stack navigator oluşturulması
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Kimlik doğrulama ekranları */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        
        {/* Kullanıcı ve Admin panelleri */}
        <Stack.Screen 
          name="UserDashboard" 
          component={UserDashboard}
          options={{ headerLeft: null }} // Geri dönüş engellemesi
        />
        <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboard}
          options={{ headerLeft: null }} // Geri dönüş engellemesi

          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
