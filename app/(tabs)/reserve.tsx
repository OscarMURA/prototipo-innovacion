import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Clock, User, Check } from 'lucide-react-native';
import { useProtoData } from '@/contexts/ProtoDataContext';
import { useRouter } from 'expo-router';

export default function ReserveSessionScreen() {
  const router = useRouter();
  const { addReservation } = useProtoData();
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>('Carlos Martínez');
  const [selectedTime, setSelectedTime] = useState<string | null>('18:00');

  const trainers = ['Carlos Martínez', 'Ana López', 'Luis Torres'];
  const times = ['09:00', '11:00', '16:00', '18:00'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Reservar Sesión</Text>
        <Text style={styles.subtitle}>Prototipo sin backend</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrenador</Text>
        <View style={styles.rowWrap}>
          {trainers.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.pill, selectedTrainer === t && styles.pillActive]}
              onPress={() => setSelectedTrainer(t)}
            >
              <User color={selectedTrainer === t ? '#000' : '#84cc16'} size={16} />
              <Text style={[styles.pillText, selectedTrainer === t && styles.pillTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Horario</Text>
        <View style={styles.rowWrap}>
          {times.map((h) => (
            <TouchableOpacity
              key={h}
              style={[styles.pill, selectedTime === h && styles.pillActive]}
              onPress={() => setSelectedTime(h)}
            >
              <Clock color={selectedTime === h ? '#000' : '#84cc16'} size={16} />
              <Text style={[styles.pillText, selectedTime === h && styles.pillTextActive]}>{h}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumen</Text>
        <View style={styles.summaryRow}>
          <Calendar color="#84cc16" size={18} />
          <Text style={styles.summaryText}>Mañana a las {selectedTime}</Text>
        </View>
        <View style={styles.summaryRow}>
          <User color="#84cc16" size={18} />
          <Text style={styles.summaryText}>{selectedTrainer}</Text>
        </View>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={async () => {
            if (!selectedTrainer || !selectedTime) return;
            const dateISO = new Date().toISOString();
            await addReservation({ trainer: selectedTrainer, time: selectedTime, dateISO });
            router.back();
          }}
        >
          <Check color="#000" size={18} />
          <Text style={styles.primaryButtonText}>Confirmar Reserva</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Solo visual: no se guarda nada.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 24 },
  title: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#fff' },
  subtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#9ca3af', marginTop: 4 },
  card: { backgroundColor: '#1f2937', marginHorizontal: 24, marginBottom: 24, borderRadius: 16, padding: 20 },
  cardTitle: { fontSize: 18, fontFamily: 'Poppins-SemiBold', color: '#fff', marginBottom: 16 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#374151', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 24 },
  pillActive: { backgroundColor: '#84cc16' },
  pillText: { marginLeft: 8, color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 14 },
  pillTextActive: { color: '#000' },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  summaryText: { color: '#fff', fontFamily: 'Poppins-Regular', fontSize: 14 },
  primaryButton: { marginTop: 12, backgroundColor: '#84cc16', borderRadius: 12, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  primaryButtonText: { color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16 },
  helperText: { marginTop: 8, color: '#9ca3af', fontFamily: 'Poppins-Regular', fontSize: 12 },
});


