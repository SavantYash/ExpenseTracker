import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "./Styles.js"; // 👈 external style import

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

export default function Test123() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 48 }} />
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={{ width: 48, alignItems: "center" }}>
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
          <Text style={styles.iconText}>➕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
