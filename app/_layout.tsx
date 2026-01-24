import { Slot, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/theme';
import { Header } from '@/src/components/ui/Header';
import { WhatsAppFab } from '@/src/components/ui/WhatsAppFab';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  // Determine the PAGE CONTENT background color
  const getBackgroundColor = () => {
    if (pathname.includes('belajar')) return COLORS.bgBelajar;
    if (pathname.includes('tutor')) return COLORS.bgTutor;
    if (pathname.includes('kelas')) return COLORS.bgKelas;
    return COLORS.bgHome;
  };

  return (
    <View style={StyleSheet.flatten([
      styles.container, 
      // 1. The Root Container is ALWAYS WHITE (This makes the Header background white)
      { backgroundColor: COLORS.bgWhite, paddingTop: insets.top }
    ])}>
      
      {/* 2. Header sits on top of the white background */}
      <Header />
      
      {/* 3. Content Container gets the DYNAMIC color */}
      {/* flex: 1 ensures it fills the rest of the screen */}
      <View style={StyleSheet.flatten([
        styles.contentContainer, 
        { backgroundColor: getBackgroundColor() }
      ])}>
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
    flex: 1, // Fills remaining space below header
    width: '100%',
    // Optional: Add rounded corners to top if you want the "card" look 
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});