import { COLORS } from '@/constants/theme';
import { Link, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavTab } from './NavTab';

export const Header = () => {
  const pathname = usePathname();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.navBar}>
        
        {/* Logo Section */}
        <Link href="/" asChild>
          <TouchableOpacity style={styles.logoContainer}>
            <Text style={styles.logoText}>akcen</Text>
            <Text style={styles.logoSubtext}>path to brilliance</Text>
          </TouchableOpacity>
        </Link>

        {/* Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <NavTab label="Home" path="/" color={COLORS.tabHome} isActive={pathname === '/'} />
          <NavTab label="Belajar" path="/belajar" color={COLORS.tabBelajar} isActive={pathname.includes('belajar')} />
          <NavTab label="Tutor" path="/tutor" color={COLORS.tabTutor} isActive={pathname.includes('tutor')} />
          <NavTab label="Kelas" path="/kelas" color={COLORS.tabKelas} isActive={pathname.includes('kelas')} />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    marginBottom: 10,
    marginRight: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.logoBlue,
    letterSpacing: -1,
    lineHeight: 34,
  },
  logoSubtext: {
    fontSize: 10,
    color: COLORS.logoBlue,
    fontWeight: '600',
    marginTop: -2,
  },
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    gap: 15,
  },
  loginButton: {
    backgroundColor: COLORS.btnLogin,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    marginLeft: 20,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});