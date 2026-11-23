import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import { esGrupoMuscularValido } from '@/data/ejercicios';
import type { GrupoMuscular } from '@/types/gym';

export default function GrupoScreen() {
  const { grupo } = useLocalSearchParams<{ grupo: GrupoMuscular }>();
  const titulo =
    grupo && esGrupoMuscularValido(grupo) ? NOMBRES_GRUPO[grupo] : 'Grupo inválido';

  return (
    <SafeAreaView style={styles.contenedor} edges={['bottom']}>
      <Stack.Screen options={{ title: titulo }} />
      <View style={styles.cuerpo}>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: TEMA.fondo,
  },
  cuerpo: {
    padding: 20,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 22,
    fontWeight: '700',
  },
});
