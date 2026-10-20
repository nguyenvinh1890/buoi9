/**
 * Lab 04 - Theme System
 * Defines unified colors, typography, spacing, and border radiuses.
 */

export const colors = {
  primary: '#2563EB',         // Màu chủ đạo (Indigo Blue)
  primaryDark: '#1D4ED8',     // Màu chủ đạo đậm (khi nhấn/hover)
  primaryLight: '#EFF6FF',    // Màu nền nhấn nhẹ
  background: '#F8FAFC',      // Màu nền ứng dụng (Slate 50)
  surface: '#FFFFFF',         // Màu nền thẻ/card
  text: '#0F172A',            // Màu chữ chính (Slate 900)
  textSecondary: '#64748B',   // Màu chữ phụ (Slate 500)
  border: '#E2E8F0',          // Màu viền (Slate 200)
  borderFocus: '#93C5FD',     // Màu viền khi focus
  error: '#EF4444',           // Màu thông báo lỗi (Red 500)
  errorLight: '#FEF2F2',      // Nền thông báo lỗi
  success: '#10B981',         // Màu thành công (Emerald 500)
  white: '#FFFFFF',           // Màu trắng
};

export const typography = {
  sizes: {
    h1: 28,         // Kích thước tiêu đề lớn
    h2: 22,         // Kích thước tiêu đề vừa
    h3: 18,         // Kích thước tiêu đề nhỏ / card title
    body: 15,       // Kích thước chữ thông thường
    subtitle: 13,   // Kích thước mô tả
    caption: 11,    // Kích thước ghi chú nhỏ
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 18,
  round: 9999,
};

export const shadows = {
  small: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
