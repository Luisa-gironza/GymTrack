import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from 'react-native';
import { TEMA } from '@/constants/colores';

interface CampoFormularioProps {
  etiqueta: string;
  value: string;
  onChangeText: (texto: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  ayuda?: string;
}

export function CampoFormulario({
  etiqueta,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  multiline = false,
  ayuda,
}: CampoFormularioProps) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={TEMA.textoApagado}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[
          styles.input,
          multiline && styles.inputMultilinea,
          error ? styles.inputError : null,
        ]}
      />
      {ayuda && !error ? <Text style={styles.ayuda}>{ayuda}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    gap: 6,
  },
  etiqueta: {
    color: TEMA.textoPrimario,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    backgroundColor: TEMA.fondo,
    color: TEMA.textoPrimario,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: TEMA.borde,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 48,
    fontSize: 15,
  },
  inputMultilinea: {
    minHeight: 96,
    paddingTop: 12,
  },
  inputError: {
    borderColor: TEMA.peligro,
  },
  ayuda: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
  error: {
    color: TEMA.peligro,
    fontSize: 14,
    fontWeight: '600',
  },
});
