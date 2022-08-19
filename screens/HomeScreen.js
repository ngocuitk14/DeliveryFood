import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useNavigation} from "@react-navigation/native"
import {UserIcon, SearchIcon, AdjustmentsIcon, ChevronDownIcon} from "react-native-heroicons/outline"
import Categories from '../components/Categories'
import FeaturedRows from '../components/FeaturedRows'
import sanityClient from '../sanity'

const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);

    useEffect(() => {
        sanityClient.fetch(
            `
            *[_type == "featured"] {
                ...,
            restaurant[]->{
            }
            }
            `
        )
        .then((data) => {
            setFeaturedCategories(data);
        });
    }, []);

  return (
    <SafeAreaView className="bg-white pt-7">
        {/* {Header} */}
            <View className='flex-row pb-3 items-center mx-2 space-x-2 px-1'>
                <Image 
                    source={{uri:'https://th.bing.com/th/id/OIP.ShIzGK2KOjUD_xP4g_R5kgHaHa?w=158&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7'}}
                    className='h-10 w-10 bg-gray-300 p-4 rounded-full'
                />
                
                <View className="flex-1">
                    <Text className='font-bold text-gray-400 text-xs'> Deliver now!</Text>
                    <Text className='font-bold text-xl'> 
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB"/>    
                    </Text>
                </View>

                <UserIcon size={30} color="#00CCBB"/>
            </View>
            <View className="flex-row items-center space-x-2 pb-2 mx-2 px-1">
                <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2 rounded-lg">
                    <SearchIcon color="gray"/>
                    <TextInput 
                        placeholder='Restaurants and cruisers'
                        keyboardType='default'
                    />
                </View>
                
                <AdjustmentsIcon color="#00CCBB"/>

            </View>
            {/* Body */}
            <ScrollView 
                className="bg-gray-200 px-1 mx-3 rounded"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories  */}
                <Categories/>
                {/* Featured Rows */}
                {featuredCategories?.map((category) => 
                    <FeaturedRows
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}

                    />
                )}
                
                {/* Tasty Discount
                <FeaturedRows
                    id="1234"
                    title="Featured"
                    description="Paid placements from our partners"
                    featuredCategory="featured"

                />
                {/* Near you */}
                {/* <FeaturedRows
                    id="12345"
                    title="Featured"
                    description="Paid placements from our partners"
                    featuredCategory="featured"
                /> */}

            </ScrollView>
    </SafeAreaView>
    
  )
}

export default HomeScreen