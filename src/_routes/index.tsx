import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EditProfile from '../_screens/EditProfile';
import Home from '../_screens/Home';
import Login from '../_screens/Login';
import ExternalProfile from '../_screens/Profile';
import Publication from '../_screens/Publication';
import Register from '../_screens/Register';

const Routes = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={ExternalProfile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Publication" component={Publication} />
        </Stack.Navigator>
      );
}

export default Routes