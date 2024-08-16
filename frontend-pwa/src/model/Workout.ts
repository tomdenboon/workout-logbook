import { Model, Query, tableSchema } from '@nozbe/watermelondb';
import { children, date, field, text } from '@nozbe/watermelondb/decorators';
import { TableName } from './tables';
import { ExerciseGroup } from './ExerciseGroup';

export class Workout extends Model {
  static table = TableName.Workout;
  static associations = {
    [TableName.ExerciseGroup]: {
      type: 'has_many' as const,
      foreignKey: 'workout_id',
    },
  };

  @field('name') name!: string;
  @text('note') note?: string;
  @field('workout_type') workoutType!: string;
  @date('start_at') startAt?: Date;
  @date('completed_at') completedAt?: Date;
  @children(TableName.ExerciseGroup) exerciseGroups!: Query<ExerciseGroup>;
}

export const workoutSchema = tableSchema({
  name: TableName.Workout,
  columns: [
    { name: 'name', type: 'string' },
    { name: 'note', type: 'string', isOptional: true },
    { name: 'workout_type', type: 'string' },
    { name: 'start_at', type: 'number', isOptional: true },
    { name: 'completed_at', type: 'number', isOptional: true },
  ],
});
