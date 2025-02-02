import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const FoodDetail = ({ route }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(fadeAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Details</Text>
      </View>

      <TouchableOpacity onPress={toggleExpand} style={styles.dropdownHeader}>
        <Text style={styles.dropdownTitle}>Description</Text>
        <MaterialIcons 
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#333"
        />
      </TouchableOpacity>

      <Animated.View style={[
        styles.dropdownContent,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          }],
        }
      ]}>
        <Text style={styles.description}>
          This is a delicious meal prepared with care and attention to detail.
        </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Preparation Date:</Text>
          <Text style={styles.detailText}>2024-03-20</Text>
          
          <Text style={styles.detailLabel}>Storage:</Text>
          <Text style={styles.detailText}>Room Temperature</Text>
          
          <Text style={styles.detailLabel}>Allergens:</Text>
          <Text style={styles.detailText}>None</Text>
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Request Food</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dropdownContent: {
    padding: 15,
    backgroundColor: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsContainer: {
    marginTop: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#7792bd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FoodDetail;