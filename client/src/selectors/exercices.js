import {arraySelector} from 'hw-react-shared';
import R from 'ramda';
import {createSelector} from 'reselect';
import {ExerciseResource} from '../entities/ExerciseResource';

export const displayNameOfExercise = exercise => {
  if (exercise.cardio) {
    return 'Cardio';
  }
  return exercise.main_muscle || 'Other';
};

const muscleName = e => e.main_muscle || (e.cardio && 'Cardio') || 'zzzz';
const sortByName = R.sortWith([R.ascend(muscleName), R.ascend(R.prop('name'))]);
const groupByMuscle = R.groupBy(muscleName);

export const exercisesByMuscleThenNameSelector = createSelector(
  arraySelector(ExerciseResource),
  exercisesArray => {
    const muscleName = e => e.main_muscle || (e.cardio && 'Cardio') || 'zzzz';
    return R.sortWith([R.ascend(muscleName), R.ascend(R.prop('name'))])(
      exercisesArray
    );
  }
);

export const exercicesGroupedByMuscle = createSelector(
  arraySelector(ExerciseResource),
  exercices => {
    const groups = groupByMuscle(sortByName(exercices));
    return Object.keys(groups).map(muscle => ({
      data: groups[muscle],
      title: muscle === 'zzzz' ? 'Other' : muscle
    }));
  }
);
