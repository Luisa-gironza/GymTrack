import type { ClavePerimetro, DiaSemana, GrupoMuscular } from '@/types/gym';

export const COLORES_DIA: Record<DiaSemana, string> = {
  lunes: '#22C3E6',
  martes: '#F59E0B',
  miercoles: '#22C55E',
  jueves: '#EC4899',
  viernes: '#22C3E6',
  sabado: '#A3E635',
};

export const TEMA = {
  fondo: '#000000',
  tarjeta: '#1C1C1E',
  tarjetaElevada: '#2C2C2E',
  borde: '#2C2C2E',
  textoPrimario: '#FFFFFF',
  textoSecundario: '#8E8E93',
  textoApagado: '#636366',
  acento: '#32D74B',
  acentoFondo: 'rgba(50, 215, 75, 0.16)',
  exito: '#32D74B',
  exitoFondo: 'rgba(50, 215, 75, 0.16)',
  advertencia: '#FF9F0A',
  advertenciaFondo: 'rgba(255, 159, 10, 0.16)',
  peligro: '#FF453A',
  peligroFondo: 'rgba(255, 69, 58, 0.16)',
  tabBar: '#0A0A0C',
} as const;

export const NOMBRES_DIA: Record<DiaSemana, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
};

export const DIAS_ORDEN: DiaSemana[] = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
];

export const NOMBRES_GRUPO: Record<GrupoMuscular, string> = {
  pierna: 'Pierna',
  pecho: 'Pecho',
  triceps: 'Tríceps',
  espalda: 'Espalda',
  hombro: 'Hombro',
  biceps: 'Bíceps',
  abdomen: 'Abdomen',
  cadera: 'Cadera',
  gluteo: 'Glúteo',
  lumbar: 'Lumbar',
  antebrazo: 'Antebrazo',
};

export const GRUPOS_ORDEN: GrupoMuscular[] = [
  'pierna',
  'pecho',
  'triceps',
  'espalda',
  'hombro',
  'biceps',
  'abdomen',
  'cadera',
  'gluteo',
  'lumbar',
  'antebrazo',
];

export const NOMBRES_PERIMETRO: Record<ClavePerimetro, string> = {
  hombro: 'Hombro',
  brazo: 'Brazo',
  antebrazo: 'Antebrazo',
  pecho: 'Pecho',
  abdomen: 'Abdomen',
  cadera: 'Cadera',
  pierna: 'Pierna',
  pantorrilla: 'Pantorrilla',
};

export const PERIMETROS_ORDEN: ClavePerimetro[] = [
  'hombro',
  'brazo',
  'antebrazo',
  'pecho',
  'abdomen',
  'cadera',
  'pierna',
  'pantorrilla',
];
