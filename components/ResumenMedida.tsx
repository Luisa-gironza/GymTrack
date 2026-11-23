import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TEMA } from '@/constants/colores';
import type { Medida } from '@/types/gym';
import { calcularImc, clasificarImc } from '@/utils/imc';

interface ResumenMedidaProps {
  actual: Medida;
  anterior?: Medida;
}

function formatearDecimal(valor: number): string {
  return valor.toFixed(1).replace('.', ',');
}

export function ResumenMedida({ actual, anterior }: ResumenMedidaProps) {
  const imc = calcularImc(actual.pesoKg, actual.estaturaM);
  const clasificacion = clasificarImc(imc);
  const diferenciaPeso = anterior ? actual.pesoKg - anterior.pesoKg : null;

  const textoDiferencia =
    diferenciaPeso === null
      ? 'Primer registro'
      : diferenciaPeso < 0
        ? `−${formatearDecimal(Math.abs(diferenciaPeso))} kg`
        : diferenciaPeso > 0
          ? `+${formatearDecimal(diferenciaPeso)} kg`
          : '0,0 kg';

  const colorDiferencia =
    diferenciaPeso === null
      ? TEMA.textoSecundario
      : diferenciaPeso < 0
        ? TEMA.acento
        : diferenciaPeso > 0
          ? TEMA.advertencia
          : TEMA.textoPrimario;

  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <Text style={styles.etiqueta}>Último registro ({actual.mes})</Text>
        <View style={styles.badgeImc}>
          <Text style={styles.badgeTexto}>{clasificacion}</Text>
        </View>
      </View>

      <View style={styles.filaMetricas}>
        <View style={styles.cajaMetrica}>
          <Text style={[styles.valor, styles.valorAcento]}>
            {formatearDecimal(imc)}
          </Text>
          <Text style={styles.subEtiqueta}>IMC (OMS)</Text>
        </View>

        <View style={styles.cajaMetrica}>
          <Text style={styles.valor}>{formatearDecimal(actual.pesoKg)} kg</Text>
          <Text style={styles.subEtiqueta}>Peso actual</Text>
        </View>

        <View style={styles.cajaMetrica}>
          <Text style={[styles.valor, { color: colorDiferencia }]}>
            {textoDiferencia}
          </Text>
          <Text style={styles.subEtiqueta}>Vs. mes ant.</Text>
        </View>
      </View>

      <View style={styles.estaturaFila}>
        <Ionicons name="resize-outline" size={16} color={TEMA.acento} />
        <Text style={styles.estaturaTexto}>
          Estatura registrada: {actual.estaturaM.toFixed(2).replace('.', ',')} m
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.acento,
    padding: 18,
    gap: 14,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  etiqueta: {
    color: TEMA.textoPrimario,
    fontSize: 16,
    fontWeight: '800',
  },
  badgeImc: {
    backgroundColor: TEMA.acentoFondo,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeTexto: {
    color: TEMA.acento,
    fontSize: 14,
    fontWeight: '700',
  },
  filaMetricas: {
    flexDirection: 'row',
    gap: 10,
  },
  cajaMetrica: {
    flex: 1,
    backgroundColor: TEMA.fondo,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  valor: {
    color: TEMA.textoPrimario,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  valorAcento: {
    color: TEMA.acento,
  },
  subEtiqueta: {
    color: TEMA.textoSecundario,
    fontSize: 14,
    textAlign: 'center',
  },
  estaturaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  estaturaTexto: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
});
