import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function ExplorePage() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      {/* The Stack.Screen component allows us to configure the 
        header dynamically from inside the page 
      */}
      <Stack.Screen options={{ title: 'Explore' }} />
      
      <Text className="text-xl font-medium text-slate-900">
        Well hello there!
      </Text>
      <Text className="text-slate-500 mt-2">
        This is the second page.
      </Text>
    </View>
  );
}