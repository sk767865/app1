import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BudgetEntryScreen from '../screens/BudgetEntryScreen';
import BudgetEntryListingScreen from '../screens/BudgetEntryListingScreen';
import EditItemScreen from '../screens/EditScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator
        initialRouteName="BudgetEntry"
        screenOptions={{
            headerStyle: { backgroundColor: '#D1A5A5' },
            headerTintColor: '#000',
        }}
    >
        <Stack.Screen
            name="BudgetEntry"
            component={BudgetEntryScreen}
            options={{ title: 'Budget Entry' }}
        />
        <Stack.Screen
            name="BudgetEntryListing"
            component={BudgetEntryListingScreen}
            options={{ title: 'Budget Entry Listing' }}
        />
        <Stack.Screen
            name="EditItem"
            component={EditItemScreen}
            options={{ title: 'Update Budget Entry' }}
        />
    </Stack.Navigator>
);

export default MainStackNavigator;
