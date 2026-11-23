import { StyleSheet, Text, View } from 'react-native';
import { NOMBRES_PERIMETRO, PERIMETROS_ORDEN, TEMA } from '@/constants/colores';
import type { Medida } from '@/types/gym';
import { calcularImc, clasificarImc } from '@/utils/imc';

interface TarjetaMedidaProps {
  medida: Medida;
}

export function TarjetaMedida({ medida }: TarjetaMedidaProps) {
  const imc = calcularImc(medida.pesoKg, medida.estaturaM);
  const clasificacion = clasificarImc(imc);

  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <Text style={styles.mes}>{medida.mes}</Text>
        <Text style={styles.imc}>
          IMC {imc.toFixed(1).replace('.', ',')} · {clasificacion}
        </Text>
      </View>

      <Text style={styles.basicos}>
        Peso: {medida.pesoKg.toFixed(1).replace('.', ',')} kg · Estatura:{' '}
        {medida.estaturaM.toFixed(2).replace('.', ',')} m
      </Text>

      <View style={styles.cuadricula}>
        {PERIMETROS_ORDEN.map((clave) => (
          <View key={clave} style={styles.celda}>
            <Text style={styles.celdaEtiqueta}>{NOMBRES_PERIMETRO[clave]}</Text>
            <Text style={styles.celdaValor}>{medida.perimetrosCm[clave]} cm</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 18,
    gap: 10,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  mes: {
    color: TEMA.textoPrimario,
    fontSize: 17,
    fontWeight: '800',
  },
  imc: {
    color: TEMA.acento,
    fontSize: 14,
    fontWeight: '700',
  },
  basicos: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  cuadricula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  celda: {
    width: '48%',
    backgroundColor: TEMA.fondo,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: TEMA.borde,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  celdaEtiqueta: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  celdaValor: {
    color: TEMA.textoPrimario,
    fontSize: 14,
    fontWeight: '700',
  },
});
