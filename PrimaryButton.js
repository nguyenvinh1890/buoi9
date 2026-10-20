import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import theme from '../styles/theme';

/**
 * Reusable PrimaryButton component
 * Supports title, loading state, disabled state, custom styles, and pressed feedback.
 */
export const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  activeOpacity = 0.75,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
      accessibilityRole="button"
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.white} size="small" />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <Text
            style={[
              styles.text,
              icon ? styles.textWithIcon : null,
              disabled && styles.textDisabled,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md - 2,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 48,
    ...theme.shadows.small,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.semibold,
    textAlign: 'center',
  },
  textWithIcon: {
    marginLeft: theme.spacing.sm,
  },
  textDisabled: {
    color: theme.colors.textSecondary,
  },
});

export default PrimaryButton;
