import {Text, View, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RadialGradient from 'react-native-radial-gradient';
interface IProps {
  navigation?: {
    replace: React.FC;
  };
}
// import landing from "../asserts/landing.png"
interface IState {}
export class Landing extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation?.replace('main');
    }, 2000);
  }
  render() {
    return (
      <RadialGradient
        style={{width: responsiveWidth(100), height: responsiveHeight(100)}}
        colors={['#844DFB', '#251741']}
        stops={[0.3, 0.75]}
        center={[responsiveWidth(100) / 2, responsiveHeight(100) / 2]}
        radius={200}>
        <View style={Styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../asserts/landing.png')} />
            <Text style={Styles.text}>Home of Music</Text>
          </View>
        </View>
      </RadialGradient>
    );
  }
}

export default Landing;
const Styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato',
    fontWeight: '700',
    color: '#fff',
    fontSize: responsiveHeight(3),
  },
});
