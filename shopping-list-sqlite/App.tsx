import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
// Database
const db = SQLite.openDatabase('shoppingdb.db');

// Interface
type shoppingItem = { id?: Number; product: string; amount: string };

interface shoppingList {
  newItem: shoppingItem;
  list: shoppingItem[];
}

export default function App() {
  const [shoppingList, setShoppingList] = useState<shoppingList>({
    newItem: { product: '', amount: '' },
    list: [],
  });
  console.log(shoppingList);

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setShoppingList({ ...shoppingList, newItem: { ...shoppingList.newItem, [name]: value } });
  };

  // For list stored in state
  const addItem = () => {
    setShoppingList({
      ...shoppingList,
      list: [...shoppingList.list, shoppingList.newItem],
      newItem: { product: '', amount: '' },
    });
  };

  const clearItems = () => {
    setShoppingList({ ...shoppingList, list: [] });
  };

  const handleItemBought = ({ index }: { index: number }) => {
    const newList: shoppingItem[] = shoppingList.list.filter((item, idx) => {
      return index !== idx;
    });
    setShoppingList({ ...shoppingList, list: newList });
  };

  // For list stored in database
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('INSERT INTO shopping_list (product, amount) VALUES (?,?);', [
          shoppingList.newItem.product,
          shoppingList.newItem.amount,
        ]);
      },
      undefined,
      updateList
    );
  };

  const updateList = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('SELECT * FROM shopping_list;', [], (_, { rows }) =>
          setShoppingList({ ...shoppingList, list: rows._array })
        );
      },
      undefined,
      undefined
    );
  };

  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM shopping_list WHERE id = ?;', [id]);
      },
      undefined,
      updateList
    );
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS shopping_list (id integer primary key not null, product text, amount text);'
      ),
        null,
        updateList;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 30, fontSize: 24, fontWeight: 'bold' }}>Shopping List</Text>
      <View style={{ justifyContent: 'space-between', height: 85 }}>
        <TextInput
          style={{
            backgroundColor: '#e3e3e3',
            width: 250,
            padding: 12,
            borderRadius: 15,
            fontWeight: 'bold',
            color: 'black',
            elevation: 10,
          }}
          value={shoppingList.newItem.product}
          placeholder='Product'
          onChangeText={(text) => onInputChange({ name: 'product', value: text })}
        />
        <TextInput
          style={{
            backgroundColor: '#e3e3e3',
            width: 250,
            padding: 12,
            borderRadius: 15,
            fontWeight: 'bold',
            color: 'black',
            elevation: 10,
          }}
          value={shoppingList.newItem.amount}
          placeholder='Amount'
          onChangeText={(text) => onInputChange({ name: 'amount', value: text })}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 170,
          marginTop: 10,
        }}
      >
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#62b8e3',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={saveItem}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Add</Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={clearItems}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Clear all</Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 20 }}>
        <FlatList
          style={{ maxHeight: 200 }}
          data={shoppingList.list}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 220,
                paddingVertical: 10,
                borderTopWidth: 1,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '500' }}>
                {item.product}, {item.amount}
              </Text>
              <Pressable
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#39cc74',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  elevation: 3,
                }}
                onPress={() => {
                  deleteItem(item?.id);
                }}
              >
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Bought</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
