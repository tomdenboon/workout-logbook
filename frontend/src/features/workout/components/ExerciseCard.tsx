import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import ActionDropdown from 'src/components/ActionDropdown';
import { useNavigate } from 'react-router-dom';
import { ExerciseResponse, useDeleteExerciseMutation } from 'src/store/workoutLogbookApi';
import { Check } from '@mui/icons-material';

interface ExerciseCardProps {
  exercise: ExerciseResponse;
  isSelected?: boolean;
  onClick?: () => void;
}

function ExerciseCard(props: ExerciseCardProps) {
  const { exercise, onClick, isSelected = false } = props;
  const navigate = useNavigate();
  const [deleteExercise] = useDeleteExerciseMutation();

  return (
    <ListItem
      disablePadding
      secondaryAction={
        !isSelected && (
          <ActionDropdown
            actions={[
              { label: 'Edit', action: () => navigate(`${exercise.id}`) },
              {
                label: 'Delete',
                action: () => deleteExercise({ id: exercise.id }),
              },
            ]}
          />
        )
      }
    >
      <ListItemButton
        selected={isSelected}
        onClick={() => (onClick ? onClick() : navigate(exercise.id.toString()))}
      >
        <ListItemText primary={exercise.name} />
        {isSelected && <Check color="primary" sx={{ mr: 1 }} />}
      </ListItemButton>
    </ListItem>
  );
}

export default ExerciseCard;
