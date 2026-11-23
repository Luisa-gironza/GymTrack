import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { BotonAnimado } from '@/components/BotonAnimado';
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
  completado = false,
  onAlternar,
  onAbrirDetalle,
  advertenciaLesion = false,
}: ItemEjercicioProps) {
  const [escalaCheck] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (!completado) return;
    const animacion = Animated.sequence([
      Animated.spring(escalaCheck, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 34,
        bounciness: 12,
      }),
      Animated.spring(escalaCheck, {
        toValue: 1,
        useNativeDriver: true,
        speed: 22,
        bounciness: 6,
      }),
    ]);
    animacion.start();
    return () => {
      animacion.stop();
    };
  }, [completado, escalaCheck]);

  return (
    <View
      style={[
        styles.tarjeta,
        completado && styles.tarjetaCompletada,
        advertenciaLesion && styles.tarjetaAdvertencia,
      ]}
    >
      {onAlternar !== undefined && (
        <BotonAnimado
          onPress={onAlternar}
          haptic={completado ? 'light' : 'success'}
          escalaActiva={0.92}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: completado }}
          accessibilityLabel={`Marcar ${ejercicio.nombre} como completado`}
          style={styles.botonCheck}
        >
          <Animated.View
            style={[
              styles.cajaCheck,
              completado && styles.cajaCheckActiva,
              { transform: [{ scale: escalaCheck }] },
            ]}
          >
            {completado && (
              <Ionicons name="checkmark" size={18} color={TEMA.fondo} />
            )}
          </Animated.View>
        </BotonAnimado>
      )}

      <BotonAnimado
        onPress={onAbrirDetalle}
        haptic="light"
        accessibilityLabel={`Ver detalle de ${ejercicio.nombre}`}
        contenedorStyle={styles.flex}
        style={styles.cuerpo}
      >
        <View style={styles.textos}>
          <Text
            style={[styles.nombre, completado && styles.nombreCompletado]}
            numberOfLines={2}
          >
            {ejercicio.nombre}
          </Text>
          <View style={styles.metaFila}>
            <View style={styles.pillSeries}>
              <Text style={styles.series}>
                {ejercicio.series} × {ejercicio.repeticiones}
              </Text>
            </View>
            <Text style={styles.grupo}>{NOMBRES_GRUPO[ejercicio.grupo]}</Text>
          </View>
          {advertenciaLesion && (
            <View style={styles.alertaFila}>
              <Ionicons name="warning" size={15} color={TEMA.advertencia} />
              <Text style={styles.alertaTexto}>
                Precaución: lesión en {NOMBRES_GRUPO[ejercicio.grupo].toLowerCase()}
              </Text>
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={TEMA.textoSecundario} />
      </BotonAnimado>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    overflow: 'hidden',
  },
  tarjetaCompletada: {
    borderColor: TEMA.acento,
    backgroundColor: '#141D16',
  },
  tarjetaAdvertencia: {
    borderColor: TEMA.advertencia,
  },
  botonCheck: {
    width: 56,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cajaCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: TEMA.textoSecundario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cajaCheckActiva: {
    backgroundColor: TEMA.acento,
    borderColor: TEMA.acento,
  },
  cuerpo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    minHeight: 60,
    gap: 10,
  },
  textos: {
    flex: 1,
    gap: 6,
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
    gap: 8,
  },
  pillSeries: {
    backgroundColor: TEMA.acentoFondo,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  series: {
    color: TEMA.acento,
    fontSize: 14,
    fontWeight: '700',
  },
  grupo: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  alertaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  alertaTexto: {
    color: TEMA.advertencia,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
