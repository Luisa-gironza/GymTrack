import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TEMA } from '@/constants/colores';

const SEGUNDOS_INICIALES = 60;

interface TemporizadorDescansoProps {
  colorAcento?: string;
}

function formatearTiempo(segundos: number): string {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(resto).padStart(2, '0')}`;
}

export function TemporizadorDescanso({
  colorAcento = TEMA.acento,
}: TemporizadorDescansoProps) {
  const [segundos, setSegundos] = useState(SEGUNDOS_INICIALES);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    if (!activo) {
      return;
    }

    const intervalo = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          setActivo(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [activo]);

  const alternar = () => {
    if (segundos === 0) {
      setSegundos(SEGUNDOS_INICIALES);
      setActivo(true);
      return;
    }
    setActivo((prev) => !prev);
  };

  const reiniciar = () => {
    setActivo(false);
    setSegundos(SEGUNDOS_INICIALES);
  };

  const progreso = Math.round((segundos / SEGUNDOS_INICIALES) * 100);
  const finalizado = segundos === 0;

  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <View style={styles.tituloFila}>
          <Ionicons name="timer-outline" size={20} color={colorAcento} />
          <Text style={styles.titulo}>Temporizador de descanso</Text>
        </View>
        <Text style={[styles.reloj, { color: finalizado ? TEMA.exito : colorAcento }]}>
          {formatearTiempo(segundos)}
        </Text>
      </View>

      <View style={styles.pista}>
        <View
          style={[
            styles.relleno,
            {
              width: `${progreso}%`,
              backgroundColor: finalizado ? TEMA.exito : colorAcento,
            },
          ]}
        />
      </View>

      {finalizado && (
        <Text style={styles.mensajeListo}>
          Descanso finalizado. Listo para la siguiente serie.
        </Text>
      )}

      <View style={styles.acciones}>
        <Pressable
          onPress={alternar}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botonPrimario,
            { backgroundColor: colorAcento },
            pressed && styles.presionado,
          ]}
        >
          <Ionicons
            name={activo ? 'pause' : 'play'}
            size={18}
            color={TEMA.fondo}
          />
          <Text style={styles.textoPrimario}>
            {activo ? 'Pausar' : finalizado ? 'Repetir 60 s' : 'Iniciar 60 s'}
          </Text>
        </Pressable>

        <Pressable
          onPress={reiniciar}
          accessibilityRole="button"
          style={({ pressed }) => [styles.botonSecundario, pressed && styles.presionado]}
        >
          <Ionicons name="refresh" size={18} color={TEMA.textoPrimario} />
          <Text style={styles.textoSecundario}>Reiniciar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 16,
    gap: 12,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  tituloFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  titulo: {
    color: TEMA.textoPrimario,
    fontSize: 15,
    fontWeight: '700',
  },
  reloj: {
    fontSize: 24,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  pista: {
    height: 8,
    borderRadius: 999,
    backgroundColor: TEMA.fondo,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    borderRadius: 999,
  },
  mensajeListo: {
    color: TEMA.exito,
    fontSize: 14,
    fontWeight: '700',
  },
  acciones: {
    flexDirection: 'row',
    gap: 10,
  },
  botonPrimario: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    borderRadius: 12,
    gap: 8,
  },
  botonSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: TEMA.borde,
    backgroundColor: TEMA.fondo,
    gap: 6,
  },
  presionado: {
    opacity: 0.8,
  },
  textoPrimario: {
    color: TEMA.fondo,
    fontSize: 15,
    fontWeight: '800',
  },
  textoSecundario: {
    color: TEMA.textoPrimario,
    fontSize: 15,
    fontWeight: '700',
  },
});
