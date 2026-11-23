import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EntradaAnimada } from '@/components/EntradaAnimada';
import { TarjetaDia } from '@/components/TarjetaDia';
import { TEMA } from '@/constants/colores';
import { estilosComunes } from '@/constants/estilos';
import { useGym } from '@/context/GymContext';
import { obtenerDiaActual, PLAN_SEMANAL } from '@/data/plan';

export default function InicioScreen() {
  const { socio, completados } = useGym();
  const { width } = useWindowDimensions();
  const diaActual = obtenerDiaActual();
  const esAncho = width > 600;

  return (
    <SafeAreaView style={estilosComunes.pantalla} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={estilosComunes.scrollContenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilosComunes.encabezado}>
          <Text style={styles.marca}>GYMTRACK FITNESS</Text>
          <Text style={estilosComunes.tituloPantalla}>Plan semanal</Text>
          <Text style={estilosComunes.subtituloPantalla}>
            {socio.nombre} · {socio.objetivo}
          </Text>
        </View>

        {diaActual === null && (
          <EntradaAnimada indice={0}>
            <View style={styles.descansoCard}>
              <View style={styles.iconoDescanso}>
                <Ionicons name="moon" size={22} color={TEMA.acento} />
              </View>
              <View style={styles.descansoTextos}>
                <Text style={styles.descansoTitulo}>Domingo: día de descanso</Text>
                <Text style={styles.descansoSubtitulo}>
                  Recupera energía, hidrátate y prepárate para la rutina del lunes.
                </Text>
              </View>
            </View>
          </EntradaAnimada>
        )}

        <View style={esAncho ? styles.cuadricula : styles.lista}>
          {PLAN_SEMANAL.map((plan, indice) => (
            <EntradaAnimada
              key={plan.dia}
              indice={indice}
              style={esAncho ? styles.celdaAncha : undefined}
            >
              <TarjetaDia
                plan={plan}
                esHoy={diaActual === plan.dia}
                completados={completados[plan.dia].length}
                onPress={() =>
                  router.push({
                    pathname: '/dia/[dia]',
                    params: { dia: plan.dia },
                  })
                }
              />
            </EntradaAnimada>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  marca: {
    color: TEMA.acento,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  descansoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.acento,
    padding: 16,
    gap: 14,
  },
  iconoDescanso: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: TEMA.acentoFondo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descansoTextos: {
    flex: 1,
    gap: 4,
  },
  descansoTitulo: {
    color: TEMA.textoPrimario,
    fontSize: 16,
    fontWeight: '700',
  },
  descansoSubtitulo: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  lista: {
    gap: 12,
  },
  cuadricula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  celdaAncha: {
    width: '50%',
    padding: 6,
  },
});
