import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

const PreparingOderScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 4000)
    }, [])

  return (
    <SafeAreaView className="bg-yellow-300 flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/Shipping.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="font-extrabold text-lg text-white my-5 text-center"
      >
        Waiting for Restaurant accept your Oder!
      </Animatable.Text>

      <Progress.CircleSnail size={80} indeterminate={true} color="white"/>
        
    </SafeAreaView>
  )
}

export default PreparingOderScreen