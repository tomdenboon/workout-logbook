import { Model, Query, Relation, tableSchema } from '@nozbe/watermelondb';
import { children, immutableRelation } from '@nozbe/watermelondb/decorators';
import { Exercise } from './Exercise';
import { Workout } from './Workout';
import { ExerciseRow } from './ExerciseRow';
import { TableName } from './tables';

export class ExerciseGroup extends Model {
  static table = TableName.ExerciseGroup;
  static associations = {
    [TableName.Workout]: { type: 'belongs_to' as const, key: 'workout_id' },
    [TableName.Exercise]: { type: 'belongs_to' as const, key: 'exercise_id' },
    [TableName.ExerciseRow]: {
      type: 'has_many' as const,
      foreignKey: 'exercise_group_id',
    },
  };

  @immutableRelation(TableName.Workout, 'workout_id')
  workout!: Relation<Workout>;
  @immutableRelation(TableName.Exercise, 'exercise_id')
  exercise!: Relation<Exercise>;
  @children(TableName.ExerciseRow)
  exerciseRows!: Query<ExerciseRow>;

  async getExerciseName() {}
}

export const exerciseGroupSchema = tableSchema({
  name: TableName.ExerciseGroup,
  columns: [
    { name: 'workout_id', type: 'string', isIndexed: true },
    { name: 'exercise_id', type: 'string', isIndexed: true },
  ],
});
