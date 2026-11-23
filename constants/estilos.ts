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
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 40,
    gap: 16,
  },
  encabezado: {
    gap: 4,
    marginBottom: 4,
  },
  tituloPantalla: {
    color: TEMA.textoPrimario,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtituloPantalla: {
    color: TEMA.textoSecundario,
    fontSize: 15,
    fontWeight: '500',
  },
  tarjetaBase: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 18,
  },
});
