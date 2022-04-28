import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useState } from "react"
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import Avatar from "../../_components/Avatar"
import Container from "../../_components/Container"
import { RootStackParamList } from "../../_routes/RootStackPrams"
import styles from "./styles"
import * as ImagePicker from 'expo-image-picker'
import * as UserService from '../../_services/UserService';

const EditProfile = () => {
    type navigationTypes = NativeStackNavigationProp<RootStackParamList, 'Profile'>
    const navigation = useNavigation<navigationTypes>()
    const profile = navigation.getState().routes.find(route => route.name == "EditProfile")?.params

    const [name, setName] = useState<string>('')
    const [hasName, setHasName] = useState<boolean>(false)
    const [image, setImage] = useState<any>()

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

    const editProfile = async () => {
        if (image || name) {
            try {
                const body = new FormData()
                if (image) {
                    const file: any = {
                        uri: image.uri,
                        type: `image/${image.uri.split('/').pop().split('.').pop()}`,
                        name: image.uri.split('/').pop()
                    }
                    body.append("file", file)
                }
                if (name) {
                    body.append("nome", name)
                }
                await UserService.update(body)
                navigation.goBack()
            } catch (err: any) {
                console.log(err)
                Alert.alert("Erro", "Erro ao alterar as informacoes do perfil")
            }
        }
    }

    return (
        <Container
            headerProps={{
                editProfileHeader: {
                    submit: editProfile,
                    submitEnable: image || name
                }
            }}
            footerProps={{ currentTab: 'Profile' }}
        >
            <View>
                {profile &&
                    <View>
                        <View style={styles.containerImage}>
                            <Avatar user={profile} image={image} withBorder={true} />
                            <TouchableOpacity onPress={() => pickImage()}>
                                <Text style={styles.textUpdateImage}>Alterar foto do perfil</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={styles.containerEditName}>
                                <View style={styles.containerRowEditName}>
                                    <Text style={styles.textName}>Nome</Text>
                                    {!hasName ? (
                                        <Text style={styles.textNameUser}>{profile.name}</Text>
                                    ) : (
                                        <TextInput
                                            placeholder='Digite um nome'
                                            style={styles.input}
                                            value={name}
                                            onChangeText={(n) => setName(n)}
                                            autoCapitalize={'characters'}
                                        />
                                    )}

                                    <TouchableOpacity style={styles.buttomDelete} onPress={() => setHasName(!hasName)}>
                                        <Image source={require('../../_assets/images/limpar.png')} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                }

            </View>
        </Container>
    )
}

export default EditProfile