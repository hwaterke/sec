import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Screen, Row, Text, ListView} from '@shoutem/ui';
import {musclesArraySelector} from '../../selectors/muscles';
import {Banner} from '../simple/Banner';
import {MuscleResource} from '../../entities/MuscleResource';

const mapStateToProps = (state) => ({
  muscles: musclesArraySelector(state),
});

@connect(mapStateToProps)
export class MusclesListScreen extends React.Component {

  static propTypes = {
    muscles: React.PropTypes.arrayOf(MuscleResource.propType).isRequired
  };

  renderRow = (muscle) => {
    return (
      <Row style={{borderColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth}}>
        <Text>{muscle.name}</Text>
      </Row>
    );
  };

  render() {
    return (
      <Screen>
        <Banner />
        <ListView
          data={this.props.muscles}
          renderRow={this.renderRow}
        />
      </Screen>
    );
  }
}
