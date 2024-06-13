
import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import dynamicStyles from './style';
import { useSelector } from 'react-redux';
import { selectLanguageValue } from 'store/selectors/TranslationSelector';
import { I18n } from 'i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyPhoneInput from './components/phoneInput';
import { Appbar, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql } from '@apollo/client';


const VERIFY_LOGIN = gql`
  query($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
      login {
        loginId
      }
    }
  }
`;

const CLIENT_DETAILS = gql`
  query ($loginId: Int) {
    clientDetail(loginId: $loginId) {
      clientName
    }
  }
`;

function Dashboard(props) {
    const { navigation } = props;
    const phoneInput = useRef(null);
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: 'Saisisez votre numéro de téléphone',
    //         headerTintColor: 'blue',
    //         headerTitleStyle: { fontSize: 15 }
    //     });
    // }, []);
    const [phone, setPhone] = useState('');
    const styles = dynamicStyles()
    const language = useSelector(selectLanguageValue);
    I18n.locale = language;
    console.log(phone);


    return <View style={{ flex: 1, padding: 10 }}>
        <ScrollView>
            <Appbar.Header>
                <IconButton
                    icon={() => < Ionicons name="close" size={28} color={"blue"} />}
                    onPress={() => {
                        // navigation.goBack()
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AuthStacks' }],
                        })
                    }}
                />
                <Appbar.Content title={"Dashboard"} titleStyle={{ fontSize: 25, color: "blue" }} />
            </Appbar.Header>
            <View style={{ justifyContent: "space-between", flex: 1 }}>

                <View style={{ paddingVertical: 20 }}>
                    <Text style={styles.textTitle}>{"Dashboard"} </Text>
                </View>

                <View style={{ flex: 1, alignSelf: "center", width: "100%", justifyContent: "center", alignContent: "center", marginTop: 40 }}>

                    <Text style={styles.textTitle}>{"Dashboard"} </Text>

                </View>

            </View>
        </ScrollView>

    </View>
}

export default Dashboard