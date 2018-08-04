import React from 'react'
import {Button, Platform} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import {colors} from '../../constants/colors'
import {globalStyles} from '../../constants/styles'
import {SummaryListScreen} from '../summary/SummaryListScreen'
import {WorkoutSetsSummary} from '../summary/WorkoutSetsSummary'
import {WorkoutSetsAddScreen} from './WorkoutSetsAddScreen'
import {WorkoutSetsEditScreen} from './WorkoutSetsEditScreen'

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
        })
      }
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

export const WorkoutSetsNavigation = createStackNavigator(
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
