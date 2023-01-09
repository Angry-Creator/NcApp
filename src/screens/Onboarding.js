import { Text, StyleSheet, Image } from 'react-native';
import GradientButton from '../components/GradientButton';
import appColors from '../config/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} resizeMode="cover" source={require('../../assets/images/onboard_image.png')}/>
            <Text style={styles.title}>Onboarding</Text>
            <Text style={styles.subTitle}>Watch and Download Latest Movies For Free!</Text>
            <GradientButton text={"Enter Now"} onPress={() => navigation.navigate("MyTabs")}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.primary,
        alignItems: "center",
    },
    image: {
        height: 490,
        width: "100%",
    },
    title: {
        color: "white",
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 52,
    },
    subTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        lineHeight: 25,
        width: 210,
    },
    borderRadient:{
        width: 155,
        height: 5,
    },
});