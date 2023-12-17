import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  return (
    <SafeAreaView calssName="flex-1 flex justify-around bg-white">
      <View calssName="space-y-2">
        <Text style={{fontSize: wp(10)}} className="text-center text-4xl font-bold text-gray-700">
          Jarvis
        </Text>
        <Text style={{fontSize: wp(4)}} className="text-center tracking-wider text-gray-700 font-semibold">
          The Future is here, powered by AI.
        </Text>
      </View>

      <View className="flex-row justify-center">
        <Image source={require('../../assets/images/welcome.png')} style={{width: wp(75), height: wp(75)}}></Image>
      </View>
      
      <TouchableOpacity onPress={()=> navigation.navigate('Home')} className="bg-emerald-600 mx-5 p-4 rounded-2xl">
        <Text style={{fontSize: wp(6)}} className="text-center font-bold text-white text-2xl">Get Started</Text>
      </TouchableOpacity>

    </SafeAreaView>

  )

}