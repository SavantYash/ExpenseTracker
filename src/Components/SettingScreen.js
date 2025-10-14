import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Food', limit: 500 },
    { id: '2', name: 'Rent', limit: 1000 },
    { id: '3', name: 'Transport', limit: 400 },
    { id: '4', name: 'Shopping', limit: 300 },
  ]);
  

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <TextInput
        style={styles.input}
        value={item.limit.toString()}
        keyboardType="numeric"
        onChangeText={(text) => {
          const newCategories = [...categories];
          newCategories[index].limit = Number(text);
          setCategories(newCategories);
        }}
      />
    </View>
  );

  

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7', padding: 10 },
  card: { backgroundColor: '#fff', padding: 15, marginVertical: 8, borderRadius: 10, elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 5, width: 80, borderRadius: 5, textAlign: 'center' },
});
