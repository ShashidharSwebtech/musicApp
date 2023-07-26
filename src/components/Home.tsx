import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Trending from './trending';
import Foryou from './Foryou';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import {  } from 'react-native-gesture-handler';
import { setDisplayItem } from '../redux/Actions';
import { Globalstate,item } from '../redux/Reducer';

const Tab = createMaterialTopTabNavigator();

interface IProps {
    state:Globalstate,
    navigation?: {
        navigate: React.FC;
      }
      setDisplayItem:(id:number)=>void
}
interface IState {
  fort: boolean;
 
}
export class Home extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      fort: false,
    };
  }
 
  render() {
    const {fort} = this.state;
    const {data}=this.props.state;
    return (
      <View style={Styles.container}>
        <View style={Styles.topBtnParent}>
          <View style={Styles.btns}>
            <TouchableOpacity
              onPress={() => this.setState({fort: !fort})}
              disabled={!fort}>
              <Text
                style={[
                  Styles.foryou,
                  !fort ? Styles.activeBtn : Styles.inactiveBtn,
                ]}>
                For You
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({fort: !fort})}
              disabled={fort}>
              <Text
                style={[
                  Styles.trending,
                  fort ? Styles.activeBtn : Styles.inactiveBtn,
                ]}>
                Trending
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.btns}>
            <AntIcon
              name="bells"
              size={responsiveHeight(4)}
              color={'#fff'}
              style={{marginHorizontal: responsiveWidth(5)}}
            />
            <AntIcon name="setting" size={responsiveHeight(4)} color={'#fff'} />
          </View>
        </View>
        {!fort ? (
          <View>
            <View>
              <View>
                <Text style={Styles.cartHead}>Recently Played</Text>
              </View>
              <View style={Styles.topCart}>
                <View>
                  <Image
                    style={Styles.upperimg}
                    source={require('../asserts/upperImg.png')}
                  />
                  <Image
                    style={Styles.secondimg}
                    source={require('../asserts/secondimg.png')}
                  />
                  <Image
                    style={Styles.lastimg}
                    source={require('../asserts/lastimg.png')}
                  />
                </View>
                <View style={Styles.cartTextParent}>
                  <Text style={Styles.carttext}>1.Man on the moon </Text>
                  <Text style={Styles.carttext}>2.Milky way (Rupe...</Text>
                  <Text style={Styles.carttext}>3.Big Picture (Lon..</Text>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={Styles.cartHead}>Daily Mix</Text>
              </View>
              <View>
                <ScrollView style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image source={require('../asserts/dailymix1.png')} />
                      <Text style={Styles.dailytext}>
                        Mellow songs from the 2010s.
                      </Text>
                    </View>
                    <View>
                      <Image source={require('../asserts/dailymax2.png')} />
                      <Text style={Styles.dailytext}>
                        Mellow songs from the 2010s.
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require('../asserts/lastimg.png')}
                        style={{
                          height: responsiveHeight(17),
                          borderRadius: responsiveHeight(2),
                        }}
                      />
                      <Text style={Styles.dailytext}>
                        Unwind to easy classics
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
            <View>
              <View style={Styles.chatHeader}>
                <Text style={Styles.cartHead}>Charts</Text>
                <Text style={[Styles.cartHead,Styles.more]}>More ></Text>
              </View>
              <View style={Styles.chartCart}>
                <View>
                    <View style={Styles.charttextParent}>
                    <Text style={Styles.charttext}>Top 100 Nigeria</Text>
                    <Text style={Styles.charttext}>More ></Text>
                    </View>
                    <View style={{height:responsiveHeight(23)}}>
                   
                    <FlatList
                    data={data}
                    renderItem={({item})=>{
                        return <TouchableOpacity style={Styles.item} 
                        onPress={()=>{
                          this.props.setDisplayItem(Number(item.id))
                          this.props.navigation?.navigate("music",{data:item}
                          )}}
                        >
                                <View style={Styles.innerItem}>
                                    <Text style={Styles.ItemId}>{item.id}</Text>
                                <Image 
                                source={{uri:item.artwork,width:responsiveWidth(12),height:responsiveHeight(6)}}
                                style={Styles.itemimg}
                                />
                                <View style={Styles.chatTextParent}>
                                <Text style={{color:"#fff"}}>{item.title}</Text>
                                <Text style={{color:"#fff"}}>{item.artist}</Text>
                                </View>
                                
                           </View>
                           <MaterialIcon name="download-circle-outline" color={"#844DFB"} size={responsiveHeight(5)}/>
                        </TouchableOpacity>
                    }}
                    />
                     </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <Trending />
        )}
      </View>
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
    setDisplayItem:(id:number)=>dispatch(setDisplayItem(id))
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
export const Styles = StyleSheet.create({
    ItemId:{
        color:"#fff",
    fontSize:responsiveHeight(1.5),
    margin:responsiveHeight(2),
    marginVertical:responsiveHeight(2.5)
},
itemimg:{
    borderRadius:responsiveHeight(1)
},
  container: {
    backgroundColor: '#251741',
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
  },
  topBtnParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: responsiveHeight(2),
  },
  foryou: {
    fontSize: responsiveHeight(2.5),
    fontWeight: '800',
    fontFamily: 'Lato',
  },
  trending: {
    fontSize: responsiveHeight(2.5),
    marginHorizontal: responsiveWidth(2),
    fontFamily: 'Lato',
    fontWeight: '800',
  },
  activeBtn: {
    color: '#844DFB',
  },
  inactiveBtn: {
    color: '#fff',
  },
  btns: {
    flexDirection: 'row',
  },
  topCart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D9D9D955',
    borderRadius: responsiveHeight(3),
  },
  upperimg: {
    zIndex: 2,
    marginLeft: -19,
  },
  secondimg: {
    position: 'absolute',
    left: responsiveWidth(3),
    top: responsiveHeight(1.3),
    zIndex: 1,
  },
  lastimg: {
    position: 'absolute',
    left: responsiveWidth(9),
    top: responsiveHeight(2),
  },
  cartTextParent: {
    justifyContent: 'space-evenly',
  },
  carttext: {
    fontSize: responsiveHeight(2),
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'lato',
  },
  cartHead: {
    color: '#fff',
    fontSize: responsiveHeight(3),
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(1),
  },
  chatHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dailytext: {
    width: responsiveHeight(20),
    fontFamily: 'lato',
    fontSize: responsiveHeight(2),
    color: '#fff',
    textAlign: 'center',
    marginLeft: -responsiveHeight(1),
  },
  more:{
    color:"#844DFB"
  },
  chartCart:{
    lexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D9D9D955',
    borderRadius: responsiveHeight(3),

  },
  charttextParent:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:responsiveWidth(2)
  },
  charttext:{
    color:"#fff",
    fontSize:responsiveHeight(2),
    fontWeight:"700",
    marginVertical:responsiveHeight(2)
  },
  item:{flexDirection:"row",
justifyContent:"space-between",
marginHorizontal:responsiveWidth(1.2)},
  innerItem:{
    flexDirection:"row",
  alignItems:"center",
  width:responsiveWidth(70),
  
},
chatTextParent:{
    marginLeft:responsiveWidth(3)
}

});
