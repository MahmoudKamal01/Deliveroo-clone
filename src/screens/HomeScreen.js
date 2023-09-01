import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SafeViewAndroid from "../components/SafeViewAndroid "; //as SafeAreaView is for ios only, we need to customize for android
import * as Icons from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "./../components/FeaturedRow";
import client from "../../sanity";
const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    //once the ui loads
    //we use useLayoutEffect not useEffect as it is better for ui changes
    navigation.setOptions({
      headerShown: false, //to hide the navigation header before the content of page appears
    });
  }, []);

  useEffect(() => {
    //once the component loads
    client
      .fetch(
        `
      *[_type=="featured"]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  console.log("oop", featuredCategories);
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <ScrollView className="pt-5 ">
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <Icons.ChevronDownIcon size={20} color="#00ccBB" />
            </Text>
          </View>
          <Icons.UserIcon size={35} color="#00ccBB" />
        </View>
        {/*Search*/}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2  bg-gray-200 p-3">
            <Icons.MagnifyingGlassIcon size={20} color="gray" />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View>
          <Icons.AdjustmentsVerticalIcon color="#00ccBB" />
        </View>
        {/*Body ////////////////////////*/}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/*Categories*/}
          <Categories />

          {/*Featured*/}
          {featuredCategories.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
