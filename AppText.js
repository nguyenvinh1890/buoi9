import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

/**
 * Reusable AppText component
 * Provides preset typography styles based on theme (h1, h2, h3, body, subtitle, caption).
 */
export const AppText = ({
  variant = 'body',
  color,
  weight,
  style,
  children,
  ...rest
}) => {
  const customStyle = [
    styles[variant] || styles.body,
    color ? { color } : null,
    weight ? { fontWeight: theme.typography.weights[weight] || weight } : null,
    style,
  ];

  return (
    <Text style={customStyle} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: theme.typography.sizes.h1,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  h2: {
    fontSize: theme.typography.sizes.h2,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  h3: {
    fontSize: theme.typography.sizes.h3,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
  },
  body: {
    fontSize: theme.typography.sizes.body,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textSecondary,
  },
  caption: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textSecondary,
  },
});

export default AppText;
