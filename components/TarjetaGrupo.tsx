import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import type { GrupoMuscular } from '@/types/gym';

interface TarjetaGrupoProps {
  grupo: GrupoMuscular;
  cantidad: number;
  anchoPorcentaje: `${number}%`;
  tieneLesion?: boolean;
  onPress: () => void;
}

const ICONOS_GRUPO: Record<GrupoMuscular, keyof typeof Ionicons.glyphMap> = {
  pierna: 'walk-outline',
  pecho: 'shield-outline',
  triceps: 'flash-outline',
  espalda: 'layers-outline',
  hombro: 'diamond-outline',
  biceps: 'fitness-outline',
  abdomen: 'grid-outline',
  cadera: 'git-compare-outline',
  gluteo: 'flame-outline',
  lumbar: 'pulse-outline',
  antebrazo: 'hand-left-outline',
};

export function TarjetaGrupo({
  grupo,
  cantidad,
  anchoPorcentaje,
  tieneLesion = false,
  onPress,
}: TarjetaGrupoProps) {
  return (
    <View style={[styles.envoltura, { width: anchoPorcentaje }]}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Abrir ejercicios de ${NOMBRES_GRUPO[grupo]}`}
        style={({ pressed }) => [
          styles.tarjeta,
          tieneLesion && styles.tarjetaLesion,
          pressed && styles.presionada,
        ]}
      >
        <View style={styles.filaIconos}>
          <View style={styles.iconoFondo}>
            <Ionicons name={ICONOS_GRUPO[grupo]} size={22} color={TEMA.acento} />
          </View>
          {tieneLesion && (
            <Ionicons name="warning" size={18} color={TEMA.advertencia} />
          )}
        </View>
        <Text style={styles.nombre}>{NOMBRES_GRUPO[grupo]}</Text>
        <Text style={styles.contador}>
          {cantidad} {cantidad === 1 ? 'ejercicio' : 'ejercicios'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  envoltura: {
    padding: 6,
  },
  tarjeta: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 16,
    minHeight: 112,
    justifyContent: 'space-between',
    gap: 8,
  },
  tarjetaLesion: {
    borderColor: TEMA.advertencia,
  },
  presionada: {
    opacity: 0.8,
  },
  filaIconos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconoFondo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 195, 230, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nombre: {
    color: TEMA.textoPrimario,
    fontSize: 16,
    fontWeight: '800',
  },
  contador: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
});
