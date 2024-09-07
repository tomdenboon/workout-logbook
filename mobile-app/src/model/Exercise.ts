import { Model, tableSchema } from '@nozbe/watermelondb';
import {
  field,
  children,
  nochange,
  text,
} from '@nozbe/watermelondb/decorators';
import { ExerciseGroup } from './ExerciseGroup';
import { TableName } from './tables';

export const EXERCISE_CATEGORIES = {
  REPS: 'Reps',
  WEIGHTED: 'Weighted',
  DURATION: 'Duration',
  DISTANCE: 'Distance',
} as const;

export const VALID_FIELDS = {
  REPS: ['reps'],
  WEIGHTED: ['reps', 'weight'],
  DURATION: ['time'],
  DISTANCE: ['time', 'distance'],
} as const;

type ExerciseCategory = keyof typeof EXERCISE_CATEGORIES;

export class Exercise extends Model {
  static table = TableName.Exercise;
  static associations = {
    exerciseGroups: { type: 'has_many' as const, foreignKey: 'exercise_id' },
  };

  @text('name') name!: string;
  @field('type') type!: ExerciseCategory;
  @children(TableName.ExerciseGroup) exerciseGroups!: ExerciseGroup[];
  @nochange
  @field('default_id')
  defaultId?: string;
}

export const exerciseSchema = tableSchema({
  name: TableName.Exercise,
  columns: [
    { name: 'name', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'default_id', type: 'string', isOptional: true },
  ],
});
