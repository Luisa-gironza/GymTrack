import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { BotonAnimado } from '@/components/BotonAnimado';
import { CampoFormulario } from '@/components/CampoFormulario';
import { NOMBRES_PERIMETRO, PERIMETROS_ORDEN, TEMA } from '@/constants/colores';
import type { ClavePerimetro, Medida } from '@/types/gym';

interface FormularioMedidaProps {
  mesesExistentes: string[];
  onGuardar: (medida: Medida) => void;
}

type ValoresPerimetros = Record<ClavePerimetro, string>;

interface ErroresMedida {
  mes?: string;
  estaturaM?: string;
  pesoKg?: string;
  perimetros?: Partial<Record<ClavePerimetro, string>>;
}

const PERIMETROS_VACIOS: ValoresPerimetros = {
  hombro: '',
  brazo: '',
  antebrazo: '',
  pecho: '',
  abdomen: '',
  cadera: '',
  pierna: '',
  pantorrilla: '',
};

function parsearDecimal(texto: string): number {
  const limpio = texto.trim().replace(',', '.');
  if (limpio.length === 0) return Number.NaN;
  return Number(limpio);
}

export function FormularioMedida({
  mesesExistentes,
  onGuardar,
}: FormularioMedidaProps) {
  const [mes, setMes] = useState('');
  const [estaturaTexto, setEstaturaTexto] = useState('');
  const [pesoTexto, setPesoTexto] = useState('');
  const [perimetros, setPerimetros] = useState<ValoresPerimetros>(PERIMETROS_VACIOS);
  const [errores, setErrores] = useState<ErroresMedida>({});

  const actualizarPerimetro = (clave: ClavePerimetro, valor: string) => {
    setPerimetros((prev) => ({ ...prev, [clave]: valor }));
  };

  const registrar = () => {
    const nuevosErrores: ErroresMedida = {};
    const mesLimpio = mes.trim();

    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(mesLimpio)) {
      nuevosErrores.mes = 'Usa el formato AAAA-MM (ej. 2026-12).';
    } else if (mesesExistentes.includes(mesLimpio)) {
      nuevosErrores.mes = 'Ese mes ya está registrado en el historial.';
    }

    const estatura = parsearDecimal(estaturaTexto);
    if (Number.isNaN(estatura) || estatura < 1.0 || estatura > 2.3) {
      nuevosErrores.estaturaM = 'La estatura debe estar entre 1,00 y 2,30 m.';
    }

    const peso = parsearDecimal(pesoTexto);
    if (Number.isNaN(peso) || peso < 30 || peso > 300) {
      nuevosErrores.pesoKg = 'El peso debe estar entre 30 y 300 kg.';
    }

    const erroresPerimetros: Partial<Record<ClavePerimetro, string>> = {};
    const perimetrosNumericos: Record<ClavePerimetro, number> = {
      hombro: 0,
      brazo: 0,
      antebrazo: 0,
      pecho: 0,
      abdomen: 0,
      cadera: 0,
      pierna: 0,
      pantorrilla: 0,
    };

    for (const clave of PERIMETROS_ORDEN) {
      const valor = parsearDecimal(perimetros[clave]);
      if (Number.isNaN(valor) || valor <= 0 || valor > 250) {
        erroresPerimetros[clave] = 'Ingresa un valor válido en cm (1 a 250).';
      } else {
        perimetrosNumericos[clave] = valor;
      }
    }

    if (Object.keys(erroresPerimetros).length > 0) {
      nuevosErrores.perimetros = erroresPerimetros;
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    onGuardar({
      mes: mesLimpio,
      estaturaM: Number(estatura.toFixed(2)),
      pesoKg: Number(peso.toFixed(1)),
      perimetrosCm: perimetrosNumericos,
    });

    setMes('');
    setEstaturaTexto('');
    setPesoTexto('');
    setPerimetros(PERIMETROS_VACIOS);
    setErrores({});
    Alert.alert('Medida registrada', `Se guardó el registro del mes ${mesLimpio}.`);
  };

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>Registrar nuevo mes</Text>

      <CampoFormulario
        etiqueta="Mes (AAAA-MM)"
        value={mes}
        onChangeText={setMes}
        placeholder="Ej. 2026-12"
        error={errores.mes}
      />

      <View style={styles.filaDoble}>
        <View style={styles.mitad}>
          <CampoFormulario
            etiqueta="Estatura (m)"
            value={estaturaTexto}
            onChangeText={setEstaturaTexto}
            placeholder="1.75"
            keyboardType="decimal-pad"
            error={errores.estaturaM}
          />
        </View>
        <View style={styles.mitad}>
          <CampoFormulario
            etiqueta="Peso (kg)"
            value={pesoTexto}
            onChangeText={setPesoTexto}
            placeholder="96.5"
            keyboardType="decimal-pad"
            error={errores.pesoKg}
          />
        </View>
      </View>

      <Text style={styles.subtitulo}>Perímetros corporales (cm)</Text>

      <View style={styles.gridPerimetros}>
        {PERIMETROS_ORDEN.map((clave) => (
          <View key={clave} style={styles.celdaCampo}>
            <CampoFormulario
              etiqueta={`${NOMBRES_PERIMETRO[clave]} (cm)`}
              value={perimetros[clave]}
              onChangeText={(texto) => actualizarPerimetro(clave, texto)}
              placeholder="cm"
              keyboardType="decimal-pad"
              error={errores.perimetros?.[clave]}
            />
          </View>
        ))}
      </View>

      <BotonAnimado
        onPress={registrar}
        haptic="success"
        style={styles.boton}
      >
        <Text style={styles.botonTexto}>Guardar medida mensual</Text>
      </BotonAnimado>
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
    gap: 14,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 18,
    fontWeight: '800',
  },
  subtitulo: {
    color: TEMA.acento,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  filaDoble: {
    flexDirection: 'row',
    gap: 12,
  },
  mitad: {
    flex: 1,
  },
  gridPerimetros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  celdaCampo: {
    width: '48%',
  },
  boton: {
    backgroundColor: TEMA.acento,
    borderRadius: 999,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  botonTexto: {
    color: TEMA.fondo,
    fontSize: 16,
    fontWeight: '800',
  },
});
