import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarraProgreso } from '@/components/BarraProgreso';
import { BloqueActividad } from '@/components/BloqueActividad';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { PantallaError } from '@/components/PantallaError';
import { NOMBRES_DIA, NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { buscarEjercicioPorId } from '@/data/ejercicios';
import {
  CALENTAMIENTO_FINAL_MIN,
  CALENTAMIENTO_INICIAL_MIN,
  CALENTAMIENTO_OPCIONES,
  esDiaSemanaValido,
  obtenerPlanPorDia,
} from '@/data/plan';
import type { Ejercicio, GrupoMuscular } from '@/types/gym';

interface GrupoEjercicios {
  grupo: GrupoMuscular;
  ejercicios: Ejercicio[];
}

function agruparPorGrupo(ids: string[]): GrupoEjercicios[] {
  const resultado: GrupoEjercicios[] = [];
  for (const id of ids) {
    const ejercicio = buscarEjercicioPorId(id);
    if (!ejercicio) continue;
    const existente = resultado.find((item) => item.grupo === ejercicio.grupo);
    if (existente) {
      existente.ejercicios.push(ejercicio);
    } else {
      resultado.push({ grupo: ejercicio.grupo, ejercicios: [ejercicio] });
    }
  }
  return resultado;
}

export default function DetalleDiaScreen() {
  const { dia } = useLocalSearchParams<{ dia: string }>();
  const { completados, alternarEjercicio } = useGym();

  const diaValido = typeof dia === 'string' && esDiaSemanaValido(dia) ? dia : null;
  const plan = diaValido ? obtenerPlanPorDia(diaValido) : undefined;

  if (!diaValido || !plan) {
    return (
      <SafeAreaView style={styles.contenedor} edges={['bottom']}>
        <Stack.Screen options={{ title: 'Día no encontrado' }} />
        <PantallaError
          titulo="Día inválido"
          mensaje="El día solicitado no hace parte del plan semanal (lunes a sábado)."
        />
      </SafeAreaView>
    );
  }

  const completadosDia = completados[diaValido];
  const grupos = agruparPorGrupo(plan.ejercicios);

  return (
    <SafeAreaView style={styles.contenedor} edges={['bottom']}>
      <Stack.Screen options={{ title: `${NOMBRES_DIA[diaValido]} · ${plan.enfoque}` }} />
      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.cabecera, { borderLeftColor: plan.color }]}>
          <Text style={[styles.diaEtiqueta, { color: plan.color }]}>
            {NOMBRES_DIA[diaValido].toUpperCase()}
          </Text>
          <Text style={styles.enfoque}>{plan.enfoque}</Text>
        </View>

        <BarraProgreso
          valor={completadosDia.length}
          total={plan.ejercicios.length}
          color={plan.color}
        />

        <BloqueActividad
          titulo="Calentamiento inicial"
          descripcion={CALENTAMIENTO_OPCIONES}
          duracionMin={CALENTAMIENTO_INICIAL_MIN}
          icono="walk-outline"
          color={plan.color}
        />

        {grupos.map((bloque) => (
          <View key={bloque.grupo} style={styles.seccionGrupo}>
            <Text style={styles.tituloGrupo}>{NOMBRES_GRUPO[bloque.grupo]}</Text>
            <View style={styles.listaEjercicios}>
              {bloque.ejercicios.map((ejercicio) => (
                <ItemEjercicio
                  key={ejercicio.id}
                  ejercicio={ejercicio}
                  colorAcento={plan.color}
                  completado={completadosDia.includes(ejercicio.id)}
                  onAlternar={() => alternarEjercicio(diaValido, ejercicio.id)}
                  onAbrirDetalle={() =>
                    router.push({
                      pathname: '/ejercicio/[id]',
                      params: { id: ejercicio.id },
                    })
                  }
                />
              ))}
            </View>
          </View>
        ))}

        {plan.cardioMin !== undefined && (
          <BloqueActividad
            titulo="Sesión de cardio"
            descripcion="Ritmo moderado y constante"
            duracionMin={plan.cardioMin}
            icono="flame-outline"
            color={plan.color}
          />
        )}

        <BloqueActividad
          titulo="Calentamiento final"
          descripcion={`${CALENTAMIENTO_OPCIONES} · Vuelta a la calma`}
          duracionMin={CALENTAMIENTO_FINAL_MIN}
          icono="heart-outline"
          color={plan.color}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: TEMA.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 36,
    gap: 16,
  },
  cabecera: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: TEMA.borde,
    borderLeftWidth: 6,
    gap: 4,
  },
  diaEtiqueta: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  enfoque: {
    color: TEMA.textoPrimario,
    fontSize: 22,
    fontWeight: '800',
  },
  seccionGrupo: {
    gap: 10,
  },
  tituloGrupo: {
    color: TEMA.textoPrimario,
    fontSize: 17,
    fontWeight: '800',
  },
  listaEjercicios: {
    gap: 10,
  },
});
