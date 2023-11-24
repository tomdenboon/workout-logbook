import { ExerciseRowResponse, ValidFields } from 'src/store/baseMonkeylogApi';

export default function formatExercise(validFields: ValidFields, exerciseRow: ExerciseRowResponse) {
  const { weight, reps, time, distance } = validFields;
  let str = '';

  if (weight && exerciseRow.weight) {
    str += exerciseRow.weight + ' kg';
  }

  if (reps) {
    if (str.length > 0) {
      str += ' x ' + exerciseRow.reps ?? 0;
    } else {
      str += (exerciseRow.reps ?? 0) + ' reps';
    }

    if (exerciseRow.rpe) {
      str += ` @ ${exerciseRow.rpe}`;
    }
  }

  if (distance && exerciseRow.distance) {
    str += exerciseRow.distance + ' km';
  }

  if (time && exerciseRow.time) {
    if (str.length > 0) {
      str += ' | ';
    }
    str += exerciseRow.time + ' secs';
  }

  return str;
}
