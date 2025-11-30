import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, List, Switch, useTheme, Divider, Text } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    const theme = useTheme();

    return (
        <View style={[styles.main, { backgroundColor: theme.colors.background }]}>
            <Appbar.Header>
                <Appbar.Content title="Settings" />
            </Appbar.Header>

            <View style={styles.body}>
                <List.Section>
                    <List.Subheader>Look</List.Subheader>
                    <List.Item
                        title="Dark Mode"
                        left={() => <List.Icon icon="theme-light-dark" />}
                        right={() => <Switch value={isDarkTheme} onValueChange={toggleTheme} />}
                    />
                </List.Section>

                <Divider />

                <List.Section>
                    <List.Subheader>App Info</List.Subheader>
                    <List.Item
                        title="Version"
                        description="1.0.0"
                        left={() => <List.Icon icon="information" />}
                    />
                </List.Section>

                <View style={styles.foot}>
                    <Text variant="bodySmall" style={{ color: 'gray' }}>
                        Finance Tracker
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    foot: {
        padding: 20,
        alignItems: 'center',
        marginTop: 'auto'
    }
});
