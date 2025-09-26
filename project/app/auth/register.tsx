import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'trainer'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    const success = await register(name, email, password, userType);
    setIsLoading(false);

    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'No se pudo crear la cuenta');
    }
  };

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a1a']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#84cc16" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Crear Cuenta</Text>
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

        {/* Nombre */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre completo"
            placeholderTextColor="#6b7280"
          />
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
              placeholder="Mínimo 6 caracteres"
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

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repite tu contraseña"
            placeholderTextColor="#6b7280"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity 
          style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.registerButtonText}>
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.loginLink}>
            ¿Ya tienes cuenta? <Text style={styles.loginLinkBold}>Inicia sesión</Text>
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
    marginBottom: 20,
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
  registerButton: {
    backgroundColor: '#84cc16',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
  },
  loginLinkBold: {
    color: '#84cc16',
    fontFamily: 'Poppins-SemiBold',
  },
});