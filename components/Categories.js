import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoriesCard from './CategoriesCard'
import sanityClient, { urlFor } from '../sanity'

const Categories = () => {

  const [categories, setCategories] = useState([])

    useEffect(() => {
        sanityClient.fetch(
            `
            *[_type == "category"]
            `
        )
        .then((data) => {
            setCategories(data);
        });
    }, []); 

  return (
    <ScrollView
      contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* CategoriesCard */}
      {categories.map((category) => 
        <CategoriesCard
        key={category._id}
        imgUrl={urlFor(category.image).width(200).url()} 
        title={category.name}
        />
      )}
    </ScrollView>
  )
}

export default Categories