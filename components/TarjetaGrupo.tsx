import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { BotonAnimado } from '@/components/BotonAnimado';
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
      <BotonAnimado
        onPress={onPress}
        haptic="light"
        accessibilityLabel={`Abrir ejercicios de ${NOMBRES_GRUPO[grupo]}`}
        style={[styles.tarjeta, tieneLesion && styles.tarjetaLesion]}
      >
        <View style={styles.filaIconos}>
          <View style={styles.iconoFondo}>
            <Ionicons name={ICONOS_GRUPO[grupo]} size={22} color={TEMA.acento} />
          </View>
          {tieneLesion && (
            <Ionicons name="warning" size={18} color={TEMA.advertencia} />
          )}
        </View>
        <View style={styles.textos}>
          <Text style={styles.nombre}>{NOMBRES_GRUPO[grupo]}</Text>
          <Text style={styles.contador}>
            {cantidad} {cantidad === 1 ? 'ejercicio' : 'ejercicios'}
          </Text>
        </View>
      </BotonAnimado>
    </View>
  );
}

const styles = StyleSheet.create({
  envoltura: {
    padding: 6,
  },
  tarjeta: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 16,
    minHeight: 122,
    justifyContent: 'space-between',
    gap: 12,
  },
  tarjetaLesion: {
    borderColor: TEMA.advertencia,
  },
  filaIconos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconoFondo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: TEMA.acentoFondo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    gap: 2,
  },
  nombre: {
    color: TEMA.textoPrimario,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  contador: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
});
