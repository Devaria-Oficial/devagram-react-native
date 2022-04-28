import { Dimensions, StyleSheet } from "react-native";
import { colors } from '../../../../app.json'
const { height, width } = Dimensions.get("screen")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteColor,
        height: height / 1.2,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default styles