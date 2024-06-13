import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const imageSize = height * 0.14
const photoIconSize = imageSize * 0.35

const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: 60,
        },
        content: {
            padding: 10
        },


    })
}

export default dynamicStyles
