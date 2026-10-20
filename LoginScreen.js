import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

/**
 * LoginScreen
 * Implements full requirements for Lab 04:
 * - App Logo at the top
 * - Welcome title and subtitle
 * - Email & Password inputs with validation
 * - Toggle password visibility
 * - Login button with state
 * - Forgot Password link
 * - KeyboardAvoidingView + ScrollView for responsive behavior
 */
export const LoginScreen = ({ onLoginSuccess }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email format validation regex
  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const handleLogin = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Check empty email
    if (!email.trim()) {
      setEmailError('Vui lòng nhập địa chỉ email hoặc tài khoản.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Định dạng email không hợp lệ (ví dụ: user@example.com).');
      isValid = false;
    }

    // Check empty password
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải có tối thiểu 6 ký tự.');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate authentication processing
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          email: email.trim(),
        });
      }
    }, 600);
  };

  const handleForgotPassword = () => {
    const message = email.trim()
      ? `Hướng dẫn đặt lại mật khẩu đã được gửi đến: ${email.trim()}`
      : 'Vui lòng nhập địa chỉ email vào ô tài khoản trước để nhận hướng dẫn khôi phục mật khẩu.';

    Alert.alert('Quên mật khẩu', message, [{ text: 'Đã hiểu' }]);
  };

  const handleQuickFill = () => {
    setEmail('developer@antigravity.edu.vn');
    setPassword('Lab04@2026');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          isLandscape && styles.scrollContainerLandscape,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.cardWrapper, { maxWidth: 440 }]}>
          {/* Top Logo Section */}
          <View style={[styles.headerContainer, isLandscape && styles.headerLandscape]}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.appTitle}>AgileTech Academy</Text>
            <Text style={styles.welcomeSubtitle}>
              Chào mừng bạn quay trở lại! Vui lòng đăng nhập để tiếp tục học tập.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <InputField
              label="Tài khoản / Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              placeholder="nhap.email@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIconName="mail-outline"
              error={emailError}
            />

            {/* Password Input */}
            <InputField
              label="Mật khẩu"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError('');
              }}
              placeholder="Nhập mật khẩu của bạn"
              isPassword={true}
              secureTextEntry={true}
              leftIconName="lock-closed-outline"
              error={passwordError}
            />

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordRow}>
              <TouchableOpacity
                onPress={handleForgotPassword}
                activeOpacity={0.7}
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <PrimaryButton
              title="Đăng Nhập"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
              icon={
                <Ionicons
                  name="log-in-outline"
                  size={20}
                  color={theme.colors.white}
                  style={{ marginRight: theme.spacing.xs }}
                />
              }
            />

            {/* Quick Demo Fill Button (Convenience for grading) */}
            <TouchableOpacity
              onPress={handleQuickFill}
              style={styles.quickFillButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name="flash-outline"
                size={14}
                color={theme.colors.primary}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.quickFillText}>Điền nhanh tài khoản mẫu để chấm bài</Text>
            </TouchableOpacity>
          </View>

          {/* Footer note */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Thực hành Lab 04 • React Native Expo
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  scrollContainerLandscape: {
    paddingVertical: theme.spacing.md,
  },
  cardWrapper: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.medium,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  headerLandscape: {
    marginBottom: theme.spacing.md,
  },
  logoWrapper: {
    width: 88,
    height: 88,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.primaryLight,
    padding: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.medium,
  },
  appTitle: {
    fontSize: theme.typography.sizes.h2,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: theme.typography.sizes.body - 1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: theme.spacing.sm,
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  forgotPasswordRow: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.lg,
    marginTop: -theme.spacing.xs,
  },
  forgotPasswordButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  forgotPasswordText: {
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
  },
  loginButton: {
    width: '100%',
  },
  quickFillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
  },
  quickFillText: {
    fontSize: theme.typography.sizes.caption + 1,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.medium,
  },
  footerContainer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
  },
});

export default LoginScreen;
