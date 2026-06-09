import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';

export default function TopBar({ title, onBack, right, onRightPress }) {
  return (
    <View style={styles.topbar}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.back} accessibilityLabel="Voltar">
          <Text style={styles.backTxt}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={{ minWidth: 28, alignItems: 'flex-end' }}>
        {right ? (
          onRightPress ? (
            <TouchableOpacity onPress={onRightPress} accessibilityLabel={right}>
              <Text style={styles.right}>{right}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.right}>{right}</Text>
          )
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    height: 56,
    backgroundColor: C.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  back: { width: 28 },
  backTxt: { fontSize: 30, color: C.navy, lineHeight: 32 },
  title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: C.navy },
  right: { color: C.link, fontSize: 13 },
});
