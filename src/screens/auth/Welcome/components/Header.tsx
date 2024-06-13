import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { I18n } from 'i18n';
import { HelpMenu } from './help_menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BackHandler } from 'react-native';

const CustomHeader = ({ theme }: any) => {
    const navigation = useNavigation();

    return (
        <Appbar.Header style={{ backgroundColor: theme.primaryBackground, justifyContent: "space-between" }}>
            <Appbar.Action
                icon={() => <Ionicons name="close" size={28} color={theme.primaryText} />}
                onPress={() => BackHandler.exitApp()}
            />
            <Appbar.Content
                title={I18n.t("Welcome.auth_welcomeMessage")}
                titleStyle={{ fontWeight: 'bold', color: theme.primaryText }}
            />
            <HelpMenu />
        </Appbar.Header>
    );
};

export default CustomHeader;
