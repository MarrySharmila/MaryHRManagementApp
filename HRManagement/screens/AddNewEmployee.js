import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

// Display sub logo
const DisplayLogo = () => {
  return (
    <Image style={styles.logoSub}
      source={require('../images/ROI_Logo.jpg')
      }

    />
  );
};

// Display profile picture.
  const DisplayProfilePic= () => {
    return (
      <Icon name="user-circle" size={50} color="#000" />
    );
  };



  const AddEmpScreen = ({ route, navigation }) => {
    const { title } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    const [emp, setEMP] = useState({
      id:"",
      name: "",
      phone: "",
      department: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });

    const onChangeId = (value) => {
      setEMP({ ...emp, id: value });  
    };  

    const onChangeName = (value) => {
      setEMP({ ...emp, name: value });  
    };

    const onChangePhone = (value) => {
      setEMP({ ...emp, phone: value});
    };
  
    const onChangeDepartment = (value) => {
      setEMP({ ...emp, department: value});
    };
  
    const onChangeStreet = (value) => {
      setEMP({ ...emp, street: value});
    };
  
    const onChangeCity = (value) => {
      setEMP({ ...emp, city: value});
    };
  
    const onChangeState = (value) => {
      setEMP({ ...emp, state: value});
    };
  
    const onChangeZip = (value) => {
      setEMP({ ...emp, zip: value});
    };
  
    const onChangeCountry = (value) => {
      setEMP({ ...emp, country: value });
    };
    
    /* Clear input text boxes*/
    const clsEmpTxtBoxes = () => {
      emp.id="";
      emp.name = "";
      emp.phone = "";
      emp.department = "";
      emp.street = "";
      emp.city = "";
      emp.state = "";
      emp.zip = "";
      emp.country = "";
    };
    useEffect(() => {
      navigation.setOptions({ title });
    }, [title]);
    /* Add new Employee */
  const AddEmp = async (empInfo) => {
    
    try {
        const response = await fetch("http://10.0.2.2:44322/HR_method.asmx/Add_New_Employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: empInfo,
      });
      if (!response.ok) {
        throw new Error("Failed to add employee");
      }
      const responseText = await response.text();
      window.alert("Success", "New employee is added");
    clsEmpTxtBoxes();
    setEMP({ // Reset state
      id:"",
      name: "",
      phone: "",
      department: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });

    }
    catch (error) {
      console.error('Error adding employee:', error);
    }
  }; 
  
  const validateFields = () => {//chek the vlidation
    const departmentId = parseInt(emp.department);
    for (let key in emp) {
      const value = emp[key];
      if (typeof value === "string" && value.trim() === "") {
        return false;
      }
    }
    if (isNaN(departmentId) || departmentId < 0 || departmentId > 4) {
      window.alert('Invalid Department. Please enter a valid department. It should be a number between 0 and 4.');
      //Alert.alert('Invalid Department ', 'Please enter a valid department. It should be a number between 0 and 4.');
      return false;
    }
    return true;
  };

  const clickHandle = () => {
    if (!validateFields()) {
      window.alert("You have to fill all text boxes", [{ text: "OK" }]);
     // Alert.alert("You have to fill all text boxes", [{ text: "OK" }]);
      return;
    }
    let empInfo = `id=${emp.id}&name=${emp.name}&phone=${emp.phone}&departmentId=${emp.department}&street=${emp.street}&city=${emp.city}&state=${emp.state}&Address_Zip=${emp.zip}&country=${emp.country}`;
    AddEmp(empInfo);
    //window.alert('Success','New employee is added');
   // Alert.alert('Success','New employee is added');
   clsEmpTxtBoxes ();
  }

    return (   
      <ScrollView contentContainerStyle={styles.container}> 
      <View style ={{flex:1}}>
        <View>
          <View style= {styles.logoCont}> 
            {DisplayLogo()}
          </View>
        </View>
        
        <View style={styles.profilePic}>
          {DisplayProfilePic()}
        </View>

        <View>
          <Text style={styles.label}>Id</Text>
            <TextInput style ={styles.input}
              placeholder="Id"
              value={emp.id}
              onChangeText={(value) => onChangeId(value)}
            />
          <Text style={styles.label}>Name</Text>
            <TextInput style ={styles.input}
              placeholder="Full Name"
              value={emp.name}
              onChangeText={(value) => onChangeName(value)}
            />
            <Text style={styles.label}>Phone</Text>
            <TextInput style ={styles.input}
              placeholder="Phone"
              value={emp.phone}
              onChangeText={(value) => onChangePhone(value)}
            />
            <Text style={styles.label}>Department</Text>
            <TextInput style ={styles.input}
              placeholder="Department"
              value={emp.department}
              onChangeText={(value) => onChangeDepartment(value)}
            />
            <Text style={styles.label}>Address</Text>
            <View style={styles.addressBox}>
              <TextInput  style ={styles.input}
                placeholder="Street"
                value={emp.street}
                onChangeText={(value) => onChangeStreet(value)}
              />
              <TextInput  style ={styles.input}
                placeholder="City"
                value={emp.city}
                onChangeText={(value) => onChangeCity(value)}
              />
              
              <TextInput style ={styles.input}
                placeholder="State"
                value={emp.state}
                onChangeText={(value) => onChangeState(value)}
              />
              <TextInput style ={styles.input}
                placeholder="Zip"
                value={emp.zip}
                onChangeText={(value) => onChangeZip(value)}
              />
              <TextInput style ={styles.input}
                placeholder="Country"
                value={emp.country}
                onChangeText={(value) => onChangeCountry(value)}
              />
            </View>
        </View>
        
        
        <Button color='#941a1d' width = '90%' title="Save" onPress={clickHandle}></Button>
      </View>    
      </ScrollView>
    );
  };


  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      paddingTop:1,
      paddingBottom: 1,
    },
    label:{
      margin:5,
      fontWeight: 'bold',
      paddingTop: 1,
      paddingLeft: 7,
      paddingBottom: 0,
    },
    addressBox:{
      margin:12,
      borderWidth:1,
      padding:2,
    },
    avata: {
      width: 70,
      height: 70,
      //marginTop :20,
      alignItems :'center',
      justifyContent: 'center',
    },
    logoSub: {
      marginTop: 1,
      width: 75,
      height: 37.5,
      alignSelf: 'right',
    },
    logoCont:{
      flexDirection: 'row',
      justifyContent: 'end',
      padding: 10,
    },
    profilePic:{
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 2,
    },
    
  });

export default AddEmpScreen;
