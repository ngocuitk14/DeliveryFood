import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import {UserIcon, SearchIcon, AdjustmentsIcon, ChevronDownIcon, StarIcon, ArrowLeftIcon, LocationMarkerIcon, QuestionMarkCircleIcon} from "react-native-heroicons/solid"
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { setRestaurant } from '../features/restaurantSlice'
import { useDispatch } from 'react-redux'

const RestaurantScreen = () => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        },
    } = useRoute();

    useEffect(() =>{
        dispatch(
            setRestaurant({
                id,
                imgUrl,
                title,
                rating,
                genre,
                address,
                short_description,
                dishes,
                long,
                lat,
            })
        )
    }, [dispatch])

    return (
    <>
        <BasketIcon/>

        <ScrollView>
            <View className="relative">
                <Image
                    source={{
                        uri: urlFor(imgUrl).url(),
                    }}
                    className="w-full h-56 bg-gray-300 p-4"
                />
                <TouchableOpacity 
                    className="absolute top-12 left-4 p-2 bg-gray-200 rounded-full"
                    onPress={navigation.goBack}
                >
                    <ArrowLeftIcon
                        size={20}
                        color="#00CCBB"
                    />
                </TouchableOpacity>
            </View>

            <View className="bg-white">
                <View className="px-4 pt-4">
                    <Text className="text-3xl font-bold">
                        {title}
                    </Text>
                    <View className="flex-row space-x-2 my-2">
                        <View className="flex-row space-x-1 items-center">
                            <StarIcon color="green" opacity={0.5} size={22}/>
                            <Text className="text-xs text-gray-400 font-bold">
                                <Text className="text-xs text-green-500">{rating}</Text> * {genre}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row space-x-1 items-center">
                        <LocationMarkerIcon color="gray" opacity={0.5} size={22}/>
                        <Text className="text-xs font-bold text-gray-500">Near by {address}</Text>
                    </View>
                </View>  
                <Text className="text-gray-500 mt-2 pb-4 px-4">{short_description}</Text>
            
                <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                    <QuestionMarkCircleIcon
                        color="#00CCBB"
                    />
                    <Text className="flex-1 text-md font-bold">
                        Have a good allergy
                    </Text>
                    <ChevronRightIcon color="#00CCBB"/>
                </TouchableOpacity>
            </View>

            <View className="pb-36">
                <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
                {/* Dishrows */}
                {dishes.map(dish =>
                    <DishRow
                    key={dish._id}
                    id={dish._id}
                    image={dish.image}
                    name={dish.name}
                    description={dish.short_description}
                    price={dish.price}
                    />
                )}
            </View>
        </ScrollView>
        </>
    )
}

export default RestaurantScreen