import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SectionList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function ScheduleDetails() {
  const navigation = useNavigation();
  const item = useRoute().params?.item;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Scheduled Match Details </Text>
      <View style={styles.mainCard}>
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
              {item?.firstTeam?.name}{' '}
            </Text>
          </View>
          <Text style={styles.vs}>Vs </Text>
          <View style={styles.teamContainer}>
            <Image
              source={{
                uri: item?.secondTeam?.img,
              }}
              style={styles.img}
              resizeMode={'cover'}
            />
            <Text style={styles.teamName} numberOfLines={1}>
              {item?.secondTeam?.name}{' '}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.txt} numberOfLines={2}>
            {item?.ground} | {item?.totalOvers} Overs{' '}
          </Text>
          <Text style={styles.dateTime} numberOfLines={3}>
            {new Date(item.matchDate).toDateString()} |{' '}
            {new Date(item.startTime).toLocaleTimeString()} -{' '}
            {new Date(item.endTime).toLocaleTimeString()}{' '}
          </Text>
          <Text style={styles.dateTime} numberOfLines={3}>
            {item?.ground} |{' '}
            {item?.testMode ? 'Test Match' : item?.totalOvers + 'Overs'}{' '}
          </Text>
          <Text style={styles.heading}>First Team Players: </Text>
          {item?.firstTeamPlayers.map(item => (
            <Text style={styles.dateTime}>
              {item?.name} ({item?.role})
            </Text>
          ))}
          <Text style={styles.heading}>Second Team Players: </Text>
          {item?.secondTeamPlayers.map(item => (
            <Text style={styles.dateTime}>
              {item?.name} ({item?.role}){' '}
            </Text>
          ))}

          <Text style={styles.heading}>Power Play Overs: </Text>
          <Text style={styles.dateTime}>
            {item?.powerPlayOvers.reverse()?.map(item => item + ', ')}
          </Text>
          {/* <View style={styles.cardRow}>
                    <TouchableOpacity style={styles.btn}>
                      <Text style={styles.btnTxt} numberOfLines={1}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <View style={{marginHorizontal: responsiveWidth(4)}} />
                    <TouchableOpacity
                      style={[styles.btn, {backgroundColor: '#FF3E4D'}]}>
                      <Text
                        style={[styles.btnTxt, {color: 'white'}]}
                        numberOfLines={1}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  heading: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: responsiveWidth(2),
    backgroundColor: '#74B9FF',
    padding: responsiveHeight(1),
  },
});
