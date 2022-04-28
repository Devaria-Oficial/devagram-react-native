import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native"
import Container from "../../_components/Container"
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from "react"
import styles from "./styles"
import * as FeedService from '../../_services/FeedService';
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../_routes/RootStackPrams"
import { useNavigation } from "@react-navigation/native"
import Loading from "../../_components/Container/Loading"

const Publication = () => {
    type navigationTypes = NativeStackNavigationProp<RootStackParamList, 'Publication'>
    const navigation = useNavigation<navigationTypes>()

    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        pickImage()
    }, [])

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.cancelled) {
            setImage(result)
        }
    }

    const send = async () => {
        if (image || description) {
            try {
                setIsLoading(true)
                const body = new FormData()
                if (image) {
                    const file: any = {
                        uri: image.uri,
                        type: `image/${image.uri.split('/').pop().split('.').pop()}`,
                        name: image.uri.split('/').pop()
                    }
                    body.append("file", file)
                }
                if (description) {
                    body.append("descricao", description)
                }
                await FeedService.sendPost(body)
                setIsLoading(false)
                navigation.navigate('Home')
            } catch (err: any) {
                setIsLoading(false)
                console.log(err)
                Alert.alert("Erro", "Erro ao enviar publicacao")
            }
        }
    }

    return (
        <Container
            isLoading={isLoading}
            footerProps={{ currentTab: "Publication" }}
            headerProps={{
                publicationHeader: {
                    submit: send,
                    submitEnable: image || description
                }
            }}
        >
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => pickImage()} style={styles.containerImage}>
                        <Image style={image ? styles.image : styles.imageDefault} source={image ? { uri: image.uri } : require('../../_assets/images/Camera.png')} />
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Escreva uma legenda..."
                        multiline={true}
                        onChangeText={value => setDescription(value)}
                        value={description}
                        autoCapitalize="none"
                        style={styles.description}
                    />

                </View>
            </View>
        </Container>
    )
}

export default Publication