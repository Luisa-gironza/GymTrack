import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { BotonAnimado } from '@/components/BotonAnimado';
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
    <BotonAnimado
      onPress={onPress}
      haptic="light"
      accessibilityLabel={`Ver plan de ${NOMBRES_DIA[plan.dia]}: ${plan.enfoque}`}
      style={[
        styles.tarjeta,
        esHoy && { borderColor: TEMA.acento, borderWidth: 1.5 },
      ]}
    >
      <View style={styles.filaPrincipal}>
        <View style={[styles.indicadorDia, { backgroundColor: plan.color }]} />

        <View style={styles.contenido}>
          <View style={styles.filaSuperior}>
            <View style={styles.tituloBloque}>
              <View style={styles.filaNombre}>
                <Text style={styles.dia}>{NOMBRES_DIA[plan.dia]}</Text>
                <View style={[styles.badgeColor, { backgroundColor: `${plan.color}24`, borderColor: plan.color }]}>
                  <View style={[styles.puntoColor, { backgroundColor: plan.color }]} />
                  <Text style={[styles.textoBadgeColor, { color: plan.color }]}>
                    {total} ej.
                  </Text>
                </View>
                {esHoy && (
                  <View style={styles.insigniaHoy}>
                    <Text style={styles.textoHoy}>HOY</Text>
                  </View>
                )}
              </View>
              <Text style={styles.enfoque}>{plan.enfoque}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={TEMA.textoSecundario} />
          </View>

          <View style={styles.filaMeta}>
            {plan.cardioMin !== undefined && (
              <View style={styles.chipMeta}>
                <Ionicons name="flame" size={15} color={plan.color} />
                <Text style={styles.textoMeta}>Cardio {plan.cardioMin} min</Text>
              </View>
            )}

            <View style={styles.chipMeta}>
              <Ionicons
                name={porcentaje === 100 ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={porcentaje === 100 ? TEMA.acento : TEMA.textoSecundario}
              />
              <Text
                style={[
                  styles.textoMeta,
                  porcentaje === 100 && styles.textoCompletado,
                ]}
              >
                {completados}/{total} ({porcentaje}%)
              </Text>
            </View>
          </View>
        </View>
      </View>
    </BotonAnimado>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 16,
    minHeight: 102,
  },
  filaPrincipal: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 14,
  },
  indicadorDia: {
    width: 5,
    borderRadius: 999,
  },
  contenido: {
    flex: 1,
    gap: 10,
  },
  filaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  tituloBloque: {
    flex: 1,
    gap: 4,
  },
  filaNombre: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  dia: {
    color: TEMA.textoPrimario,
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  badgeColor: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 2,
    gap: 5,
  },
  puntoColor: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  textoBadgeColor: {
    fontSize: 14,
    fontWeight: '700',
  },
  insigniaHoy: {
    backgroundColor: TEMA.acento,
    paddingHorizontal: 10,
    paddingVertical: 2,
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
    gap: 14,
  },
  chipMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoMeta: {
    color: TEMA.textoSecundario,
    fontSize: 14,
    fontWeight: '500',
  },
  textoCompletado: {
    color: TEMA.acento,
    fontWeight: '700',
  },
});
