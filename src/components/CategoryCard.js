import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <View className="bg-slate-600 h-20 w-20  ">
        <Image
          source={{ uri: imgUrl }}
          className="h-20 w-20 rounded opacity-70"
        />
      </View>
      <Text className="absolute bottom-1 left-1 text-white  font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
