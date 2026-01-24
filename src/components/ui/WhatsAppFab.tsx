import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WhatsAppFab = () => {
  return (
    <View style={styles.fabContainer}>
       <View style={styles.whatsappIcon}>
          {/* You can replace this inner view with an actual Icon component later */}
          <View style={styles.whatsappInner} />
       </View>
       <Text style={styles.fabText}>Yuk, tanya lebih lanjut!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    alignItems: 'center',
  },
  whatsappIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  whatsappInner: {
    width: 25,
    height: 25,
    backgroundColor: 'white', 
    borderRadius: 5,
  },
  fabText: {
    fontSize: 12,
    color: '#555',
    backgroundColor: '#FFF',
    padding: 4,
    borderRadius: 4,
  }
});