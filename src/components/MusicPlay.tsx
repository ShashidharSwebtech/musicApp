import { Image, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import EnpyIcons from 'react-native-vector-icons/Entypo';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import Fonttiston from 'react-native-vector-icons/Fontisto';
import { ADD_FAV, REMOVE_FAV, Change_Display_item } from '../redux/Actions';
import Sound from 'react-native-sound';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Globalstate, item } from '../redux/Reducer';
import Slider from '@react-native-community/slider';

interface IProps {
  route?: { params: { data: any } };
  ADD_FAV: (item: any) => any;
  REMOVE_FAV: (id: number) => void;
  navigation?: {
    goBack: () => any;
  };
  state: Globalstate;
  Change_Display_item: (id: number, incordec: 'inc' | 'dec') => void;
}
//route.params
interface Istate {
  startstop: boolean;
  data: item | null;
  duration: any;
  min: number;
  sec: number;
  currentTime: number;
}
export class MusicPlay extends Component<IProps, Istate> {
  music: null | Sound = null;
  constructor(props: IProps) {
    super(props);
    this.state = {
      startstop: true,
      data: null,
      duration: 0,
      min: 0,
      sec: 0,
      currentTime: 0,
    };
  }
  componentDidMount(): void {
    const data = this.props.state.DisplayItem;
    this.music = new Sound(data.url, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(error);
        return;
      }
      const time = this.music?.getDuration();
      const min = Number(time) / 60;
      const sec = Math.round((Number(time) - min) * 60);
      this.setState({ duration: time, min: min, sec: sec });
    });
    // this.setDragByTime();
  }
  PlaySong = async () => {
    const data = this.props.state.DisplayItem;
    const { currentTime } = this.state
    if (data) {
      this.setState({ startstop: false });
      this.music = new Sound(data.url, Sound.MAIN_BUNDLE, async error => {
        if (error) {
          console.log(error);
          return;
        }
        await this.music?.setCurrentTime(currentTime);
        this.music?.play();
      });

      this.setDragByTime();
    } else {
      this.music?.pause(() => {
        console.log('Paused');
      });
    }
  };
  setDragByTime = () => {
    setInterval(() => {
      this.music?.getCurrentTime(presentTime => {
        this.setState({ currentTime: presentTime });
      });
    }, 1000);
  };

  stop = async () => {
    this.setState({ startstop: true, currentTime: 0 });
    this.music?.pause();
  };

  replay = () => {
    this.music?.getCurrentTime();
  };

  onDurationChange = (value: number) => {
    console.log(value);
    this.music?.setCurrentTime(value);
    this.setState({ currentTime: value });
  };
  render() {
    const { startstop, duration, min, sec, currentTime } = this.state;
    const data = this.props.state.DisplayItem;
    return (
      data && (
        <View style={Styles.container}>
          <View style={Styles.innerContainer}>
            <AntIcon
              name="down"
              color={'#fff'}
              size={responsiveHeight(4)}
              onPress={() => {
                this.stop();
                this.props.navigation?.goBack();
              }}
            />
            <Text style={Styles.topText}>“Top 100 Nigeria”</Text>
            <EnpyIcons
              name="dots-three-horizontal"
              color={'#fff'}
              size={responsiveHeight(5)}
            />
          </View>
          <Image
            source={{
              uri: data.artwork,
            }}
            style={Styles.image}
          />
          <View style={Styles.imgDown}>
            <View>
              <Text style={Styles.title}>{data.title}</Text>
              <Text style={{ color: '#fff' }}>{data.artist}</Text>
            </View>
            {!data.favornot ? (
              <FeatherIcons
                name="heart"
                size={responsiveHeight(5)}
                color={'#844DFB'}
                onPress={() => this.props.ADD_FAV(data)}
              />
            ) : (
              <EnpyIcons
                name="heart"
                size={responsiveHeight(5)}
                color={'#844DFB'}
                onPress={() => this.props.REMOVE_FAV(Number(data.id))}
              />
            )}
          </View>
          <View
            style={{ marginVertical: responsiveHeight(3), alignItems: 'center' }}>
            <Slider
              style={Styles.Slider}
              thumbTintColor="#fff"
              minimumValue={0}
              maximumValue={duration}
              maximumTrackTintColor="#fff"
              minimumTrackTintColor="#fff"
              value={currentTime}
              onValueChange={value => this.onDurationChange(value)}
            />
            <View>
              <Text></Text>
            </View>
            {/* <Image source={require('../asserts/Swapbar.png')} /> */}
          </View>
          <View style={Styles.btnContainer}>
            <Image source={require('../asserts/crossplay.png')} />
            <AntDesign
              name="stepbackward"
              size={responsiveHeight(5)}
              color="#fff"
              onPress={() => {
                this.stop();
                this.setState({ currentTime: 0 })
                this.props.Change_Display_item(Number(data.id), 'dec');
                !startstop && this.PlaySong();
              }}
            />
            <AntDesign
              name={!startstop ? 'pausecircle' : 'play'}
              size={responsiveHeight(5)}
              color="#fff"
              onPress={startstop ? this.PlaySong : this.stop}
            />
            <AntDesign
              name="stepforward"
              size={responsiveHeight(5)}
              color="#fff"
              onPress={() => {
                this.stop();
                this.setState({ currentTime: 0 })
                this.props.Change_Display_item(Number(data.id), 'inc');
                !startstop && this.PlaySong();
              }}
            />
            <FontAwesome
              name="arrow-rotate-left"
              size={responsiveHeight(2.3)}
              color="#fff"
            />
          </View>

          <View style={Styles.btnContainer}>
            <View style={Styles.musicPlayunderIcons}>
              <MaterialIcons
                name="music-note-bluetooth"
                size={responsiveHeight(4)}
                color="#fff"
              />
              <Text style={{ fontSize: responsiveHeight(2.5), color: '#fff' }}>
                Earpods
              </Text>
            </View>
            <View style={Styles.musicPlayunderIcons}>
              <AntIcon name="upload" color="#fff" size={responsiveHeight(4)} />
              <Fonttiston
                name="play-list"
                color="#fff"
                size={responsiveHeight(4)}
              />
            </View>
          </View>
        </View>
      )
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    state,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    ADD_FAV: (item: item) => {
      dispatch(ADD_FAV(item));
    },
    REMOVE_FAV: (id: number) => {
      dispatch(REMOVE_FAV(id));
    },
    Change_Display_item: (id: number, incordec: 'inc' | 'dec') => {
      dispatch(Change_Display_item(id, incordec));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicPlay);

const Styles = StyleSheet.create({
  Slider: {
    width: responsiveWidth(80),
    height: responsiveHeight(1.9),
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#251741',
    padding: responsiveHeight(2),
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topText: {
    color: '#fff',
    fontSize: responsiveHeight(3),
    fontFamily: 'Urbanist',
  },
  image: {
    height: responsiveHeight(40),
    width: responsiveWidth(80),
    borderRadius: responsiveHeight(2),
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
  },
  imgDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(4),
  },
  title: {
    color: '#fff',
    fontSize: responsiveHeight(2),
    fontWeight: '800',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
  },
  musicPlayunderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: responsiveWidth(30),
    marginTop: responsiveHeight(14),
  },
});
