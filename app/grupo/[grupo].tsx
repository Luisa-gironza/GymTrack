import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertaLesion } from '@/components/AlertaLesion';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { PantallaError } from '@/components/PantallaError';
import { NOMBRES_GRUPO } from '@/constants/colores';
import { estilosComunes } from '@/constants/estilos';
import { useGym } from '@/context/GymContext';
import { EJERCICIOS, esGrupoMuscularValido } from '@/data/ejercicios';

export default function GrupoScreen() {
  const { grupo } = useLocalSearchParams<{ grupo: string }>();
  const { socio } = useGym();
  const grupoValido =
    typeof grupo === 'string' && esGrupoMuscularValido(grupo) ? grupo : null;

  if (!grupoValido) {
    return (
      <SafeAreaView style={estilosComunes.pantalla} edges={['bottom', 'left', 'right']}>
        <Stack.Screen options={{ title: 'Grupo no encontrado' }} />
        <PantallaError
          titulo="Grupo muscular inválido"
          mensaje="El grupo solicitado no existe en el catálogo de GymTrack."
        />
      </SafeAreaView>
    );
  }

  const ejerciciosGrupo = EJERCICIOS.filter((item) => item.grupo === grupoValido);
  const tieneLesion = socio.lesiones.includes(grupoValido);

  return (
    <SafeAreaView style={estilosComunes.pantalla} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: NOMBRES_GRUPO[grupoValido] }} />
      <ScrollView
        contentContainerStyle={estilosComunes.scrollContenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilosComunes.encabezado}>
          <Text style={estilosComunes.tituloPantalla}>{NOMBRES_GRUPO[grupoValido]}</Text>
          <Text style={estilosComunes.subtituloPantalla}>
            {ejerciciosGrupo.length}{' '}
            {ejerciciosGrupo.length === 1 ? 'ejercicio disponible' : 'ejercicios disponibles'}
          </Text>
        </View>

        {tieneLesion && (
          <AlertaLesion grupo={grupoValido} observaciones={socio.observaciones} />
        )}

        <View style={styles.lista}>
          {ejerciciosGrupo.map((ejercicio) => (
            <ItemEjercicio
              key={ejercicio.id}
              ejercicio={ejercicio}
              advertenciaLesion={tieneLesion}
              onAbrirDetalle={() =>
                router.push({
                  pathname: '/ejercicio/[id]',
                  params: { id: ejercicio.id },
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
  lista: {
    gap: 10,
  },
});
