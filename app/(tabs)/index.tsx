import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TarjetaDia } from '@/components/TarjetaDia';
import { TEMA } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { obtenerDiaActual, PLAN_SEMANAL } from '@/data/plan';

export default function InicioScreen() {
  const { socio, completados } = useGym();
  const diaActual = obtenerDiaActual();

  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.encabezado}>
          <Text style={styles.marca}>GYMTRACK</Text>
          <Text style={styles.titulo}>Plan semanal</Text>
          <Text style={styles.subtitulo}>
            {socio.nombre} · Objetivo: {socio.objetivo}
          </Text>
        </View>

        {diaActual === null && (
          <View style={styles.descansoCard}>
            <Ionicons name="moon-outline" size={24} color={TEMA.acento} />
            <View style={styles.descansoTextos}>
              <Text style={styles.descansoTitulo}>Domingo: día de descanso</Text>
              <Text style={styles.descansoSubtitulo}>
                Recupera energía, hidrátate y prepárate para la rutina del lunes.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.lista}>
          {PLAN_SEMANAL.map((plan) => (
            <TarjetaDia
              key={plan.dia}
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
          ))}
        </View>
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
    paddingBottom: 32,
    gap: 16,
  },
  encabezado: {
    gap: 4,
  },
  marca: {
    color: TEMA.acento,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitulo: {
    color: TEMA.textoSecundario,
    fontSize: 15,
  },
  descansoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEMA.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: TEMA.acento,
    padding: 16,
    gap: 12,
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
});
