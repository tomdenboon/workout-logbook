import { SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://monkelog.com' }} />
    </SafeAreaView>
  );
}
