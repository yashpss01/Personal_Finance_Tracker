import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform, Modal, FlatList } from 'react-native';
import { 
  Appbar, 
  TextInput, 
  Button, 
  RadioButton, 
  Text, 
  Card,
  Title,
  TouchableRipple,
  List,
  Divider
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTransactionScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  
  // Predefined categories
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'];
  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other Expense'];
  
  const getCurrentCategories = () => {
    return type === 'income' ? incomeCategories : expenseCategories;
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(''); // Reset category when type changes
  };

  const handleSave = () => {
    if (!amount || !category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Transaction Saved!');
    // Reset form
    setAmount('');
    setCategory('');
    setType('expense');
    setDate(new Date());
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Add Transaction" />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Transaction Details</Title>
            
            <TextInput
              label="Amount (₹)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="currency-inr" />}
            />

            <View style={styles.radioSection}>
              <Text style={styles.radioTitle}>Type</Text>
              <RadioButton.Group onValueChange={handleTypeChange} value={type}>
                <TouchableRipple onPress={() => handleTypeChange('income')}>
                  <View style={styles.radioItem}>
                    <RadioButton value="income" />
                    <Text style={styles.radioLabel}>Income</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => handleTypeChange('expense')}>
                  <View style={styles.radioItem}>
                    <RadioButton value="expense" />
                    <Text style={styles.radioLabel}>Expense</Text>
                  </View>
                </TouchableRipple>
              </RadioButton.Group>
            </View>

            <TouchableRipple onPress={() => setCategoryModalVisible(true)}>
              <TextInput
                label="Category"
                value={category}
                mode="outlined"
                style={styles.input}
                editable={false}
                right={<TextInput.Icon icon="chevron-down" />}
                left={<TextInput.Icon icon="tag" />}
              />
            </TouchableRipple>

            <TouchableRipple onPress={() => setShowDatePicker(true)}>
              <TextInput
                label="Date"
                value={date.toLocaleDateString()}
                mode="outlined"
                style={styles.input}
                editable={false}
                left={<TextInput.Icon icon="calendar" />}
              />
            </TouchableRipple>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          contentStyle={styles.saveButtonContent}
        >
          Save Transaction
        </Button>
      </ScrollView>

      {/* Category Selection Modal */}
      <Modal
        visible={categoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Card>
              <Card.Content>
                <Title style={styles.modalTitle}>
                  Select {type === 'income' ? 'Income' : 'Expense'} Category
                </Title>
                <Divider style={styles.modalDivider} />
                <FlatList
                  data={getCurrentCategories()}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <List.Item
                      title={item}
                      onPress={() => {
                        setCategory(item);
                        setCategoryModalVisible(false);
                      }}
                      left={(props) => <List.Icon {...props} icon="tag" />}
                      style={styles.categoryItem}
                    />
                  )}
                />
                <Button
                  mode="outlined"
                  onPress={() => setCategoryModalVisible(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              </Card.Content>
            </Card>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#6200ee',
  },
  input: {
    marginBottom: 16,
  },
  radioSection: {
    marginBottom: 16,
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 16,
    marginBottom: 32,
  },
  saveButtonContent: {
    paddingVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '70%',
  },
  modalTitle: {
    textAlign: 'center',
    color: '#6200ee',
    marginBottom: 8,
  },
  modalDivider: {
    marginBottom: 16,
  },
  categoryItem: {
    paddingVertical: 4,
  },
  cancelButton: {
    marginTop: 16,
  },
});
