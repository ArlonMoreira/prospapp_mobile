import { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import * as Application from 'expo-application';
import Constants from 'expo-constants';

// Função para comparar versões no formato "x.y.z" ou com sufixos (ex.: 1.0.0-beta)
const compareVersions = (v1, v2) => {
  const normalize = (v) =>
    v.replace(/[^0-9.]/g, '') // Remove sufixos (ex.: "-beta")
     .split('.')
     .map(Number);

  const a = normalize(v1);
  const b = normalize(v2);

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] || 0) - (b[i] || 0);
    if (diff !== 0) return diff > 0 ? 1 : -1;
  }
  return 0;
};

export const useForceUpdate = ({ apiUrl }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const minVersion = data.minVersion; // Versão
        const URLAndroidDownload = data.expo_build_link_android;
        const URLIosDownload = data.expo_build_link_ios;
        const currentVersion = Constants.expoConfig.version;

        console.log('✅ Versão atual do app:', currentVersion);
        console.log('✅ Versão mínima exigida:', minVersion);

        if (compareVersions(currentVersion, minVersion) < 0) {
          Alert.alert(
            "Atualização Obrigatória",
            "Por favor, atualize para a versão mais recente para continuar usando o aplicativo.",
            [
              {
                text: "Atualizar Agora",
                onPress: () => {
                  const url = Platform.OS === 'android' ? URLAndroidDownload : URLIosDownload;
                  Linking.openURL(url);
                }
              }
            ],
            { cancelable: false } // Não permite fechar sem atualizar
          );
        }
      } catch (error) {
        console.error("Erro ao verificar atualização:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUpdate();
  }, [apiUrl]);

  return { loading };
};
