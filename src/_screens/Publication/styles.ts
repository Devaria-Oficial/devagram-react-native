import { Dimensions, StyleSheet } from "react-native";
import { colors } from '../../../app.json'
const { height, width } = Dimensions.get("screen")

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height/8,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.grayColor01,
        flexDirection: "row",
        marginHorizontal: 16,
        marginVertical: 16
    },
    containerImage:{
        marginRight: 16
    },
    image:{
        width: 80,
        height: 80
    },
    imageDefault: {
        width: 80,
        height: 80,
        backgroundColor: colors.primaryColor
    },
    description:{
        fontFamily: 'biennale',
        fontWeight: '400',
        fontSize: 12,
        color: colors.grayColor02,
        width: width/2,
        height: height/30,
        paddingHorizontal: 5,
        bottom: 7
    }
});

export default styles