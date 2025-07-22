import React from 'react';
import { View } from 'react-native';
import WlbText from 'components/WlbText';
import WlbIcon from 'components/WlbIcon';
import { useUnit } from 'context/unit';
import { useTheme } from 'context/theme';
import { ExerciseCategory, ExerciseGroupFull, ExerciseRow } from 'db/types';
import { VALID_FIELDS } from 'const';

interface PR {
  badgeType: string;
  exerciseRowId: number;
}

interface WorkoutExerciseListProps {
  exerciseGroups: ExerciseGroupFull[];
  prs: PR[];
}

export default function WorkoutExerciseList({
  exerciseGroups,
  prs,
}: WorkoutExerciseListProps) {
  const { formatValueWithUnit } = useUnit();
  const theme = useTheme();

  function exerciseRowToText(
    exerciseCategory: ExerciseCategory,
    row: ExerciseRow,
  ) {
    const fields = VALID_FIELDS[exerciseCategory];

    const formattedFields = fields.map((field) =>
      formatValueWithUnit(row[field] ?? 0, field),
    );

    const joiner = exerciseCategory === 'weighted' ? ' x ' : ' in ';

    return formattedFields.join(joiner);
  }

  return (
    <View style={{ gap: 8 }}>
      {exerciseGroups.map((group) => (
        <View key={group.id} style={{ gap: 8 }}>
          <WlbText fontWeight="bold">{group.exercise.name}</WlbText>
          <View style={{ gap: 4 }}>
            {group.exerciseRows.map((row, index) => {
              const rowPRs = prs.filter((pr) => pr.exerciseRowId === row.id);
              return (
                <View key={row.id} style={{ gap: 4 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <WlbText color="sub">Set {index + 1}</WlbText>
                    <WlbText>
                      {exerciseRowToText(group.exercise.type, row)}
                    </WlbText>
                  </View>
                  {rowPRs.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        justifyContent: 'flex-end',
                      }}
                    >
                      {rowPRs.map((pr) => (
                        <View
                          key={pr.badgeType}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            borderWidth: 1,
                            borderColor: theme.main,
                            borderRadius: 8,
                            paddingHorizontal: 4,
                          }}
                        >
                          <WlbIcon name="trophy" color="main" size={14} />
                          <WlbText key={pr.badgeType} size={14} color="main">
                            {pr.badgeType}
                          </WlbText>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
