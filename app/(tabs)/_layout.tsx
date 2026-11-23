import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { TEMA } from '@/constants/colores';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TEMA.acento,
        tabBarInactiveTintColor: TEMA.textoSecundario,
        tabBarStyle: {
          backgroundColor: TEMA.tabBar,
          borderTopColor: TEMA.borde,
          borderTopWidth: 0.75,
          minHeight: 68,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="catalogo"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'barbell' : 'barbell-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="medidas"
        options={{
          title: 'Medidas',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'analytics' : 'analytics-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
