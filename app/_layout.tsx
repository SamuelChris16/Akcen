import { useEffect, useState } from 'react';
import { Slot, usePathname, useRouter, useSegments } from 'expo-router';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/theme';
import { Header } from '@/src/components/ui/Header';
import { WhatsAppFab } from '@/src/components/ui/WhatsAppFab';
import { authApi } from '@/src/api/auth'; // Ensure this path is correct

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const segments = useSegments();
  const router = useRouter();

  // State to prevent "Flash of Unauthenticated Content"
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await authApi.getToken();
        
        // Are we currently inside the (tabs) group?
        const inAuthGroup = segments[0] === '(tabs)';
        
        // Are we on the login screen?
        // (We check pathname or segments to see if we are at /login)
        const inLogin = pathname === '/login';

        if (!token && !inLogin) {
          // No token? Kick to Login
          router.replace('/login');
        } else if (token && inLogin) {
          // Have token but on Login? Kick to Home
          router.replace('/(tabs)');
        }
      } catch (e) {
        console.error("Auth check failed", e);
      } finally {
        // Once check is done, render the app
        setIsReady(true);
      }
    };

    checkAuth();
  }, [pathname]); // Re-run if path changes (helps catch edge cases)


  const isLoginPage = pathname === '/login';

  const getBackgroundColor = () => {
    if (isLoginPage) return COLORS.bgWhite; // Clean white for login
    if (pathname.includes('belajar')) return COLORS.bgBelajar;
    if (pathname.includes('tutor')) return COLORS.bgTutor;
    if (pathname.includes('kelas')) return COLORS.bgKelas;
    return COLORS.bgHome;
  };

  // If we haven't checked the token yet, show a Loading Spinner
  if (!isReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.bgHome} />
      </View>
    );
  }

  return (
    <View style={StyleSheet.flatten([
      styles.container, 
      // The Root Container is always white
      { backgroundColor: COLORS.bgWhite, paddingTop: insets.top }
    ])}>
      
      {!isLoginPage && <Header />}
      
      {/* Content Container */}
      <View style={StyleSheet.flatten([
        styles.contentContainer, 
        { backgroundColor: getBackgroundColor() }
      ])}>
         <Slot />
      </View>
      
      {!isLoginPage && <WhatsAppFab />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});