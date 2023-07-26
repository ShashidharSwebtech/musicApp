import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Globalstate, item} from '../redux/Reducer';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Styles} from './Home';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
interface props {
  state: Globalstate;
}
interface IState {}
export class PlayList extends Component<props, IState> {
  constructor(props: props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <View style={Styles.container}>
        <Text
          style={{
            color: '#fff',
            fontSize: responsiveHeight(3),
            marginTop: responsiveHeight(3),
            marginBottom: responsiveHeight(2),
          }}>
          Favirate Music
        </Text>
        <FlatList
          data={this.props.state.favData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={Styles.item}
                // onPress={()=>this.props.navigation?.navigate("music",{data:item})}
              >
                <View style={Styles.innerItem}>
                  {/* <Text style={Styles.ItemId}>{item.id}</Text> */}
                  <Image
                    source={{
                      uri: item.artwork,
                      width: responsiveWidth(12),
                      height: responsiveHeight(6),
                    }}
                    style={Styles.itemimg}
                  />
                  <View style={Styles.chatTextParent}>
                    <Text style={{color: '#fff'}}>{item.title}</Text>
                    <Text style={{color: '#fff'}}>{item.artist}</Text>
                  </View>
                </View>
                <MaterialIcon
                  name="download-circle-outline"
                  color={'#844DFB'}
                  size={responsiveHeight(5)}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(PlayList);
// const Styles=StyleSheet.create({

// })
