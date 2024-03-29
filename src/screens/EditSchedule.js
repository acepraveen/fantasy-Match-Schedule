import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DropdownList from '../components/Dropdown';
import {ballType, umpireList} from '../constants/data';
import DateSelector from '../components/DateSelector';
import TimeSelector from '../components/TimeSelector';
import TeamSelector from '../components/TeamSelector';
import PlayersList from '../components/PlayersList';
import PowerPlays from '../components/PowerPlays';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function EditSchedule() {
  const navigation = useNavigation();
  const item = useRoute()?.params.item;
  const [showPowerPlay, setShowPowerPlay] = useState(false);
  const [data, setData] = useState({
    id: item.id,
    totalOvers: item.totalOvers,
    testMode: item.testMode,
    oversPerBowler: item.oversPerBowler,
    city: item.city,
    ground: item.ground,
    matchDate: new Date(item.matchDate),
    startTime: new Date(item.startTime),
    endTime: new Date(item.endTime),
    bowlType: item.bowlType,
    umpire: item.umpire,
    firstTeam: item.firstTeam,
    secondTeam: item.secondTeam,
    firstTeamPlayers: item.firstTeamPlayers,
    secondTeamPlayers: item.secondTeamPlayers,
    powerPlayOvers: item.powerPlayOvers,
  });

  const updateSchedule = async () => {
    if (
      data.city &&
      data.ground &&
      data.matchDate &&
      data.startTime &&
      data.endTime &&
      data.bowlType &&
      data.umpire &&
      (data.testMode ||
        (data.totalOvers &&
          data.oversPerBowler &&
          data.powerPlayOvers?.length > 0)) &&
      data.firstTeamPlayers?.length == 11 &&
      data.secondTeamPlayers?.length == 11
    ) {
      let prevList = JSON.parse(await AsyncStorage.getItem('scheduleList'));
      if (prevList.length > 0) {
        prevList.map(async item => {
          if (item.matchDate === data.matchDate) {
            let timeSlotStart = item.startTime - data.startTime;
            let timeSlotEnd = item.endTime - data.endTime;
            let startDiff = Math.floor(timeSlotStart / (1000 * 60 * 60));
            let endDif = Math.floor(timeSlotEnd / (1000 * 60 * 60));
          } else {
            // let arr = prevList?.length > 0 ? prevList : [];
            // arr.push(data);
            // await AsyncStorage.setItem('scheduleList', JSON.stringify(arr));
            // navigation.replace('Home');
            let updatedList = prevList.map(schedule => {
              if (schedule.id === data.id) {
                return data;
              }
            });
            await AsyncStorage.setItem(
              'scheduleList',
              JSON.stringify(updatedList),
            );
            navigation.replace('Home');
          }
        });
      } else {
        let updatedList = prevList.map(schedule => {
          if (schedule.id === data.id) {
            return data;
          }
        });
        await AsyncStorage.setItem('scheduleList', JSON.stringify(updatedList));
        navigation.replace('Home');
      }
    } else {
      ToastAndroid.show('All fields are required.', ToastAndroid.LONG);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PowerPlays
        visible={showPowerPlay}
        setVisible={setShowPowerPlay}
        powerPlayOvers={data.powerPlayOvers}
        setPowerPlayOvers={val => setData({...data, powerPlayOvers: val})}
        totalOvers={data.totalOvers}
      />
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.teamContainer}>
          <ImageBackground
            source={{
              uri: data.firstTeam.img,
            }}
            resizeMode={'stretch'}
            style={styles.img}>
            <TeamSelector
              teamVal={data.firstTeam}
              setTeamVal={val => {
                setData({...data, firstTeam: val});
              }}
            />
          </ImageBackground>
          <Text style={styles.teamName} numberOfLines={1}>
            {data.firstTeam.name}{' '}
          </Text>
        </TouchableOpacity>
        <Text style={styles.vs}>Vs </Text>

        <TouchableOpacity style={styles.teamContainer}>
          <ImageBackground
            source={{
              uri: data.secondTeam.img,
            }}
            resizeMode={'stretch'}
            style={styles.img}>
            <TeamSelector
              teamVal={data.secondTeam}
              setTeamVal={val => {
                setData({...data, secondTeam: val});
              }}
            />
          </ImageBackground>
          <Text style={styles.teamName} numberOfLines={1}>
            {data.secondTeam.name}{' '}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <PlayersList
          teamName={data.firstTeam.name}
          playerList={data.firstTeamPlayers}
          setPlayerList={val => {
            setData({...data, firstTeamPlayers: val});
          }}
        />
        <PlayersList
          teamName={data.secondTeam.name}
          playerList={data.secondTeamPlayers}
          setPlayerList={val => {
            setData({...data, secondTeamPlayers: val});
          }}
        />
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[
              styles.radio,
              {backgroundColor: !data.testMode ? '#74B9FF' : 'white'},
            ]}
            onPress={() => {
              setData({...data, testMode: false});
            }}
          />
          <Text style={[styles.label, {marginLeft: responsiveWidth(1)}]}>
            Limited Overs{' '}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[
              styles.radio,
              {backgroundColor: data.testMode ? '#74B9FF' : 'white'},
            ]}
            onPress={() => {
              setData({...data, testMode: true});
            }}
          />
          <Text style={[styles.label, {marginLeft: responsiveWidth(1)}]}>
            Test Match{' '}
          </Text>
        </View>
      </View>
      {!data.testMode ? (
        <View style={styles.cardRow}>
          <View>
            <Text style={styles.label}>Total Overs </Text>
            <TextInput
              placeholder="overs"
              keyboardType="number-pad"
              style={styles.input}
              maxLength={2}
              onChangeText={val => setData({...data, totalOvers: val})}
              defaultValue={data.totalOvers}
              placeholderTextColor={'black'}
            />
          </View>
          <View>
            <Text style={styles.label}>Overs per Bowler </Text>
            <TextInput
              placeholder="overs"
              keyboardType="number-pad"
              style={styles.input}
              maxLength={2}
              onChangeText={val => setData({...data, oversPerBowler: val})}
              defaultValue={data.oversPerBowler}
              placeholderTextColor={'black'}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (data.totalOvers > 0) {
                setShowPowerPlay(true);
              } else {
                ToastAndroid.show('Enter total overs', ToastAndroid.LONG);
              }
            }}>
            <Text style={styles.btnTxt}>Power Play </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={{marginTop: responsiveHeight(1)}}>
        <Text style={styles.label}>City</Text>
        <TextInput
          placeholder="enter city"
          style={[styles.input, {width: responsiveWidth(90)}]}
          maxLength={20}
          onChangeText={val => setData({...data, city: val})}
          defaultValue={data.city}
          placeholderTextColor={'black'}
        />
      </View>
      <View style={{marginTop: responsiveHeight(1)}}>
        <Text style={styles.label}>Ground </Text>
        <TextInput
          placeholder="enter ground name"
          style={[styles.input, {width: responsiveWidth(90)}]}
          maxLength={50}
          multiline
          onChangeText={val => setData({...data, ground: val})}
          numberOfLines={3}
          defaultValue={data.ground}
          placeholderTextColor={'black'}
        />
      </View>
      <View style={{marginTop: responsiveHeight(1)}}>
        <Text style={styles.label}>Date </Text>
        <View
          style={[styles.input, {width: responsiveWidth(90)}, styles.cardRow]}>
          <Text style={{color: 'black'}}>{data.matchDate.toDateString()}{' '}</Text>
          <DateSelector
            dateVal={data.matchDate}
            setDateVal={val => setData({...data, matchDate: val})}
          />
        </View>
      </View>
      <View style={[{marginTop: responsiveHeight(1)}, styles.cardRow]}>
        <View>
          <Text style={styles.label}>Start Time </Text>
          <View
            style={[
              styles.input,
              {width: responsiveWidth(44), paddingRight: 0},
              styles.cardRow,
            ]}>
            <Text style={{color: 'black'}}>
              {data.startTime.toLocaleTimeString()}
            </Text>
            <TimeSelector
              timeVal={data.startTime}
              setTimeVal={val => {
                setData({...data, startTime: val});
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>End Time </Text>
          <View
            style={[
              styles.input,
              {width: responsiveWidth(44), paddingRight: 0},
              styles.cardRow,
            ]}>
            <Text style={{color: 'black'}}>
              {data.endTime.toLocaleTimeString()}
            </Text>
            <TimeSelector
              timeVal={data.endTime}
              setTimeVal={val => {
                setData({...data, endTime: val});
              }}
            />
          </View>
        </View>
      </View>
      <View style={{marginTop: responsiveHeight(1)}}>
        <Text style={styles.label}>Umpire </Text>
        <DropdownList
          data={umpireList}
          value={data.umpire}
          setValue={val => setData({...data, umpire: val})}
        />
      </View>
      <View style={{marginTop: responsiveHeight(1)}}>
        <Text style={styles.label}>Bowl Type </Text>
        <DropdownList
          data={ballType}
          value={data.bowlType}
          setValue={val => setData({...data, bowlType: val})}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.btn,
          {
            width: responsiveWidth(70),
            alignSelf: 'center',
            marginBottom: responsiveHeight(5),
            marginTop: responsiveHeight(5),
          },
        ]}
        onPress={() => updateSchedule()}>
        <Text style={[styles.btnTxt, {fontWeight: 'bold'}]}>
          Create Schedule{' '}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
    // justifyContent:'center',
    // alignItems:'center'
  },
  img: {
    height: responsiveHeight(10),
    width: responsiveWidth(22),
    borderRadius: responsiveHeight(22),
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamContainer: {
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(2),
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
    color: '#74B9FF',
    fontWeight: 'bold',
  },
  dateVal: {
    color: 'black',
    fontSize: responsiveFontSize(2.1),
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
  title: {
    fontSize: responsiveFontSize(3),
    margin: responsiveWidth(1),
    color: '#2B2B52',
    fontWeight: 'bold',
  },
  add: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    backgroundColor: 'white',
    borderRadius: responsiveHeight(22),
    width: responsiveWidth(8),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  radio: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    borderRadius: responsiveWidth(6),
    // backgroundColor: '#74B9FF',
    borderWidth: responsiveWidth(1.5),
    borderColor: '#cccc',
  },
  input: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(1),
    backgroundColor: 'white',
    borderRadius: responsiveWidth(3),
    width: responsiveWidth(20),
    marginTop: responsiveWidth(3),
    color: 'black',
  },
  label: {
    color: 'black',
    fontSize: responsiveFontSize(1.7),
  },
});
