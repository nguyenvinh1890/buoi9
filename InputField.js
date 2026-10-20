import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

/**
 * Reusable InputField component
 * Supports label, placeholder, error message, password toggle, left icon, and styling overrides.
 */
export const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  isPassword = false,
  leftIconName,
  keyboardType = 'default',
  autoCapitalize = 'none',
  containerStyle,
  inputStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isActuallySecured = isPassword ? !showPassword : secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error ? styles.inputWrapperError : null,
        ]}
      >
        {leftIconName ? (
          <Ionicons
            name={leftIconName}
            size={20}
            color={error ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.textSecondary}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={isActuallySecured}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, inputStyle]}
          {...rest}
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    fontSize: theme.typography.sizes.body - 1,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs + 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    minHeight: 48,
  },
  inputWrapperFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  inputWrapperError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorLight,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    padding: theme.spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm + 2,
  },
  errorText: {
    fontSize: theme.typography.sizes.caption + 1,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    fontWeight: theme.typography.weights.medium,
  },
});

export default InputField;
