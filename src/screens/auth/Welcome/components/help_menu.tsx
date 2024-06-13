import React from 'react';
import { BackHandler, Pressable } from 'react-native';
import { Menu } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectLanguageValue, useTheme } from 'store';
import { BLACK } from 'utils/constants/colors';
import { I18n } from 'i18n';

export function HelpMenu() {
    const [visible, setVisible] = React.useState(false);
    const language: string = useSelector(selectLanguageValue);
    I18n.locale = language;
    const theme = useTheme()
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            style={{}}
            anchor={
                <Pressable onPress={openMenu} style={{ padding: 8 }}>
                    <Ionicons name="ellipsis-vertical" size={23} color={theme.primaryText} />
                </Pressable>
            }>
            <Menu.Item title={I18n.t("auth_help")} />
            <Menu.Item onPress={() => { BackHandler.exitApp(); }} title={"Quitter"} />
        </Menu>
    );
}