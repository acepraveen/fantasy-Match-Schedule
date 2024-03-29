import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [scheduleList, setScheduleList] = useState([]);
  useEffect(() => {
    (async () => {
      let list = JSON.parse(await AsyncStorage.getItem('scheduleList'));
      setScheduleList(list);
    })();
  }, [scheduleList]);

  const deleteSchedule = async index => {
    let arr = scheduleList;
    arr.splice(index, 1);
    setScheduleList(arr);
    await AsyncStorage.setItem('scheduleList', JSON.stringify(arr));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fantasy Match Schedules </Text>
      <View style={{marginBottom: responsiveHeight(6)}}>
        <FlatList
          data={scheduleList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.mainCard}
              onPress={() => {
                navigation.navigate('ScheduleDetails', {item: item});
              }}>
              <View style={styles.cardRow}>
                <View style={styles.teamContainer}>
                  <Image
                    source={{
                      uri: item?.firstTeam?.img,
                    }}
                    style={styles.img}
                    resizeMode={'cover'}
                  />
                  <Text style={styles.teamName} numberOfLines={1}>
                    {item?.firstTeam?.name}
                  </Text>
                </View>
                <Text style={styles.vs}>Vs</Text>
                <View style={styles.teamContainer}>
                  <Image
                    source={{
                      uri: item?.secondTeam?.img,
                    }}
                    style={styles.img}
                    resizeMode={'cover'}
                  />
                  <Text style={styles.teamName} numberOfLines={1}>
                    {item?.secondTeam?.name}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.txt} numberOfLines={2}>
                  {item?.ground} |{' '}
                  {item?.testMode ? 'Test Match' : item?.totalOvers + 'Overs'}
                </Text>
                <Text style={styles.dateTime} numberOfLines={3}>
                  {new Date(item?.matchDate).toDateString()} |{' '}
                  {new Date(item?.startTime).toLocaleTimeString()} -{' '}
                  {new Date(item?.endTime).toLocaleTimeString()}
                </Text>
                <View style={styles.cardRow}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      navigation.navigate('EditSchedule', {item: item});
                    }}>
                    <Text style={styles.btnTxt} numberOfLines={1}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <View style={{marginHorizontal: responsiveWidth(4)}} />
                  <TouchableOpacity
                    style={[styles.btn, {backgroundColor: '#FF3E4D'}]}
                    onPress={() => {
                      deleteSchedule(index);
                    }}>
                    <Text
                      style={[styles.btnTxt, {color: 'white'}]}
                      numberOfLines={1}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                marginVertical: responsiveHeight(3),
                color: 'black',
              }}>
              Click plus icon to create new fantasy match schedule.{' '}
            </Text>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: responsiveHeight(3),
          right: responsiveWidth(10),
          backgroundColor: '#74B9FF',
          elevation: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: responsiveWidth(10),
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(1),
        }}
        onPress={() => {
          navigation.navigate('Schedule');
        }}>
        <Text style={{fontWeight: 'bold', fontSize: responsiveFontSize(5)}}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: '#cccccc',
  },
  img: {
    height: responsiveHeight(10),
    width: responsiveWidth(22),
    backgroundColor: 'white',
    borderRadius: responsiveWidth(20),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#cccc',
  },
  teamContainer: {
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCard: {
    backgroundColor: 'white',
    marginTop: responsiveHeight(1),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: responsiveWidth(3),
  },
  teamName: {
    color: 'black',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    width: responsiveWidth(20),
    textAlign: 'center',
  },
  txt: {
    color: '#535C68',
    fontSize: responsiveFontSize(2),
  },
  vs: {
    fontSize: responsiveFontSize(3),
    marginHorizontal: responsiveWidth(3),
    color: 'blue',
    fontWeight: 'bold',
  },
  dateTime: {
    color: 'black',
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
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: responsiveFontSize(3),
    margin: responsiveWidth(1),
    color: '#2B2B52',
    fontWeight: 'bold',
  },
});
