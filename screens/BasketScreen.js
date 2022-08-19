import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../features/restaurantSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter'


const BasketScreen = () => {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal)

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items]);
    
    Object.entries(groupedItemsInBasket).map(([key, items]) => {
        console.log(`${items[0]?.name}:${items.length}:${items[0]?.price}`)
    })
   

    return (
        <SafeAreaView className="flex-1 bg-white mt-10">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="font-bold text-xl text-center ">Basket</Text>
                        <Text className="text-center text-gray-500">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute topp-3 right-5"
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50}/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-4">
                    <Image
                        source={{
                            uri:'https://th.bing.com/th/id/OIP.ShIzGK2KOjUD_xP4g_R5kgHaHa?w=158&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
                        }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Deliver in ... minutes</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => {
                        <>
                        <View className="flex-row items-center space-x-3 bg-white py-2 px-5 text-gray-500"
                            key = {key}>
                            <Text>{items.length} x</Text>
                        </View>
                        <Image
                            source={{uri: urlFor(items[0]?.image).url()}}
                            className="h-12 w-12 rounded-full"
                        />
                        <Text className="flex-1">
                            {items[0]?.name}
                        </Text>
                        <Text>
                            <Currency quantity={items[0]?.price} currency="VND"/>
                        </Text>
                        <TouchableOpacity>
                            <Text
                                className="text-[#00CCBB] text-xs"
                                onPress={() => disPatch(removeFromBasket({id: key}))}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                        </>
                    })}
                </ScrollView>
                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between ">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">
                        <Currency quantity={basketTotal} currency="VND"/>
                        </Text>
                    </View>
                </View>
                <View className="p-5 bg-white">
                    <View className="flex-row justify-between ">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <Text className="text-gray-400">
                        <Currency quantity={35000} currency="VND"/>
                        </Text>
                    </View>
                </View>
                <View className="p-5 bg-white">
                    <View className="flex-row justify-between ">
                        <Text className="font-bold">Oder Total</Text>
                        <Text className="font-extrabold">
                        <Currency quantity={basketTotal + 35000} currency="VND"/>
                        </Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("PreparingOder")}
                    className="rounded-lg bg-[#00CCBB] p-4">
                    <Text className="text-white text-center font-extrabold text-lg">Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen