import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEMA } from '@/constants/colores';

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <View style={styles.cuerpo}>
        <Text style={styles.titulo}>Perfil del socio</Text>
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
    fontSize: 24,
    fontWeight: '700',
  },
});
