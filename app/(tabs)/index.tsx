import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  
  // Navigation action
  const handleHeaderClick = () => {
    router.push('/(tabs)/explore');
  };

  return (
    // SafeAreaView ensures content isn't hidden behind the notch
    <SafeAreaView className="flex-1 bg-white">
      
      {/* Clickable Header */}
      <Pressable 
        onPress={handleHeaderClick}
        className="p-6 border-b border-slate-100 active:bg-slate-50"
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-slate-900">
              Hello World
            </Text>
            <Text className="text-sm text-slate-400 mt-1">
              Click me to explore →
            </Text>
          </View>
          
          {/*A simple circle indicator */}
          <View className="w-3 h-3 rounded-full bg-blue-500" />
        </View>
      </Pressable>

      {/* Main Content Area */}
      <View className="p-6">
        <Text className="text-base text-slate-600 leading-relaxed">
          Minimalist white-base start. The layout above 
          persists because we are inside the (tabs) folder structure.
        </Text>
      </View>

    </SafeAreaView>
  );
}