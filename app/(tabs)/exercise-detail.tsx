import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { findExerciseInfo } from '@/data/exercises';
import { ArrowLeft } from 'lucide-react-native';
import { WebView } from 'react-native-webview';

export default function ExerciseDetail() {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const router = useRouter();
  const info = findExerciseInfo(typeof name === 'string' ? name : undefined);
  const [unlocked, setUnlocked] = useState(false);
  const embedUrl = useMemo(() => {
    const base = info?.youtubeUrl ?? '';
    const join = base.includes('?') ? '&' : '?';
    return base ? `${base}${join}autoplay=${unlocked ? 1 : 0}&playsinline=1&rel=0&modestbranding=1` : '';
  }, [info?.youtubeUrl, unlocked]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color="#84cc16" size={22} />
        </TouchableOpacity>
        <Text style={styles.title}>{info?.label ?? name ?? 'Ejercicio'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Descripción</Text>
        <Text style={styles.description}>{info?.description ?? 'Descripción no disponible para este ejercicio.'}</Text>
      </View>

      {info?.youtubeUrl && (
        <View style={[styles.card, { paddingBottom: 0 }] }>
          <Text style={styles.cardTitle}>Video</Text>
          <View style={styles.videoWrapper}>
            {Platform.OS === 'web' ? (
              // @ts-ignore
              <iframe
                src={embedUrl}
                style={{ width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <WebView
                source={{ uri: embedUrl }}
                style={{ width: '100%', height: '100%' }}
                allowsFullscreenVideo
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={!unlocked}
              />
            )}
            {!unlocked && (
              <TouchableOpacity style={styles.videoOverlay} activeOpacity={0.85} onPress={() => setUnlocked(true)}>
                <Text style={styles.videoOverlayText}>Tocar para reproducir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16 },
  backBtn: { marginRight: 8, padding: 8 },
  title: { fontSize: 22, color: '#fff', fontFamily: 'Poppins-Bold' },
  card: { backgroundColor: '#1f2937', marginHorizontal: 24, marginBottom: 24, borderRadius: 16, padding: 20 },
  cardTitle: { fontSize: 18, color: '#fff', fontFamily: 'Poppins-SemiBold', marginBottom: 12 },
  description: { color: '#9ca3af', fontFamily: 'Poppins-Regular', lineHeight: 20 },
  videoWrapper: { height: 200, borderRadius: 12, overflow: 'hidden' },
  videoOverlay: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 12 },
  videoOverlayText: { color: '#fff', fontFamily: 'Poppins-Medium', fontSize: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
});


