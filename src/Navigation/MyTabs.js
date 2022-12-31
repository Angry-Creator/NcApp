import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Dashboard from '../screens/Dashboard';
import appColors from '../config/appColors';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Downloads from '../screens/Downloads';
import Settings from '../screens/Settings';

//Screen Names
const homeScreen = "Home";
const moviesScreen = "Movies";
const searchScreen = "Search";
const downloadScreen = "Downloads";
const settingsScreen = "Settings";

const Tab = createBottomTabNavigator();
export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
      tabBarIcon: (({ focused, color, size }) => {
        let iconName;
        let rn = route.name;
        if (rn == homeScreen) {
          iconName = focused ? "home" : "home-outline";
        }
        else if (rn == moviesScreen) {
          iconName = focused ? "movie" : "movie-outline";
        }
        else if (rn == searchScreen) {
          iconName = focused ? "search" : "search-outline";
        }
        else if (rn == downloadScreen) {
          iconName = focused ? "download" : "download";
        }
        else if (rn == settingsScreen) {
          iconName = focused ? "settings" : "settings-outline";
        }
        if (rn == settingsScreen) {
          return <Ionicons name={iconName} color={color} size={size} />
        }
        else if(rn == searchScreen){
          return <Ionicons name={iconName} color={color} size={size} />
        }
        else {
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />
        }
      }),
      tabBarActiveTintColor: appColors.primary,
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle: {
        paddingBottom: 5, fontSize: 10,
        backgroundColor: appColors.transparent
      },
      tabBarStyle: {
        padding: 5,
        height: 50,
        backgroundColor: appColors.transparent,
      }
    })}>
      <Tab.Screen name={homeScreen} component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name={moviesScreen} component={Movies} options={{ headerShown: false }} />
      <Tab.Screen name={searchScreen} component={Search} options={{ headerShown: false }} />
      <Tab.Screen name={downloadScreen} component={Downloads} options={{ headerShown: false }} />
      <Tab.Screen name={settingsScreen} component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}