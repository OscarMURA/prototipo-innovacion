import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Plus, Save } from 'lucide-react-native';
import { useProtoData } from '@/contexts/ProtoDataContext';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import CelebrationModal from '@/components/Celebration';

type Exercise = { id: string; name: string; weight: string; reps: string; youtubeUrl?: string };

export default function LogWorkoutScreen() {
  const { addWorkout } = useProtoData();
  const router = useRouter();
  const [showCongrats, setShowCongrats] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Sentadilla', weight: '60', reps: '3x10', youtubeUrl: 'https://www.youtube.com/embed/1xMaFs0L3ao' },
  ]);

  const addExercise = () => {
    const nextId = (exercises.length + 1).toString();
    setExercises([...exercises, { id: nextId, name: '', weight: '', reps: '' }]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string) => {
    setExercises((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const exerciseOptions: { label: string; value: string; youtubeUrl: string }[] = [
    { label: 'Sentadilla', value: 'Sentadilla', youtubeUrl: 'https://www.youtube.com/embed/1xMaFs0L3ao' },
    { label: 'Press de banca', value: 'Press de banca', youtubeUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg' },
    { label: 'Peso muerto', value: 'Peso muerto', youtubeUrl: 'https://www.youtube.com/embed/op9kVnSso6Q' },
    { label: 'Press militar', value: 'Press militar', youtubeUrl: 'https://www.youtube.com/embed/qEwKCR5JCog' },
    { label: 'Remo con barra', value: 'Remo con barra', youtubeUrl: 'https://www.youtube.com/embed/vT2GjY_Umpw' },
    { label: 'Dominadas', value: 'Dominadas', youtubeUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g' },
    { label: 'Zancadas', value: 'Zancadas', youtubeUrl: 'https://www.youtube.com/embed/D7KaRcUTQeE' },
    { label: 'Curl de bíceps', value: 'Curl de bíceps', youtubeUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo' },
    { label: 'Extensión de tríceps en polea', value: 'Extensión de tríceps en polea', youtubeUrl: 'https://www.youtube.com/embed/2-LAMcpzODU' },
    { label: 'Press inclinado', value: 'Press inclinado', youtubeUrl: 'https://www.youtube.com/embed/0G2_XV7slIg' },
    { label: 'Elevaciones laterales', value: 'Elevaciones laterales', youtubeUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo' },
    { label: 'Face pull', value: 'Face pull', youtubeUrl: 'https://www.youtube.com/embed/rep-qVOkqgk' },
    { label: 'Hip thrust', value: 'Hip thrust', youtubeUrl: 'https://www.youtube.com/embed/MVMNk0HiTMg' },
    { label: 'Prensa de piernas', value: 'Prensa de piernas', youtubeUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ' },
    { label: 'Aperturas con mancuernas', value: 'Aperturas con mancuernas', youtubeUrl: 'https://www.youtube.com/embed/eozdVDA78K0' },
    { label: 'Remo en polea', value: 'Remo en polea', youtubeUrl: 'https://www.youtube.com/embed/GZbfZ033f74' },
    { label: 'Press hombros mancuerna', value: 'Press hombros mancuerna', youtubeUrl: 'https://www.youtube.com/embed/B-aVuyhvLHU' },
    { label: 'Step-up', value: 'Step-up', youtubeUrl: 'https://www.youtube.com/embed/aajhW7DD1EA' },
    { label: 'Burpees', value: 'Burpees', youtubeUrl: 'https://www.youtube.com/embed/dZgVxmf6jkA' },
    { label: 'Plancha', value: 'Plancha', youtubeUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw' },
    { label: 'Crunch abdominal', value: 'Crunch abdominal', youtubeUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU' },
    { label: 'Elevación de pantorrillas', value: 'Elevación de pantorrillas', youtubeUrl: 'https://www.youtube.com/embed/YwQOmtz4GZk' },
    { label: 'Jalón al pecho', value: 'Jalón al pecho', youtubeUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc' },
  ];

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [searchById, setSearchById] = useState<Record<string, string>>({});
  const [videoInteractiveById, setVideoInteractiveById] = useState<Record<string, boolean>>({});

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Registrar Entrenamiento</Text>
        <Text style={styles.subtitle}>Prototipo sin persistencia</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ejercicios</Text>
        {exercises.map((ex) => (
          <View key={ex.id} style={styles.exerciseRow}>
            <View style={styles.selectRow}>
              <Text style={styles.selectLabel}>Ejercicio</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setOpenDropdownId((prev) => (prev === ex.id ? null : ex.id))}
              >
                <TextInput
                  placeholder="Busca y selecciona..."
                  placeholderTextColor="#9ca3af"
                  value={searchById[ex.id] ?? ex.name}
                  onChangeText={(t) => setSearchById((p) => ({ ...p, [ex.id]: t }))}
                  style={[styles.input, styles.inputFlex]}
                  onFocus={() => setOpenDropdownId(ex.id)}
                />
              </TouchableOpacity>
              {openDropdownId === ex.id && (
                <View style={styles.dropdown}>
                  <ScrollView
                    style={styles.dropdownScroll}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                  >
                    {exerciseOptions
                      .filter((o) => (searchById[ex.id] ?? '').trim().length === 0
                        ? true
                        : o.label.toLowerCase().includes((searchById[ex.id] ?? '').toLowerCase()))
                      .map((opt) => (
                        <TouchableOpacity
                          key={opt.value}
                          style={styles.dropdownItem}
                          onPress={() => {
                            updateExercise(ex.id, 'name', opt.value);
                            updateExercise(ex.id, 'youtubeUrl', opt.youtubeUrl);
                            setSearchById((p) => ({ ...p, [ex.id]: opt.label }));
                            setOpenDropdownId(null);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{opt.label}</Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              )}
            </View>
            <TextInput
              placeholder="Peso (kg)"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              value={ex.weight}
              onChangeText={(t) => updateExercise(ex.id, 'weight', t)}
              style={styles.input}
            />
            <TextInput
              placeholder="Series x Reps"
              placeholderTextColor="#9ca3af"
              value={ex.reps}
              onChangeText={(t) => updateExercise(ex.id, 'reps', t)}
              style={styles.input}
            />
            {ex.youtubeUrl ? (
              <View style={styles.videoContainer}>
                <Text style={styles.videoLabel}>Video de referencia</Text>
                <View style={styles.videoWrapper}>
                  {Platform.OS === 'web' ? (
                  // @ts-ignore - iframe solo en web
                    <iframe
                      src={ex.youtubeUrl}
                      style={{ width: '100%', height: '100%', border: 0, pointerEvents: videoInteractiveById[ex.id] ? 'auto' : 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <WebView
                      source={{ uri: ex.youtubeUrl }}
                      style={styles.video}
                      allowsFullscreenVideo
                      pointerEvents={videoInteractiveById[ex.id] ? 'auto' : 'none'}
                    />
                  )}
                  {!videoInteractiveById[ex.id] && (
                    <TouchableOpacity
                      style={styles.videoOverlay}
                      activeOpacity={0.8}
                      onPress={() => setVideoInteractiveById((p) => ({ ...p, [ex.id]: true }))}
                    >
                      <Text style={styles.videoOverlayText}>Tocar para interactuar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : null}
          </View>
        ))}
        <TouchableOpacity style={styles.secondaryButton} onPress={addExercise}>
          <Plus color="#84cc16" size={18} />
          <Text style={styles.secondaryButtonText}>Agregar ejercicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryButton}
          onPressIn={() => setVideoInteractiveById({})}
          onPress={async () => {
            if (!exercises.length) return;
            // asegurar bloqueo de video antes de navegar
            setVideoInteractiveById({});
            await addWorkout({ exercises: exercises.map(({ id, ...rest }) => rest) });
            setShowCongrats(true);
          }}
        >
          <Save color="#000" size={18} />
          <Text style={styles.primaryButtonText}>Guardar (mock)</Text>
        </TouchableOpacity>
        <CelebrationModal
          visible={showCongrats}
          onClose={() => {
            setShowCongrats(false);
            router.back();
          }}
          title="¡Entrenamiento registrado!"
          subtitle="Suma puntos a tu racha."
          totalWorkouts={exercises.length}
          streakDays={3}
        />
        <Text style={styles.helperText}>Este flujo es solo visual para demo.</Text>
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
  exerciseRow: { backgroundColor: '#374151', borderRadius: 12, padding: 12, marginBottom: 12 },
  input: { backgroundColor: '#111827', color: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginTop: 8, fontFamily: 'Poppins-Regular', fontSize: 14 },
  inputFlex: { },
  selectRow: { marginBottom: 8 },
  selectLabel: { color: '#9ca3af', fontFamily: 'Poppins-Medium', fontSize: 12 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  optionPill: { backgroundColor: '#111827', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 12 },
  optionPillActive: { backgroundColor: '#84cc16' },
  optionText: { color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 12 },
  optionTextActive: { color: '#000' },
  dropdown: { backgroundColor: '#111827', borderRadius: 10, marginTop: 6, maxHeight: 200, overflow: 'hidden' },
  dropdownScroll: { maxHeight: 200 },
  dropdownItem: { paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  dropdownItemText: { color: '#fff', fontFamily: 'Poppins-Regular', fontSize: 14 },
  videoContainer: { marginTop: 12 },
  videoLabel: { color: '#9ca3af', fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 6 },
  videoWrapper: { position: 'relative', zIndex: 0, height: 180, borderRadius: 8, overflow: 'hidden' },
  video: { height: '100%', width: '100%' },
  videoOverlay: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 8 },
  videoOverlayText: { color: '#ffffff', fontFamily: 'Poppins-Medium', fontSize: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  secondaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#111827', borderRadius: 12, paddingVertical: 12, marginTop: 12 },
  secondaryButtonText: { color: '#84cc16', fontFamily: 'Poppins-Medium', fontSize: 14 },
  primaryButton: { marginTop: 12, backgroundColor: '#84cc16', borderRadius: 12, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, zIndex: 10 },
  primaryButtonText: { color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 16 },
  helperText: { marginTop: 8, color: '#9ca3af', fontFamily: 'Poppins-Regular', fontSize: 12 },
});


