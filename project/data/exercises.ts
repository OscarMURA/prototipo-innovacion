export type ExerciseInfo = {
  label: string;
  value: string;
  youtubeUrl: string;
  description: string;
};

export const exerciseOptions: ExerciseInfo[] = [
  {
    label: 'Sentadilla',
    value: 'Sentadilla',
    youtubeUrl: 'https://www.youtube.com/embed/1xMaFs0L3ao',
    description: 'Ejercicio compuesto para piernas que trabaja cuádriceps, glúteos e isquios. Mantén la espalda neutra y baja controlado.',
  },
  {
    label: 'Press de banca',
    value: 'Press de banca',
    youtubeUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    description: 'Empuje horizontal para pectoral, tríceps y hombro anterior. Controla la bajada y empuja con pies firmes.',
  },
  {
    label: 'Peso muerto',
    value: 'Peso muerto',
    youtubeUrl: 'https://www.youtube.com/embed/op9kVnSso6Q',
    description: 'Bisagra de cadera que implica cadena posterior. Mantén barra cerca de las piernas y columna estable.',
  },
  {
    label: 'Press militar',
    value: 'Press militar',
    youtubeUrl: 'https://www.youtube.com/embed/qEwKCR5JCog',
    description: 'Empuje vertical de hombros. Aprieta glúteos y abdomen para estabilizar la zona media.',
  },
  {
    label: 'Remo con barra',
    value: 'Remo con barra',
    youtubeUrl: 'https://www.youtube.com/embed/vT2GjY_Umpw',
    description: 'Tira con la espalda manteniendo tronco inclinado y neutro. Evita encoger hombros.',
  },
  {
    label: 'Dominadas',
    value: 'Dominadas',
    youtubeUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g',
    description: 'Tracción vertical para dorsal y bíceps. Activa escápulas antes de iniciar la subida.',
  },
  {
    label: 'Zancadas',
    value: 'Zancadas',
    youtubeUrl: 'https://www.youtube.com/embed/D7KaRcUTQeE',
    description: 'Paso al frente para trabajar piernas y estabilidad. Mantén rodilla alineada con el pie.',
  },
  // Extras
  { label: 'Curl de bíceps', value: 'Curl de bíceps', youtubeUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo', description: 'Aísla bíceps. Evita balanceos, codos pegados.' },
  { label: 'Extensión de tríceps en polea', value: 'Extensión de tríceps en polea', youtubeUrl: 'https://www.youtube.com/embed/2-LAMcpzODU', description: 'Extiende el codo controlando la bajada.' },
  { label: 'Press inclinado', value: 'Press inclinado', youtubeUrl: 'https://www.youtube.com/embed/0G2_XV7slIg', description: 'Enfasis en pectoral superior.' },
  { label: 'Elevaciones laterales', value: 'Elevaciones laterales', youtubeUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo', description: 'Deltoide medio. Brazos casi rectos, sin impulso.' },
  { label: 'Face pull', value: 'Face pull', youtubeUrl: 'https://www.youtube.com/embed/rep-qVOkqgk', description: 'Trabajo de deltoide posterior y escápulas.' },
  { label: 'Hip thrust', value: 'Hip thrust', youtubeUrl: 'https://www.youtube.com/embed/MVMNk0HiTMg', description: 'Glúteos. Bloquea en la parte alta sin arquear.' },
  { label: 'Prensa de piernas', value: 'Prensa de piernas', youtubeUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ', description: 'Piernas con máquina. Controla rango y pies firmes.' },
  { label: 'Aperturas con mancuernas', value: 'Aperturas con mancuernas', youtubeUrl: 'https://www.youtube.com/embed/eozdVDA78K0', description: 'Estira pectoral con brazos semiflexionados.' },
  { label: 'Remo en polea', value: 'Remo en polea', youtubeUrl: 'https://www.youtube.com/embed/GZbfZ033f74', description: 'Espalda en polea con control postural.' },
  { label: 'Press hombros mancuerna', value: 'Press hombros mancuerna', youtubeUrl: 'https://www.youtube.com/embed/B-aVuyhvLHU', description: 'Alternativa al militar con mancuernas.' },
  { label: 'Step-up', value: 'Step-up', youtubeUrl: 'https://www.youtube.com/embed/aajhW7DD1EA', description: 'Subida al cajón, foco en glúteos y cuádriceps.' },
  { label: 'Burpees', value: 'Burpees', youtubeUrl: 'https://www.youtube.com/embed/dZgVxmf6jkA', description: 'Movimiento metabólico de cuerpo completo.' },
  { label: 'Plancha', value: 'Plancha', youtubeUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw', description: 'Core isométrico. Mantén línea cabeza-cadera.' },
  { label: 'Crunch abdominal', value: 'Crunch abdominal', youtubeUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU', description: 'Flexión de columna para recto abdominal.' },
  { label: 'Elevación de pantorrillas', value: 'Elevación de pantorrillas', youtubeUrl: 'https://www.youtube.com/embed/YwQOmtz4GZk', description: 'Soleo y gemelos. Subida controlada.' },
  { label: 'Jalón al pecho', value: 'Jalón al pecho', youtubeUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc', description: 'Tracción en polea para dorsal ancho.' },
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();

const singularize = (s: string) => {
  if (s.endsWith('es')) return s.slice(0, -2);
  if (s.endsWith('s')) return s.slice(0, -1);
  return s;
};

export const findExerciseInfo = (name?: string) => {
  const q = normalize(name ?? '');
  if (!q) return undefined;

  // Exact by value
  let found = exerciseOptions.find((e) => normalize(e.value) === q);
  if (found) return found;

  // Try singularization
  const qs = singularize(q);
  found = exerciseOptions.find((e) => normalize(e.value) === qs);
  if (found) return found;

  // Try label compare and partial includes
  found = exerciseOptions.find((e) => normalize(e.label) === q || normalize(e.label).includes(q) || normalize(e.value).includes(q));
  if (found) return found;

  return undefined;
};


