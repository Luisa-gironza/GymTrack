import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormularioMedida } from '@/components/FormularioMedida';
import { ResumenMedida } from '@/components/ResumenMedida';
import { TarjetaMedida } from '@/components/TarjetaMedida';
import { TEMA } from '@/constants/colores';
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
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.contenido}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.encabezado}>
            <Text style={styles.titulo}>Medidas mensuales</Text>
            <Text style={styles.subtitulo}>
              Seguimiento de peso, IMC (OMS) y 8 perímetros corporales
            </Text>
          </View>

          {ultima !== undefined && (
            <ResumenMedida actual={ultima} anterior={anterior} />
          )}

          <Pressable
            onPress={() => setMostrarFormulario((prev) => !prev)}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.botonToggle,
              pressed && styles.presionado,
            ]}
          >
            <Ionicons
              name={mostrarFormulario ? 'chevron-up' : 'add-circle-outline'}
              size={22}
              color={TEMA.fondo}
            />
            <Text style={styles.textoToggle}>
              {mostrarFormulario ? 'Ocultar formulario' : 'Registrar nuevo mes'}
            </Text>
          </Pressable>

          {mostrarFormulario && (
            <FormularioMedida
              mesesExistentes={ordenadas.map((item) => item.mes)}
              onGuardar={manejarGuardar}
            />
          )}

          <View style={styles.seccionHistorial}>
            <Text style={styles.tituloSeccion}>
              Historial ({ordenadas.length}{' '}
              {ordenadas.length === 1 ? 'registro' : 'registros'})
            </Text>
            {ordenadas.map((medida) => (
              <TarjetaMedida key={medida.mes} medida={medida} />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: TEMA.fondo,
  },
  flex: {
    flex: 1,
  },
  contenido: {
    padding: 20,
    paddingBottom: 36,
    gap: 16,
  },
  encabezado: {
    gap: 4,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitulo: {
    color: TEMA.textoSecundario,
    fontSize: 15,
  },
  botonToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TEMA.acento,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 16,
    gap: 8,
  },
  presionado: {
    opacity: 0.85,
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
    fontSize: 18,
    fontWeight: '800',
  },
});
