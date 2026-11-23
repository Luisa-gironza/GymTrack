import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import type { Ejercicio } from '@/types/gym';

interface ItemEjercicioProps {
  ejercicio: Ejercicio;
  colorAcento?: string;
  completado?: boolean;
  onAlternar?: () => void;
  onAbrirDetalle: () => void;
  advertenciaLesion?: boolean;
}

export function ItemEjercicio({
  ejercicio,
  colorAcento = TEMA.acento,
  completado = false,
  onAlternar,
  onAbrirDetalle,
  advertenciaLesion = false,
}: ItemEjercicioProps) {
  return (
    <View
      style={[
        styles.tarjeta,
        completado && styles.tarjetaCompletada,
        advertenciaLesion && styles.tarjetaAdvertencia,
      ]}
    >
      {onAlternar !== undefined && (
        <Pressable
          onPress={onAlternar}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: completado }}
          accessibilityLabel={`Marcar ${ejercicio.nombre} como completado`}
          style={styles.botonCheck}
        >
          <View
            style={[
              styles.cajaCheck,
              completado && { backgroundColor: colorAcento, borderColor: colorAcento },
            ]}
          >
            {completado && (
              <Ionicons name="checkmark" size={18} color={TEMA.fondo} />
            )}
          </View>
        </Pressable>
      )}

      <Pressable
        onPress={onAbrirDetalle}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalle de ${ejercicio.nombre}`}
        style={({ pressed }) => [styles.cuerpo, pressed && styles.presionado]}
      >
        <View style={styles.textos}>
          <Text
            style={[styles.nombre, completado && styles.nombreCompletado]}
            numberOfLines={2}
          >
            {ejercicio.nombre}
          </Text>
          <View style={styles.metaFila}>
            <Text style={styles.series}>
              {ejercicio.series} × {ejercicio.repeticiones}
            </Text>
            <Text style={styles.separador}>·</Text>
            <Text style={styles.grupo}>{NOMBRES_GRUPO[ejercicio.grupo]}</Text>
          </View>
          {advertenciaLesion && (
            <View style={styles.alertaFila}>
              <Ionicons name="warning" size={15} color={TEMA.advertencia} />
              <Text style={styles.alertaTexto}>
                Precaución: lesión registrada en {NOMBRES_GRUPO[ejercicio.grupo].toLowerCase()}
              </Text>
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={TEMA.textoSecundario} />
      </Pressable>
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
    overflow: 'hidden',
  },
  tarjetaCompletada: {
    backgroundColor: 'rgba(30, 41, 59, 0.65)',
    borderColor: TEMA.exito,
  },
  tarjetaAdvertencia: {
    borderColor: TEMA.advertencia,
  },
  botonCheck: {
    width: 52,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cajaCheck: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: TEMA.textoSecundario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuerpo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    minHeight: 56,
    gap: 10,
  },
  presionado: {
    opacity: 0.75,
  },
  textos: {
    flex: 1,
    gap: 4,
  },
  nombre: {
    color: TEMA.textoPrimario,
    fontSize: 16,
    fontWeight: '700',
  },
  nombreCompletado: {
    textDecorationLine: 'line-through',
    color: TEMA.textoSecundario,
  },
  metaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  series: {
    color: TEMA.acento,
    fontSize: 14,
    fontWeight: '700',
  },
  separador: {
    color: TEMA.textoApagado,
    fontSize: 14,
  },
  grupo: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  alertaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  alertaTexto: {
    color: TEMA.advertencia,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
