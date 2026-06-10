import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { C } from '../theme';

export default function TopBar({ title, onBack, right, onRightPress, bellCount, onBellPress }) {
  return (
    <View style={styles.topbar}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.back} accessibilityLabel="Voltar" activeOpacity={0.7}>
          <Text style={styles.backTxt}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightArea}>
        {onBellPress != null ? (
          <TouchableOpacity onPress={onBellPress} style={styles.bell} accessibilityLabel="Notificacoes" activeOpacity={0.7}>
            <Text style={styles.bellIcon}>🔔</Text>
            {bellCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTxt}>{bellCount > 9 ? '9+' : String(bellCount)}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : null}
        {right ? (
          onRightPress ? (
            <TouchableOpacity onPress={onRightPress} accessibilityLabel={right} activeOpacity={0.7}>
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
  rightArea: { flexDirection: 'row', alignItems: 'center', minWidth: 28, justifyContent: 'flex-end' },
  right: { color: C.link, fontSize: 13 },
  bell: { marginRight: 8, position: 'relative' },
  bellIcon: { fontSize: 20 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: C.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeTxt: { color: '#fff', fontSize: 9, fontWeight: '700' },
});
