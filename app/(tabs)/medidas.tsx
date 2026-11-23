import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BotonAnimado } from '@/components/BotonAnimado';
import { EntradaAnimada } from '@/components/EntradaAnimada';
import { FormularioMedida } from '@/components/FormularioMedida';
import { ResumenMedida } from '@/components/ResumenMedida';
import { TarjetaMedida } from '@/components/TarjetaMedida';
import { TEMA } from '@/constants/colores';
import { estilosComunes } from '@/constants/estilos';
import { useGym } from '@/context/GymContext';
import type { Medida } from '@/types/gym';

export default function MedidasScreen() {
  const { medidas, agregarMedida } = useGym();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const ordenadas = [...medidas].sort((a, b) => b.mes.localeCompare(a.mes));
  const ultima = ordenadas[0];
  const anterior = ordenadas[1];

  const manejarGuardar = (nueva: Medida) => {
    agregarMedida(nueva);
    setMostrarFormulario(false);
  };

  return (
    <SafeAreaView style={estilosComunes.pantalla} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={estilosComunes.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={estilosComunes.scrollContenido}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={estilosComunes.encabezado}>
            <Text style={estilosComunes.tituloPantalla}>Medidas</Text>
            <Text style={estilosComunes.subtituloPantalla}>
              Seguimiento de peso, IMC (OMS) y 8 perímetros corporales
            </Text>
          </View>

          {ultima !== undefined && (
            <EntradaAnimada indice={0}>
              <ResumenMedida actual={ultima} anterior={anterior} />
            </EntradaAnimada>
          )}

          <BotonAnimado
            onPress={() => setMostrarFormulario((prev) => !prev)}
            haptic="light"
            style={styles.botonToggle}
          >
            <Ionicons
              name={mostrarFormulario ? 'chevron-up' : 'add-circle'}
              size={22}
              color={TEMA.fondo}
            />
            <Text style={styles.textoToggle}>
              {mostrarFormulario ? 'Ocultar formulario' : 'Registrar nuevo mes'}
            </Text>
          </BotonAnimado>

          {mostrarFormulario && (
            <EntradaAnimada indice={0}>
              <FormularioMedida
                mesesExistentes={ordenadas.map((item) => item.mes)}
                onGuardar={manejarGuardar}
              />
            </EntradaAnimada>
          )}

          <View style={styles.seccionHistorial}>
            <Text style={styles.tituloSeccion}>
              Historial ({ordenadas.length}{' '}
              {ordenadas.length === 1 ? 'registro' : 'registros'})
            </Text>
            {ordenadas.map((medida, indice) => (
              <EntradaAnimada key={medida.mes} indice={indice + 1}>
                <TarjetaMedida medida={medida} />
              </EntradaAnimada>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  botonToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEMA.acento,
    borderRadius: 999,
    minHeight: 50,
    paddingHorizontal: 20,
    gap: 8,
  },
  textoToggle: {
    color: TEMA.fondo,
    fontSize: 16,
    fontWeight: '800',
  },
  seccionHistorial: {
    gap: 12,
  },
  tituloSeccion: {
    color: TEMA.textoPrimario,
    fontSize: 19,
    fontWeight: '800',
  },
});
