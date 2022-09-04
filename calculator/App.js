import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [calc, setCalc] = useState({ result: 0, nums: { first: 0, second: 0 } });

  const onInputChange = (name, value) => {
    setCalc({ ...calc, nums: { ...calc.nums, [name]: Number(value) } });
  };

  const increaseChange = () => {
    setCalc({ ...calc, result: calc.nums.first + calc.nums.second });
  };

  const decreaseChange = () => {
    setCalc({ ...calc, result: calc.nums.first - calc.nums.second });
  };

  return (
    <View style={styles.container}>
      <Text>Result: {calc.result}</Text>
      <View>
        <TextInput
          style={{ width: 150, borderColor: 'gray', borderWidth: 1 }}
          value={calc.nums.first}
          onChangeText={(text) => onInputChange('first', text)}
          keyboardType='numeric'
        />
        <TextInput
          style={{ width: 150, borderColor: 'gray', borderWidth: 1 }}
          value={calc.nums.second}
          onChangeText={(text) => onInputChange('second', text)}
          keyboardType='numeric'
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
        <Button title='+' onPress={increaseChange} />
        <Button title='-' onPress={decreaseChange} />
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
