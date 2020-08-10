import React, { Component } from 'react';
import { NetInfo, Image, View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';


class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {

      abc: {},
      location: true,
      isLoading: true,
      icon: 'default',
      temp: '',
      precipChance: '',
      summary: 'Weather is Offline',
      locationName: 'Current \nWeather'
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {

      return fetch('https://api.darksky.net/forecast/' + "40167451faa471bc517e60069321f1f6" + '/' + info.coords.latitude + ',' + info.coords.longitude).then((response) => response.json()).then((responseJson) => {
        this.setState({ summary: responseJson.currently.summary, temp: (Math.round(10 * responseJson.currently.temperature) / 10), icon: responseJson.currently.icon, precipChance: Math.round(responseJson.currently.precipProbability * 1000) / 10, isLoading: false });
      }).catch((error) => {
        console.error("======for this i cant get  weather========>>", error);
        this.setState({ isLoading: false });
      });
    },
      error => { this.setState({ location: false, isLoading: false }), alert('Cant Not Access Your Location for weather') },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator size={'small'} color="#56CCF2" />
        </View>
      )
    }

    const icons = {
      'partly-cloudy-day': require('./weather-icons/partly-cloudy-day.png'),
      'partly-cloudy-night': require('./weather-icons/partly-cloudy-night.png'),
      'clear-day': require('./weather-icons/clear-day.png'),
      'clear-night': require('./weather-icons/clear-night.png'),
      'rain': require('./weather-icons/rain.png'),
      'snow': require('./weather-icons/snow.png'),
      'sleet': require('./weather-icons/sleet.png'),
      'wind': require('./weather-icons/wind.png'),
      'fog': require('./weather-icons/fog.png'),
      'cloudy': require('./weather-icons/cloudy.png'),
      'hail': require('./weather-icons/hail.png'),
      'thunderstorm': require('./weather-icons/thunderstorm.png'),
      'tornado': require('./weather-icons/tornado.png'),
      'meteor-shower': require('./weather-icons/meteor-shower.png'),
      'default': require('./weather-icons/default.png')
    }

    function getIcon(icon) {
      return icons[icon];
    }
    let c = (this.state.temp - 32) * 5 / 9
    let celcius = c.toFixed() + '°C'
    // console.log('tempurature in celsius::', celcius)
    // console.log('tempurature in summary::', this.state.summary)
    return (
      <View>
        {/* <View style={styles.titleContainer}>
          <Text style={[styles.title, (this.props.location && this.props.location.length <= 13) && styles.customTitle]}>{this.state.locationName}</Text>
        </View> */}
        {/* <View style={[styles.summaryContainer, (this.state.summary.length >= 20) && styles.summaryContainerLong]}>
          <Text style={styles.summary}>{this.state.summary}</Text>
          <Image style={styles.icon} source={getIcon(this.state.icon)} />
        </View> */}
        {this.state.location ?
          <View style={styles.tempContainer}>
            <View ><Text style={{ color: '#CDF0FF', fontSize: 12 }}>Today</Text></View>
            <Text style={{ fontSize: 30, color: '#fff' }}>{celcius}</Text>
            <Text style={{ color: '#fff', fontWeight: '400', fontSize: 14 }} >{this.state.summary}</Text>

          </View> :
          null

        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderTopColor: '#8294a0',
    // borderBottomWidth: 1,
    // borderBottomColor: '#8294a0',
    paddingVertical: 10,
    height: 100,
    backgroundColor: '#FFFFFF',
    marginTop: 5
  },
  titleContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#8294a0'
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    color: 'black',
    fontWeight: '500',
    textAlign: 'right'
  },
  customTitle: {
    marginTop: 13,
    marginBottom: 13,
    marginRight: 5,
    color: 'black',
    fontWeight: '500',
    textAlign: 'right'
  },
  summaryContainer: {
    flex: 1.5,
    flexDirection: 'row',
    marginTop: 12
  },
  summaryContainerLong: {
    flex: 1.5,
    flexDirection: 'row',
    marginTop: 5
  },
  summary: {
    marginLeft: 20,
    marginRight: 10
  },
  icon: {
    marginTop: -6,
    height: 50,
    width: 50,


  },
  tempContainer: {
    // flex: .5,
    // flexDirection: 'column',
    // marginTop: 3,
    // //marginRight: 15,
    // alignItems: 'flex-start',
    // marginLeft: 20
  },
  precipImage: {
    marginTop: 3,

  },
  spinner: {
    flex: -1,
    marginTop: 12,
    marginBottom: 12
  }
});

export { WeatherWidget };
