import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertaLesion } from '@/components/AlertaLesion';
import { DetalleEjercicioCard } from '@/components/DetalleEjercicioCard';
import { PantallaError } from '@/components/PantallaError';
import { TemporizadorDescanso } from '@/components/TemporizadorDescanso';
import { estilosComunes } from '@/constants/estilos';
import { useGym } from '@/context/GymContext';
import { buscarEjercicioPorId } from '@/data/ejercicios';
import { PLAN_SEMANAL } from '@/data/plan';

export default function EjercicioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { socio } = useGym();
  const ejercicio = typeof id === 'string' ? buscarEjercicioPorId(id) : undefined;

  if (!ejercicio) {
    return (
      <SafeAreaView style={estilosComunes.pantalla} edges={['bottom', 'left', 'right']}>
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
  const tieneLesion = socio.lesiones.includes(ejercicio.grupo);

  return (
    <SafeAreaView style={estilosComunes.pantalla} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: ejercicio.nombre }} />
      <ScrollView
        contentContainerStyle={estilosComunes.scrollContenido}
        showsVerticalScrollIndicator={false}
      >
        {tieneLesion && (
          <AlertaLesion grupo={ejercicio.grupo} observaciones={socio.observaciones} />
        )}

        <DetalleEjercicioCard
          ejercicio={ejercicio}
          diasAsignados={diasAsignados}
          onAbrirDia={(dia) =>
            router.push({ pathname: '/dia/[dia]', params: { dia } })
          }
        />

        <TemporizadorDescanso colorAcento={diasAsignados[0]?.color} />
      </ScrollView>
    </SafeAreaView>
  );
}
