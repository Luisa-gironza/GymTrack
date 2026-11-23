import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EntradaAnimada } from '@/components/EntradaAnimada';
import { FormularioPerfil } from '@/components/FormularioPerfil';
import { estilosComunes } from '@/constants/estilos';
import { useGym } from '@/context/GymContext';

export default function PerfilScreen() {
  const { socio, setSocio } = useGym();

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
            <Text style={estilosComunes.tituloPantalla}>Perfil</Text>
            <Text style={estilosComunes.subtituloPantalla}>
              Ficha asignada: {socio.fechaAsignacion}
            </Text>
          </View>

          <EntradaAnimada indice={0}>
            <FormularioPerfil
              key={`${socio.nombre}-${socio.edad}-${socio.objetivo}-${socio.lesiones.join(',')}`}
              socioInicial={socio}
              onGuardar={setSocio}
            />
          </EntradaAnimada>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
