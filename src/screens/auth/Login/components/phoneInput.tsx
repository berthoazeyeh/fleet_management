import { Text, TextInput, View } from "react-native";
import PhoneInput from 'react-native-phone-input'

export default function MyPhoneInput({ phoneInput, setPhone }: any) {

    return <View>

        <PhoneInput style={{ backgroundColor: "white", padding: 30, borderRadius: 10 }} textStyle={{ letterSpacing: 1.5, fontSize: 15 }}
            ref={phoneInput}
            onPressFlag={() => null}
            initialCountry={'cm'}
            initialValue="237"
            onChangePhoneNumber={(text) => {
                setPhone(text)
            }}
            textProps={{
                placeholder: 'Enter a phone number...'
            }}
        />
    </View>
}