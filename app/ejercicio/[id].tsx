import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEMA } from '@/constants/colores';
import { buscarEjercicioPorId } from '@/data/ejercicios';

export default function EjercicioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ejercicio = id ? buscarEjercicioPorId(id) : undefined;
  const titulo = ejercicio ? ejercicio.nombre : 'Ejercicio no encontrado';

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
