import { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  console.log();

  const fetchRecipes = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`
    );
    if (!response.ok) {
      throw new Error('Cannot fetch');
    }
    const data = await response.json();
    setData(data.meals);
  };

  return (
    <View style={styles.container}>
      <View style={{ maxHeight: 565, marginTop: 10 }}>
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', width: 360, marginVertical: 5 }}>
                <Image
                  style={{ resizeMode: 'cover', width: 100, height: 60, borderRadius: 15 }}
                  source={{ uri: item.strMealThumb }}
                />
                <Text style={{ fontWeight: 'bold', marginLeft: 15 }}>{item.strMeal}</Text>
              </View>
            )}
          />
        </ScrollView>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 50,
          justifyContent: 'space-between',
          width: 270,
        }}
      >
        <TextInput
          style={{
            backgroundColor: '#dbdbdb',
            width: 200,
            padding: 7,
            borderRadius: 10,
            fontWeight: 'bold',
            color: 'black',
          }}
          placeholder='Search for recipe'
          onChangeText={(text) => setSearchText(text)}
        />
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            paddingHorizontal: 15,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={fetchRecipes}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Find</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default HomeScreen;
