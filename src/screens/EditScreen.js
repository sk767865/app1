import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { editItem } from '../redux/budgetSlice';

import { Snackbar } from 'react-native-paper';  


const EditItemScreen = ({ navigation }) => {
    const selectedItem = useSelector((state) => state.budget.selectedItem);

    const dispatch = useDispatch();
    const [planned, setPlanned] = useState('');
    const [actual, setActual] = useState('');
    const [visible, setVisible] = useState(false);



    useEffect(() => {
        if (selectedItem) {
            // Removing '$' and comma when fetching data
            setPlanned(selectedItem.planned.toString().replace(/[$,]/g, ''));
            setActual(selectedItem.actual.toString().replace(/[$,]/g, ''));
        }
    }, [selectedItem]);

    const handleSave = () => {
        const numberRegex = /^[0-9]*\.?[0-9]+$/; // Regular expression to allow only numbers and decimals

        if (planned === '' || actual === '') {
            Alert.alert("Invalid Input", "Planned and Actual amounts are required.");
            return;
        }

        if (!numberRegex.test(planned)) {
            Alert.alert("Invalid Input", "Planned amount must be a valid positive number.");
            return;
        }

        if (!numberRegex.test(actual)) {
            Alert.alert("Invalid Input", "Actual amount must be a valid positive number.");
            return;
        }

        const plannedFloat = parseFloat(planned);
        const actualFloat = parseFloat(actual);

        if (actualFloat > plannedFloat) {
            Alert.alert("Invalid Input", "Actual amount cannot be greater than planned amount.");
            return;
        }

        // Add '$' and comma before saving
        const formattedPlanned = `$${plannedFloat.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        const formattedActual = `$${actualFloat.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

        const updatedItem = { ...selectedItem, planned: formattedPlanned, actual: formattedActual };
        dispatch(editItem(updatedItem));
        
        setVisible(true);


        setTimeout(() => {
            navigation.goBack();
        }, 1000);  
    };

    return (
        <ImageBackground source={require('../../assets/backgt.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Edit Item</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.disabledInput, styles.boldText]}
                        value={selectedItem?.name}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        value={planned}
                        onChangeText={setPlanned}
                        placeholder="Planned"
                        placeholderTextColor="#ccc"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={actual}
                        onChangeText={setActual}
                        placeholder="Actual"
                        placeholderTextColor="#ccc"
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={Snackbar.DURATION_SHORT}
            >
                Updated Successfully
            </Snackbar>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        margin: 20,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 30,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        padding: 8,
        fontSize: 18,
        color: '#333',
    },
    disabledInput: {
        borderBottomColor: 'grey',
    },
    boldText: {
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
    }
});

export default EditItemScreen;
