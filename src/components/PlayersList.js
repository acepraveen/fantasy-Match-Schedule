import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {teamList, teamPlayers} from '../constants/data';

export default function PlayersList({playerList, setPlayerList, teamName}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[styles.btn, {width: responsiveWidth(70), alignSelf: 'center'}]}
        onPress={() => setShowModal(true)}>
        <Text style={styles.btnTxt}>{teamName} Team Players</Text>
      </TouchableOpacity>
      <Modal transparent visible={showModal}>
        <TouchableWithoutFeedback
          onPress={() => {
            // setShowModal(false);
          }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <ScrollView>
                  <Text style={styles.listHeader}>
                    {playerList.length > 0 ? 'Selected Players' : ''}
                  </Text>
                  {playerList?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        let arr = playerList;
                        arr.splice(index, 1);
                        setPlayerList(arr);
                      }}>
                      <View style={styles.cardRow}>
                        <View style={styles.radio} />
                        <Text style={styles.selectedName}>
                          {item.name} ({item.role})
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                  <Text style={styles.listHeader}>Other Players </Text>

                  {teamPlayers
                    .filter(item => item.teamName === teamName)[0]
                    ?.players.filter(item => {
                      if (playerList.length > 0) {
                        let duplicate = false;
                        for (let i = 0; i < playerList.length; i++) {
                          if (playerList[i]?.name == item?.name) {
                            duplicate = true;
                          }
                        }
                        if (!duplicate) {
                          return item;
                        }
                      } else {
                        return item;
                      }
                    })
                    .map(item => (
                      <TouchableOpacity
                        onPress={() => {
                          let arr = playerList;
                          if (playerList.length == 11) {
                            ToastAndroid.show(
                              '11 Players selected',
                              ToastAndroid.LONG,
                            );
                          } else {
                            arr.push(item);
                            setPlayerList(arr);
                          }
                        }}>
                        <View style={styles.cardRow}>
                          <View
                            style={[
                              styles.radio,
                              {
                                backgroundColor: 'white',
                              },
                            ]}
                          />
                          <Text style={styles.selectedName}>
                            {item.name} ({item.role})
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {width: responsiveWidth(70), alignSelf: 'center'},
                  ]}
                  onPress={() => {
                    if (playerList.length == 11) {
                      setShowModal(false);
                    } else {
                      ToastAndroid.show('Select 11 Players', ToastAndroid.LONG);
                    }
                  }}>
                  <Text style={styles.btnTxt}>Submit </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: responsiveWidth(95),
    backgroundColor: '#cccc',
    height: responsiveHeight(90),
    alignItems: 'center',
    padding: responsiveHeight(2),
  },
  title: {
    marginBottom: responsiveHeight(1),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  btn: {
    backgroundColor: '#74B9FF',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(33),
    width: responsiveWidth(25),
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
  },
  radio: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    borderRadius: responsiveWidth(6),
    backgroundColor: '#74B9FF',
    borderWidth: responsiveWidth(1.5),
    borderColor: '#cccc',
    marginRight: responsiveWidth(1),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
    backgroundColor: 'white',
    padding: responsiveWidth(2),
    width: responsiveWidth(90),
  },
  selectedName: {
    color: 'black',
    fontSize: responsiveFontSize(2),
  },
  listHeader: {
    color: 'black',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
  },
});
