import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function App() {
  return (
    <SafeAreaView calssName="flex-1 flex justify-around bg-white">
      <View calssName="space-y-2">
        <Text className="text-center text-4xl font-bold text-gray-700">
          Jarvis
        </Text>
        <Text className="text-center tracking-wider text-gray-700 font-semibold">
          The Future is here, powered by AI.
        </Text>
      </View>

      <View className="flex-row justify-center">
        <Image source={require('../../assets/images/welcome.png')} className="w-72 h-72"></Image>
      </View>
      
      <TouchableOpacity className="bg-emerald-600 mx-5 p-4 rounded-2xl">
        <Text className="text-center font-bold text-white text-2xl">Get Started</Text>
      </TouchableOpacity>

    </SafeAreaView>

  )

}