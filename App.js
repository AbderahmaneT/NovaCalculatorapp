import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

export default function App() {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('light');
  const [toastConfig, setToastConfig] = useState(null);

  useEffect(() => {
    if (toastConfig) {
      Toast.show({
        type: toastConfig.type,
        position: 'bottom',
        text1: toastConfig.text1,
        text2: toastConfig.text2,
        visibilityTime: 1000,
      });
      setToastConfig(null);
    }
  }, [toastConfig]);

  const showToast = (type, text1, text2) => {
    setToastConfig({ type, text1, text2 });
  };

  const handleButtonPress = (value) => {
    if (value === '.' && (input === '' || input.includes('.'))) {
      showToast('error', 'Error', 'Invalid use of dot.');
    } else if (input === '' && ['+', '-', '×', '÷', '%'].includes(value)) {
      showToast('error', 'Error', 'Expression cannot start with an operator.');
    } else {
      const lastChar = input.slice(-1);
      const isLastCharOperator = ['+', '-', '×', '÷', '%'].includes(lastChar);
  
      if (isLastCharOperator && value === '.') {
        showToast('error', 'Error', 'Invalid use of dot after an operator.');
      } else if (isLastCharOperator && ['+', '-', '×', '÷', '%'].includes(value)) {
        showToast('error', 'Error', 'Cannot enter two operators consecutively.');
      } else {
        setInput((prevInput) => prevInput + value);
      }
    }
  };
  
  const handleClear = () => {
    setInput('');
  };

  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const expression = input.replace(/×/g, '*').replace(/÷/g, '/');

      if (['+', '-', '*', '/', '%'].includes(expression.slice(-1))) {
        showToast('error', 'Error', 'Cannot end expression with an operator.');
        return;
      }

      setInput(eval(expression).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 20,
      justifyContent: 'space-between',
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom:16,
    },
    headertext: {
      fontSize: 30,
      color: theme === 'light' ? '#000000' : '#FFFFFF',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    button: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#dcdcdc' : '#5d5d5d',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      marginHorizontal: 4,
      aspectRatio: 1, 
    },
    buttonText: {
      fontSize: 35,
      color: theme === 'light' ? '#000000' : '#FFFFFF',
    },
    operationButton: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#dcdcdc' : '#5d5d5d',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      marginHorizontal: 4,
      aspectRatio: 1, 
    },
    operationButtonText: {
      fontSize: 35,
      color: '#09f60a',
    },
    equalButton: {
      flex: 1,
      backgroundColor: '#09f60a',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      paddingVertical:6,
      marginHorizontal: 4,

    },
    equalButtonText: {
      fontSize: 35,
      color: '#ffffff',
    },
    input: {
      fontSize: 32,
      marginBottom: 16,
      textAlign: 'right',
      color: theme === 'light' ? '#000000' : '#FFFFFF',
      paddingHorizontal: 16,
    },
    clearButton: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#dcdcdc' : '#5d5d5d',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      marginHorizontal: 4,
      aspectRatio: 1, 
    },
    clearButtonText: {
      fontSize: 35,
      color: '#e0001a', 
    },
    deleteButton: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#dcdcdc' : '#5d5d5d',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      paddingVertical:6,
      marginHorizontal: 4,
    },
    deleteButtonText: {
      fontSize: 24,
      color: '#e0001a', 
    },
    hrline: {
      height: 1,
      backgroundColor: theme === 'light' ? '#dcdcdc' : '#5d5d5d',
      marginHorizontal: 16,
      marginBottom:16,
    },
    sunIcon: {
      color: '#FFD700', 
      fontSize: 30,
      marginRight: 5,
    },
    moonIcon: {
      color: '#696969', 
      fontSize: 30,
      marginRight: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertext}>NOVAcalc</Text>
        <TouchableOpacity onPress={toggleTheme} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {theme === 'light' ? (
            <>
              <FontAwesomeIcon name="sun-o" style={styles.sunIcon} />
              <Text style={{ color: '#FFD700', fontSize: 18 }}>Light</Text>
            </>
          ) : (
            <>
              <FontAwesomeIcon name="moon-o" style={styles.moonIcon} />
              <Text style={{ color: '#696969', fontSize: 18 }}>Dark</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.input}>{input}</Text>
      <View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.equalButton} onPress={handleCalculate}>
          <Text style={styles.equalButtonText}>=</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hrline} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('(')}>
            <Text style={styles.operationButtonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress(')')}>
            <Text style={styles.operationButtonText}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('%')}>
            <Text style={styles.operationButtonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('÷')}>
            <Text style={styles.operationButtonText}>÷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('×')}>
            <Text style={styles.operationButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('-')}>
            <Text style={styles.operationButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operationButton} onPress={() => handleButtonPress('+')}>
            <Text style={styles.operationButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}  onPress={handleDelete}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 48 48">
              <Path fill="none" d="M0 0h48v48H0z"/>
              <Path d="M44 6H14c-1.38 0-2.47.7-3.19 1.76L0 23.99l10.81 16.23C11.53 41.28 12.62 42 14 42h30c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-6 25.17L35.17 34 28 26.83 20.83 34 18 31.17 25.17 24 18 16.83 20.83 14 28 21.17 35.17 14 38 16.83 30.83 24 38 31.17z"/>
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}