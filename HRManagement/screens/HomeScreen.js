import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from "react-native";

const DisplayLogo = () => {
  return (
    <Image
      style={styles.logoMain}
      source={require('../images/ROI_Logo.jpg')}
    />
  );
};

const HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getEmp = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:44322/HR_method.asmx/View_Employee"
      );

      const json = await response.text();
      const data = JSON.parse(json);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmp();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            {DisplayLogo()}
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.titletext}>Welcome to Red Opal Innovations</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
              color='#595959'
              title="Staff Directory"
              onPress={() => {
                /* Navigate to the Details route with params */
                navigation.navigate('Details', {
                  itemId: 86,
                  otherParam: 'anything you want here',
                });
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#941a1d',
    textAlign: 'center',
  },
  logoMain: {
    width: 100,
    height: 50,
    alignSelf: 'center',
  },
});

export default HomeScreen;
