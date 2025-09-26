import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Calendar, Weight, Clock, Plus, Target, ExternalLink } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import CelebrationModal from '@/components/Celebration';
import { useProtoData } from '@/contexts/ProtoDataContext';

// Removed fixed width usage to make grid responsive across platforms

export default function ProgressScreen() {
  const { user } = useAuth();
  const isTrainer = user?.type === 'trainer';
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const { workouts } = useProtoData();
  const [showCongrats, setShowCongrats] = useState(false);

  const mockProgress = {
    totalWorkouts: 24,
    weightProgress: '+5kg',
    consistency: '92%',
    avgDuration: '45min',
  };

  const mockRecentWorkouts = [
    { id: 1, date: '2025-01-15', exercise: 'Sentadillas', weight: '80kg', reps: '3x12' },
    { id: 2, date: '2025-01-13', exercise: 'Press de banca', weight: '70kg', reps: '4x10' },
    { id: 3, date: '2025-01-11', exercise: 'Peso muerto', weight: '90kg', reps: '3x8' },
  ];

  const UserProgressView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Progreso</Text>
        <Text style={styles.subtitle}>Sigue tu evolución</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.card}>
        <View style={styles.periodSelector}>
          {(['week', 'month', 'year'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive
              ]}>
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Año'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Calendar color="#84cc16" size={24} />
          <Text style={styles.statNumber}>{mockProgress.totalWorkouts}</Text>
          <Text style={styles.statLabel}>Entrenamientos</Text>
        </View>
        <View style={styles.statCard}>
          <Weight color="#84cc16" size={24} />
          <Text style={styles.statNumber}>{mockProgress.weightProgress}</Text>
          <Text style={styles.statLabel}>Progreso peso</Text>
        </View>
        <View style={styles.statCard}>
          <Target color="#84cc16" size={24} />
          <Text style={styles.statNumber}>{mockProgress.consistency}</Text>
          <Text style={styles.statLabel}>Consistencia</Text>
        </View>
        <View style={styles.statCard}>
          <Clock color="#84cc16" size={24} />
          <Text style={styles.statNumber}>{mockProgress.avgDuration}</Text>
          <Text style={styles.statLabel}>Duración promedio</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Evolución del Peso</Text>
        <View style={styles.chartContainer}>
          {(() => {
            const screenWidth = Dimensions.get('window').width;
            const chartWidth = screenWidth - 24 * 2 - 20 * 2; // card margins + padding
            // Datos estáticos (ejemplo de evolución semanal)
            const labels = ['01/09', '05/09', '09/09', '13/09', '17/09', '21/09', '25/09'];
            const data = [80, 81, 82, 82.5, 83, 84, 85];

            return (
              <LineChart
                data={{ labels, datasets: [{ data }] }}
                width={chartWidth}
                height={180}
                withInnerLines={false}
                withOuterLines={false}
                chartConfig={{
                  backgroundGradientFrom: '#1f2937',
                  backgroundGradientTo: '#1f2937',
                  color: () => '#84cc16',
                  labelColor: () => '#9ca3af',
                  propsForDots: { r: '3', strokeWidth: '2', stroke: '#84cc16' },
                  propsForBackgroundLines: { stroke: '#334155' },
                }}
                bezier
                style={{ borderRadius: 12 }}
              />
            );
          })()}
        </View>
      </View>

      {/* Recent Workouts */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Entrenamientos Recientes</Text>
          <Link href="/(tabs)/log-workout" asChild>
            <TouchableOpacity style={styles.addButton}>
              <Plus color="#84cc16" size={20} />
            </TouchableOpacity>
          </Link>
        </View>
        {(workouts.length
          ? workouts.map(w => ({
              id: w.id,
              date: new Date(w.dateISO).toISOString().split('T')[0],
              exercise: w.exercises[0]?.name || 'Ejercicio',
              weight: (w.exercises[0]?.weight ?? '') + (w.exercises[0]?.weight ? 'kg' : ''),
              reps: w.exercises[0]?.reps ?? '',
            }))
          : mockRecentWorkouts
        ).map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutDate}>{workout.date}</Text>
              <Text style={styles.workoutExercise}>{workout.exercise}</Text>
              <View style={styles.workoutDetails}>
                <Text style={styles.workoutWeight}>{workout.weight}</Text>
                <Text style={styles.workoutReps}>{workout.reps}</Text>
              </View>
            </View>
            <Link href={{ pathname: '/(tabs)/exercise-detail', params: { name: workout.exercise } }} asChild>
              <TouchableOpacity style={styles.detailButton} onLongPress={() => setShowCongrats(true)}>
                <ExternalLink color="#84cc16" size={18} />
              </TouchableOpacity>
            </Link>
          </View>
        ))}
      </View>
      <CelebrationModal
        visible={showCongrats}
        onClose={() => setShowCongrats(false)}
        title="¡Sigue así!"
        subtitle="Tu constancia se nota."
        totalWorkouts={(workouts?.length ?? 0)}
        streakDays={3}
      />
    </ScrollView>
  );

  const TrainerProgressView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Progreso de Clientes</Text>
        <Text style={styles.subtitle}>Monitorea el rendimiento</Text>
      </View>

      {/* Client Selector */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seleccionar Cliente</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.clientSelector}>
            <TouchableOpacity style={styles.clientCard}>
              <Text style={styles.clientName}>María G.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.clientCard, styles.clientCardActive]}>
              <Text style={[styles.clientName, styles.clientNameActive]}>Juan P.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clientCard}>
              <Text style={styles.clientName}>Ana S.</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Client Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progreso de Juan Pérez</Text>
        <View style={styles.clientProgress}>
          <View style={styles.progressMetric}>
            <TrendingUp color="#84cc16" size={20} />
            <Text style={styles.progressValue}>+8kg</Text>
            <Text style={styles.progressLabel}>Peso levantado</Text>
          </View>
          <View style={styles.progressMetric}>
            <Calendar color="#84cc16" size={20} />
            <Text style={styles.progressValue}>95%</Text>
            <Text style={styles.progressLabel}>Asistencia</Text>
          </View>
        </View>
      </View>

      {/* Recent Client Workouts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Últimas Sesiones</Text>
        {mockRecentWorkouts.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutDate}>{workout.date}</Text>
              <Text style={styles.workoutExercise}>{workout.exercise}</Text>
              <View style={styles.workoutDetails}>
                <Text style={styles.workoutWeight}>{workout.weight}</Text>
                <Text style={styles.workoutReps}>{workout.reps}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return isTrainer ? <TrainerProgressView /> : <UserProgressView />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#84cc16',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#9ca3af',
  },
  periodTextActive: {
    color: '#000000',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1f2937',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
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
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  workoutCard: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  detailButton: {
    padding: 8,
    marginLeft: 12,
    backgroundColor: '#1f2937',
    borderRadius: 8,
  },
  workoutDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#84cc16',
  },
  workoutExercise: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    marginTop: 4,
  },
  workoutDetails: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  workoutWeight: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#9ca3af',
  },
  workoutReps: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#9ca3af',
  },
  clientSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  clientCard: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  clientCardActive: {
    backgroundColor: '#84cc16',
  },
  clientName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  clientNameActive: {
    color: '#000000',
  },
  clientProgress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressMetric: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
  },
});