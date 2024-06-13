import { Text, TextInput, View } from "react-native";

export function MyTextInput({ styles, keyboard, value, onchangeValue, placeholder, secureTextEntry }) {

    return <View>

        <Text style={[styles.textSecond, { textAlign: "left" }]}>{placeholder}</Text>
        <TextInput
            style={styles.input}
            placeholder={""}
            keyboardType={keyboard}
            autoCapitalize="none"
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onchangeValue}
        />
    </View>
}