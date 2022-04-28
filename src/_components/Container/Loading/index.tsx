import { ActivityIndicator, View } from "react-native"
import { colors } from '../../../../app.json'
import styles from "./styles"

const Loading = (props: { isLoading?: boolean }) => {
    return (
        props.isLoading ?
            <View style={styles.container}>
                <ActivityIndicator size={30} color={colors.primaryColor} />
            </View>
            :
            null
    )
}

export default Loading