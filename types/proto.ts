export type Reservation = {
  id: string;
  dateISO: string; // fecha completa ISO
  time: string; // HH:mm
  trainer: string;
};

export type Exercise = {
  name: string;
  weight: string; // kg texto para prototipo
  reps: string;   // formato libre 3x10
  youtubeUrl?: string; // enlace de referencia
};

export type Workout = {
  id: string;
  dateISO: string;
  exercises: Exercise[];
};


