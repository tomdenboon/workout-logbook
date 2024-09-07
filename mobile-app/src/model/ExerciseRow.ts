import { Model, Relation, tableSchema } from '@nozbe/watermelondb';
import { field, immutableRelation } from '@nozbe/watermelondb/decorators';
import { ExerciseGroup } from './ExerciseGroup';
import { TableName } from './tables';

export class ExerciseRow extends Model {
  static table = TableName.ExerciseRow;
  static associations = {
    [TableName.ExerciseGroup]: {
      type: 'belongs_to' as const,
      key: 'exercise_group_id',
    },
  };

  @field('is_lifted') isLifted!: boolean;
  @field('reps') reps?: number;
  @field('weight') weight?: number;
  @field('time') time?: number;
  @field('distance') distance?: number;
  @field('rpe') rpe?: number;
  @immutableRelation(TableName.ExerciseGroup, 'exercise_group_id')
  exerciseGroup!: Relation<ExerciseGroup>;
}

export const exerciseRowSchema = tableSchema({
  name: TableName.ExerciseRow,
  columns: [
    { name: 'exercise_group_id', type: 'string', isIndexed: true },
    { name: 'is_lifted', type: 'boolean' },
    { name: 'reps', type: 'number', isOptional: true },
    { name: 'weight', type: 'number', isOptional: true },
    { name: 'time', type: 'number', isOptional: true },
    { name: 'distance', type: 'number', isOptional: true },
    { name: 'rpe', type: 'number', isOptional: true },
  ],
});
