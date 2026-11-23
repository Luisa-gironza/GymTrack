import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEMA } from '@/constants/colores';

export default function InicioScreen() {
  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <View style={styles.cuerpo}>
        <Text style={styles.titulo}>Plan semanal</Text>
        <Link href="/dia/lunes" style={styles.enlace}>
          Ir al detalle del lunes
        </Link>
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
    gap: 12,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 24,
    fontWeight: '700',
  },
  enlace: {
    color: TEMA.acento,
    fontSize: 16,
  },
});
