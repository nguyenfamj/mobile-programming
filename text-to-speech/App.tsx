import { Pressable, StyleSheet, View, Text, TextInput } from 'react-native';
import { useState } from 'react';
import * as Speech from 'expo-speech';

export default function App() {
  const [textSpeech, setTextSpeech] = useState<string>('');

  const speak = () => {
    Speech.speak(textSpeech);
    console.log(textSpeech);
  };
  console.log(textSpeech);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{
            backgroundColor: '#e2e2e2',
            padding: 12,
            width: 200,
            borderRadius: 15,
            fontWeight: '400',
            color: 'black',
            elevation: 10,
          }}
          placeholder='Enter text to speech'
          onChangeText={(text) => {
            setTextSpeech(text);
          }}
        />
      </View>
      <View>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 15,
            backgroundColor: '#000000',
            marginTop: 70,
          }}
          onPress={speak}
        >
          <Text style={{ fontSize: 12, color: '#ffffff', fontWeight: 'bold' }}>
            Press To Hear Text
          </Text>
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
    justifyContent: 'center',
    paddingVertical: 100,
  },
});
