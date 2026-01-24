import { COLORS, FONTS, SPACING, UI } from '@/constants/theme'; // Adjust path if needed
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function HomePage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Helper to pick size based on screen width
  const responsiveSize = (key: keyof typeof FONTS.sizes) => 
    isMobile ? FONTS.sizes[key].mobile : FONTS.sizes[key].desktop;
    
  const responsiveLineHeight = (key: keyof typeof FONTS.lineHeights) => 
    isMobile ? FONTS.lineHeights[key].mobile : FONTS.lineHeights[key].desktop;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.scrollContent, { paddingHorizontal: isMobile ? SPACING.m : SPACING.xl }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        
        {/* --- Left Column: Text --- */}
        <View style={styles.textColumn}>
          
          <View style={styles.titleRow}>
            {/* "Apa itu" */}
            <Text style={[
              styles.heroText, 
              { fontSize: responsiveSize('hero'), lineHeight: responsiveLineHeight('hero') }
            ]}>
              Apa itu{' '}
            </Text>
            
            {/* "Akcen" Stack */}
            <View style={styles.logoStack}>
              <Text style={[
                styles.heroText, 
                styles.brandColor,
                { fontSize: responsiveSize('hero'), lineHeight: responsiveLineHeight('hero') }
              ]}>
                Akcen
              </Text>
              <Text style={[
                styles.tagline, 
                { fontSize: responsiveSize('tagline') }
              ]}>
                path to brilliance
              </Text>
            </View>

            {/* "?" */}
            <Text style={[
              styles.heroText, 
              { fontSize: responsiveSize('hero'), lineHeight: responsiveLineHeight('hero') }
            ]}>
               {' '}?
            </Text>
          </View>

          <Text style={[styles.subHeadline, { fontSize: responsiveSize('subHero') }]}>
            Akcen adalah ...
          </Text>

          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <Text style={[styles.ctaText, { fontSize: responsiveSize('button') }]}>
              Yuk, coba tes gaya belajar kamu!
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- Right Column: Graphics --- */}
        {!isMobile && (
          <View style={styles.graphicColumn}>
              <View style={styles.circleBackground}>
                 <View style={styles.iconPlaceholder} /> 
              </View>
          </View>
        )}

      </View>
    </ScrollView>
  );
}

// Styles that define POSITION and LAYOUT, but assume VALUES from constants
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: SPACING.xl,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 500,
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: SPACING.containerMax,
    alignSelf: 'center',
  },
  
  // Text Layout
  textColumn: {
    flex: 1,
    minWidth: 300,
    paddingRight: SPACING.m,
    justifyContent: 'center',
    paddingTop: SPACING.l,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.m,
    flexWrap: 'wrap',
  },
  logoStack: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  // Typography Base Styles
  heroText: {
    fontWeight: FONTS.weights.heavy,
    color: COLORS.text.dark,
    letterSpacing: -1.5,
  },
  brandColor: {
    color: COLORS.text.blue,
  },
  tagline: {
    color: COLORS.text.blue,
    fontWeight: FONTS.weights.bold,
    marginTop: -5,
    width: '100%',
    textAlign: 'center',
  },
  subHeadline: {
    fontWeight: FONTS.weights.semiBold,
    color: COLORS.secondary,
    marginBottom: SPACING.l,
    letterSpacing: -0.5,
  },
  
  // Component Styles
  ctaButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: UI.radius.pill,
    alignSelf: 'flex-start',
    ...UI.shadows.default,
  },
  ctaText: {
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.dark,
  },
  
  // Graphic Styles
  graphicColumn: {
    flex: 1,
    height: 500,
    minWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleBackground: {
    width: 550,
    height: 550,
    borderRadius: 275,
    backgroundColor: COLORS.bgWhite,
    position: 'absolute',
    right: -120, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: UI.radius.card,
    opacity: 0.8,
  }
});