import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice'
import { useDispatch, useSelector } from 'react-redux'

const DishRow = ({id, name, description, price, image}) => {

    const [isPressed, setIspressed] = useState(false);

    const dispatch = useDispatch();

    const items = useSelector((state) => selectBasketItemsWithId(state, id));

    const removeItemFromBasket = () => {

        if(!items.length > 0) return;

        dispatch(removeFromBasket({id}))
    }

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}));
    }

  return (
    <>
    <TouchableOpacity 
        onPress={() => setIspressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
        <View className="flex-row">
                <View className="flex-1 pr-2">
                    <Text className="text-lg mb-1">{name}</Text>
                    <Text className="text-gray-400">{description}</Text>
                    <Text className="mt-2 text-gray-400">
                        <Currency quantity={price} currency="VND"/>
                    </Text>
                </View>
            
            <View>
                <Image
                    style={{
                        borderWidth: 1,
                        borderColor: "#F3F3F4"
                    }}
                    source={{uri: urlFor(image).url()}}
                    className="h-20 w-20 bg-gray-300 p-4"
                />
            </View>

        </View>
    </TouchableOpacity>

    {isPressed && (
        <View className="bg-white px-4">
            <View className="flex-row items-center space-x-2 pb-3">
                <TouchableOpacity 
                    disabled={!items.length}
                    onPress={removeItemFromBasket}>
                    <MinusCircleIcon
                        color={items.length > 0 ? "#00CCBB" : "gray"}
                        size={40}
                    />
                </TouchableOpacity>
                <Text>{items.length}</Text>
                <TouchableOpacity>
                    <PlusCircleIcon
                        onPress={addItemToBasket}
                        size={40}
                        color="#00CCBB"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
  )
}

export default DishRow