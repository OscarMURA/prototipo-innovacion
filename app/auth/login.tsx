import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'trainer'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password, userType);
    setIsLoading(false);

    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a1a']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#84cc16" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Iniciar Sesión</Text>
      </View>

      <View style={styles.form}>
        {/* Selector de tipo de usuario */}
        <View style={styles.userTypeSelector}>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'user' && styles.userTypeButtonActive]}
            onPress={() => setUserType('user')}
          >
            <Text style={[styles.userTypeText, userType === 'user' && styles.userTypeTextActive]}>
              Usuario
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'trainer' && styles.userTypeButtonActive]}
            onPress={() => setUserType('trainer')}
          >
            <Text style={[styles.userTypeText, userType === 'trainer' && styles.userTypeTextActive]}>
              Entrenador
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            placeholderTextColor="#6b7280"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Tu contraseña"
              placeholderTextColor="#6b7280"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? <EyeOff color="#84cc16" size={20} /> : <Eye color="#84cc16" size={20} />}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={styles.registerLink}>
            ¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  userTypeSelector: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  userTypeButtonActive: {
    backgroundColor: '#84cc16',
  },
  userTypeText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#9ca3af',
  },
  userTypeTextActive: {
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    borderWidth: 2,
    borderColor: '#374151',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingRight: 56,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    borderWidth: 2,
    borderColor: '#374151',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  loginButton: {
    backgroundColor: '#84cc16',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
  },
  registerLinkBold: {
    color: '#84cc16',
    fontFamily: 'Poppins-SemiBold',
  },
});