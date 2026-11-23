import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { BotonAnimado } from '@/components/BotonAnimado';
import { TEMA } from '@/constants/colores';

interface PantallaErrorProps {
  titulo: string;
  mensaje: string;
}

export function PantallaError({ titulo, mensaje }: PantallaErrorProps) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjeta}>
        <View style={styles.iconoFondo}>
          <Ionicons name="alert-circle" size={40} color={TEMA.peligro} />
        </View>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.mensaje}>{mensaje}</Text>
        <BotonAnimado
          onPress={() => router.replace('/')}
          haptic="light"
          style={styles.boton}
        >
          <Text style={styles.botonTexto}>Volver al Inicio</Text>
        </BotonAnimado>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: TEMA.fondo,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  tarjeta: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  iconoFondo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: TEMA.peligroFondo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  mensaje: {
    color: TEMA.textoSecundario,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  boton: {
    marginTop: 8,
    backgroundColor: TEMA.acento,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonTexto: {
    color: TEMA.fondo,
    fontSize: 15,
    fontWeight: '800',
  },
});
