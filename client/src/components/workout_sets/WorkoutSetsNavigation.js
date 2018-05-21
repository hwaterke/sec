import React from 'react'
import {StackNavigator} from 'react-navigation'
import {WorkoutSetsAddScreen} from './WorkoutSetsAddScreen'
import {WorkoutSetsEditScreen} from './WorkoutSetsEditScreen'
import {globalStyles} from '../../constants/styles'
import {colors} from '../../constants/colors'
import {SummaryListScreen} from '../summary/SummaryListScreen'
import {WorkoutSetsSummary} from '../summary/WorkoutSetsSummary'
import {Button, Platform} from 'react-native'

SummaryListScreen.navigationOptions = {
  title: 'History',
  headerStyle: globalStyles.header,
  headerTintColor: colors.headerTintColor,
}

WorkoutSetsSummary.navigationOptions = ({navigation}) => ({
  title: 'Summary',
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
          edit: !(navigation.state.params && navigation.state.params.edit),
        })}
    />
  ),
})

WorkoutSetsAddScreen.navigationOptions = {
  title: 'New set',
  headerStyle: globalStyles.header,
  headerTintColor: colors.headerTintColor,
}

WorkoutSetsEditScreen.navigationOptions = {
  title: 'Edit set',
  headerStyle: globalStyles.headerEdit,
  headerTintColor: colors.headerTintColor,
}

export const WorkoutSetsNavigation = StackNavigator(
  {
    SummaryList: {
      screen: SummaryListScreen,
    },
    Summary: {
      screen: WorkoutSetsSummary,
    },
    WorkoutSetsAdd: {
      screen: WorkoutSetsAddScreen,
    },
    WorkoutSetsEdit: {
      screen: WorkoutSetsEditScreen,
    },
  },
  {
    cardStyle: globalStyles.card,
  }
)
