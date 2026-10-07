import React, { useCallback, useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert
} from 'react-native';

import { db, initDatabase } from '../services/db';

export default function SQLitePOSScreen() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');

  const [category, setCategory] = useState('');

  const [price, setPrice] = useState('');

  const [stock, setStock] = useState('');

  const loadData = useCallback(async (query = '') => {
    if (query.trim() === '') {
      return db.getAllAsync('SELECT * FROM products ORDER BY id DESC;');
    }

    return db.getAllAsync(
      'SELECT * FROM products WHERE name LIKE ? ORDER BY name ASC;',
      [`%${query}%`]
    );
  }, []);

  useEffect(() => {
    initDatabase();
    let mounted = true;
    loadData().then((rows) => {
      if (mounted) setProducts(rows);
    });

    return () => {
      mounted = false;
    };
  }, [loadData]);

  const refreshData = (query = '') => {
    loadData(query).then(setProducts);
  };

  const handleAddProduct = () => {
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
        'Invalid Product',
        'Enter a name, category, non-negative price, and whole-number stock.'
      );

      return;
    }

    db.runSync(
      `INSERT INTO products 
      (name, category, price, stock)
      VALUES (?, ?, ?, ?);`,
      [cleanName, cleanCategory, parsedPrice, parsedStock]
    );

    setName('');
    setCategory('');
    setPrice('');
    setStock('');

    setModalVisible(false);

    refreshData(search);
  };

  const changeStock = (id, amount) => {
    db.runSync(
      'UPDATE products SET stock = MAX(stock + ?, 0) WHERE id = ?;',
      [amount, id]
    );

    refreshData(search);
  };

  const handleDelete = (id, prodName) => {
    Alert.alert(
      'Delete Confirmation',
      `Remove ${prodName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',

          onPress: () => {
            db.runSync(
              'DELETE FROM products WHERE id = ?;',
              [id]
            );

            refreshData(search);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerRow}>

        <Text style={styles.title}>
          Inventory Database
        </Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addBtnText}>
            + Add Item
          </Text>
        </TouchableOpacity>

      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search items by name..."
        value={search}

        onChangeText={(text) => {
          setSearch(text);
          refreshData(text);
        }}
      />

      <FlatList
        data={products}

        keyExtractor={(item) =>
          String(item.id)
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={{ flex: 1 }}>

              <Text style={styles.itemName}>
                {item.name}
              </Text>

              <Text style={styles.itemMeta}>
                Category: {item.category}
                {'\n'}
                Stock: {item.stock} units
              </Text>

              <View style={styles.stockActions}>
                <TouchableOpacity
                  accessibilityLabel={`Decrease ${item.name} stock`}
                  onPress={() => changeStock(item.id, -1)}
                  style={styles.stockBtn}
                >
                  <Text style={styles.stockBtnText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityLabel={`Increase ${item.name} stock`}
                  onPress={() => changeStock(item.id, 1)}
                  style={styles.stockBtn}
                >
                  <Text style={styles.stockBtnText}>+</Text>
                </TouchableOpacity>
              </View>

            </View>

            <Text style={styles.itemPrice}>
              ₱{item.price.toFixed(2)}
            </Text>

            <TouchableOpacity
              onPress={() =>
                handleDelete(item.id, item.name)
              }

              style={styles.delBtn}
            >

              <Text style={styles.delBtnText}>
                ✕
              </Text>

            </TouchableOpacity>

          </View>
        )}

        ListEmptyComponent={
          <Text style={styles.empty}>
            No products found.
          </Text>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              New Product
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
            />

            <TextInput
              style={styles.input}
              placeholder="Price (PHP)"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <TextInput
              style={styles.input}
              placeholder="Initial Stock"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
            />

            <View style={styles.modalBtns}>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() =>
                  setModalVisible(false)
                }
              >

                <Text style={styles.btnText}>
                  Cancel
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddProduct}
              >

                <Text
                  style={[
                    styles.btnText,
                    { color: '#FFF' }
                  ]}
                >
                  Save
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0E2A35'
  },

  addBtn: {
    backgroundColor: '#00758F',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6
  },

  addBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },

  searchBar: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center'
  },

  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B'
  },

  itemMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },

  stockActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8
  },

  stockBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#E0F2F1'
  },

  stockBtnText: {
    color: '#00758F',
    fontSize: 18,
    fontWeight: 'bold'
  },

  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00758F',
    marginRight: 12
  },

  delBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 4
  },

  delBtnText: {
    color: '#DC2626',
    fontWeight: 'bold'
  },

  empty: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 30
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },

  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10
  },

  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10
  },

  cancelBtn: {
    padding: 10
  },

  saveBtn: {
    backgroundColor: '#00758F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6
  },

  btnText: {
    fontWeight: 'bold',
    color: '#64748B'
  }

});