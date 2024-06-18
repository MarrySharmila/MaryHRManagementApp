import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen'; // Assuming you have a DetailsScreen component
import AddEmpScreen from './screens/AddNewEmployee';
import EmpDetails from './screens/EmpDetails';
import UpdateEmpSceen from './screens/UpdateEmployee';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details Screen' }}
        />
         <Stack.Screen
          name="AddEmployee"
          component={AddEmpScreen}
          options={{ title: 'Add Employees' }}
        />
         <Stack.Screen
          name="ViewEmployee"
          component={EmpDetails}
          options={{ title: 'ViewEmployee' }}
        />
        <Stack.Screen
          name="UpdateEmployee"
          component={UpdateEmpSceen}
          options={{ title: 'UpdateEmployee' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;