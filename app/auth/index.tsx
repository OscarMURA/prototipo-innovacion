import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Dumbbell, Users, TrendingUp } from 'lucide-react-native';

export default function AuthWelcome() {
  const router = useRouter();

  return (
    <LinearGradient 
      colors={['#0a0a0a', '#1a1a1a']} 
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo y Título */}
        <View style={styles.header}>
          <Dumbbell color="#84cc16" size={48} strokeWidth={2} />
          <Text style={styles.title}>Gymalytics</Text>
          <Text style={styles.subtitle}>
            Transforma tu entrenamiento con gestión inteligente
          </Text>
        </View>

        {/* Características */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Users color="#84cc16" size={32} />
            <Text style={styles.featureText}>Conecta con entrenadores</Text>
          </View>
          <View style={styles.feature}>
            <TrendingUp color="#84cc16" size={32} />
            <Text style={styles.featureText}>Sigue tu progreso</Text>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.secondaryButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 64,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#d1d5db',
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#84cc16',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#84cc16',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#84cc16',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});