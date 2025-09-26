import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, Plus, User } from 'lucide-react-native';

export default function CalendarScreen() {
  const { user } = useAuth();
  const isTrainer = user?.type === 'trainer';
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();

  const mockAvailableSlots = [
    { id: 1, time: '09:00', trainer: 'Carlos Martínez', available: true },
    { id: 2, time: '10:00', trainer: 'Carlos Martínez', available: false },
    { id: 3, time: '11:00', trainer: 'Ana López', available: true },
    { id: 4, time: '16:00', trainer: 'Carlos Martínez', available: true },
    { id: 5, time: '17:00', trainer: 'Ana López', available: false },
    { id: 6, time: '18:00', trainer: 'Carlos Martínez', available: true },
  ];

  const mockAppointments = [
    { id: 1, client: 'María García', time: '16:00', type: 'Cardio + Fuerza' },
    { id: 2, client: 'Juan Pérez', time: '18:00', type: 'Entrenamiento de Fuerza' },
    { id: 3, client: 'Ana Silva', time: '19:00', type: 'Yoga y Flexibilidad' },
  ];

  const UserCalendarView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Reservar Sesión</Text>
        <Text style={styles.subtitle}>Encuentra tu entrenador ideal</Text>
      </View>

      {/* Calendar Widget Simplificado */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seleccionar Fecha</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateOption}>
            <Text style={styles.dateDay}>HOY</Text>
            <Text style={styles.dateNumber}>15</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dateOption, styles.dateOptionActive]}>
            <Text style={[styles.dateDay, styles.dateDayActive]}>MAÑ</Text>
            <Text style={[styles.dateNumber, styles.dateNumberActive]}>16</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateOption}>
            <Text style={styles.dateDay}>VIE</Text>
            <Text style={styles.dateNumber}>17</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateOption}>
            <Text style={styles.dateDay}>SÁB</Text>
            <Text style={styles.dateNumber}>18</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Horarios Disponibles */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Horarios Disponibles</Text>
        {mockAvailableSlots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.timeSlot,
              !slot.available && styles.timeSlotUnavailable
            ]}
            disabled={!slot.available}
            onPress={() => {
              if (slot.available) router.push('/(tabs)/reserve');
            }}
          >
            <View style={styles.timeSlotInfo}>
              <Text style={[styles.timeSlotTime, !slot.available && styles.timeSlotTimeUnavailable]}>
                {slot.time}
              </Text>
              <Text style={[styles.timeSlotTrainer, !slot.available && styles.timeSlotTrainerUnavailable]}>
                {slot.trainer}
              </Text>
            </View>
            <Text style={[styles.timeSlotStatus, !slot.available && styles.timeSlotStatusUnavailable]}>
              {slot.available ? 'Reservar' : 'Ocupado'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const TrainerCalendarView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Agenda</Text>
        <Text style={styles.subtitle}>Gestiona tus sesiones de hoy</Text>
      </View>

      {/* Configurar Disponibilidad */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Disponibilidad</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus color="#84cc16" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.availabilityButton}>
          <Clock color="#84cc16" size={20} />
          <Text style={styles.availabilityText}>Configurar horarios disponibles</Text>
        </TouchableOpacity>
      </View>

      {/* Citas de Hoy */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Citas de Hoy</Text>
        {mockAppointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentClient}>{appointment.client}</Text>
              <Text style={styles.appointmentTime}>{appointment.time}</Text>
              <Text style={styles.appointmentType}>{appointment.type}</Text>
            </View>
            <TouchableOpacity style={styles.checkInButton}>
              <User color="#84cc16" size={24} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return isTrainer ? <TrainerCalendarView /> : <UserCalendarView />;
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
  title: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#374151',
    padding: 8,
    borderRadius: 8,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#374151',
  },
  dateOptionActive: {
    backgroundColor: '#84cc16',
  },
  dateDay: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#9ca3af',
  },
  dateDayActive: {
    color: '#000000',
  },
  dateNumber: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    marginTop: 4,
  },
  dateNumberActive: {
    color: '#000000',
  },
  timeSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  timeSlotUnavailable: {
    backgroundColor: '#2d3748',
    opacity: 0.6,
  },
  timeSlotInfo: {
    flex: 1,
  },
  timeSlotTime: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  timeSlotTimeUnavailable: {
    color: '#6b7280',
  },
  timeSlotTrainer: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  timeSlotTrainerUnavailable: {
    color: '#6b7280',
  },
  timeSlotStatus: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#84cc16',
  },
  timeSlotStatusUnavailable: {
    color: '#ef4444',
  },
  availabilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
  },
  availabilityText: {
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