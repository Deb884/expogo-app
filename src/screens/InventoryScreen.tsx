import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Text } from '@/components/ui/Text';
import { TextField } from '@/components/ui/TextField';
import { TopAppBar } from '@/components/ui/TopAppBar';
import { colors, spacing } from '@/constants/theme';
import { db, initDatabase } from '@/services/db';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function InventoryScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const loadProducts = useCallback(async (query = '') => {
    try {
      const rows = query.trim()
        ? await db.getAllAsync<Product>(
            'SELECT * FROM products WHERE name LIKE ? OR category LIKE ? ORDER BY name ASC;',
            [`%${query}%`, `%${query}%`]
          )
        : await db.getAllAsync<Product>('SELECT * FROM products ORDER BY id DESC;');
      setProducts(rows);
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        initDatabase();
      } catch {
        setLoadError(true);
        setLoading(false);
        return;
      }
      void loadProducts();
    });
    return () => {
      cancelled = true;
    };
  }, [loadProducts]);

  const refresh = () => loadProducts(search);

  const saveProduct = () => {
    const cleanName = name.trim();
    const cleanCategory = category.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (
      !cleanName ||
      !cleanCategory ||
      !price.trim() ||
      !stock.trim() ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0 ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      Alert.alert(
        'Check product details',
        'Enter a name, category, non-negative price, and whole-number stock.'
      );
      return;
    }

    try {
      db.runSync(
        'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?);',
        [cleanName, cleanCategory, parsedPrice, parsedStock]
      );
      setName('');
      setCategory('');
      setPrice('');
      setStock('');
      setModalVisible(false);
      void refresh();
    } catch {
      Alert.alert('Could not save item', 'Please try again.');
    }
  };

  const changeStock = (product: Product, amount: number) => {
    try {
      db.runSync(
        'UPDATE products SET stock = MAX(stock + ?, 0) WHERE id = ?;',
        [amount, product.id]
      );
      void refresh();
    } catch {
      Alert.alert('Could not update stock', 'Please try again.');
    }
  };

  const deleteProduct = (product: Product) => {
    Alert.alert('Remove item?', `Remove ${product.name} from inventory?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          try {
            db.runSync('DELETE FROM products WHERE id = ?;', [product.id]);
            void refresh();
          } catch {
            Alert.alert('Could not remove item', 'Please try again.');
          }
        },
      },
    ]);
  };

  const totalUnits = products.reduce((total, product) => total + product.stock, 0);
  const lowStockCount = products.filter((product) => product.stock <= 5).length;

  return (
    <Screen
      scroll={false}
      topBar={
        <TopAppBar
          title="Inventory"
          onBack={() => router.back()}
          right={
            <IconButton
              name="plus"
              accessibilityLabel="Add inventory item"
              onPress={() => setModalVisible(true)}
            />
          }
        />
      }
    >
      <View style={styles.content}>
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text variant="stat">{products.length}</Text>
            <Text variant="caption" color={colors.textSecondary}>Items</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text variant="stat">{totalUnits}</Text>
            <Text variant="caption" color={colors.textSecondary}>Units</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text variant="stat" color={lowStockCount ? colors.danger : colors.textPrimary}>
              {lowStockCount}
            </Text>
            <Text variant="caption" color={colors.textSecondary}>Low stock</Text>
          </View>
        </View>

        <TextField
          label="Search inventory"
          placeholder="Search by item or category"
          value={search}
          onChangeText={(value) => {
            setSearch(value);
            void loadProducts(value);
          }}
          returnKeyType="search"
          testID="inventory-search"
        />

        <SectionHeader title="Products" eyebrow={`${products.length} in inventory`} />

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={products}
          keyExtractor={(product) => String(product.id)}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.productCard}>
              <View style={styles.productMain}>
                <View style={styles.productIcon}>
                  <Feather name="box" size={20} color={colors.accent} />
                </View>
                <View style={styles.productInfo}>
                  <Text variant="titleMd" numberOfLines={2}>{item.name}</Text>
                  <Text variant="caption" color={colors.textSecondary}>
                    {item.category} · {item.stock} {item.stock === 1 ? 'unit' : 'units'}
                  </Text>
                  <Text variant="label" color={colors.accent}>
                    ₱{Number(item.price).toFixed(2)}
                  </Text>
                </View>
                <IconButton
                  name="trash-2"
                  size={19}
                  color={colors.danger}
                  accessibilityLabel={`Remove ${item.name}`}
                  onPress={() => deleteProduct(item)}
                />
              </View>
              <View style={styles.stockControls}>
                <Text variant="caption" color={colors.textSecondary}>Adjust stock</Text>
                <View style={styles.stockActions}>
                  <IconButton
                    name="minus"
                    size={18}
                    accessibilityLabel={`Decrease ${item.name} stock`}
                    onPress={() => changeStock(item, -1)}
                    disabled={item.stock === 0}
                  />
                  <Text variant="label" style={styles.stockValue}>{item.stock}</Text>
                  <IconButton
                    name="plus"
                    size={18}
                    accessibilityLabel={`Increase ${item.name} stock`}
                    onPress={() => changeStock(item, 1)}
                  />
                </View>
              </View>
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Feather
                name={loadError ? 'database' : loading ? 'loader' : 'package'}
                size={32}
                color={colors.accent}
              />
              <Text variant="titleMd" align="center">
                {loadError ? 'Inventory unavailable' : loading ? 'Loading inventory' : 'No items found'}
              </Text>
              <Text variant="caption" color={colors.textSecondary} align="center">
                {loadError
                  ? 'The local database could not be opened. Check the app logs and try again.'
                  : loading
                    ? 'Reading products from this device.'
                    : search
                      ? 'Try another item or category name.'
                      : 'Add your first product to get started.'}
              </Text>
              {loadError ? <Button label="Retry" variant="secondary" onPress={() => void refresh()} /> : null}
            </View>
          }
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHeading}>
              <View style={styles.modalTitleBlock}>
                <Text variant="h3">Add product</Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Save an item to the local inventory database.
                </Text>
              </View>
              <IconButton
                name="x"
                accessibilityLabel="Close add product"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <TextField label="Product name" placeholder="e.g. Training bands" value={name} onChangeText={setName} />
            <TextField label="Category" placeholder="e.g. Equipment" value={category} onChangeText={setCategory} />
            <View style={styles.formRow}>
              <TextField
                label="Price (PHP)"
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
                containerStyle={styles.formField}
              />
              <TextField
                label="Starting stock"
                placeholder="0"
                keyboardType="number-pad"
                value={stock}
                onChangeText={setStock}
                containerStyle={styles.formField}
              />
            </View>
            <View style={styles.modalActions}>
              <Button
                label="Cancel"
                variant="secondary"
                width="half"
                onPress={() => setModalVisible(false)}
              />
              <Button label="Save product" width="half" onPress={saveProduct} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, gap: spacing.md, paddingBottom: spacing.md },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 8,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 2 },
  summaryDivider: { width: 1, height: 34, backgroundColor: colors.borderSubtle },
  list: { flex: 1 },
  listContent: { gap: spacing.sm, paddingBottom: spacing.lg, flexGrow: 1 },
  productCard: { gap: spacing.sm, padding: spacing.md },
  productMain: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  productIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.surfaceSunken,
  },
  productInfo: { flex: 1, gap: 3 },
  stockControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.xs,
  },
  stockActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  stockValue: { minWidth: 28, textAlign: 'center' },
  empty: { flex: 1, minHeight: 220, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.lg },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  modalSheet: {
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderColor: colors.borderStrong,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalHeading: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  modalTitleBlock: { flex: 1, gap: 4 },
  formRow: { flexDirection: 'row', gap: spacing.sm },
  formField: { flex: 1, minWidth: 0 },
  modalActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
});