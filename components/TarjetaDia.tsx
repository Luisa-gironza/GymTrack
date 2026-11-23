import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NOMBRES_DIA, TEMA } from '@/constants/colores';
import type { DiaPlan } from '@/types/gym';

interface TarjetaDiaProps {
  plan: DiaPlan;
  esHoy: boolean;
  completados: number;
  onPress: () => void;
}

export function TarjetaDia({
  plan,
  esHoy,
  completados,
  onPress,
}: TarjetaDiaProps) {
  const total = plan.ejercicios.length;
  const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver plan de ${NOMBRES_DIA[plan.dia]}: ${plan.enfoque}`}
      style={({ pressed }) => [
        styles.tarjeta,
        {
          borderLeftColor: plan.color,
          borderColor: esHoy ? plan.color : TEMA.borde,
          borderWidth: esHoy ? 1.5 : 1,
          borderLeftWidth: 6,
        },
        pressed && styles.presionada,
      ]}
    >
      <View style={styles.filaSuperior}>
        <View style={styles.tituloBloque}>
          <View style={styles.filaNombre}>
            <Text style={styles.dia}>{NOMBRES_DIA[plan.dia]}</Text>
            {esHoy && (
              <View style={[styles.insigniaHoy, { backgroundColor: plan.color }]}>
                <Text style={styles.textoHoy}>HOY</Text>
              </View>
            )}
          </View>
          <Text style={styles.enfoque}>{plan.enfoque}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={TEMA.textoSecundario} />
      </View>

      <View style={styles.filaMeta}>
        <View style={styles.chipMeta}>
          <Ionicons name="barbell-outline" size={16} color={plan.color} />
          <Text style={styles.textoMeta}>{total} ejercicios</Text>
        </View>

        {plan.cardioMin !== undefined && (
          <View style={styles.chipMeta}>
            <Ionicons name="flame-outline" size={16} color={plan.color} />
            <Text style={styles.textoMeta}>Cardio {plan.cardioMin} min</Text>
          </View>
        )}

        <View style={styles.chipMeta}>
          <Ionicons
            name={porcentaje === 100 ? 'checkmark-circle' : 'pie-chart-outline'}
            size={16}
            color={porcentaje === 100 ? TEMA.exito : TEMA.textoSecundario}
          />
          <Text style={styles.textoMeta}>
            {completados}/{total} ({porcentaje}%)
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 16,
    padding: 16,
    minHeight: 96,
    gap: 12,
  },
  presionada: {
    opacity: 0.85,
  },
  filaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  tituloBloque: {
    flex: 1,
    gap: 4,
  },
  filaNombre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dia: {
    color: TEMA.textoPrimario,
    fontSize: 18,
    fontWeight: '800',
  },
  insigniaHoy: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  textoHoy: {
    color: TEMA.fondo,
    fontSize: 14,
    fontWeight: '800',
  },
  enfoque: {
    color: TEMA.textoSecundario,
    fontSize: 15,
    fontWeight: '500',
  },
  filaMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chipMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoMeta: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
});
