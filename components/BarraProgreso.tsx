import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TEMA } from '@/constants/colores';

interface BarraProgresoProps {
  valor: number;
  total: number;
  color: string;
}

export function BarraProgreso({ valor, total, color }: BarraProgresoProps) {
  const porcentaje = total > 0 ? Math.round((valor / total) * 100) : 0;
  const completo = total > 0 && valor >= total;

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <View style={styles.etiquetaFila}>
          <Ionicons
            name={completo ? 'trophy' : 'fitness-outline'}
            size={18}
            color={completo ? TEMA.exito : color}
          />
          <Text style={styles.etiqueta}>Progreso de la sesión</Text>
        </View>
        <Text style={[styles.porcentaje, { color: completo ? TEMA.exito : color }]}>
          {porcentaje} %
        </Text>
      </View>

      <View style={styles.pista}>
        <View
          style={[
            styles.relleno,
            {
              width: `${porcentaje}%`,
              backgroundColor: completo ? TEMA.exito : color,
            },
          ]}
        />
      </View>

      <Text style={styles.detalle}>
        {valor} de {total} ejercicios completados
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: TEMA.borde,
    gap: 10,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  etiquetaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  etiqueta: {
    color: TEMA.textoPrimario,
    fontSize: 15,
    fontWeight: '700',
  },
  porcentaje: {
    fontSize: 16,
    fontWeight: '800',
  },
  pista: {
    height: 12,
    borderRadius: 999,
    backgroundColor: TEMA.fondo,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    borderRadius: 999,
  },
  detalle: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
});
