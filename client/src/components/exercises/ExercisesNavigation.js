import React from 'react';
import {Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {ExercisesListScreen} from './ExercisesListScreen';
import {ExercisesAddScreen} from './ExercisesAddScreen';
import {ExercisesEditScreen} from './ExercisesEditScreen';
import {globalStyles} from '../../constants/styles';
import {colors} from '../../constants/colors';

ExercisesListScreen.navigationOptions = ({navigation}) => ({
  title: 'Exercises',
  headerStyle:
    navigation.state.params && navigation.state.params.edit
      ? globalStyles.headerEdit
      : globalStyles.header,
  headerTintColor: colors.headerTintColor,
  headerRight: (
    <Button
      color={colors.headerTintColor}
      title={
        navigation.state.params && navigation.state.params.edit
          ? 'Done'
          : 'Edit'
      }
      onPress={() =>
        navigation.setParams({
          edit: !(navigation.state.params && navigation.state.params.edit)
        })}
    />
  )
});

ExercisesAddScreen.navigationOptions = {
  title: 'New exercise',
  headerStyle: globalStyles.header,
  headerTintColor: colors.headerTintColor
};

ExercisesEditScreen.navigationOptions = {
  title: 'Edit exercise',
  headerStyle: globalStyles.headerEdit,
  headerTintColor: colors.headerTintColor
};

export const ExercisesNavigation = StackNavigator(
  {
    ExercisesList: {
      screen: ExercisesListScreen
    },
    ExercisesAdd: {
      screen: ExercisesAddScreen
    },
    ExercisesEdit: {
      screen: ExercisesEditScreen
    }
  },
  {
    cardStyle: globalStyles.card
  }
);
