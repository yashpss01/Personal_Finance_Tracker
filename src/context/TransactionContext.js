import React, { createContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionContext = createContext();

const INIT_STATE = {
    transactions: []
};

const reducer = (state, action) => {
    if (action.type === 'LOAD') {
        return { ...state, transactions: action.payload };
    }

    if (action.type === 'ADD') {
        const newTx = action.payload;
        return {
            ...state,
            transactions: [newTx, ...state.transactions]
        };
    }

    if (action.type === 'DEL') {
        const id = action.payload;
        return {
            ...state,
            transactions: state.transactions.filter(x => x.id !== id)
        };
    }

    return state;
};

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const raw = await AsyncStorage.getItem('transactions');
                if (raw) {
                    const data = JSON.parse(raw);
                    dispatch({ type: 'LOAD', payload: data });
                }
            } catch (err) {
                // console.log(err);
            } finally {
                setReady(true);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        if (!ready) return;

        const sync = async () => {
            try {
                const json = JSON.stringify(state.transactions);
                await AsyncStorage.setItem('transactions', json);
            } catch (err) {
                console.log("Error syncing data");
            }
        };

        sync();
    }, [state.transactions, ready]);

    const addTransaction = (tx) => {
        dispatch({ type: 'ADD', payload: tx });
    };

    const deleteTransaction = (id) => {
        dispatch({ type: 'DEL', payload: id });
    };

    return (
        <TransactionContext.Provider value={{
            transactions: state.transactions,
            addTransaction,
            deleteTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
