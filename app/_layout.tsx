import "../global.css"
import { Stack } from "expo-router";
import {
  QueryClient,
} from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import {
  createAsyncStoragePersister
} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage'

const queryClient = new QueryClient()
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

export default function RootStack() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PersistQueryClientProvider>
  )
}