import React, {useState} from 'react';
import {Button, TouchableOpacity, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default DateSelector = ({timeVal, setTimeVal}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          backgroundColor: '#74B9FF',
          padding: responsiveHeight(1),
          borderRadius: responsiveWidth(4),
        }}>
        <Text style={{color: 'white'}}>Select </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode={'time'}
        open={open}
        date={timeVal}
        onConfirm={date => {
          setOpen(false);
          setTimeVal(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        style={{color: 'black'}}
      />
    </>
  );
};
