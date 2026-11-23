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
  fondo: '#0F172A',
  tarjeta: '#1E293B',
  tarjetaElevada: '#263348',
  borde: '#334155',
  textoPrimario: '#F8FAFC',
  textoSecundario: '#94A3B8',
  textoApagado: '#64748B',
  acento: '#22C3E6',
  exito: '#22C55E',
  exitoFondo: 'rgba(34, 197, 94, 0.16)',
  advertencia: '#F59E0B',
  advertenciaFondo: 'rgba(245, 158, 11, 0.16)',
  peligro: '#EF4444',
  peligroFondo: 'rgba(239, 68, 68, 0.16)',
  tabBar: '#0B1120',
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
