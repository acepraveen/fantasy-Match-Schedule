import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {teamList} from '../constants/data';

export default function PowerPlays({
  powerPlayOvers,
  setPowerPlayOvers,
  visible,
  setVisible,
  totalOvers,
}) {
  return (
    <View>
      <Modal transparent visible={visible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.title}>Select Team</Text>
                <ScrollView>
                  <View style={styles.cardContainer}>
                    {Array.from(
                      {length: totalOvers},
                      (_, index) => index + 1,
                    ).map((item, index) => {
                      let selected = powerPlayOvers.includes(item);
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            //   setTeamVal(item);
                            if (selected) {
                              let val = powerPlayOvers.indexOf(item);
                              let arr = powerPlayOvers;
                              arr.splice(val, 1);
                              setPowerPlayOvers(arr);
                            } else {
                              let arr = powerPlayOvers;
                              arr.push(item);
                              setPowerPlayOvers(arr);
                            }
                            //   setVisible(false);
                          }}
                          style={[
                            styles.txtContainer,
                            {backgroundColor: selected ? '#74B9FF' : 'white'},
                          ]}>
                          <Text style={styles.txt}>{item}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    backgroundColor: 'white',
    borderRadius: responsiveHeight(22),
    width: responsiveWidth(8),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: responsiveWidth(95),
    backgroundColor: '#cccc',
    height: responsiveHeight(50),
    alignItems: 'center',
    padding: responsiveHeight(2),
  },
  nameStyle: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    padding: responsiveWidth(1),
    marginBottom: responsiveHeight(2),
    elevation: 3,
    backgroundColor: 'white',
    width: responsiveWidth(80),
  },
  title: {
    marginBottom: responsiveHeight(1),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    // marginBottom: responsiveHeight(1),
    // padding: responsiveWidth(2),
    width: responsiveWidth(90),
  },
  txt: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  txtContainer: {
    width: responsiveWidth(10),
    padding: responsiveWidth(2),
    backgroundColor: 'white',
    marginRight: responsiveWidth(1),
    marginTop: responsiveHeight(1),
    borderRadius: responsiveWidth(1),
  },
});
