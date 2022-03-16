import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Animation_1 from './views/Animation_1';

import Home from './views/Home';
import Animation_Tabbar from './views/Animation_Tabbar';


const Stack = createNativeStackNavigator();
const options = { headerShown: false }
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}  />
                <Stack.Screen name="Animation_1" component={Animation_1} options={options} />
                <Stack.Screen name="Animation_Tabbar" component={Animation_Tabbar} options={options} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;