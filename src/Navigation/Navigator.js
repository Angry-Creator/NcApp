import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from '../screens/Onboarding';
import MyTabs from './MyTabs';
// import Dashboard from '../screens/Dashboard';

//creating the stack navigator object
const Stack = createNativeStackNavigator();



export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="MyTabs" component={Home} options={{ headerShown: false }} /> */}
        <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
