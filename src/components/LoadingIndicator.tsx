import React from 'react';

import { StyleSheet, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export const LoadingIndicator = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#3091e0' />
    </View>
  );
};
