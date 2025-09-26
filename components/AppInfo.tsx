import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ExternalLink, Github, Twitter } from 'lucide-react-native';

export default function AppInfo() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gymalytics</Text>
      <Text style={styles.description}>
        La plataforma definitiva para gestionar entrenamientos y conectar usuarios con entrenadores personales.
      </Text>
      
      <View style={styles.linksContainer}>
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => openLink('https://gymalytics.com')}
        >
          <ExternalLink color="#84cc16" size={16} />
          <Text style={styles.linkText}>Sitio Web</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => openLink('https://github.com/gymalytics')}
        >
          <Github color="#84cc16" size={16} />
          <Text style={styles.linkText}>GitHub</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => openLink('https://twitter.com/gymalytics')}
        >
          <Twitter color="#84cc16" size={16} />
          <Text style={styles.linkText}>Twitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#84cc16',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  linkText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    marginLeft: 4,
  },
});