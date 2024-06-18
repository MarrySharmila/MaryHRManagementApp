import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DisplayLogo = () => {
  return (
    <Image style={styles.logoSub} source={require('../images/ROI_Logo.jpg')} />
  );
};

const DisplayProfilePic = () => {
  return (
    <Icon name="user-circle" size={50} color="#000" />
  );
};
const PostalIconComponent = () => {
  return (
      <Icon name="envelope" size={50} color="#000" />
  );
};

const EmpDetails = ({ route, navigation }) => {
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState({
    Id: -1,
    Name: '',
    Phone: '',
    Department: {
      ID: -1,
      Name: ''
    },
    Address_Street: '',
    Address_City: '',
    Address_State: '',
    Address_Zip: '',
    Address_Country: ''
  });

  const getEmpById = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:44322/HR_method.asmx/View_Employee_ById?id=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.length > 0) {
        const emp = data[0]; // Assuming data is an array and we take the first item
        setEmployee({
          Id: emp.Id || -1,
          Name: emp.Name || '',
          Phone: emp.Phone || '',
          Department: {
            ID: emp.Department ? emp.Department.ID || -1 : -1,
            Name: emp.Department ? emp.Department.Name || 'N/A' : 'N/A'
          },
          Address_Street: emp.Address_Street || '',
          Address_City: emp.Address_City || '',
          Address_State: emp.Address_State || '',
          Address_Zip: emp.Address_Zip || '',
          Address_Country: emp.Address_Country || ''
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmpById(employeeId);
  }, [employeeId]);

  const updateEmployee = () => {
    navigation.navigate('UpdateEmployee', { employee });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoCont}>
        {DisplayLogo()}
      </View>
      <View style={styles.profilePic}>
        {DisplayProfilePic()}
      </View>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={employee.Name}
          onChangeText={(value) => setEmployee({ ...employee, Name: value })}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={String(employee.Phone)}
          onChangeText={(value) => setEmployee({ ...employee, Phone: value })}
        />
        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          value={String(employee.Department.ID)}
          onChangeText={(value) => setEmployee({ ...employee, Department: { ...employee.Department, ID: value } })}
        />
        <Text style={styles.label}>Address</Text>
        <View style={styles.addressBox}>
        <Icon name="envelope" size={30} color="#000" style={styles.itemIcon} />
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.addTextInput}
              value={employee.Address_Street}
              onChangeText={(value) => setEmployee({ ...employee, Address_Street: value })}
            />
            <TextInput
              style={styles.addTextInput}
              value={employee.Address_City}
              onChangeText={(value) => setEmployee({ ...employee, Address_City: value })}
            />
            <TextInput
              style={styles.addTextInput}
              value={employee.Address_State}
              onChangeText={(value) => setEmployee({ ...employee, Address_State: value })}
            />
            <TextInput
              style={styles.addTextInput}
              value={String(employee.Address_Zip)}
              onChangeText={(value) => setEmployee({ ...employee, Address_Zip: value })}
            />
            <TextInput
            style={styles.addTextInput}
            value={employee.Address_Country}
            onChangeText={(value) => setEmployee({ ...employee, Address_Country: value })}
          />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color='#941a1d'
            title='Edit'
            onPress={updateEmployee}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    height: 35,
    margin: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  label: {
    margin: 5,
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 7,
    paddingBottom: 0,
    fontSize: 14,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    padding: 4,
  },
  addTextInput: {
    height: 35,
    margin: 5,
    borderWidth: 1,
    paddingHorizontal: 8,
    flex: 1,
  },
  logoCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  profilePic: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSub: {
    marginTop: 2,
    width: 75,
    height: 37.5,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  itemIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default EmpDetails;

