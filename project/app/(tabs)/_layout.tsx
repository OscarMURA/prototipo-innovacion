import { Tabs } from 'expo-router';
import { Chrome as Home, Calendar, TrendingUp, MessageCircle, User, Target } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();
  const isTrainer = user?.type === 'trainer';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2937',
          borderTopColor: '#374151',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#84cc16',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: isTrainer ? 'Agenda' : 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color, size }) => (
            <TrendingUp color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Retos',
          tabBarIcon: ({ color, size }) => (
            <Target color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen name="exercise-detail" options={{ href: null }} />
      {/* Rutas auxiliares del prototipo (no visibles en la barra) */}
      <Tabs.Screen
        name="reserve"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="log-workout"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}