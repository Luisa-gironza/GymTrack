import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GRUPOS_ORDEN, NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import type { GrupoMuscular } from '@/types/gym';

interface SelectorLesionesProps {
  seleccionadas: GrupoMuscular[];
  onAlternar: (grupo: GrupoMuscular) => void;
}

export function SelectorLesiones({
  seleccionadas,
  onAlternar,
}: SelectorLesionesProps) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Lesiones o zonas con restricción</Text>
      <Text style={styles.ayuda}>
        Los grupos marcados mostrarán advertencias en el plan y catálogo.
      </Text>
      <View style={styles.chips}>
        {GRUPOS_ORDEN.map((grupo) => {
          const activo = seleccionadas.includes(grupo);
          return (
            <Pressable
              key={grupo}
              onPress={() => onAlternar(grupo)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: activo }}
              style={[styles.chip, activo && styles.chipActivo]}
            >
              <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
                {NOMBRES_GRUPO[grupo]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 8,
  },
  etiqueta: {
    color: TEMA.textoPrimario,
    fontSize: 14,
    fontWeight: '700',
  },
  ayuda: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: TEMA.fondo,
    borderWidth: 1,
    borderColor: TEMA.borde,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  chipActivo: {
    backgroundColor: TEMA.advertenciaFondo,
    borderColor: TEMA.advertencia,
  },
  chipTexto: {
    color: TEMA.textoSecundario,
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextoActivo: {
    color: TEMA.advertencia,
    fontWeight: '700',
  },
});
