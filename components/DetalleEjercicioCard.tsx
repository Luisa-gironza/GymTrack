import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BotonAnimado } from '@/components/BotonAnimado';
import { NOMBRES_DIA, NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import type { DiaPlan, DiaSemana, Ejercicio } from '@/types/gym';

interface DetalleEjercicioCardProps {
  ejercicio: Ejercicio;
  diasAsignados: DiaPlan[];
  onAbrirDia: (dia: DiaSemana) => void;
}

export function DetalleEjercicioCard({
  ejercicio,
  diasAsignados,
  onAbrirDia,
}: DetalleEjercicioCardProps) {
  return (
    <View style={styles.columna}>
      <View style={styles.mediaCard}>
        {ejercicio.imagen !== undefined ? (
          <Image
            source={ejercicio.imagen}
            style={styles.imagen}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholder}>
            <View style={styles.circuloIcono}>
              <Ionicons name="barbell" size={44} color={TEMA.acento} />
            </View>
            <Text style={styles.codigo}>{ejercicio.id.toUpperCase()}</Text>
            <Text style={styles.placeholderTexto}>
              Ilustración de {NOMBRES_GRUPO[ejercicio.grupo]}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.badgeGrupo}>
          <Text style={styles.badgeGrupoTexto}>
            {NOMBRES_GRUPO[ejercicio.grupo]}
          </Text>
        </View>
        <Text style={styles.nombre}>{ejercicio.nombre}</Text>

        <View style={styles.metricasFila}>
          <View style={styles.metrica}>
            <Text style={styles.metricaValor}>{ejercicio.series}</Text>
            <Text style={styles.metricaEtiqueta}>Series</Text>
          </View>
          <View style={styles.metrica}>
            <Text style={styles.metricaValor}>{ejercicio.repeticiones}</Text>
            <Text style={styles.metricaEtiqueta}>Reps</Text>
          </View>
          <View style={styles.metrica}>
            <Text style={[styles.metricaValor, styles.valorAcento]}>
              {ejercicio.series} × {ejercicio.repeticiones}
            </Text>
            <Text style={styles.metricaEtiqueta}>Esquema</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.seccionTitulo}>Días asignados en tu plan</Text>
        {diasAsignados.length === 0 ? (
          <Text style={styles.sinDias}>
            Este ejercicio está disponible en el catálogo, pero no está asignado en el plan semanal actual.
          </Text>
        ) : (
          <View style={styles.chipsDias}>
            {diasAsignados.map((plan) => (
              <BotonAnimado
                key={plan.dia}
                onPress={() => onAbrirDia(plan.dia)}
                haptic="light"
                style={[styles.chipDia, { borderColor: plan.color }]}
              >
                <View style={[styles.punto, { backgroundColor: plan.color }]} />
                <Text style={styles.chipDiaTexto}>
                  {NOMBRES_DIA[plan.dia]} · {plan.enfoque}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={TEMA.textoSecundario} />
              </BotonAnimado>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  columna: {
    gap: 16,
  },
  mediaCard: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    gap: 8,
  },
  circuloIcono: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: TEMA.acentoFondo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codigo: {
    color: TEMA.acento,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  placeholderTexto: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  card: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 18,
    gap: 12,
  },
  badgeGrupo: {
    alignSelf: 'flex-start',
    backgroundColor: TEMA.acentoFondo,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeGrupoTexto: {
    color: TEMA.acento,
    fontSize: 14,
    fontWeight: '700',
  },
  nombre: {
    color: TEMA.textoPrimario,
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  metricasFila: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metrica: {
    flex: 1,
    backgroundColor: TEMA.fondo,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  metricaValor: {
    color: TEMA.textoPrimario,
    fontSize: 18,
    fontWeight: '800',
  },
  valorAcento: {
    color: TEMA.acento,
  },
  metricaEtiqueta: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  seccionTitulo: {
    color: TEMA.textoPrimario,
    fontSize: 17,
    fontWeight: '800',
  },
  sinDias: {
    color: TEMA.textoSecundario,
    fontSize: 14,
    lineHeight: 20,
  },
  chipsDias: {
    gap: 10,
  },
  chipDia: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEMA.fondo,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 48,
    gap: 10,
  },
  punto: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  chipDiaTexto: {
    color: TEMA.textoPrimario,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
});
