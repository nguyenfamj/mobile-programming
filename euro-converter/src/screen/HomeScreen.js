import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-community/picker';

const API_KEY = 'EyPUzCM5J5lU6pmF4P4o5YDXTbAn75JX';

function HomeScreen() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [foreignAmount, setForeignAmount] = useState();
  const [currenciesList, setCurrenciesList] = useState({});
  const [data, setData] = useState([]);
  console.log(data);

  //   Fetching API
  const requestHeader = new Headers();
  requestHeader.append('apikey', API_KEY);

  const requestOption = {
    method: 'GET',
    headers: requestHeader,
  };

  const fetchConvertedAmount = async () => {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${foreignAmount}`,
      requestOption
    );
    if (!response.ok) {
      throw new Error('Cannot fetch');
    }
    const data = await response.json();
    setData(data);
  };

  const fetchCurrencies = async () => {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/symbols`,
      requestOption
    );
    if (!response.ok) {
      throw new Error('Cannot fetch');
    }
    const data = await response.json();
    setCurrenciesList(data.symbols);
  };

  useEffect(() => {
    fetchConvertedAmount();
  }, [selectedCurrency]);

  useEffect(() => {
    fetchCurrencies().catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 320,
          maxHeight: 565,
          marginTop: 200,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 30, marginLeft: 10 }}>
            {data?.result} {data?.query?.to}
          </Text>
        </View>
        <Picker
          itemStyle={{ fontSize: 12 }}
          style={{ height: 200, width: 100 }}
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCurrency(itemValue);
          }}
        >
          {Object.keys(currenciesList).map((key) => (
            <Picker.Item key={key} label={key} value={key} />
          ))}
        </Picker>
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
            width: 180,
            padding: 7,
            borderRadius: 10,
            fontWeight: 'bold',
            color: 'black',
          }}
          keyboardType='numeric'
          placeholder={`Money amount in ${selectedCurrency}`}
          onChangeText={(amount) => setForeignAmount(amount)}
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
          onPress={fetchConvertedAmount}
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
