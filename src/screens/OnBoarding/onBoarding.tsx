import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { OnBoardingItem } from 'components/OnBoarding/OnBoardingItem/onBoardingItem';
import { Paginator } from 'components/OnBoarding/Paginator/paginator';
import { NextButton } from 'components/OnBoarding/NextButton/nextButton';
import { slides } from './slides';
import { setOnBoardingViewed } from 'utils/localStorageFuncs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const OnBoarding = (props: { navigation: any }) => {
  const { navigation } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef((item: { viewableItems: any }) => {
    const { viewableItems } = item;
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      // @ts-ignore
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setOnBoardingViewed('true');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={slidesRef}
          data={slides}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    </View>
  );
};
