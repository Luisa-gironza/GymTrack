import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { TEMA } from '@/constants/colores';

interface BarraProgresoProps {
  valor: number;
  total: number;
  color?: string;
}

export function BarraProgreso({ valor, total, color }: BarraProgresoProps) {
  const porcentaje = total > 0 ? Math.round((valor / total) * 100) : 0;
  const completo = total > 0 && valor >= total;
  const [progresoAnim] = useState(() => new Animated.Value(porcentaje));
  const [escalaTrofeo] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const animacion = Animated.timing(progresoAnim, {
      toValue: porcentaje,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    animacion.start();
    return () => {
      animacion.stop();
    };
  }, [porcentaje, progresoAnim]);

  useEffect(() => {
    if (!completo) return;
    const pulso = Animated.sequence([
      Animated.spring(escalaTrofeo, {
        toValue: 1.22,
        useNativeDriver: true,
        speed: 30,
        bounciness: 10,
      }),
      Animated.spring(escalaTrofeo, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 6,
      }),
    ]);
    pulso.start();
    return () => {
      pulso.stop();
    };
  }, [completo, escalaTrofeo]);

  const anchoAnimado = progresoAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.contenedor, completo && styles.contenedorCompleto]}>
      <View style={styles.encabezado}>
        <View style={styles.etiquetaFila}>
          <Animated.View
            style={[
              styles.iconoCaja,
              { transform: [{ scale: escalaTrofeo }] },
            ]}
          >
            <Ionicons
              name={completo ? 'trophy' : 'flame'}
              size={18}
              color={TEMA.acento}
            />
          </Animated.View>
          <View>
            <Text style={styles.etiqueta}>Progreso de la sesión</Text>
            <Text style={styles.detalle}>
              {valor} de {total} ejercicios completados
            </Text>
          </View>
        </View>

        <View style={styles.porcentajeColumna}>
          {color !== undefined && (
            <View style={[styles.puntoDia, { backgroundColor: color }]} />
          )}
          <Text style={styles.porcentaje}>{porcentaje} %</Text>
        </View>
      </View>

      <View style={styles.pista}>
        <Animated.View style={[styles.relleno, { width: anchoAnimado }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: TEMA.borde,
    gap: 14,
  },
  contenedorCompleto: {
    borderColor: TEMA.acento,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  etiquetaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconoCaja: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: TEMA.acentoFondo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etiqueta: {
    color: TEMA.textoPrimario,
    fontSize: 16,
    fontWeight: '700',
  },
  detalle: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  porcentajeColumna: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  puntoDia: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  porcentaje: {
    color: TEMA.acento,
    fontSize: 20,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  pista: {
    height: 10,
    borderRadius: 999,
    backgroundColor: TEMA.tarjetaElevada,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: TEMA.acento,
  },
});
