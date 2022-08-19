import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Currency from 'react-currency-formatter'

const BasketIcon = () => {

    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    if (items.length === 0) return null;

    return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity 
                onPress={() => navigation.navigate("Basket")}
                className="mx-5 p-4 items-center flex-row space-x-1 bg-[#00CCBB] rounded-lg">
                <Text className="text-white font-extrabold text-lg py-1 px-2 bg-[#01A296]">{items.length}</Text>
                <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
                <Text className="font-extrabold text-gray-100">
                    <Currency quantity={basketTotal} currency="VND"/>
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default BasketIcon