import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import ActionDropdown from 'components/ActionDropdown';
import { Exercise } from 'features/workout/types';
import { useNavigate } from 'react-router-dom';
import { useDeleteExerciseMutation } from 'services/exerciseApi';

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit: () => void;
  isSelected?: boolean;
  onClick?: () => void;
}

function ExerciseCard(props: ExerciseCardProps) {
  const { exercise, onClick, isSelected = false, onEdit } = props;
  const navigate = useNavigate();
  const [deleteExercise] = useDeleteExerciseMutation();

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <ActionDropdown
          actions={[
            { label: 'Edit', action: () => onEdit() },
            { label: 'Delete', action: () => deleteExercise(exercise.id) },
          ]}
        />
      }
    >
      <ListItemButton
        selected={isSelected}
        onClick={() => (onClick ? onClick() : navigate(exercise.id.toString()))}
      >
        <ListItemText primary={exercise.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default ExerciseCard;
