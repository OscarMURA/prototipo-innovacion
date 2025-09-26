import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckCircle, Lock, Star, Apple, Dumbbell, Trophy } from 'lucide-react-native';
import CelebrationModal from '@/components/Celebration';

type Challenge = {
  id: number;
  title: string;
  description: string;
  type: 'nutrition' | 'exercise' | 'habit';
  completed: boolean;
  locked: boolean;
  xp: number;
};

export default function ChallengesScreen() {
  const [showCongrats, setShowCongrats] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useState<Challenge | null>(null);

  const challenges: Challenge[] = [
    { id: 1, title: 'Bebe 2L de agua', description: 'Mantén tu cuerpo hidratado durante todo el día', type: 'nutrition', completed: true, locked: false, xp: 10 },
    { id: 2, title: '20 sentadillas', description: 'Completa 20 sentadillas con buena forma', type: 'exercise', completed: true, locked: false, xp: 15 },
    { id: 3, title: 'Desayuno saludable', description: 'Come proteína + carbohidratos complejos', type: 'nutrition', completed: true, locked: false, xp: 12 },
    { id: 4, title: 'Plancha 30 seg', description: 'Mantén la plancha por 30 segundos', type: 'exercise', completed: false, locked: false, xp: 20 },
    { id: 5, title: 'Sin azúcar añadido', description: 'Evita dulces y bebidas azucaradas hoy', type: 'nutrition', completed: false, locked: false, xp: 18 },
    { id: 6, title: 'Camina 8000 pasos', description: 'Alcanza tu meta diaria de pasos', type: 'habit', completed: false, locked: false, xp: 25 },
    { id: 7, title: 'Dormir 7+ horas', description: 'Descansa adecuadamente para recuperarte', type: 'habit', completed: false, locked: true, xp: 30 },
    { id: 8, title: '50 flexiones', description: 'Completa 50 flexiones (puedes dividirlas)', type: 'exercise', completed: false, locked: true, xp: 35 },
  ];

  const handleChallengePress = (challenge: Challenge) => {
    if (challenge.locked || challenge.completed) return;
    setCompletedChallenge(challenge);
    setShowCongrats(true);
  };

  const getIcon = (type: Challenge['type']) => {
    switch (type) {
      case 'nutrition': return <Apple color="#84cc16" size={20} />;
      case 'exercise': return <Dumbbell color="#84cc16" size={20} />;
      case 'habit': return <Star color="#84cc16" size={20} />;
    }
  };

  const completedCount = challenges.filter(c => c.completed).length;
  const totalXP = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.xp, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Retos Diarios</Text>
        <Text style={styles.subtitle}>Completa desafíos y gana XP</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Trophy color="#fbbf24" size={18} />
            <Text style={styles.statValue}>{totalXP}</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>
          <View style={styles.statBox}>
            <CheckCircle color="#84cc16" size={18} />
            <Text style={styles.statValue}>{completedCount}/{challenges.length}</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.path}>
          {challenges.map((challenge, index) => (
            <View key={challenge.id} style={styles.challengeContainer}>
              {/* Línea conectora */}
              {index < challenges.length - 1 && <View style={styles.connector} />}
              
              {/* Nodo del reto */}
              <TouchableOpacity
                style={[
                  styles.challengeNode,
                  challenge.completed && styles.challengeNodeCompleted,
                  challenge.locked && styles.challengeNodeLocked,
                ]}
                onPress={() => handleChallengePress(challenge)}
                disabled={challenge.locked}
              >
                {challenge.locked ? (
                  <Lock color="#6b7280" size={24} />
                ) : challenge.completed ? (
                  <CheckCircle color="#000" size={24} />
                ) : (
                  getIcon(challenge.type)
                )}
              </TouchableOpacity>

              {/* Tarjeta del reto */}
              <View style={[
                styles.challengeCard,
                index % 2 === 0 ? styles.challengeCardRight : styles.challengeCardLeft
              ]}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                <View style={styles.challengeFooter}>
                  <Text style={styles.xpText}>+{challenge.xp} XP</Text>
                  {challenge.completed && <Text style={styles.completedText}>✓ Completado</Text>}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <CelebrationModal
        visible={showCongrats}
        onClose={() => {
          setShowCongrats(false);
          setCompletedChallenge(null);
        }}
        title="¡Reto completado!"
        subtitle={`Ganaste ${completedChallenge?.xp ?? 0} XP`}
        totalWorkouts={completedCount + 1}
        streakDays={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 20 },
  title: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#fff' },
  subtitle: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#9ca3af', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  statBox: { backgroundColor: '#1f2937', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', flex: 1 },
  statValue: { color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 16, marginTop: 4 },
  statLabel: { color: '#9ca3af', fontFamily: 'Poppins-Regular', fontSize: 10 },
  scrollView: { flex: 1 },
  path: { paddingHorizontal: 24, paddingVertical: 20 },
  challengeContainer: { position: 'relative', marginBottom: 40, alignItems: 'center' },
  connector: { position: 'absolute', top: 50, width: 3, height: 40, backgroundColor: '#374151', zIndex: 0 },
  challengeNode: { 
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#374151', 
    alignItems: 'center', justifyContent: 'center', zIndex: 1, borderWidth: 3, borderColor: '#1f2937' 
  },
  challengeNodeCompleted: { backgroundColor: '#84cc16' },
  challengeNodeLocked: { backgroundColor: '#1f2937' },
  challengeCard: { 
    backgroundColor: '#1f2937', borderRadius: 16, padding: 16, marginTop: 12, width: '80%', maxWidth: 280 
  },
  challengeCardRight: { alignSelf: 'flex-end' },
  challengeCardLeft: { alignSelf: 'flex-start' },
  challengeTitle: { color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 16 },
  challengeDescription: { color: '#9ca3af', fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 4, lineHeight: 16 },
  challengeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  xpText: { color: '#fbbf24', fontFamily: 'Poppins-Medium', fontSize: 12 },
  completedText: { color: '#84cc16', fontFamily: 'Poppins-Medium', fontSize: 12 },
});
