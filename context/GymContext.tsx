import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { DIAS_ORDEN } from '@/constants/colores';
import { socioInicial } from '@/data/socio';
import type { DiaSemana, Medida, Socio } from '@/types/gym';

export type Completados = Record<DiaSemana, string[]>;

interface GymState {
  socio: Socio;
  setSocio: (s: Socio) => void;
  medidas: Medida[];
  agregarMedida: (m: Medida) => void;
  completados: Completados;
  alternarEjercicio: (dia: DiaSemana, id: string) => void;
  cargando: boolean;
}

const CLAVE_SOCIO = '@gymtrack/socio';
const CLAVE_MEDIDAS = '@gymtrack/medidas';
const CLAVE_COMPLETADOS = '@gymtrack/completados';

const vacio: Completados = {
  lunes: [],
  martes: [],
  miercoles: [],
  jueves: [],
  viernes: [],
  sabado: [],
};

function esObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor);
}

function esSocioValido(valor: unknown): valor is Socio {
  if (!esObjeto(valor)) return false;
  return (
    typeof valor.nombre === 'string' &&
    typeof valor.edad === 'number' &&
    typeof valor.fechaAsignacion === 'string' &&
    typeof valor.objetivo === 'string' &&
    Array.isArray(valor.observaciones) &&
    Array.isArray(valor.lesiones) &&
    Array.isArray(valor.medidas)
  );
}

function esListaMedidasValida(valor: unknown): valor is Medida[] {
  if (!Array.isArray(valor)) return false;
  return valor.every(
    (item) =>
      esObjeto(item) &&
      typeof item.mes === 'string' &&
      typeof item.estaturaM === 'number' &&
      typeof item.pesoKg === 'number' &&
      esObjeto(item.perimetrosCm)
  );
}

function esCompletadosValido(valor: unknown): valor is Completados {
  if (!esObjeto(valor)) return false;
  return DIAS_ORDEN.every((dia) => Array.isArray(valor[dia]));
}

const GymContext = createContext<GymState | null>(null);

export function GymProvider({ children }: { children: ReactNode }) {
  const [socio, setSocio] = useState<Socio>(socioInicial);
  const [medidas, setMedidas] = useState<Medida[]>(socioInicial.medidas);
  const [completados, setCompletados] = useState<Completados>(vacio);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    const cargarDatos = async () => {
      try {
        const [socioRaw, medidasRaw, completadosRaw] = await Promise.all([
          AsyncStorage.getItem(CLAVE_SOCIO),
          AsyncStorage.getItem(CLAVE_MEDIDAS),
          AsyncStorage.getItem(CLAVE_COMPLETADOS),
        ]);

        if (cancelado) return;

        if (socioRaw) {
          const parsed: unknown = JSON.parse(socioRaw);
          if (esSocioValido(parsed)) {
            setSocio(parsed);
          }
        }

        if (medidasRaw) {
          const parsed: unknown = JSON.parse(medidasRaw);
          if (esListaMedidasValida(parsed)) {
            setMedidas(parsed);
          }
        }

        if (completadosRaw) {
          const parsed: unknown = JSON.parse(completadosRaw);
          if (esCompletadosValido(parsed)) {
            setCompletados(parsed);
          }
        }
      } catch {
        // Si falla la lectura o el JSON está corrupto, se mantienen los datos iniciales.
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    };

    void cargarDatos();

    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    if (cargando) return;
    void AsyncStorage.setItem(CLAVE_SOCIO, JSON.stringify(socio)).catch(() => {});
  }, [socio, cargando]);

  useEffect(() => {
    if (cargando) return;
    void AsyncStorage.setItem(CLAVE_MEDIDAS, JSON.stringify(medidas)).catch(() => {});
  }, [medidas, cargando]);

  useEffect(() => {
    if (cargando) return;
    void AsyncStorage.setItem(CLAVE_COMPLETADOS, JSON.stringify(completados)).catch(() => {});
  }, [completados, cargando]);

  const agregarMedida = (m: Medida) =>
    setMedidas((prev) =>
      [m, ...prev].sort((a, b) => b.mes.localeCompare(a.mes))
    );

  const alternarEjercicio = (dia: DiaSemana, id: string) =>
    setCompletados((prev) => ({
      ...prev,
      [dia]: prev[dia].includes(id)
        ? prev[dia].filter((x) => x !== id)
        : [...prev[dia], id],
    }));

  return (
    <GymContext.Provider
      value={{
        socio,
        setSocio,
        medidas,
        agregarMedida,
        completados,
        alternarEjercicio,
        cargando,
      }}
    >
      {children}
    </GymContext.Provider>
  );
}

export function useGym(): GymState {
  const ctx = useContext(GymContext);
  if (!ctx) {
    throw new Error('useGym debe usarse dentro de GymProvider');
  }
  return ctx;
}
