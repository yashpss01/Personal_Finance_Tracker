import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Alert, Platform, Modal, FlatList } from 'react-native'
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
} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function AddTransactionScreen() {
  const [money, setMoney] = useState('')
  const [picked, setPicked] = useState('')
  const [kind, setKind] = useState('expense')
  const [when, setWhen] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [showList, setShowList] = useState(false)
  
  const earnList = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income']
  const spendList = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other Expense']
  
  function getList() {
    return kind === 'income' ? earnList : spendList
  }

  function pickDate(event, newDate) {
    const chosenDate = newDate || when
    setShowPicker(Platform.OS === 'ios')
    setWhen(chosenDate)
  }

  function changeKind(newKind) {
    setKind(newKind)
    setPicked('')
  }

  function saveMoney() {
    if (!money || !picked) {
      Alert.alert('Missing Info', 'Please fill all fields')
      return
    }
    Alert.alert('Done!', 'Money saved!')
    setMoney('')
    setPicked('')
    setKind('expense')
    setWhen(new Date())
  }

  function openList() {
    setShowList(true)
  }

  function closeList() {
    setShowList(false)
  }

  function pickItem(item) {
    setPicked(item)
    closeList()
  }

  function openDate() {
    setShowPicker(true)
  }

  return (
    <View style={styles.main}>
      <Appbar.Header>
        <Appbar.Content title="Add Money" />
      </Appbar.Header>
      
      <ScrollView style={styles.body}>
        <Card style={styles.box}>
          <Card.Content>
            <Title style={styles.title}>Money Details</Title>
            
            <TextInput
              label="Amount (₹)"
              value={money}
              onChangeText={setMoney}
              keyboardType="numeric"
              mode="outlined"
              style={styles.field}
              left={<TextInput.Icon icon="currency-inr" />}
            />

            <View style={styles.radio}>
              <Text style={styles.label}>Type</Text>
              <RadioButton.Group onValueChange={changeKind} value={kind}>
                <TouchableRipple onPress={() => changeKind('income')}>
                  <View style={styles.item}>
                    <RadioButton value="income" />
                    <Text style={styles.text}>Earn</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => changeKind('expense')}>
                  <View style={styles.item}>
                    <RadioButton value="expense" />
                    <Text style={styles.text}>Spend</Text>
                  </View>
                </TouchableRipple>
              </RadioButton.Group>
            </View>

            <TouchableRipple onPress={openList}>
              <TextInput
                label="Category"
                value={picked}
                mode="outlined"
                style={styles.field}
                editable={false}
                right={<TextInput.Icon icon="chevron-down" />}
                left={<TextInput.Icon icon="tag" />}
              />
            </TouchableRipple>

            <TouchableRipple onPress={openDate}>
              <TextInput
                label="Date"
                value={when.toLocaleDateString()}
                mode="outlined"
                style={styles.field}
                editable={false}
                left={<TextInput.Icon icon="calendar" />}
              />
            </TouchableRipple>

            {showPicker && (
              <DateTimePicker
                value={when}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={pickDate}
              />
            )}
          </Card.Content>
        </Card>

        <Button mode="contained" onPress={saveMoney} style={styles.save}>
          Save Money
        </Button>
      </ScrollView>

      <Modal
        visible={showList}
        onRequestClose={closeList}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.back}>
          <View style={styles.popup}>
            <Card>
              <Card.Content>
                <Title style={styles.head}>
                  Pick {kind === 'income' ? 'Earn' : 'Spend'} Type
                </Title>
                <Divider style={styles.line} />
                <FlatList
                  data={getList()}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <List.Item
                      title={item}
                      onPress={() => pickItem(item)}
                      left={(props) => <List.Icon {...props} icon="tag" />}
                      style={styles.pick}
                    />
                  )}
                />
                <Button mode="outlined" onPress={closeList} style={styles.cancel}>
                  Cancel
                </Button>
              </Card.Content>
            </Card>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  body: {
    flex: 1,
    padding: 16
  },
  box: {
    marginBottom: 16,
    elevation: 2
  },
  title: {
    marginBottom: 16,
    color: '#6200ee'
  },
  field: {
    marginBottom: 16
  },
  radio: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  text: {
    marginLeft: 8,
    fontSize: 16
  },
  save: {
    marginTop: 16,
    marginBottom: 32
  },
  back: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  popup: {
    width: '100%',
    maxHeight: '70%'
  },
  head: {
    textAlign: 'center',
    color: '#6200ee',
    marginBottom: 8
  },
  line: {
    marginBottom: 16
  },
  pick: {
    paddingVertical: 4
  },
  cancel: {
    marginTop: 16
  }
})