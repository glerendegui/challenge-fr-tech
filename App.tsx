import { StyleSheet } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GitHubAPIProvider } from "./src/contexts/GitHubAPIProvider";
import { FavsProvider } from "./src/contexts/FavsProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubAPIProvider>
        <FavsProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Navigation />
            </SafeAreaView>
          </SafeAreaProvider>
        </FavsProvider>
      </GitHubAPIProvider>
    </QueryClientProvider>
  );
}
