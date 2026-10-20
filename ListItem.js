import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

/**
 * Reusable ListItem component
 * Image on the left, Title and Subtitle on the right.
 * Flexbox row layout with proper truncation and styling from theme.
 */
export const ListItem = ({
  item,
  onPress,
  style,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, style]}
      accessibilityRole="button"
    >
      {/* Left: Thumbnail Image */}
      <View style={styles.imageContainer}>
        {imageError || !item.image ? (
          <View style={styles.placeholderContainer}>
            <Ionicons name="cube-outline" size={26} color={theme.colors.primary} />
          </View>
        ) : (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            onError={() => setImageError(true)}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Right: Content Information */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          {item.tag ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.tag}</Text>
            </View>
          ) : null}

          {item.rating ? (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          ) : null}
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">
          {item.subtitle}
        </Text>
      </View>

      {/* Right Chevron Indicator */}
      <View style={styles.actionIconContainer}>
        <Ionicons name="chevron-forward" size={18} color={theme.colors.border} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.sm + 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
    backgroundColor: theme.colors.primaryLight,
    marginRight: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primaryLight,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  badge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.small - 4,
    marginRight: theme.spacing.sm,
  },
  badgeText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.textSecondary,
    marginLeft: 3,
  },
  title: {
    fontSize: theme.typography.sizes.body + 1,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  actionIconContainer: {
    marginLeft: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
