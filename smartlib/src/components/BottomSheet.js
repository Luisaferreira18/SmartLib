import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { C, SHADOW } from '../theme';

export default function BottomSheet({ visible, onClose, title, options }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={[styles.sheet, SHADOW.md]}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.row, i < options.length - 1 && styles.rowBorder]}
            onPress={() => { onClose(); opt.onPress(); }}
            accessibilityLabel={opt.label}
            activeOpacity={0.7}
          >
            {opt.icon ? <Text style={styles.icon}>{opt.icon}</Text> : null}
            <Text style={[styles.label, opt.danger && { color: C.danger }]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancel} onPress={onClose} activeOpacity={0.7}>
          <Text style={styles.cancelTxt}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: C.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 28,
  },
  title: {
    textAlign: 'center',
    fontSize: 13,
    color: C.muted,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.line },
  icon: { fontSize: 20, marginRight: 14 },
  label: { fontSize: 16, color: C.dark },
  cancel: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: C.bg,
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelTxt: { fontSize: 16, color: C.muted, fontWeight: '600' },
});
