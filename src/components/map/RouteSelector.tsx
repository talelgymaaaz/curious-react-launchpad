
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { wp, hp } from '../../utils/responsive';

interface RouteSelectorProps {
  selectedRoute: {
    name: string;
    description: string;
  };
  toggleRouteDropdown: () => void;
  colors: any;
}

const RouteSelector = ({ selectedRoute, toggleRouteDropdown, colors }: RouteSelectorProps) => {
  // Create a pulsating animation for the selector
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    // Create a pulsating effect to draw attention
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <TouchableOpacity 
        style={[
          styles.routeSelector, 
          { 
            backgroundColor: `${colors.primary}EE`, // More opaque
            borderWidth: 2,
            borderColor: colors.card
          }
        ]}
        onPress={toggleRouteDropdown}
        activeOpacity={0.8}
      >
        <View style={styles.routeSelectorContent}>
          <Text style={[styles.headerTitle, { color: colors.card }]}>{selectedRoute.name}</Text>
          <ChevronDown size={22} color={colors.card} />
        </View>
        <Text style={[styles.headerSubtitle, { color: colors.card }]}>{selectedRoute.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  routeSelector: {
    padding: wp(16),
    borderRadius: wp(12),
    marginBottom: hp(12),
    marginTop: hp(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  routeSelectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: wp(18),
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: wp(14),
    marginTop: hp(4),
  },
});

export default RouteSelector;
