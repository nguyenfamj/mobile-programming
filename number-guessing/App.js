import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const DEFAULT_DISPLAY_TEXT = 'Guess a number between 1-100';

  const [gameStatus, setGameStatus] = useState({
    displayText: DEFAULT_DISPLAY_TEXT,
    guessNumber: Math.floor(Math.random() * 100) + 1,
    guessInput: 0,
    count: 1,
  });

  console.log(gameStatus);

  const onInputChange = (name, value) => {
    setGameStatus({ ...gameStatus, [name]: Number(value) });
  };

  const onGuessPress = () => {
    if (gameStatus.guessInput === gameStatus.guessNumber) {
      Alert.alert(`You guessed the number in ${gameStatus.count} guesses`);
      setGameStatus({ ...gameStatus, count: 1, guessNumber: Math.floor(Math.random() * 100) + 1 });
    } else if (gameStatus.guessInput < gameStatus.guessNumber) {
      setGameStatus({
        ...gameStatus,
        displayText: `Your guess ${gameStatus.guessInput} is too low`,
        guessInput: 0,
        count: gameStatus.count + 1,
      });
    } else {
      setGameStatus({
        ...gameStatus,
        displayText: `Your guess ${gameStatus.guessInput} is too high`,
        guessInput: 0,
        count: gameStatus.count + 1,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>{gameStatus.displayText}</Text>
      <View>
        <TextInput
          style={{ width: 150, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => onInputChange('guessInput', text)}
          value={gameStatus.guessInput}
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
        <View
          style={{
            width: 120,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: '#e68b40',
            borderRadius: 10,
          }}
        >
          <Button color='#ffffff' title='Make Guess' onPress={onGuessPress} />
        </View>
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
