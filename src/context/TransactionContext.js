import React, { createContext, useReducer, useEffect, useContext, useState } from 'react';
import { db } from '../config/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, arrayUnion } from 'firebase/firestore';
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
    const [customCategories, setCustomCategories] = useState({ Expense: [], Income: [] });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            dispatch({ type: 'LOAD', payload: [] });
            setCustomCategories({ Expense: [], Income: [] });
            return;
        }

        // Listener for custom categories from User profile
        const unsubUser = onSnapshot(doc(db, `users`, user.uid), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.categories) {
                    setCustomCategories({
                        Expense: data.categories.Expense || [],
                        Income: data.categories.Income || []
                    });
                }
            }
        });

        // Query transactions ordered by created time descending
        const q = query(
            collection(db, `users/${user.uid}/transactions`),
            orderBy('createdAt', 'desc')
        );

        const unsubTx = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id 
            }));
            dispatch({ type: 'LOAD', payload: data });
        }, (error) => {
            console.error("Firestore Snapshot Error:", error.message);
        });

        return () => {
            unsubUser();
            unsubTx();
        };
    }, [user]);

    const addTransaction = async (tx) => {
        if (!user) return;
        try {
            await setDoc(doc(db, `users/${user.uid}/transactions`, tx.id), {
                ...tx,
                createdAt: new Date().toISOString()
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

    const addCustomCategory = async (type, name) => {
        if (!user || !name.trim()) return;
        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                categories: {
                    [type]: arrayUnion(name.trim())
                }
            }, { merge: true });
        } catch (err) {
            console.error("Error adding custom category", err);
        }
    };

    return (
        <TransactionContext.Provider value={{
            transactions: state.transactions,
            customCategories,
            addTransaction,
            deleteTransaction,
            addCustomCategory
        }}>
            {children}
        </TransactionContext.Provider>
    );
};
