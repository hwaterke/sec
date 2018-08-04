import React from 'react';
import {Button, Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../constants/styles';
import {ExercisesAddScreen} from './ExercisesAddScreen';
import {ExercisesDetailScreen} from './ExercisesDetailScreen';
import {ExercisesEditScreen} from './ExercisesEditScreen';
import {ExercisesListScreen} from './ExercisesListScreen';

export const ExercisesNavigation = createStackNavigator(
  {
    ExercisesList: {
      screen: ExercisesListScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Exercises',
        headerStyle:
          navigation.state.params && navigation.state.params.edit
            ? globalStyles.headerEdit
            : globalStyles.header,
        headerTintColor: colors.headerTintColor,
        headerRight: (
          <Button
            color={
              Platform.OS === 'ios'
                ? colors.headerTintColor
                : colors.headerColor
            }
            title={
              navigation.state.params && navigation.state.params.edit
                ? 'Done'
                : 'Edit'
            }
            onPress={() =>
              navigation.setParams({
                edit: !(navigation.state.params && navigation.state.params.edit)
              })
            }
          />
        )
      })
    },
    ExercisesDetail: {
      screen: ExercisesDetailScreen,
      navigationOptions: {
        title: 'Detail',
        headerStyle: globalStyles.header,
        headerTintColor: colors.headerTintColor
      }
    },
    ExercisesAdd: {
      screen: ExercisesAddScreen,
      navigationOptions: {
        title: 'New exercise',
        headerStyle: globalStyles.header,
        headerTintColor: colors.headerTintColor
      }
    },
    ExercisesEdit: {
      screen: ExercisesEditScreen,
      navigationOptions: {
        title: 'Edit exercise',
        headerStyle: globalStyles.headerEdit,
        headerTintColor: colors.headerTintColor
      }
    }
  },
  {
    cardStyle: globalStyles.card
  }
);
