import { COLORES_DIA } from '@/constants/colores';
import type { DiaPlan, DiaSemana } from '@/types/gym';

export const CALENTAMIENTO_INICIAL_MIN = 5;
export const CALENTAMIENTO_FINAL_MIN = 10;
export const CALENTAMIENTO_OPCIONES = 'Trote, bicicleta o elíptica';

const EJERCICIOS_FULL_BODY: string[] = [
  'pec-01',
  'esp-04',
  'hom-01',
  'pie-01',
  'bic-01',
  'tri-02',
  'abd-01',
];

export const PLAN_SEMANAL: DiaPlan[] = [
  {
    dia: 'lunes',
    enfoque: 'Full body',
    color: COLORES_DIA.lunes,
    ejercicios: EJERCICIOS_FULL_BODY,
  },
  {
    dia: 'martes',
    enfoque: 'Pierna + cardio',
    color: COLORES_DIA.martes,
    ejercicios: ['pie-01', 'pie-02', 'pie-03', 'pie-04', 'pie-05'],
    cardioMin: 20,
  },
  {
    dia: 'miercoles',
    enfoque: 'Tren superior + abdomen',
    color: COLORES_DIA.miercoles,
    ejercicios: [
      'pec-02',
      'pec-04',
      'hom-02',
      'hom-03',
      'tri-01',
      'bic-04',
      'abd-02',
      'abd-03',
    ],
  },
  {
    dia: 'jueves',
    enfoque: 'Pierna + tren superior',
    color: COLORES_DIA.jueves,
    ejercicios: ['pie-02', 'pie-04', 'esp-02', 'esp-03', 'lum-02', 'bic-02', 'tri-03'],
  },
  {
    dia: 'viernes',
    enfoque: 'Full body',
    color: COLORES_DIA.viernes,
    ejercicios: EJERCICIOS_FULL_BODY,
  },
  {
    dia: 'sabado',
    enfoque: 'Glúteo + cardio',
    color: COLORES_DIA.sabado,
    ejercicios: ['glu-01', 'cad-01', 'cad-02', 'lum-03', 'ant-01', 'ant-02'],
    cardioMin: 20,
  },
];

export function obtenerPlanPorDia(dia: DiaSemana): DiaPlan | undefined {
  return PLAN_SEMANAL.find((item) => item.dia === dia);
}

export function esDiaSemanaValido(valor: string): valor is DiaSemana {
  return PLAN_SEMANAL.some((item) => item.dia === valor);
}

export function obtenerDiaActual(): DiaSemana | null {
  const mapaDias: Record<number, DiaSemana> = {
    1: 'lunes',
    2: 'martes',
    3: 'miercoles',
    4: 'jueves',
    5: 'viernes',
    6: 'sabado',
  };
  const hoy = new Date().getDay();
  return mapaDias[hoy] ?? null;
}
