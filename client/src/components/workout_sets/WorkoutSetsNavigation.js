import React from 'react';
import {Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {WorkoutSetsListScreen} from './WorkoutSetsListScreen';
import {WorkoutSetsAddScreen} from './WorkoutSetsAddScreen';
import {WorkoutSetsEditScreen} from './WorkoutSetsEditScreen';
import {globalStyles} from '../../constants/styles';
import {colors} from '../../constants/colors';

WorkoutSetsListScreen.navigationOptions = {
  title: 'Sets',
  header: ({state, setParams}) => ({
    style: globalStyles.header,
    tintColor: colors.headerTintColor,
    right: (
      <Button
        color={colors.headerTintColor}
        title={(state.params && state.params.edit) ? 'Done' : 'Edit'}
        onPress={() => setParams({edit: !(state.params && state.params.edit)})}
      />
    ),
  }),
};

WorkoutSetsAddScreen.navigationOptions = {
  title: 'New set',
  header: {
    style: globalStyles.header,
    tintColor: colors.headerTintColor
  }
};

WorkoutSetsEditScreen.navigationOptions = {
  title: 'Edit set',
  header: {
    style: globalStyles.header,
    tintColor: colors.headerTintColor
  }
};

export const WorkoutSetsNavigation = StackNavigator({
  WorkoutSetsList: {
    screen: WorkoutSetsListScreen,
  },
  WorkoutSetsAdd: {
    screen: WorkoutSetsAddScreen,
  },
  WorkoutSetsEdit: {
    screen: WorkoutSetsEditScreen,
  },
}, {
  cardStyle: globalStyles.card
});
