import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetalleEjercicioCard } from '@/components/DetalleEjercicioCard';
import { PantallaError } from '@/components/PantallaError';
import { TEMA } from '@/constants/colores';
import { buscarEjercicioPorId } from '@/data/ejercicios';
import { PLAN_SEMANAL } from '@/data/plan';

export default function EjercicioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ejercicio = typeof id === 'string' ? buscarEjercicioPorId(id) : undefined;

  if (!ejercicio) {
    return (
      <SafeAreaView style={styles.contenedor} edges={['bottom']}>
        <Stack.Screen options={{ title: 'Ejercicio no encontrado' }} />
        <PantallaError
          titulo="Ejercicio no encontrado"
          mensaje="No existe un ejercicio registrado con el identificador indicado."
        />
      </SafeAreaView>
    );
  }

  const diasAsignados = PLAN_SEMANAL.filter((plan) =>
    plan.ejercicios.includes(ejercicio.id)
  );

  return (
    <SafeAreaView style={styles.contenedor} edges={['bottom']}>
      <Stack.Screen options={{ title: ejercicio.nombre }} />
      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <DetalleEjercicioCard
          ejercicio={ejercicio}
          diasAsignados={diasAsignados}
          onAbrirDia={(dia) =>
            router.push({ pathname: '/dia/[dia]', params: { dia } })
          }
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
});
