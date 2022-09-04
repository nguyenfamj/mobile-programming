import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [shoppingList, setShoppingList] = useState({ newItem: '', list: [] });
  console.log(shoppingList);

  const onInputChange = (name, value) => {
    setShoppingList({ ...shoppingList, newItem: value });
  };

  const addItem = () => {
    setShoppingList({
      ...shoppingList,
      list: [...shoppingList.list, { title: shoppingList.newItem }],
    });
  };

  const clearItems = () => {
    setShoppingList({ ...shoppingList, list: [] });
  };

  return (
    <View style={styles.container}>
      <Text>Shopping List</Text>
      <View>
        <TextInput
          style={{ width: 150, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => onInputChange('newItem', text)}
          value={shoppingList.newItem}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '30%',
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: 60,
            height: 40,
            borderColor: 'gray',
            backgroundColor: '#4591f5',
            borderRadius: 10,
          }}
        >
          <Button color='#ffffff' title='Add' onPress={addItem} />
        </View>
        <View
          style={{
            width: 60,
            height: 40,
            borderColor: 'gray',
            backgroundColor: '#fa3e3e',
            borderRadius: 10,
          }}
        >
          <Button color='#ffffff' title='Clear' onPress={clearItems} />
        </View>
      </View>
      <FlatList
        style={{ maxHeight: 200 }}
        data={shoppingList.list}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      ></FlatList>
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
