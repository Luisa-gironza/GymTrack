import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BotonAnimado } from '@/components/BotonAnimado';
import { EntradaAnimada } from '@/components/EntradaAnimada';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { TarjetaGrupo } from '@/components/TarjetaGrupo';
import { GRUPOS_ORDEN, TEMA } from '@/constants/colores';
import { estilosComunes } from '@/constants/estilos';
import { useGym } from '@/context/GymContext';
import { EJERCICIOS } from '@/data/ejercicios';
import { normalizar } from '@/utils/texto';

export default function CatalogoScreen() {
  const { socio } = useGym();
  const [busqueda, setBusqueda] = useState('');
  const { width } = useWindowDimensions();
  const anchoColumna: `${number}%` = width > 600 ? '33.33%' : '50%';
  const consulta = normalizar(busqueda.trim());

  const resultados = consulta
    ? EJERCICIOS.filter((ej) => normalizar(ej.nombre).includes(consulta))
    : [];

  return (
    <SafeAreaView style={estilosComunes.pantalla} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={estilosComunes.scrollContenido}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={estilosComunes.encabezado}>
          <Text style={estilosComunes.tituloPantalla}>Catálogo</Text>
          <Text style={estilosComunes.subtituloPantalla}>
            11 grupos musculares · {EJERCICIOS.length} ejercicios
          </Text>
        </View>

        <View style={styles.barraBusqueda}>
          <Ionicons name="search" size={20} color={TEMA.acento} />
          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar ejercicio (ej. extension, curl...)"
            placeholderTextColor={TEMA.textoApagado}
            style={styles.input}
            autoCorrect={false}
            returnKeyType="search"
          />
          {busqueda.length > 0 && (
            <BotonAnimado
              onPress={() => setBusqueda('')}
              haptic="light"
              accessibilityLabel="Limpiar búsqueda"
              style={styles.botonLimpiar}
            >
              <Ionicons name="close-circle" size={22} color={TEMA.textoSecundario} />
            </BotonAnimado>
          )}
        </View>

        {consulta.length > 0 ? (
          <View style={styles.listaResultados}>
            <Text style={styles.contadorResultados}>
              {resultados.length}{' '}
              {resultados.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </Text>
            {resultados.length === 0 ? (
              <View style={styles.vacio}>
                <Ionicons name="search-outline" size={32} color={TEMA.textoSecundario} />
                <Text style={styles.vacioTexto}>
                  No se encontraron ejercicios que coincidan con “{busqueda.trim()}”.
                </Text>
              </View>
            ) : (
              resultados.map((ejercicio, indice) => (
                <EntradaAnimada key={ejercicio.id} indice={indice}>
                  <ItemEjercicio
                    ejercicio={ejercicio}
                    advertenciaLesion={socio.lesiones.includes(ejercicio.grupo)}
                    onAbrirDetalle={() =>
                      router.push({
                        pathname: '/ejercicio/[id]',
                        params: { id: ejercicio.id },
                      })
                    }
                  />
                </EntradaAnimada>
              ))
            )}
          </View>
        ) : (
          <EntradaAnimada indice={0}>
            <View style={styles.cuadricula}>
              {GRUPOS_ORDEN.map((grupo) => {
                const cantidad = EJERCICIOS.filter((e) => e.grupo === grupo).length;
                return (
                  <TarjetaGrupo
                    key={grupo}
                    grupo={grupo}
                    cantidad={cantidad}
                    anchoPorcentaje={anchoColumna}
                    tieneLesion={socio.lesiones.includes(grupo)}
                    onPress={() =>
                      router.push({
                        pathname: '/grupo/[grupo]',
                        params: { grupo },
                      })
                    }
                  />
                );
              })}
            </View>
          </EntradaAnimada>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TEMA.tarjeta,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: TEMA.borde,
    paddingLeft: 16,
    paddingRight: 6,
    minHeight: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    color: TEMA.textoPrimario,
    fontSize: 15,
    paddingVertical: 10,
  },
  botonLimpiar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuadricula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  listaResultados: {
    gap: 10,
  },
  contadorResultados: {
    color: TEMA.textoSecundario,
    fontSize: 14,
    fontWeight: '600',
  },
  vacio: {
    backgroundColor: TEMA.tarjeta,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEMA.borde,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  vacioTexto: {
    color: TEMA.textoSecundario,
    fontSize: 15,
    textAlign: 'center',
  },
});
