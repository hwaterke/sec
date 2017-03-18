import {StackNavigator} from 'react-navigation';
import {globalStyles} from '../../constants/styles';
import {SummaryListScreen} from './SummaryListScreen';
import {WorkoutSetsSummary} from './WorkoutSetsSummary';
import {colors} from '../../constants/colors';

SummaryListScreen.navigationOptions = {
  title: 'History',
  header: {
    style: globalStyles.header,
    tintColor: colors.headerTintColor
  }
};

WorkoutSetsSummary.navigationOptions = {
  title: 'Summary',
  header: {
    style: globalStyles.header,
    tintColor: colors.headerTintColor
  }
};

export const SummaryNavigator = StackNavigator({
  SummaryList: {
    screen: SummaryListScreen,
  },
  Summary: {
    screen: WorkoutSetsSummary,
  }
}, {
  cardStyle: globalStyles.card
});
