import { COLORS } from '@/constants/theme';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface NavTabProps {
  label: string;
  path: any; 
  color: string;
  isActive: boolean;
  textColor?: string;
}

export const NavTab = ({ label, path, color, isActive, textColor }: NavTabProps) => {
  return (
    <Link href={path} asChild>
      <TouchableOpacity 
        // FIX: Wrap the array in StyleSheet.flatten()
        style={StyleSheet.flatten([
          styles.tab, 
          { backgroundColor: color },
          isActive && styles.activeTab
        ])}
      >
        <Text style={StyleSheet.flatten([
          styles.tabText, 
          { color: textColor || COLORS.textDark },
          (label === 'Home' || label === 'Kelas') ? { fontWeight: 'bold' } : { fontWeight: '600' }
        ])}>
          {label}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    minWidth: 100,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  activeTab: {
    transform: [{translateY: 0}],
  },
  tabText: {
    fontSize: 16,
  },
});