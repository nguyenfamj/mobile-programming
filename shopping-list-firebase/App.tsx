import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { db } from './dbconfig';

// Interface
type shoppingItem = { id?: Number; product: string; amount: string };

interface shoppingList {
  newItem: shoppingItem;
  list: shoppingItem[];
  keys: string[];
}

export default function App() {
  const [shoppingList, setShoppingList] = useState<shoppingList>({
    newItem: { product: '', amount: '' },
    list: [],
    keys: [],
  });
  console.log(shoppingList);

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setShoppingList({ ...shoppingList, newItem: { ...shoppingList.newItem, [name]: value } });
  };

  // For list stored in state
  const addItem = () => {
    push(ref(db, 'shoppingitems/'), {
      product: shoppingList.newItem.product,
      amount: shoppingList.newItem.amount,
    });
  };

  const clearItems = () => {
    setShoppingList({ ...shoppingList, list: [], keys: [] });
  };

  const handleItemBought = ({ index }: { index: number }) => {
    remove(ref(db, `shoppingitems/${shoppingList.keys[index]}`));
  };

  useEffect(() => {
    onValue(ref(db, 'shoppingitems'), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data)
        setShoppingList({ ...shoppingList, list: Object.values(data), keys: Object.keys(data) });
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
          onPress={addItem}
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
                onPress={() => handleItemBought({ index })}
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
