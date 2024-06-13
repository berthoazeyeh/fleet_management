import React, { useState } from 'react';
import { Text } from 'react-native';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <View style={styles.header}>
            <View style={styles.headerleft} >
                <Text style={styles.testStyle}>Tableau de bord</Text>
            </View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                style={{ backgroundColor: "#fff" }}
                anchor={<Button onPress={openMenu}><MaterialCommunityIcons
                    name="cog"
                    size={20}
                    color="#fff"
                    style={styles.icon}
                /></Button>}
            >
                <Menu.Item onPress={() => {

                }} title="Parametre" />
                <Menu.Item onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main', params: {} }],
                    })
                }} title="Quitter" />
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: 65,
        elevation: 10
    },
    testStyle: {
        color: '#fff',
        fontSize: 20, fontWeight: "bold"
    },
    headerleft: {
        alignItems: 'center',

        borderRadius: 5,
        flexDirection: 'row',
        // borderWidth: 1,
    },
    input: {
        flex: 1,
        padding: 10,
        marginRight: 10,
        color: '#fff',
    },
    icon: {
        paddingLeft: 10,
        marginLeft: 'auto', // Pour aligner l'icône à droite
    },
});

export default Header;
