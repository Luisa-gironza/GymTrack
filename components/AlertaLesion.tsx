import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { NOMBRES_GRUPO, TEMA } from '@/constants/colores';
import type { GrupoMuscular } from '@/types/gym';

interface AlertaLesionProps {
  grupo: GrupoMuscular;
  observaciones?: string[];
}

export function AlertaLesion({ grupo, observaciones = [] }: AlertaLesionProps) {
  return (
    <View style={styles.contenedor} accessibilityRole="alert">
      <View style={styles.filaTitulo}>
        <Ionicons name="warning" size={22} color={TEMA.advertencia} />
        <Text style={styles.titulo}>
          Restricción médica: {NOMBRES_GRUPO[grupo]}
        </Text>
      </View>
      <Text style={styles.mensaje}>
        Tu perfil registra una lesión asociada a {NOMBRES_GRUPO[grupo].toLowerCase()}.
        Reduce la carga, controla la técnica o consulta al entrenador antes de ejecutar.
      </Text>
      {observaciones.length > 0 && (
        <View style={styles.listaObs}>
          {observaciones.map((obs) => (
            <Text key={obs} style={styles.obsItem}>
              • {obs}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: TEMA.advertenciaFondo,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: TEMA.advertencia,
    padding: 16,
    gap: 8,
  },
  filaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titulo: {
    color: TEMA.advertencia,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  mensaje: {
    color: TEMA.textoPrimario,
    fontSize: 14,
    lineHeight: 20,
  },
  listaObs: {
    gap: 4,
    marginTop: 2,
  },
  obsItem: {
    color: TEMA.textoSecundario,
    fontSize: 14,
  },
});
