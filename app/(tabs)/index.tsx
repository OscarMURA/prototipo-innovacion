import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useProtoData } from '@/contexts/ProtoDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, TrendingUp, Users, CircleCheck as CheckCircle, Plus, Bell, Activity } from 'lucide-react-native';

export default function Dashboard() {
  const { user } = useAuth();
  const isTrainer = user?.type === 'trainer';
  const { reservations } = useProtoData();

  const UserDashboard = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, {user?.name}!</Text>
          <Text style={styles.subtitle}>Mantén el ritmo de tus entrenamientos</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell color="#84cc16" size={24} />
        </TouchableOpacity>
      </View>

      {/* Próxima Sesión */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próxima Sesión</Text>
        <LinearGradient 
          colors={['#84cc16', '#65a30d']} 
          style={styles.nextSessionCard}
        >
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionTrainer}>
              {reservations[0]?.trainer ?? 'Carlos Martínez'}
            </Text>
            <Text style={styles.sessionTime}>
              {reservations[0]
                ? new Date(reservations[0].dateISO).toLocaleDateString() + `, ${reservations[0].time}`
                : 'Hoy, 18:00 - 19:00'}
            </Text>
            <Text style={styles.sessionType}>Entrenamiento de Fuerza</Text>
          </View>
          <Clock color="#000000" size={24} />
        </LinearGradient>
      </View>

      {/* Stats Rápidas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Activity color="#84cc16" size={24} />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Sesiones este mes</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp color="#84cc16" size={24} />
          <Text style={styles.statNumber}>+5kg</Text>
          <Text style={styles.statLabel}>Progreso peso</Text>
        </View>
      </View>

      {/* Acciones Rápidas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActions}>
          <Link href="/(tabs)/reserve" asChild>
            <TouchableOpacity accessibilityRole="button" style={styles.quickAction}>
              <Calendar color="#84cc16" size={24} />
              <Text style={styles.quickActionText}>Reservar Sesión</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(tabs)/log-workout" asChild>
            <TouchableOpacity accessibilityRole="button" style={styles.quickAction}>
              <Plus color="#84cc16" size={24} />
              <Text style={styles.quickActionText}>Registrar Entrenamiento</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );

  const TrainerDashboard = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, {user?.name}!</Text>
          <Text style={styles.subtitle}>Gestiona tu agenda profesional</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell color="#84cc16" size={24} />
        </TouchableOpacity>
      </View>

      {/* Próximas Citas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Agenda de Hoy</Text>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentClient}>María García</Text>
            <Text style={styles.appointmentTime}>16:00 - 17:00</Text>
            <Text style={styles.appointmentType}>Cardio + Fuerza</Text>
          </View>
          <TouchableOpacity style={styles.checkInButton}>
            <CheckCircle color="#84cc16" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentClient}>Juan Pérez</Text>
            <Text style={styles.appointmentTime}>18:00 - 19:00</Text>
            <Text style={styles.appointmentType}>Entrenamiento de Fuerza</Text>
          </View>
          <TouchableOpacity style={styles.checkInButton}>
            <CheckCircle color="#9ca3af" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats del Entrenador */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Users color="#84cc16" size={24} />
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Clientes activos</Text>
        </View>
        <View style={styles.statCard}>
          <Calendar color="#84cc16" size={24} />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Sesiones hoy</Text>
        </View>
      </View>

      {/* Acciones Rápidas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Clock color="#84cc16" size={24} />
            <Text style={styles.quickActionText}>Configurar Horarios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Users color="#84cc16" size={24} />
            <Text style={styles.quickActionText}>Ver Clientes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return isTrainer ? <TrainerDashboard /> : <UserDashboard />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  notificationButton: {
    padding: 8,
  },
  card: {
    backgroundColor: '#1f2937',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  nextSessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTrainer: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  sessionTime: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    marginTop: 4,
  },
  sessionType: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1f2937',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 4,
  },
  quickActions: {
    gap: 12,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    marginLeft: 12,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentClient: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  appointmentTime: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#84cc16',
    marginTop: 4,
  },
  appointmentType: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  checkInButton: {
    padding: 8,
  },
});