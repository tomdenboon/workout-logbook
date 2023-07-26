import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import ActionDropdown from 'components/ActionDropdown';
import { useNavigate } from 'react-router-dom';
import { ExerciseResponse, useDeleteExerciseMutation } from 'store/monkeylogApi';

interface ExerciseCardProps {
  exercise: ExerciseResponse;
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
            { label: 'Delete', action: () => deleteExercise({ id: exercise.id }) },
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
