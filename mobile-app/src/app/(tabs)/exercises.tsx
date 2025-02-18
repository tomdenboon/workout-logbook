import React, { useState } from 'react';
import ExerciseList from '../../components/ExercisePage';
import WlbView from '../../components/WlbView';

export default function ExercisesTab() {
  return (
    <WlbView>
      <ExerciseList />
    </WlbView>
  );
}
