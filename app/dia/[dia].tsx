import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NOMBRES_DIA, TEMA } from '@/constants/colores';
import { esDiaSemanaValido } from '@/data/plan';
import type { DiaSemana } from '@/types/gym';

export default function DetalleDiaScreen() {
  const { dia } = useLocalSearchParams<{ dia: DiaSemana }>();
  const titulo = dia && esDiaSemanaValido(dia) ? NOMBRES_DIA[dia] : 'Día inválido';

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
