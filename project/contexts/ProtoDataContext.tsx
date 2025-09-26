import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reservation, Workout } from '@/types/proto';

type ProtoDataContextType = {
  reservations: Reservation[];
  workouts: Workout[];
  addReservation: (r: Omit<Reservation, 'id'>) => Promise<Reservation>;
  addWorkout: (w: Omit<Workout, 'id' | 'dateISO'> & { dateISO?: string }) => Promise<Workout>;
  clearAll: () => Promise<void>;
};

const ProtoDataContext = createContext<ProtoDataContextType | null>(null);

export const useProtoData = () => {
  const ctx = useContext(ProtoDataContext);
  if (!ctx) throw new Error('useProtoData debe usarse dentro de ProtoDataProvider');
  return ctx;
};

const STORAGE_KEYS = {
  reservations: 'proto.reservations',
  workouts: 'proto.workouts',
};

export const ProtoDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [rRaw, wRaw] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.reservations),
          AsyncStorage.getItem(STORAGE_KEYS.workouts),
        ]);
        if (rRaw) setReservations(JSON.parse(rRaw));
        if (wRaw) setWorkouts(JSON.parse(wRaw));
      } catch (e) {
        console.warn('ProtoData load error', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.workouts, JSON.stringify(workouts));
  }, [workouts]);

  const addReservation = async (r: Omit<Reservation, 'id'>) => {
    const next: Reservation = { id: Date.now().toString(), ...r };
    setReservations(prev => [next, ...prev]);
    return next;
  };

  const addWorkout = async (w: Omit<Workout, 'id' | 'dateISO'> & { dateISO?: string }) => {
    const next: Workout = { id: Date.now().toString(), dateISO: w.dateISO ?? new Date().toISOString(), exercises: w.exercises };
    setWorkouts(prev => [next, ...prev]);
    return next;
  };

  const clearAll = async () => {
    setReservations([]);
    setWorkouts([]);
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.reservations),
      AsyncStorage.removeItem(STORAGE_KEYS.workouts),
    ]);
  };

  const value = useMemo(
    () => ({ reservations, workouts, addReservation, addWorkout, clearAll }),
    [reservations, workouts]
  );

  return <ProtoDataContext.Provider value={value}>{children}</ProtoDataContext.Provider>;
};


