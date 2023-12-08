import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/budgetSlice';
import { Picker } from '@react-native-picker/picker';



const BudgetEntryScreen = ({ navigation }) => {
    const [name, setName] = useState(''); 
    const [planned, setPlanned] = useState('');
    const [actual, setActual] = useState('');
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState('');

    const items = useSelector((state) => state.budget.items);

    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
    };



    const saveItem = () => {
        const numberRegex = /^[0-9]*\.?[0-9]+$/; // Regular expression to allow only numbers and decimals

        if (name && planned && actual) {

            const itemExists = items.some(item => item.name === name);
            if (itemExists) {
                setSnackbarContent('Item with the same name already exists.');
                setVisible(true);
                return;
            }
            if (!numberRegex.test(planned)) {
                setSnackbarContent('Planned amount must be a valid positive number.');
                setVisible(true);
                return;
            }
            if (!numberRegex.test(actual)) {
                setSnackbarContent('Actual amount must be a valid positive number.');
                setVisible(true);
                return;
            }

            const plannedFloat = parseFloat(planned);
            const actualFloat = parseFloat(actual);

            if (actualFloat > plannedFloat) {
                setSnackbarContent('Actual amount cannot be greater than planned amount.');
                setVisible(true);
                return;
            }

            // Formatting the numbers as currency before saving
            const formattedPlanned = `$${plannedFloat.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            const formattedActual = `$${actualFloat.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

            dispatch(addItem({ id: generateId(), name, planned: formattedPlanned, actual: formattedActual }));
            setName('');
            setPlanned('');
            setActual('');

            setSnackbarContent('Item saved successfully!');
            setVisible(true);


        } else {
            setSnackbarContent('Please fill in all fields.');
            setVisible(true);
        }
    };


    return (

        <ImageBackground source={require('../../assets/backgt.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>

                <Image
                    source={require('../../assets/budg.png')} 
                    style={styles.headerImage}
                />
                <Picker
                    selectedValue={name}
                    onValueChange={(itemValue) => setName(itemValue)}
                    style={styles.picker}
                    itemStyle={{ color: '#fff' }} // Added itemStyle to make the text white
                >


                    <Picker.Item label="Select Item" value="" />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Education" value="Education" />
                    <Picker.Item label="Grocery" value="Grocery" />
                    <Picker.Item label="Entertainment" value="Entertainment" />
                    <Picker.Item label="Health & Wellness" value="Health & Wellness" />
                    <Picker.Item label="Travel" value="Travel" />
                    <Picker.Item label="Dining" value="Dining" />
                    <Picker.Item label="Shopping" value="Shopping" />
                    <Picker.Item label="Utilities" value="Utilities" />
                    <Picker.Item label="Automobile" value="Automobile" />
                    <Picker.Item label="Technology" value="Technology" />
                    <Picker.Item label="Housing" value="Housing" />
                    <Picker.Item label="Investments" value="Investments" />
                    <Picker.Item label="Savings" value="Savings" />
                    <Picker.Item label="Clothing" value="Clothing" />
                    <Picker.Item label="Insurance" value="Insurance" />
                    <Picker.Item label="Loans" value="Loans" />
                    <Picker.Item label="Gifts & Donations" value="Gifts & Donations" />
                    <Picker.Item label="Personal Care" value="Personal Care" />
                    <Picker.Item label="Pets" value="Pets" />
                    <Picker.Item label="Books" value="Books" />
                    <Picker.Item label="Music" value="Music" />
                    <Picker.Item label="Movies & Series" value="Movies & Series" />
                    <Picker.Item label="Games" value="Games" />
                    <Picker.Item label="Others" value="Others" />
                </Picker>



                <View style={styles.inputWrapper}>
                    <Image
                        source={require('../../assets/dlr.png')}
                        style={styles.iconStyle}
                    />
                    <TextInput
                        label="Planned Amount"
                        value={planned}
                        onChangeText={setPlanned}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#fff"
                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Image
                        source={require('../../assets/dlr.png')}
                        style={styles.iconStyle}
                    />
                    <TextInput
                        label="Actual Amount"
                        value={actual}
                        onChangeText={setActual}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#fff"
                        theme={{ colors: { text: '#fff', placeholder: '#fff', primary: '#fff' } }}
                    />
                </View>


                <TouchableOpacity style={styles.button} onPress={saveItem} >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <Button

                    mode="outlined"

                    onPress={() => navigation.navigate('BudgetEntryListing')}
                    style={styles.showItemsButton}
                >
                    <Text style={styles.buttonText}>Show Items</Text>
                </Button>




                <View style={styles.snackbarContainer}>
                    <Snackbar
                        visible={visible}
                        onDismiss={() => setVisible(false)}
                        action={{
                            label: 'Okay',
                            onPress: () => setVisible(false),
                        }}
                    >
                        {snackbarContent}
                    </Snackbar>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    picker: {
        height: 58,
        width: '90%',
        marginBottom: 20,

        borderWidth: 1,

        paddingLeft: 10,
        backgroundColor: '#9b59b6', // Added a white background for better visibility
        elevation: 2, 
        opacity: 0.8,
        height: 50, // Adjusted for better visibility
        width: '90%',
        color: '#fff', 
    },

    button: {
        backgroundColor: '#FF5733',
        padding: 15, // Increased padding
        borderRadius: 10, // Rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5, 
        width: '90%',

    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    showItemsButton: {
        borderColor: '#fff',
        borderWidth: 2, // Made border thicker
        borderRadius: 10, 
        padding: 10, 
        marginBottom: 20, 

        width: "90%",
        color: '#fff',

        fontWeight: 'bold',

        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    snackbar: {
        backgroundColor: '#FF5733', 
        color: '#fff', 
    },
    snackbarContainer: {
        position: 'absolute',
        bottom: 10, 
        left: 20, 
        right: 0,
    },
    backgroundImage: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',  
        alignItems: 'center',     
        marginTop: '10%'
    },

    headerImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        opacity: 0.8,
        borderColor: '#000000',
        borderWidth: 1,


    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFD700',
        borderRadius: 10,
        width: "90%",
        opacity: 0.8,
    },

    iconStyle: {
        position: 'absolute',
        left: 10,
        zIndex: 1,
        width: 24,
        height: 24,
        opacity: 0.9
    },

    input: {
        paddingLeft: 40,
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    }

});


export default BudgetEntryScreen;


















































