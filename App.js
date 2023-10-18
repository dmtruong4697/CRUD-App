import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from './firebase/db';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    className: '',
    gpa: '',
  });

  const [listData, setListData] = useState([])

  const getListData = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const items = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setListData(items);
  };

  useEffect (() => {
    getListData();
  }, []);

  const handleInputChange = (field, text) => {
    setFormData({
      ...formData,
      [field]: text,
    });
  };

  const handleSubmit = async() => {
    console.log(formData);
    try {
      const docRef = await addDoc(collection(db, "students"), formData);
      console.log("Document written with ID: ", docRef.id);
      getListData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Nhập thông tin học viên</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên"
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          onChangeText={(text) => handleInputChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Lớp"
          onChangeText={(text) => handleInputChange('className', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="GPA"
          onChangeText={(text) => handleInputChange('gpa', text)}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <StatusBar style="auto" />
      </SafeAreaView>


      <Text style={styles.title}>Bảng thông tin các học viên</Text>
      <FlatList
        data={listData}
        renderItem={({item}) => 
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>Tên học sinh: {item.name}</Text>
          <Text style={styles.listItemText}>Địa chỉ: {item.address}</Text>
          <Text style={styles.listItemText}>Lớp: {item.className}</Text>
          <Text style={styles.listItemText}>GPA: {item.gpa}</Text>
        </View>}
        keyExtractor={item => item.id}
      >
      </FlatList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
    padding: 20, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  listItem: {
    backgroundColor: 'white', 
    marginBottom: 10,
    padding: 10,
    borderRadius: 5, 
  },
  listItemText: {
    fontSize: 16,
  },
});
