import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Display logo
const DisplayLogo = () => {
  return (
    <Image style={styles.logoSub} source={require('../images/ROI_Logo.jpg')} />
  );
};

// Display profile picture
const DisplayProfilePic = () => {
  return (
    <Icon name="user-circle" size={50} color="#000" />
  );
};

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  const [data, setData] = useState([]);

  const getEmp = async () => {
    try {
      const response = await fetch("http://10.0.2.2:44322/HR_method.asmx/View_Employee");
      const textResponse = await response.text();
      console.log("Raw response:", textResponse); // Debugging log
      const data = JSON.parse(textResponse);
      console.log("Parsed data:", data); // Debugging log
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getEmp();
  }, []);

  const ViewEmployee = (selectedId) => {
    navigation.navigate('ViewEmployee', { employeeId: selectedId });
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Staff Directory', // Change this to the desired title
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoCont}>
        <DisplayLogo />
      </View>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Staff Directory</Text>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => ViewEmployee(item.Id)}>
            <DisplayProfilePic />
            <Text style={styles.listTitle}>{item.Name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer} // Added to ensure proper content layout
      />
      
      <View style={styles.addButtonContainer}>
        <Button
          color='#941a1d'
          title='Add Employee'
          onPress={() => {
            navigation.navigate('AddEmployee', {
              itemId: 1,
              otherParam: 'anything you want here',
              title: 'Add new staff profile',
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pageTitleContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontWeight: 'bold',
    color: '#941a1d',
    fontSize: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  itemImage: {
    width: 50,  // Adjust width for better visibility
    height: 50, // Adjust height for better visibility
    borderRadius: 25,
    marginRight: 10,
  },
  listTitle: {
    fontSize: 15,
    flex: 1, // Use flex for better alignment
    marginLeft: 10, // Add margin to create space between icon and text
  },
  logoSub: {
    width: 100,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  logoCont: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  addButtonContainer: {
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 10, // Adjust as needed to ensure proper spacing at the bottom of the list
  },
});

export default DetailsScreen;
