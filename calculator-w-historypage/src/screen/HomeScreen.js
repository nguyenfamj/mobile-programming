import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

export default HomeScreen = ({ navigation }) => {
  // Control State
  const [calc, setCalc] = useState({
    result: 0,
    nums: { first: 0, second: 0 },
    type: '',
    count: 0,
  });
  const [history, setHistory] = useState([]);

  //   Update state
  useEffect(() => {
    setHistory((prevState) => {
      if (history[0] === undefined && calc.result === 0) {
        return [];
      }
      const equation = `${calc.nums.first} ${calc.type === 'increase' ? '+' : '-'} ${
        calc.nums.second
      } = ${calc.result}`;
      return [...prevState, { equation }];
    });
  }, [calc.count]);

  //   Input change calculator
  const onInputChange = (name, value) => {
    setCalc({ ...calc, nums: { ...calc.nums, [name]: Number(value) } });
  };

  //   Calculation function
  const increaseButtonPressed = () => {
    setCalc({
      ...calc,
      result: calc.nums.first + calc.nums.second,
      type: 'increase',
      count: calc.count + 1,
    });
  };

  const decreaseButtonPressed = () => {
    setCalc({
      ...calc,
      result: calc.nums.first - calc.nums.second,
      type: 'increase',
      count: calc.count + 1,
    });
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
        <Button title='+' onPress={increaseButtonPressed} />
        <Button title='-' onPress={decreaseButtonPressed} />
      </View>
      <Button title='History' onPress={() => navigation.navigate('History', { history })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
