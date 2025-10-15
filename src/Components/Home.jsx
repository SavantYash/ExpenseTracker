import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import { styles } from './Styles.js'; // 👈 external style import

function ExpenseCircle() {
  return (
    <View style={styles.expenseCircleContainer}>
      <View style={styles.circle}>
        <View style={styles.filledCircle} />
      </View>
      <View style={styles.expenseCircleText}>
        <Text style={styles.smallText}>Total Expenses</Text>
        <Text style={styles.largeText}>$1,200</Text>
        <Text style={styles.smallText}>of $2,000</Text>
      </View>
    </View>
  );
}

function CategoryItem({ icon, title, spent }) {
  return (
    <View style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <Text style={styles.categorySubtitle}>${spent} spent</Text>
      </View>
      <Text style={styles.categoryAmount}>${spent}</Text>
    </View>
  );
}

function RecentExpenseItem({ name, type, amount }) {
  return (
    <View style={styles.recentItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.recentTitle}>{name}</Text>
        <Text style={styles.recentSubtitle}>{type}</Text>
      </View>
      <Text style={styles.recentAmount}>-{amount}</Text>
    </View>
  );
}

const categories = [
  { id: '1', name: 'Food', expense: 450, limit: 500 },
  { id: '2', name: 'Rent', expense: 1000, limit: 1000 },
  { id: '3', name: 'Transport', expense: 300, limit: 400 },
  { id: '4', name: 'Shopping', expense: 200, limit: 300 },
];

const renderItem = ({ item }) => (
  <View style={styles1.card}>
    <Text style={styles1.name}>{item.name}</Text>
    <Text style={styles1.expense}>Spent: ${item.expense}</Text>
    <Text style={styles1.limit}>Limit: ${item.limit}</Text>
  </View>
);

// const TransactionSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   amount: Yup.number()
//     .typeError('Amount must be a number')
//     .positive('Amount must be positive')
//     .required('Amount is required'),
//   type: Yup.string().oneOf(['income', 'expense']).required(),
// });

export default function Test123() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = values => {
    console.log('Transaction Saved:line 66 in Home.jsx', values);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 48 }} />
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={{ width: 48, alignItems: 'center' }}>
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Main Scroll */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Total Expenses Circle */}
        <ExpenseCircle />

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <CategoryItem icon="🍔" title="Food" spent="350" />
        <CategoryItem icon="🚗" title="Transportation" spent="200" />
        <CategoryItem icon="🎬" title="Entertainment" spent="150" />

        {/* for rander the category  */}
        <View style={styles1.container}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/* Recent Expenses */}
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        <RecentExpenseItem name="Fresh Market" type="Grocery" amount="50" />
        <RecentExpenseItem
          name="The Italian Place"
          type="Restaurant"
          amount="75"
        />
        <RecentExpenseItem name="Uber" type="Transportation" amount="25" />
      </ScrollView>

      {/* Floating Add Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabButton}>
          <Text style={styles.iconText} onPress={() => setModalVisible(true)}>
            ➕
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Transaction</Text>

            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />

          
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'income' && styles.typeSelected,
                ]}
                onPress={() => setType('income')}
              >
                <Text style={styles.typeText}>Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'expense' && styles.typeSelected,
                ]}
                onPress={() => setType('expense')}
              >
                <Text style={styles.typeText}>Expense</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#4a90e2' }]}
                onPress={handleSave}
              >
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}
const styles1 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7', padding: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  expense: { fontSize: 14, color: '#e63946' },
  limit: { fontSize: 14, color: '#457b9d' },
});

// export interface Budget {
//   id: string;
//   userId: string;
//   categoryId: string;
//   limit: number;          // monthly budget
//   period: 'monthly' | 'weekly';
//   startDate: Date;
//   endDate: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }