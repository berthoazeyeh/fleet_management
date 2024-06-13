import { Text, TextInput, View } from "react-native";
import PhoneInput from 'react-native-phone-input'
import Theme from "theme"
export default function MyPhoneInput({ phoneInput, setPhone, onPressFlag }: any) {

    return <View>

        <PhoneInput style={{ backgroundColor: "#F7F4F3", padding: 25, borderRadius: 10, marginTop: 10, }} textStyle={{ letterSpacing: 1.5, fontSize: 15, color: "black", ...Theme.fontStyle.montserrat.bold }}
            ref={phoneInput}
            onPressFlag={() => onPressFlag(false)}
            initialCountry={'cm'}
            initialValue="237"
            onChangePhoneNumber={(text) => {
                setPhone(text)
            }}

            buttonTextStyle={{ color: "red" }}
            confirmTextStyle={{ color: "red" }}
            cancelTextStyle={{ color: "red" }}
            textProps={{
                placeholder: 'Enter a phone number...'
            }}

        />
    </View>
}