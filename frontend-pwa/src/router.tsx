import { Navigate, createBrowserRouter } from 'react-router-dom';
import WorkoutPage from './view/workouts/{id}';
import ExercisesPage from './view/exercises';
import BasePage from './view';
import WorkoutsPage from './view/workouts';
import WorkoutExercisesPage from './view/workouts/{id}/exercises';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
    children: [
      {
        index: true,
        element: <Navigate to="workouts" />,
      },
      {
        path: 'exercises',
        element: <ExercisesPage />,
      },
      {
        path: 'workouts',
        element: <WorkoutsPage />,
        children: [
          {
            path: ':workoutId',
            element: <WorkoutPage />,
            children: [
              {
                path: 'exercises',
                element: <WorkoutExercisesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
