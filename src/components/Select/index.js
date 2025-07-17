import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Select({zIndex, zIndexInverse, label, color, options, setSelected, valueSelected }) {
  const [open, setOpen] = useState(false);
  const [value, setValue ] = useState(null);
  const [items, setItems] = useState(options);

  useEffect(() => {
    if(!valueSelected) {
      setValue(options[0].value);
    } else {
      setValue(valueSelected);
    }

  }, [options])

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color}}>{label}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Selecione..."
        style={{...styles.dropdown, borderColor: color}}
        dropDownContainerStyle={{...styles.dropdownContainer, borderColor: color}}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  title: {
    marginBottom: 2,
    fontSize: 10,
    fontFamily: 'montserrat-semibold'
  },
  dropdown: {
    borderColor: '#999',
    borderRadius: 6,
  },
  dropdownContainer: {
    borderColor: '#999',
  },
});
