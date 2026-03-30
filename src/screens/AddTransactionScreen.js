import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, SegmentedButtons, Chip, Text, useTheme, Appbar, Portal, Dialog } from 'react-native-paper';
import { TransactionContext } from '../context/TransactionContext';

const EXP_CATS = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];
const INC_CATS = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction, customCategories, addCustomCategory } = useContext(TransactionContext);
  const theme = useTheme();

  const [amt, setAmt] = useState('');
  const [desc, setDesc] = useState('');
  const [txType, setTxType] = useState('Expense');
  const [cat, setCat] = useState('');

  const [dialogVisible, setDialogVisible] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const defaultList = txType === 'Expense' ? EXP_CATS : INC_CATS;
  const customList = customCategories && customCategories[txType] ? customCategories[txType] : [];
  
  // Combine uniquely 
  const list = [...new Set([...defaultList, ...customList])];

  const submit = () => {
    if (!amt || !cat) {
      Alert.alert('Missing Info', 'Please enter an amount and select a category.');
      return;
    }

    const val = parseFloat(amt);
    if (isNaN(val) || val <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
      return;
    }

    const tx = {
      id: Math.random().toString(36).substr(2, 9),
      amount: val.toFixed(2),
      description: desc.trim().length > 0 ? desc.trim() : 'No Description',
      type: txType,
      category: cat,
      date: new Date().toLocaleDateString(),
    };

    addTransaction(tx);

    setAmt('');
    setDesc('');
    setCat('');

    navigation.goBack();
  };

  const handleAddCustom = async () => {
    if (!newCatName.trim()) return;
    
    // Optimistic UI update: Close dialog and select category immediately
    const catName = newCatName.trim();
    setCat(catName);
    setDialogVisible(false);
    setNewCatName('');

    try {
      await addCustomCategory(txType, catName);
    } catch (e) {
      Alert.alert('Error', 'Failed to save new category');
    }
  };

  return (
    <View style={[styles.main, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Transaction" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>

          <SegmentedButtons
            value={txType}
            onValueChange={setTxType}
            buttons={[
              { value: 'Expense', label: 'Expense', icon: 'arrow-up-circle' },
              { value: 'Income', label: 'Income', icon: 'arrow-down-circle' },
            ]}
            style={styles.tabs}
          />

          <TextInput
            label="Amount"
            value={amt}
            onChangeText={setAmt}
            keyboardType="numeric"
            mode="outlined"
            style={styles.field}
            left={<TextInput.Affix text="₹" />}
          />

          <TextInput
            label="Description (Optional)"
            value={desc}
            onChangeText={setDesc}
            mode="outlined"
            style={styles.field}
          />

          <Text variant="titleMedium" style={styles.lbl}>Category</Text>
          <View style={styles.chips}>
            {list.map((c) => (
              <Chip
                key={c}
                selected={cat === c}
                onPress={() => setCat(c)}
                style={styles.chip}
                showSelectedOverlay
              >
                {c}
              </Chip>
            ))}
            <Chip
              icon="plus"
              mode="outlined"
              onPress={() => setDialogVisible(true)}
              style={styles.chip}
            >
              Add Custom
            </Chip>
          </View>

          <Button
            mode="contained"
            onPress={submit}
            style={styles.btn}
            contentStyle={{ paddingVertical: 8 }}
          >
            Save Transaction
          </Button>

        </ScrollView>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>New {txType} Category</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Category Name"
              value={newCatName}
              onChangeText={setNewCatName}
              mode="outlined"
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleAddCustom} disabled={!newCatName.trim()}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  tabs: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
    backgroundColor: 'transparent'
  },
  lbl: {
    marginBottom: 12,
    marginTop: 8,
    fontWeight: 'bold'
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32
  },
  chip: {
    marginBottom: 4,
  },
  btn: {
    borderRadius: 12,
    marginTop: 'auto'
  }
});