import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { TEMA } from '@/constants/colores';

interface PantallaErrorProps {
  titulo: string;
  mensaje: string;
}

export function PantallaError({ titulo, mensaje }: PantallaErrorProps) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjeta}>
        <Ionicons name="alert-circle-outline" size={48} color={TEMA.peligro} />
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.mensaje}>{mensaje}</Text>
        <Link href="/" style={styles.boton}>
          Volver al Inicio
        </Link>
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
    color: TEMA.fondo,
    fontSize: 15,
    fontWeight: '800',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 44,
    textAlign: 'center',
  },
});
