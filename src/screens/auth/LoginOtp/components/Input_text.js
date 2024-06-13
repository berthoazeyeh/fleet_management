import { Text, TextInput, View } from "react-native";

export function MyTextInput({ styles, keyboard, value, onchangeValue, placeholder, secureTextEntry, etitable }) {

    return <TextInput
        style={styles}
        placeholder={placeholder}
        keyboardType="number-pad"
        autoCapitalize="none"
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onchangeValue}
        editable={etitable}

    />

}
