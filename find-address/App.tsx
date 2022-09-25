import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface apiRespone {
  info: {
    statuscode: number;
    copyright: {
      text: string;
      imageUrl: string;
      imageAltText: string;
    };
    messages: [];
  };
  options: {
    maxResults: number;
    thumbMaps: boolean;
    ignoreLatLngInput: boolean;
  };
  results: [
    {
      providedLocation: {
        location: string;
      };
      locations: [
        {
          street: string;
          adminArea6: string;
          adminArea6Type: string;
          adminArea5: string;
          adminArea5Type: string;
          adminArea4: string;
          adminArea4Type: string;
          adminArea3: string;
          adminArea3Type: string;
          adminArea1: string;
          adminArea1Type: string;
          postalCode: string;
          geocodeQualityCode: string;
          geocodeQuality: string;
          dragPoint: boolean;
          sideOfStreet: string;
          linkId: string;
          unknownInput: string;
          type: string;
          latLng: {
            lat: number;
            lng: number;
          };
          displayLatLng: {
            lat: number;
            lng: number;
          };
          mapUrl: string;
        }
      ];
    }
  ];
}

interface mapViewRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function App() {
  const MAP_KEY = 'FLvNh3yJLXeMVdh03G8x0wGPwlAg2bAX';
  const [searchAddress, setSearchAddress] = useState('');
  const [region, setRegion] = useState<mapViewRegion>({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [locationName, setLocationName] = useState<string>('Haaga-Helia Pasila');

  const fetchGeolocation = async () => {
    const response = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${MAP_KEY}&location=${searchAddress}`
    );
    if (!response.ok) throw new Error('Cannot fetch');

    const data: apiRespone = await response.json();
    const latLng = data?.results[0]?.locations[0]?.latLng;

    setRegion({ ...region, latitude: latLng.lat, longitude: latLng.lng });
    setLocationName(data?.results[0]?.locations[0]?.adminArea6);
  };

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1, width: '100%', height: '100%' }} region={region}>
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title={locationName}
        />
      </MapView>
      <KeyboardAvoidingView
        style={{
          marginBottom: 50,

          width: 320,
          position: 'absolute',
          bottom: 50,
        }}
        behavior='position'
      >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            style={{
              backgroundColor: 'white',
              width: 250,
              padding: 12,
              borderRadius: 15,
              fontWeight: 'bold',
              color: 'black',
              elevation: 10,
            }}
            placeholder='Find the address'
            onChangeText={(text) => setSearchAddress(text)}
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
            onPress={fetchGeolocation}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Find</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
