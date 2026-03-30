import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, List, Switch, useTheme, Divider, Text, Button } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

export default function SettingsScreen() {
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
    const { logout, user } = useContext(AuthContext);
    const theme = useTheme();

    return (
        <View style={[styles.main, { backgroundColor: theme.colors.background }]}>
            <Appbar.Header>
                <Appbar.Content title="Settings" />
            </Appbar.Header>

            <View style={styles.body}>
                <List.Section>
                    <List.Subheader>Account</List.Subheader>
                    <List.Item
                        title={user?.email || "User"}
                        description="Logged in"
                        left={() => <List.Icon icon="account-circle" />}
                    />
                </List.Section>

                <Divider />

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
                    <Button 
                        mode="contained-tonal" 
                        onPress={logout} 
                        style={{ marginBottom: 20, width: '80%' }}
                        icon="logout"
                        buttonColor={theme.colors.errorContainer}
                        textColor={theme.colors.onErrorContainer}
                    >
                        Logout
                    </Button>
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
