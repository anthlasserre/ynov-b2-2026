import { useRouter } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function Onboarding() {
    const { top, bottom } = useSafeAreaInsets();
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const onPressExplore = async () => {
        setIsSaving(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await AsyncStorage.setItem('onboarded', 'true');
            return router.replace('/')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <View className="flex-1 bg-white">
            <Image source={require("../assets/bg-onboarding.png")} className={`w-full h-full object-cover absolute top-0 left-0`} />
            <View style={{ paddingTop: top + 20, paddingBottom: bottom, paddingHorizontal: 32 }} className="flex-1 justify-between">
                <Text style={styles.title}>
                    Aspen
                </Text>
                <View className="gap-4">
                    <View>
                        <Text style={styles.body}>
                            Plan your
                        </Text>
                        <Text style={styles.body2}>
                            Luxurious Vacation
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onPressExplore} activeOpacity={0.8} className="bg-[#176FF2] justify-center rounded-[16] py-3 flex-row gap-2">
                        <Text className="text-white text-lg font-bold">
                            Explore
                        </Text>
                        {isSaving && (
                            <ActivityIndicator color="white" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontFamily: 'Hiatus',
        fontSize: 116,
        color: 'white',
        textAlign: 'center'
    },
    body: {
        fontFamily: 'Montserrat',
        fontSize: 24,
        color: 'white',
    },
    body2: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 40,
        color: 'white',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    ctaLabel: {
        fontSize: 16
    }
})