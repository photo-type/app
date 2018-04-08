import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  actionButtonWrap: {
    opacity: 0.8,
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2D2E3A',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  actionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
});

const ActionButton = ({label, handleTap}) => {
  return (
    <View style={styles.actionButtonWrap}>
      <TouchableOpacity onPress={handleTap} style={styles.actionButtonContainer}>
        <Text style={styles.actionButtonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
};

export default ActionButton;