import { Slot, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/theme';
import { Header } from '@/src/components/ui/Header';
import { WhatsAppFab } from '@/src/components/ui/WhatsAppFab';


export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const getBackgroundColor = () => {
    if (pathname.includes('belajar')) return COLORS.bgBelajar;
    if (pathname.includes('tutor')) return COLORS.bgTutor;
    if (pathname.includes('kelas')) return COLORS.bgKelas;
    return COLORS.bgHome;
  };

  return (
    <View style={StyleSheet.flatten([
      styles.container, 
      { backgroundColor: getBackgroundColor(), paddingTop: insets.top }
    ])}>
      
      <Header />
      
      <View style={styles.contentContainer}>
         <Slot />
      </View>
      
      <WhatsAppFab />
      
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
    maxWidth: 1200,
    alignSelf: 'center',
  },
});