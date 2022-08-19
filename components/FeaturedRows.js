import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCards from './RestaurantCards'
import sanityClient from '../sanity'

const FeaturedRows = ({id, title, description}) => {

    const [restaurants, setRestaurants] = useState([])
                
    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "featured" && _id == $id] {
                ...,
                restaurant[]->{
                    ...,
                    dishes[]->,
                    type-> {
                        name
                    }
                },
            }[0]    
            `, {id}).then((data) => {
            setRestaurants(data?.restaurant);
            
        });

    }, []);
    

    return (
        <View className="flex-1">
            <View className="mt-4 flex-row items-center justify-between px-2">
                <Text className="font-bold text-lg">
                    {title}
                </Text>
                <ArrowRightIcon color="#00CCBB"/>
            </View>
            {/* Description */}
            <Text className="text-xs text-gray-500 px-4">
                {description}
            </Text> 
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator= {false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                className="pt-4"
            >
                {restaurants?.map((restaurant) => 
                    <RestaurantCards
                    key={restaurant._id}
                    id={restaurant._id}
                    imgUrl={restaurant.image}
                    title={restaurant.name}
                    rating={restaurant.rating}
                    genre={restaurant.type?.name}
                    address={restaurant.address}
                    short_description={restaurant.short_description}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
                    />
                )}

            </ScrollView>
            
        </View>
    )
}

export default FeaturedRows