import React, { useState, forwardRef } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, deleteItem, setSelectedItem } from '../redux/budgetSlice';
import { Card, Snackbar } from 'react-native-paper';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const BudgetEntryListingScreen = () => {
    const items = useSelector(selectItems);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const handleEdit = (item) => {
        dispatch(setSelectedItem(item));
        navigation.navigate('EditItem');
    };

    const handleDelete = (id) => {
        dispatch(deleteItem({ id }));
        setVisible(true);
    };

    const renderRightAction = (progress, dragX, id) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: 'clamp',
        });

        return (
            <RectButton onPress={() => handleDelete(id)} style={styles.deleteButton}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <MaterialCommunityIcons name="delete" size={28} color="#fff" />
                </Animated.View>
            </RectButton>
        );
    };

    const CardRef = forwardRef((props, ref) => (
        <Card ref={ref} {...props} />
    ));

    return (
        <ImageBackground source={require('../../assets/backgt.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Swipeable
                            renderRightActions={(progress, dragX) => renderRightAction(progress, dragX, item.id)}
                        >
                            <CardRef style={styles.card}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.text}>
                                        {item.name}: Planned - {item.planned}, Actual - {item.actual}
                                    </Text>
                                    <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editIcon}>
                                        <MaterialCommunityIcons name="pencil" size={24} color="#333" />
                                    </TouchableOpacity>
                                </View>
                            </CardRef>
                        </Swipeable>
                    )}
                />
                <View style={styles.snackbarContainer}>
                    <Snackbar
                        style={styles.snackbar}
                        visible={visible}
                        onDismiss={() => setVisible(false)}
                        action={{
                            label: 'OK',
                            onPress: () => setVisible(false),
                        }}
                    >
                        Item deleted
                    </Snackbar>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    cardContent: {
        padding: 15,
        borderRadius: 15,
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5733',
        height: '100%',
        width: 70,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    snackbar: {
        backgroundColor: '#333',
    },
    snackbarContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 0,
    },
    editIcon: {
        position: 'absolute',
        right: 1,
        top: 1,
    }
});

export default BudgetEntryListingScreen;
