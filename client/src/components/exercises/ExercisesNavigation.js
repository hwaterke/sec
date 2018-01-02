import React from 'react';
import {Button, Platform} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {ExercisesListScreen} from './ExercisesListScreen';
import {ExercisesAddScreen} from './ExercisesAddScreen';
import {ExercisesEditScreen} from './ExercisesEditScreen';
import {globalStyles} from '../../constants/styles';
import {colors} from '../../constants/colors';
import {ExercisesDetailScreen} from './ExercisesDetailScreen';

ExercisesListScreen.navigationOptions = ({navigation}) => ({
  title: 'Exercises',
  headerStyle:
    navigation.state.params && navigation.state.params.edit
      ? globalStyles.headerEdit
      : globalStyles.header,
  headerTintColor: colors.headerTintColor,
  headerRight: (
    <Button
      color={
        Platform.OS === 'ios' ? colors.headerTintColor : colors.headerColor
      }
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

ExercisesDetailScreen.navigationOptions = {
  title: 'Detail',
  headerStyle: globalStyles.header,
  headerTintColor: colors.headerTintColor
};

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
    ExercisesDetail: {
      screen: ExercisesDetailScreen
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
