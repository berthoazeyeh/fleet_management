import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ navigation, onFilterChange, filter }) => {

    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    console.log("dddddddddddddddddd");
    return (
        <View style={styles.header}>
            <View style={styles.headerleft} >
                <MaterialCommunityIcons
                    name="magnify"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor="black"
                    onChangeText={(text) => onFilterChange(text)}
                    value={filter || ''}
                />
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
    headerleft: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        padding: 10,
        marginRight: 10,
        color: '#000',

    },
    icon: {
        paddingLeft: 10,
        marginLeft: 'auto', // Pour aligner l'icône à droite
    },
});

export default Header;
