import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormularioPerfil } from '@/components/FormularioPerfil';
import { TEMA } from '@/constants/colores';
import { useGym } from '@/context/GymContext';

export default function PerfilScreen() {
  const { socio, setSocio } = useGym();

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
            <Text style={styles.titulo}>Perfil del socio</Text>
            <Text style={styles.subtitulo}>
              Ficha asignada: {socio.fechaAsignacion}
            </Text>
          </View>

          <FormularioPerfil
            key={`${socio.nombre}-${socio.edad}-${socio.objetivo}-${socio.lesiones.join(',')}`}
            socioInicial={socio}
            onGuardar={setSocio}
          />
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
});
