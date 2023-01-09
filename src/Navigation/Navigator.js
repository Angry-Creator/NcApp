import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import MovieInfo from '../screens/MovieInfo';
import MyTabs from './MyTabs';
import WatchTrailer from '../screens/WatchTrailer';
import { SafeAreaProvider } from 'react-native-safe-area-context';


//creating the stack navigator object
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="MovieInfo" component={MovieInfo} options={{ headerShown: false }} />
          <Stack.Screen name="WatchTrailer" component={WatchTrailer} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
