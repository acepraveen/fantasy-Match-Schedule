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

export default function TeamSelector({teamVal, setTeamVal, selectedTeam}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={styles.add}>+</Text>
      </TouchableOpacity>
      <Modal transparent visible={showModal}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
          }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.title}>Select Team </Text>
                <ScrollView>
                  {teamList
                    .filter(item => {
                      return item?.name !== selectedTeam?.name;
                    })
                    .map(item => (
                      <TouchableOpacity
                        onPress={() => {
                          setTeamVal(item);
                          setShowModal(false);
                        }}>
                        <Text style={styles.nameStyle}>
                          {item.name} ({item.fullName}){' '}
                        </Text>
                      </TouchableOpacity>
                    ))}
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
});
