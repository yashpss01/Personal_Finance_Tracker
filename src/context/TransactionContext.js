import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

export const TransactionContext = createContext();

const INIT_STATE = {
    transactions: []
};

const reducer = (state, action) => {
    if (action.type === 'LOAD') {
        return { ...state, transactions: action.payload };
    }
    

    return state;
};

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            dispatch({ type: 'LOAD', payload: [] });
            return;
        }

        // Query transactions ordered by created time descending
        const q = query(
            collection(db, `users/${user.uid}/transactions`),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id // use firestore doc id or the one mapped
            }));
            dispatch({ type: 'LOAD', payload: data });
        });

        return () => unsubscribe();
    }, [user]);

    const addTransaction = async (tx) => {
        if (!user) return;
        try {

            await setDoc(doc(db, `users/${user.uid}/transactions`, tx.id), {
                ...tx,
                createdAt: new Date().toISOString() // add timestamp for sorting
            });
        } catch (err) {
            console.error("Error adding transaction", err);
        }
    };

    const deleteTransaction = async (id) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, `users/${user.uid}/transactions`, id));
        } catch (err) {
            console.error("Error deleting transaction", err);
        }
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
