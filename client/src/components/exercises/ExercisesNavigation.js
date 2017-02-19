import React from 'react';
import {Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {ExercisesListScreen} from './ExercisesListScreen';
import {ExercisesAddScreen} from './ExercisesAddScreen';
import {ExercisesEditScreen} from './ExercisesEditScreen';
import {globalStyles} from '../../constants/styles';
import {colors} from '../../constants/colors';

ExercisesListScreen.navigationOptions = {
  title: 'Exercises',
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

ExercisesAddScreen.navigationOptions = {
  title: 'New exercise',
  header: {
    style: globalStyles.header,
    tintColor: colors.headerTintColor
  }
};

ExercisesEditScreen.navigationOptions = {
  title: 'Edit exercise',
  header: {
    style: globalStyles.header,
    tintColor: colors.headerTintColor
  }
};

export const ExercisesNavigation = StackNavigator({
  ExercisesList: {
    screen: ExercisesListScreen,
  },
  ExercisesAdd: {
    screen: ExercisesAddScreen,
  },
  ExercisesEdit: {
    screen: ExercisesEditScreen,
  },
}, {
  cardStyle: globalStyles.card
});
