import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DisplayLogo = () => {
  return (
    <Image
      style={styles.logoSub}
      source={require('../images/ROI_Logo.jpg')}
    />
  );
};

const DisplayProfilePic = () => {
  return (
    <Icon name="user-circle" size={50} color="#000" />
  );
};

const UpdateEmpScreen = ({ route, navigation }) => {
  const { employee } = route.params;
  const [updateEmployee, setUpdateEmployee] = useState({
    Id: employee.Id,
    Name: employee.Name,
    Phone: employee.Phone.toString(),
    Department: employee.Department.ID.toString(), 
    Street: employee.Address_Street, 
    City: employee.Address_City, 
    State: employee.Address_State, 
    Zip: employee.Address_Zip.toString(), 
    Country: employee.Address_Country 
  });
  // const [updateEmployee, setUpdateEmployee] = useState({
  //   Id: employee.Id,
  //   Name: employee.Name,
  //   Phone: employee.Phone,
  //   Department: employee.Department.Id,
  //   Street: employee.Street,
  //   City: employee.City,
  //   State: employee.State,
  //   Zip: employee.Zip,
  //   Country: employee.Country,
  // });

  const onChangeName = (value) => {
    setUpdateEmployee({ ...updateEmployee, Name: value });
  };

  const onChangePhone = (value) => {
    setUpdateEmployee({ ...updateEmployee, Phone: value });
  };

  const onChangeDepartment = (value) => {
    setUpdateEmployee({ ...updateEmployee, Department: value });
  };

  const onChangeStreet = (value) => {
    setUpdateEmployee({ ...updateEmployee, Street: value });
  };

  const onChangeCity = (value) => {
    setUpdateEmployee({ ...updateEmployee, City: value });
  };

  const onChangeState = (value) => {
    setUpdateEmployee({ ...updateEmployee, State: value });
  };

  const onChangeZip = (value) => {
    setUpdateEmployee({ ...updateEmployee, Zip: value });
  };

  const onChangeCountry = (value) => {
    setUpdateEmployee({ ...updateEmployee, Country: value });
  };

  const UpdateEmp = async (empInfo) => {
    try {
      const response = await fetch("http://10.0.2.2:44322/HR_method.asmx/Update_Employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: empInfo,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      if (Platform.OS === 'web') {
        window.alert("Success: Employee details updated");
      } else {
        Alert.alert("Success", "Employee details updated");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const validateFields = () => {
    const departmentId = parseInt(updateEmployee.Department);
    for (let key in updateEmployee) {
      const value = updateEmployee[key];
      if (typeof value === "string" && value.trim() === "") {
        return false;
      }
    }
    if (isNaN(departmentId) || departmentId < 0 || departmentId > 4) {
      if (Platform.OS === 'web') {
        window.alert('Invalid Department. Please enter a valid department. It should be a number between 0 and 4.');
      } else {
        Alert.alert('Invalid Department', 'Please enter a valid department. It should be a number between 0 and 4.');
      }
      return false;
    }
    return true;
  };

  const clickHandle = () => {
    if (!validateFields()) {
      if (Platform.OS === 'web') {
        window.alert("You have to fill all text boxes");
      } else {
        Alert.alert("Error", "You have to fill all text boxes", [{ text: "OK" }]);
      }
      return;
    }
    let empInfo = `id=${updateEmployee.Id}&name=${updateEmployee.Name}&phone=${updateEmployee.Phone}&DepartmentId=${updateEmployee.Department}&street=${updateEmployee.Street}&city=${updateEmployee.City}&state=${updateEmployee.State}&Address_Zip=${updateEmployee.Zip}&country=${updateEmployee.Country}`;
    UpdateEmp(empInfo);
    // if (Platform.OS === 'web') {
    //   window.alert("Employee updated Successfully");
    // } else {
    //   Alert.alert("Success", "Employee updated Successfully");
    // }
  };

  return (
    <View style={styles.outerContainer}>
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
            value={updateEmployee.Name}
            onChangeText={(value) => onChangeName(value)}
          />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={updateEmployee.Phone}
            onChangeText={(value) => onChangePhone(value)}
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Department</Text>
          <TextInput
            style={styles.input}
            value={updateEmployee.Department.toString()}
            onChangeText={(value) => onChangeDepartment(value)}
             keyboardType="numeric"
          />
          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            value={updateEmployee.Street}
            onChangeText={(value) => onChangeStreet(value)}
          />
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={updateEmployee.City}
            onChangeText={(value) => onChangeCity(value)}
          />
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={updateEmployee.State}
            onChangeText={(value) => onChangeState(value)}
          />
          <Text style={styles.label}>Zip</Text>
          <TextInput
            style={styles.input}
            value={updateEmployee.Zip}
            onChangeText={(value) => onChangeZip(value)}
          />
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={updateEmployee.Country}
            onChangeText={(value) => onChangeCountry(value)}
          />
          <Button
            color='#941a1d'
            borderWidth='1'
            width='30%'
            size='lg'
            type="submit"
            title='Done'
            onPress={clickHandle}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    margin: 5,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingLeft: 7,
    paddingBottom: 0,
  },
  avata: {
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
});

export default UpdateEmpScreen;
