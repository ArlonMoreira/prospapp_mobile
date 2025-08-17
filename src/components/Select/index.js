import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Select({zIndex, zIndexInverse, label, color, options, setSelected, valueSelected, multiple=false }) {
  const [open, setOpen] = useState(false);
  const [value, setValue ] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if(options && options.length > 0 && Array.isArray(options)){
      setItems(options);

      if (!valueSelected) {
        setValue(multiple ? [options[0].value] : options[0].value);
      } else {
        if (multiple) {
          setValue(Array.isArray(valueSelected) ? valueSelected : [valueSelected]);
        } else {
          setValue(Array.isArray(valueSelected) ? valueSelected[0] : valueSelected);
        }
      }
      
    }

  }, [options])

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color}}>{label}</Text>
      {
        items.length > 0 && (
          <DropDownPicker   
            multiple={multiple} // habilita múltipla seleção
            min={1}          // mínimo de seleções               
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder=""
            style={{...styles.dropdown, borderColor: color}}
            dropDownContainerStyle={{...styles.dropdownContainer, borderColor: color}}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
            mode="BADGE"         
          />
        )
      }
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
