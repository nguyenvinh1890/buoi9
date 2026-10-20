import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';
import ListItem from '../components/ListItem';
import { MOCK_ITEMS } from '../data/mockData';

/**
 * ListScreen
 * Displays items using React Native FlatList with search, detail alerts, and logout.
 * Fully responsive on both portrait and landscape orientations.
 */
export const ListScreen = ({ user, onLogout }) => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Filter items based on search query and category tag
  const filteredData = MOCK_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const categories = ['All', 'Mobile Dev', 'UI/UX', 'Architecture', 'AI & ML', 'DevOps'];

  const handleItemPress = (item) => {
    Alert.alert(
      item.title,
      `${item.subtitle}\n\nChuyên mục: ${item.tag}\nĐánh giá: ${item.rating}/5.0`,
      [{ text: 'Đóng' }]
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      item={item}
      onPress={() => handleItemPress(item)}
    />
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <View style={styles.container}>
      {/* Top App Bar Header */}
      <View style={styles.headerBar}>
        <View style={styles.headerContentWrapper}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.headerGreeting}>Xin chào,</Text>
            <Text style={styles.headerUserEmail} numberOfLines={1}>
              {user?.email || 'Học viên'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
            activeOpacity={0.7}
            accessibilityLabel="Đăng xuất"
          >
            <Ionicons name="log-out-outline" size={18} color={theme.colors.error} />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <View
        style={[
          styles.mainContent,
          width > 768 && { maxWidth: 768, alignSelf: 'center', width: '100%' },
        ]}
      >
        {/* Title and stats */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.screenTitle}>Danh Mục Khóa Học</Text>
            <Text style={styles.screenSubtitle}>
              Hiển thị {filteredData.length}/{MOCK_ITEMS.length} chương trình đào tạo
            </Text>
          </View>
        </View>

        {/* Search input bar */}
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={18}
            color={theme.colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Tìm kiếm khóa học hoặc chủ đề..."
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.searchInput}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Pills */}
        <View style={styles.filterScrollView}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(cat) => cat}
            contentContainerStyle={styles.filterListContainer}
            renderItem={({ item: cat }) => {
              const isSelected = selectedTag === cat;
              return (
                <TouchableOpacity
                  onPress={() => setSelectedTag(cat)}
                  style={[
                    styles.filterPill,
                    isSelected && styles.filterPillActive,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isSelected && styles.filterPillTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* FlatList of Items */}
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="search-outline"
                size={48}
                color={theme.colors.border}
                style={{ marginBottom: theme.spacing.sm }}
              />
              <Text style={styles.emptyTitle}>Không tìm thấy kết quả</Text>
              <Text style={styles.emptySubtitle}>
                Thử tìm với từ khóa khác hoặc xóa bộ lọc chuyên mục.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerBar: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.shadows.small,
  },
  headerContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 768,
    width: '100%',
    alignSelf: 'center',
  },
  headerTextGroup: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  headerGreeting: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.weights.medium,
  },
  headerUserEmail: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs + 2,
    paddingHorizontal: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.errorLight,
  },
  logoutText: {
    fontSize: theme.typography.sizes.caption + 1,
    color: theme.colors.error,
    fontWeight: theme.typography.weights.semibold,
    marginLeft: 4,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  titleSection: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  screenTitle: {
    fontSize: theme.typography.sizes.h2 - 2,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  screenSubtitle: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: Platform.OS === 'ios' ? theme.spacing.sm : 2,
    marginVertical: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.body - 1,
    color: theme.colors.text,
    paddingVertical: theme.spacing.xs,
  },
  filterScrollView: {
    marginVertical: theme.spacing.xs,
  },
  filterListContainer: {
    paddingVertical: theme.spacing.xs,
  },
  filterPill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterPillText: {
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.textSecondary,
  },
  filterPillTextActive: {
    color: theme.colors.white,
    fontWeight: theme.typography.weights.semibold,
  },
  listContentContainer: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: theme.typography.sizes.h3,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    fontSize: theme.typography.sizes.body - 1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
});

export default ListScreen;
