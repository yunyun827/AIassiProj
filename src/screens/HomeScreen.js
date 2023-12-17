import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import Voice from '@react-native-community/voice';


export default function App() {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  //이벤트 핸들러를 이용해서 녹음 상황을 관리하고 그 내용을 콘솔에 출력한다. 
  const speechStartHandler = e => {
    console.log('speech start handler');
  }

  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech end handler');
  }

  const speechResultHandler = e => {
    console.log('voice event:', e);
  }

  const speechErrorHandler = e => {
    console.log('speech error handler:', e);
  }

  const startRecoding = async () => {
    setRecording(true); //녹음 상태를 참으로 설정
    try{
      await Voice.start('en-GB'); //음성인식을 시작한다.
    }catch{console.log('error: ', error)}
  }

  const stopRecoding = async () => {
    setRecording(true);
    try{
      await Voice.stop();
      setRecording(false);
      //녹음을 멈추고 AI의 답변을 fetch할 시간을 가짐
    }catch(error){console.log('error: ', error)}
  }

  const clear = ()=>{
    setMessages([])
  }
  const stopSpeaking = () => {
    setSpeaking(false); // 말하기 상태를 false로 변경.
  }

  useEffect(()=> {
    //voice handler 사용 
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      //초기화 
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        {/* bot image */}
        <View className="flex-row justify-center">
          <Image source={require('../../assets/images/bot.png')} style={{ width: hp(15), height: hp(15) }}></Image>
        </View>


        {
          messages.length > 0 ? (
            <View className="space-y-2 flex-1">
              <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semiblod ml-1">
                assistant
              </Text>
              <View style={{ height: hp(58) }} className="bg-neutral-200 rounded-3xl p-4">
                <ScrollView
                  bounces={false}
                  className="space-y-4"
                  showsVerticalScrollIndicator={false}
                >
                  {
                    messages.map((message, index) => {//메시지 배열에 담겨있는 것을 index에 따라 배치
                      if (message.role == 'assistant') {//AI의 말
                        if (message.content.includes('https')) {
                          //https링크인 경우 이미지를 생성한 것으로 파악. 
                          return (
                            <View key={index} className="flex-row justify-start">
                              <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                <Image
                                  source={{ uri: message.content }} //가져올 이미지는 생성한 이미지 링크
                                  className="rounded-2xl"
                                  resizeMode='contain' //view안에 포함되도록 사이즈 조정
                                  style={{ height: wp(60), width: wp(60) }}
                                ></Image>
                              </View>

                            </View>
                          )

                        }
                        else {
                          //아닐시 텍스트 답변임.
                          return (
                            <View
                              key={index}
                              style={{ width: wp(70) }} className="bg-emerald-100 rounded-xl p-2 rounded-tl-none">
                              {/* 좌측에서 답하는 것 처럼 보이게. */}
                              <Text>
                                {message.content}
                              </Text>
                            </View>
                          )
                        }
                      }
                      else {//유저의 말. 
                        return (
                          <View key={index} className="flex-row justify-end">
                            <View
                              style={{ width: wp(70) }} className="bg-white rounded-xl p-2 rounded-tr-none">
                              <Text>
                                {message.content}
                              </Text>
                            </View>

                          </View>
                        )
                      }
                    })
                  }

                </ScrollView>
              </View>

            </View>
          ) : (
            <Features></Features>
          )
        }
        {/* 음성 프롬프트 녹음 시작 버튼, 클리어 버튼, 멈추기 버튼 */}
        <View className="flex justify-center items-center">
          {
            recording ? ( //녹음중인 경우
              <TouchableOpacity onPress={stopRecoding}>
                {/* 녹음 정지 버튼 */}
                <Image
                  className="rounded-full"
                  source={require('../../assets/images/voiceLoading.gif')}
                  style={{ width: hp(10), height: hp(10) }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startRecoding}>
                {/* 녹음 시작 버튼 */}
                <Image
                  className="rounded-full"
                  source={require('../../assets/images/recordingIcon.png')}
                  style={{ width: hp(10), height: hp(10) }} />
              </TouchableOpacity>
            )
          }

          {
            messages.length > 0 && (
              <TouchableOpacity onPress={clear} className="bg-neutral-400 rounded-3xl p-2 absolute right-2"> 
              {/* 눌렀을 때 clear 함수를 작동시켜서 존재하는 메시지를 지운다. */}
                <Text className="text-white font-semibold">Clear</Text>
              </TouchableOpacity>
            )
          }
          {
            speaking > 0 && ( //말하는 중인 상태가 참일 때만 작동
              <TouchableOpacity onPress={stopSpeaking} className="bg-red-400 rounded-3xl p-2 absolute left-5"> 
              {/* 눌렀을 때 clear 함수를 작동시켜서 존재하는 메시지를 지운다. */}
                <Text className="text-white font-semibold">Stop</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </SafeAreaView>
    </View>



  )

}