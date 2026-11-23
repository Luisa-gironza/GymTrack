import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TEMA } from '@/constants/colores';

interface BloqueActividadProps {
  titulo: string;
  descripcion: string;
  duracionMin: number;
  icono: keyof typeof Ionicons.glyphMap;
  color: string;
}

export function BloqueActividad({
  titulo,
  descripcion,
  duracionMin,
  icono,
  color,
}: BloqueActividadProps) {
  return (
    <View style={[styles.tarjeta, { borderLeftColor: color }]}>
      <View style={[styles.iconoCaja, { backgroundColor: `${color}22` }]}>
        <Ionicons name={icono} size={22} color={color} />
      </View>
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
      </View>
      <View style={[styles.badge, { borderColor: color }]}>
        <Text style={[styles.duracion, { color }]}>{duracionMin} min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEMA.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: TEMA.borde,
    borderLeftWidth: 4,
    padding: 14,
    gap: 12,
  },
  iconoCaja: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 15,
    fontWeight: '700',
  },
  descripcion: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  duracion: {
    fontSize: 14,
    fontWeight: '700',
  },
});
