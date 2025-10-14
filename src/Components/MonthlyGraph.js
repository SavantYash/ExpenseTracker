import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function MonthlyGraph() {
  const screenWidth = Dimensions.get('window').width;

  // Static data for 6 months
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [5000, 6000, 5500, 7000, 6500, 7200], // income
        color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`, // green
        strokeWidth: 2,
        label: 'Income',
      },
      {
        data: [2000, 2500, 2200, 3000, 2800, 3500], // expense
        color: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`, // red
        strokeWidth: 2,
        label: 'Expense',
      },
    ],
    legend: ['Income', 'Expense'],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Income vs Expense</Text>
        <LineChart
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
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#000',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', marginTop: 20 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
});
