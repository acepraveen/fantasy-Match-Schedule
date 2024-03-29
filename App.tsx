import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Schedule from './src/screens/Schedule';
import EditSchedule from './src/screens/EditSchedule';
import ScheduleDetails from './src/screens/ScheduleDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="EditSchedule" component={EditSchedule} />
        <Stack.Screen name="ScheduleDetails" component={ScheduleDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
