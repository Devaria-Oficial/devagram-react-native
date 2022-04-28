import { Text, TouchableOpacity, View } from "react-native"
import { IButton } from "./types"
import { colors } from "../../../app.json"
import styles from "./styles"
import Loading from "../Container/Loading"

const Button = (props: IButton) => {
    return (
        <View style={styles.containerButton}>
            <TouchableOpacity
                onPress={props.onPress}
                disabled={props.disabled}
                style={props.disabled ? [styles.button, props.style, styles.buttonDisabled] : [styles.button, props.style]}
            >
                <Loading isLoading={props.loading}/>
                {!props.loading && <Text style={styles.text}>{props.placeholder}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default Button