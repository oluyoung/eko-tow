import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TouchableOpacity, ScrollView, View, Image, Text } from 'react-native';
import { getCarType, getTowTruckType } from '../../../store/actions';

import styles from './styles';
import { cars, towTrucks } from './vehicles';

const carList = [
  {uri: '../../../assets/sedan.png', type: cars.SEDAN},
  {uri: '../../../assets/sedan.png', type: cars.SALOON},
  {uri: '../../../assets/sedan.png', type: cars.SUV},
  {uri: '../../../assets/sedan.png', type: cars.SUV_4WD},
  {uri: '../../../assets/sedan.png', type: cars.XL}
];

const towTruckList = [
  {uri: '../../../assets/sedan.png', type: towTrucks.FLATBED},
  {uri: '../../../assets/sedan.png', type: towTrucks.DRAG}
];

class VehicleTypesDisplay extends Component {

  getVehicleType = (isCar, type) => {
    if (isCar) {
      this.props.getCarType(type);
    } else {
      this.props.getTowTruckType(type);
    }
  }

  render() {
    let renderList = [...carList];
    let renderTitle = 'SELECT YOUR CAR TYPE';
    let isCar = true;

    if (this.props.useTowTruckList) {
      renderList = [...towTruckList];
      renderTitle = 'SELECT TOW TRUCK TYPE';
      isCar = false;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{renderTitle}</Text>
        <ScrollView horizontal>
          {renderList.map((vehicle, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.wrap}
              onPress={() => this.getVehicleType(isCar, vehicle.type)}>
              <View style={{flex: 2}}>
                <Image source={require('../../../assets/sedan.png')} style={styles.image} />
              </View>
              <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                <Text style={styles.text}>{vehicle.type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCarType: (type) => dispatch(getCarType(type)),
  getTowTruckType: (type) => dispatch(getTowTruckType(type))
})

export default connect(null, mapDispatchToProps)(VehicleTypesDisplay);
