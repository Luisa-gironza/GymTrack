import { StyleSheet } from 'react-native';
import { TEMA } from '@/constants/colores';

export const estilosComunes = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: TEMA.fondo,
  },
  flex: {
    flex: 1,
  },
  scrollContenido: {
    padding: 20,
    paddingBottom: 36,
    gap: 16,
  },
  encabezado: {
    gap: 4,
  },
  tituloPantalla: {
    color: TEMA.textoPrimario,
    fontSize: 28,
    fontWeight: '800',
  },
  subtituloPantalla: {
    color: TEMA.textoSecundario,
    fontSize: 15,
  },
});
