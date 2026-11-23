import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { PantallaError } from '@/components/PantallaError';
import { NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import { EJERCICIOS, esGrupoMuscularValido } from '@/data/ejercicios';

export default function GrupoScreen() {
  const { grupo } = useLocalSearchParams<{ grupo: string }>();
  const grupoValido =
    typeof grupo === 'string' && esGrupoMuscularValido(grupo) ? grupo : null;

  if (!grupoValido) {
    return (
      <SafeAreaView style={styles.contenedor} edges={['bottom']}>
        <Stack.Screen options={{ title: 'Grupo no encontrado' }} />
        <PantallaError
          titulo="Grupo muscular inválido"
          mensaje="El grupo solicitado no existe en el catálogo de GymTrack."
        />
      </SafeAreaView>
    );
  }

  const ejerciciosGrupo = EJERCICIOS.filter((item) => item.grupo === grupoValido);

  return (
    <SafeAreaView style={styles.contenedor} edges={['bottom']}>
      <Stack.Screen options={{ title: NOMBRES_GRUPO[grupoValido] }} />
      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecera}>
          <Text style={styles.titulo}>{NOMBRES_GRUPO[grupoValido]}</Text>
          <Text style={styles.subtitulo}>
            {ejerciciosGrupo.length}{' '}
            {ejerciciosGrupo.length === 1 ? 'ejercicio disponible' : 'ejercicios disponibles'}
          </Text>
        </View>

        <View style={styles.lista}>
          {ejerciciosGrupo.map((ejercicio) => (
            <ItemEjercicio
              key={ejercicio.id}
              ejercicio={ejercicio}
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
  contenedor: {
    flex: 1,
    backgroundColor: TEMA.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 32,
    gap: 16,
  },
  cabecera: {
    gap: 4,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitulo: {
    color: TEMA.textoSecundario,
    fontSize: 15,
  },
  lista: {
    gap: 10,
  },
});
