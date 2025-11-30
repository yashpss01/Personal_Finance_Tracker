import React, { createContext, useState, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import {
    DarkTheme as NavDarkTheme,
    DefaultTheme as NavDefaultTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavDefaultTheme,
    reactNavigationDark: NavDarkTheme,
});

// merging the themes
const light_theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
        primary: '#6C63FF',
        onPrimary: '#FFFFFF',
        primaryContainer: '#E5DFFF',
        onPrimaryContainer: '#23005C',
        secondary: '#FF6584',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#FFD8E4',
        onSecondaryContainer: '#3B0018',
        tertiary: '#43D9AD',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#CFFFF0',
        onTertiaryContainer: '#002114',
        background: '#F7F9FC',
        surface: '#FFFFFF',
        surfaceVariant: '#F0F2F5',
        onSurface: '#1A1C1E',
        elevation: {
            level0: 'transparent',
            level1: '#F3F6F9',
            level2: '#EEF2F6',
            level3: '#E8EFF3',
            level4: '#E4ECF0',
            level5: '#DFE9ED',
        },
    },
};

const dark_theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...DarkTheme.colors,
        primary: '#BFC2FF',
        onPrimary: '#23005C',
        primaryContainer: '#3A3092',
        onPrimaryContainer: '#E5DFFF',
        secondary: '#FFB2C1',
        onSecondary: '#5E1126',
        secondaryContainer: '#7D293E',
        onSecondaryContainer: '#FFD8E4',
        tertiary: '#9EF5D3',
        onTertiary: '#003825',
        tertiaryContainer: '#005137',
        onTertiaryContainer: '#CFFFF0',
        background: '#1A1C1E',
        surface: '#1A1C1E',
        surfaceVariant: '#42474E',
        onSurface: '#E3E2E6',
        elevation: {
            level0: 'transparent',
            level1: '#212529',
            level2: '#262A2E',
            level3: '#2B2F33',
            level4: '#303438',
            level5: '#35393D',
        },
    },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setDark] = useState(false);

    useEffect(() => {
        const _init = async () => {
            try {
                const val = await AsyncStorage.getItem('isDarkTheme');
                if (val !== null) setDark(JSON.parse(val));
            } catch (err) {
                // ignore error
            }
        };
        _init();
    }, []);

    const toggle = async () => {
        const next = !isDark;
        setDark(next);
        AsyncStorage.setItem('isDarkTheme', JSON.stringify(next)).catch(e => console.log(e));
    };

    const activeTheme = isDark ? dark_theme : light_theme;

    return (
        <ThemeContext.Provider value={{ isDarkTheme: isDark, toggleTheme: toggle, theme: activeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
