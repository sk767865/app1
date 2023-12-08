import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: { items: [] },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        editItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteItem: (state, action) => {
            // Used filter to remove the item with the specific ID
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
});

export const { addItem, editItem, deleteItem, setSelectedItem } = budgetSlice.actions;
export const selectItems = (state) => state.budget.items;
export default budgetSlice.reducer;
