import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Appbar, Text, useTheme, Card, SegmentedButtons } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { TransactionContext } from '../context/TransactionContext';

export default function Analytics() {
    const { transactions } = useContext(TransactionContext);
    const theme = useTheme();
    const width = Dimensions.get('window').width;

    const [mode, setMode] = useState('All');

    const filter = () => {
        if (mode === 'All') return transactions;

        const now = new Date();
        const m = now.getMonth();
        const y = now.getFullYear();

        return transactions.filter(t => {
            // Priority: Use the reliable Firebase ISO string. 
            // Fallback: Use the localized date string for older offline entries.
            const d = new Date(t.createdAt || t.date);
            
            if (!isNaN(d.getTime())) {
                return d.getMonth() === m && d.getFullYear() === y;
            }

            // Ultimate fallback for custom locale string like DD/MM/YYYY failing Date parse
            if (t.date && t.date.includes('/')) {
                const p = t.date.split('/');
                if (p.length === 3) {
                    // Assuming DD/MM/YYYY format based on JS engine failure
                    return parseInt(p[1]) - 1 === m && parseInt(p[2]) === y;
                }
            }
            return false;
        });
    };

    const list = filter();

    const agg = (type) => {
        const sub = list.filter(t => t.type === type);
        return sub.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = 0;
            acc[curr.category] += parseFloat(curr.amount);
            return acc;
        }, {});
    };

    const expData = agg('Expense');
    const incData = agg('Income');

    const EXP_COLORS = [
        '#D32F2F', '#FF5722', '#C2185B',
        '#E64A19', '#F44336', '#880E4F',
        '#BF360C', '#FF1744', '#D81B60', '#FF3D00'
    ];

    const INC_COLORS = [
        '#388E3C', '#009688', '#689F38',
        '#00796B', '#4CAF50', '#33691E',
        '#004D40', '#00E676', '#1DE9B6', '#2E7D32'
    ];

    const prep = (data, colors) => {
        return Object.keys(data).map((k, i) => {
            return {
                name: k,
                population: data[k],
                color: colors[i % colors.length],
                legendFontColor: theme.colors.onSurface,
                legendFontSize: 12
            };
        });
    };

    const expPie = prep(expData, EXP_COLORS);
    const incPie = prep(incData, INC_COLORS);

    return (
        <View style={[styles.main, { backgroundColor: theme.colors.background }]}>
            <Appbar.Header>
                <Appbar.Content title="Analytics" />
            </Appbar.Header>

            <View style={styles.top}>
                <SegmentedButtons
                    value={mode}
                    onValueChange={setMode}
                    buttons={[
                        { value: 'All', label: 'All Time' },
                        { value: 'Month', label: 'This Month' },
                    ]}
                />
            </View>

            <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 40 }}>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.title}>Expenses ({mode})</Text>
                        {expPie.length > 0 ? (
                            <PieChart
                                data={expPie}
                                width={width - 64}
                                height={220}
                                chartConfig={{
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                absolute
                            />
                        ) : (
                            <Text style={styles.empty}>No data</Text>
                        )}
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.title}>Income ({mode})</Text>
                        {incPie.length > 0 ? (
                            <PieChart
                                data={incPie}
                                width={width - 64}
                                height={220}
                                chartConfig={{
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                absolute
                            />
                        ) : (
                            <Text style={styles.empty}>No data</Text>
                        )}
                    </Card.Content>
                </Card>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    top: {
        padding: 16,
        paddingBottom: 0,
    },
    body: {
        padding: 16
    },
    card: {
        marginBottom: 16,
        elevation: 2,
        borderRadius: 16
    },
    title: {
        textAlign: 'center',
        marginBottom: 12,
        fontWeight: 'bold'
    },
    empty: {
        textAlign: 'center',
        marginVertical: 20,
        color: 'gray'
    }
});
