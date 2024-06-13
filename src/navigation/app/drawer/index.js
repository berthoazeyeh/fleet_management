import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Apps from '../bottom';
import CustomDrawer from '../../../components/Drawer/CustumerDrawer';


const Drawer = createDrawerNavigator()

const DrawerStacks = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName="Appa">

            <Drawer.Screen
                options={{ headerShown: false }}
                name="Appa"
                component={Apps}
            />


        </Drawer.Navigator>
    )
}



export default DrawerStacks