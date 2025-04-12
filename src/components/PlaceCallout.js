
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING } from '../theme/spacing';
import { FONT_SIZE, FONT_WEIGHT } from '../theme/typography';
import { MapPin, Star, ArrowRight } from 'lucide-react-native';

const PlaceCallout = ({ place, onDetailsPress }) => {
  return (
    <TouchableOpacity style={styles.calloutContainer} onPress={onDetailsPress}>
      <View style={styles.calloutContent}>
        <Text style={styles.title}>{place.name}</Text>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>
            {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
          </Text>
        </View>
        
        {place.description && (
          <Text style={styles.description} numberOfLines={2}>
            {place.description}
          </Text>
        )}
        
        {place.location && place.location.city && (
          <View style={styles.locationContainer}>
            <MapPin size={14} color={COLORS.primary} />
            <Text style={styles.locationText}>{place.location.city}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={onDetailsPress}
        >
          <Text style={styles.detailsButtonText}>Voir détails</Text>
          <ArrowRight size={14} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.calloutArrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    width: 220,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  calloutContent: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  calloutArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.white,
    alignSelf: 'center',
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  categoryContainer: {
    backgroundColor: COLORS.primary_light,
    paddingVertical: 2,
    paddingHorizontal: SPACING.sm,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  locationText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 4,
  },
  detailsButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    marginRight: SPACING.xs,
  },
});

export default PlaceCallout;
