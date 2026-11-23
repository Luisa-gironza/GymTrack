import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TEMA } from '@/constants/colores';
import { GymProvider } from '@/context/GymContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GymProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: TEMA.fondo },
            headerTintColor: TEMA.textoPrimario,
            headerTitleStyle: { fontWeight: '700' },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: TEMA.fondo },
            headerBackTitle: 'Atrás',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="dia/[dia]" options={{ title: 'Detalle del día' }} />
          <Stack.Screen name="grupo/[grupo]" options={{ title: 'Grupo muscular' }} />
          <Stack.Screen name="ejercicio/[id]" options={{ title: 'Ejercicio' }} />
        </Stack>
      </GymProvider>
    </SafeAreaProvider>
  );
}
