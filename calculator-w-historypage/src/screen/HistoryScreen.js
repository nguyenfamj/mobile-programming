import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function HistoryScreen({ route }) {
  const { history } = route.params;
  console.log(history);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text>History</Text>
        <FlatList
          style={{ maxHeight: 200 }}
          data={history}
          renderItem={({ item }) => <Text>{item.equation}</Text>}
          keyExtractor={(item, index) => index.toString()}
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
