import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { PartyPopper, Flame, Trophy } from 'lucide-react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  totalWorkouts?: number;
  streakDays?: number;
};

export default function CelebrationModal({ visible, onClose, title, subtitle, totalWorkouts, streakDays }: Props) {
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 80 }).start();
    } else {
      scale.setValue(0.8);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          <View style={styles.badge}>
            <PartyPopper color="#000" size={28} />
          </View>
          <Text style={styles.title}>{title ?? '¡Excelente progreso!'}</Text>
          <Text style={styles.subtitle}>{subtitle ?? 'Sigue así, estás imparable.'}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Trophy color="#84cc16" size={20} />
              <Text style={styles.statValue}>{totalWorkouts ?? 0}</Text>
              <Text style={styles.statLabel}>Entrenos</Text>
            </View>
            <View style={styles.statBox}>
              <Flame color="#fb923c" size={20} />
              <Text style={styles.statValue}>{streakDays ?? 0}</Text>
              <Text style={styles.statLabel}>Racha</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryText}>Continuar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', backgroundColor: '#1f2937', borderRadius: 20, padding: 24, alignItems: 'center' },
  badge: { backgroundColor: '#84cc16', padding: 12, borderRadius: 999 },
  title: { color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 20, marginTop: 12, textAlign: 'center' },
  subtitle: { color: '#9ca3af', fontFamily: 'Poppins-Regular', fontSize: 14, marginTop: 6, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  statBox: { backgroundColor: '#111827', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', minWidth: 110 },
  statValue: { color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 18, marginTop: 6 },
  statLabel: { color: '#9ca3af', fontFamily: 'Poppins-Regular', fontSize: 12 },
  primaryButton: { marginTop: 18, backgroundColor: '#84cc16', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
  primaryText: { color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16 },
});


