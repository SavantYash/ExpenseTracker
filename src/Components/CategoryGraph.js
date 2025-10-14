import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';

export default function CategoryGraph() {
  const screenWidth = Dimensions.get('window').width;

  // Static data: 3 categories per month (e.g., Food, Rent, Transport)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    legend: ['Food', 'Rent', 'Transport'],
    data: [
      [500, 1000, 300], // Jan
      [600, 950, 400],  // Feb
      [450, 1200, 350], // Mar
      [700, 1100, 500], // Apr
      [650, 1000, 450], // May
      [720, 1050, 400], // Jun
    ],
    barColors: ['#f94144', '#f3722c', '#43aa8b'], // Food, Rent, Transport
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Expense by Category</Text>
        <StackedBarChart
          data={data}
          width={screenWidth - 20}
          height={250}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ borderRadius: 16, marginVertical: 8 }}
          hideLegend={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', marginTop: 20 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
});
