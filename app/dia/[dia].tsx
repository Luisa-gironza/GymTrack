import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarraProgreso } from '@/components/BarraProgreso';
import { BloqueActividad } from '@/components/BloqueActividad';
import { EntradaAnimada } from '@/components/EntradaAnimada';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { PantallaError } from '@/components/PantallaError';
import { TemporizadorDescanso } from '@/components/TemporizadorDescanso';
import { NOMBRES_DIA, NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import { estilosComunes } from '@/constants/estilos';
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
  const { socio, completados, alternarEjercicio } = useGym();

  const diaValido = typeof dia === 'string' && esDiaSemanaValido(dia) ? dia : null;
  const plan = diaValido ? obtenerPlanPorDia(diaValido) : undefined;

  if (!diaValido || !plan) {
    return (
      <SafeAreaView style={estilosComunes.pantalla} edges={['bottom', 'left', 'right']}>
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
    <SafeAreaView style={estilosComunes.pantalla} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: `${NOMBRES_DIA[diaValido]} · ${plan.enfoque}` }} />
      <ScrollView
        contentContainerStyle={estilosComunes.scrollContenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecera}>
          <View style={[styles.badgeDia, { backgroundColor: `${plan.color}24`, borderColor: plan.color }]}>
            <View style={[styles.puntoDia, { backgroundColor: plan.color }]} />
            <Text style={[styles.diaEtiqueta, { color: plan.color }]}>
              {NOMBRES_DIA[diaValido].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.enfoque}>{plan.enfoque}</Text>
        </View>

        <BarraProgreso
          valor={completadosDia.length}
          total={plan.ejercicios.length}
          color={plan.color}
        />

        <TemporizadorDescanso colorAcento={plan.color} />

        <BloqueActividad
          titulo="Calentamiento inicial"
          descripcion={CALENTAMIENTO_OPCIONES}
          duracionMin={CALENTAMIENTO_INICIAL_MIN}
          icono="walk-outline"
          color={plan.color}
        />

        {grupos.map((bloque, indice) => (
          <EntradaAnimada key={bloque.grupo} indice={indice} style={styles.seccionGrupo}>
            <Text style={styles.tituloGrupo}>{NOMBRES_GRUPO[bloque.grupo]}</Text>
            <View style={styles.listaEjercicios}>
              {bloque.ejercicios.map((ejercicio) => (
                <ItemEjercicio
                  key={ejercicio.id}
                  ejercicio={ejercicio}
                  colorAcento={plan.color}
                  completado={completadosDia.includes(ejercicio.id)}
                  advertenciaLesion={socio.lesiones.includes(ejercicio.grupo)}
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
          </EntradaAnimada>
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
  cabecera: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: TEMA.borde,
    gap: 10,
  },
  badgeDia: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 6,
  },
  puntoDia: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  diaEtiqueta: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  enfoque: {
    color: TEMA.textoPrimario,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  seccionGrupo: {
    gap: 10,
  },
  tituloGrupo: {
    color: TEMA.textoPrimario,
    fontSize: 18,
    fontWeight: '800',
  },
  listaEjercicios: {
    gap: 10,
  },
});
