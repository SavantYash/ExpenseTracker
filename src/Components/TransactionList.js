import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Salary', amount: 5000, type: 'income', category : "food" },
    { id: '2', title: 'Groceries', amount: 800, type: 'expense', category : "travel" },
    { id: '3', title: 'Freelance', amount: 2000, type: 'income', category : "other" },
    { id: '4', title: 'Electricity Bill', amount: 150, type: 'expense', category : "recharge" },
  ]);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.index}>{index + 1}.</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.amount, item.type === 'income' ? styles.income : styles.expense]}>
          {item.type === 'income' ? '+' : '-'}{item.amount}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  index: {
    fontWeight: '600',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
});
