import { useDatabase } from '@nozbe/watermelondb/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import Section from '../../components/Section';
import { Workout } from '../../model/Workout';
import Button from '../../components/Button';
import { TableName } from '../../model/tables';
import RootOutlet from '../../components/RootOutlet';
import { PageInner } from '../../components/Page';

function WorkoutsPage() {
  const database = useDatabase();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigate = useNavigate();

  const workoutCollection = database.get<Workout>(TableName.Workout);

  const createWorkout = () =>
    database.write(
      async () =>
        await workoutCollection.create((workout) => {
          workout.name = 'New Workout';
          workout.workoutType = 'Strength';
        }),
    );

  useEffect(() => {
    database
      .get<Workout>(TableName.Workout)
      .query()
      .observe()
      .subscribe((workouts) => {
        setWorkouts(workouts);
      });
  }, [database]);

  return (
    <PageInner header={{ title: 'Workouts' }}>
      <RootOutlet />
      <Section
        collapse
        title="Workouts"
        rightNode={
          <Button
            size="small"
            variant="secondary-outlined"
            onClick={createWorkout}
          >
            new workout
          </Button>
        }
      >
        <div className="grid grid-cols-3 gap-1">
          {workouts.map((w) => (
            <Card
              key={w.id}
              title={w.name}
              onClick={() => navigate('/workouts/' + w.id)}
            >
              <p>{w.workoutType}</p>
            </Card>
          ))}
        </div>
      </Section>
    </PageInner>
  );
}

export default WorkoutsPage;
