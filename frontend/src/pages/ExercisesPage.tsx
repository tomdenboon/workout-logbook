import { Add, Search as SearchIcon } from '@mui/icons-material';
import {
  Divider,
  Fab,
  IconButton,
  InputBase,
  List,
  ListSubheader,
  Stack,
  alpha,
  styled,
} from '@mui/material';
import AppContainer from 'src/components/AppContainer';
import ExerciseCard from 'src/features/workout/components/ExerciseCard';
import useExercises from 'src/features/workout/hooks/useExercises';
import { Link, useParams } from 'react-router-dom';
import { ModalOutlet, useModalOutletContext } from 'src/components/ModalOutlet';
import FullScreenModal from 'src/components/FullScreenModal';
import useSelectIds from 'src/hooks/useSelectIds';
import React, { useState } from 'react';
import useAddExercises from 'src/features/workout/hooks/useAddExercises';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

function Exercises() {
  const { workoutId, exerciseId } = useParams();
  const [search, setSearch] = useState('');
  const { exercises, groupedExercises, filteredExercises } = useExercises(search);
  const { selectedIds, toggleId, hasSelection } = useSelectIds();
  const { modalControls } = useModalOutletContext();
  const { add } = useAddExercises();
  const editExercise = exercises?.find((val) => val.id === exerciseId);

  const Component = modalControls != undefined ? FullScreenModal : AppContainer;

  const searchComponent = (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );

  return (
    <Component
      header={{
        rightButton: (
          <IconButton component={Link} to="add" color="inherit">
            <Add />
          </IconButton>
        ),
        afterTitle: searchComponent,
        title: 'Exercises',
      }}
      {...modalControls}
      sx={{ paddingTop: 12, paddingX: 0 }}
      slideLeft
    >
      {search &&
        filteredExercises?.map((exercise) => (
          <React.Fragment key={exercise.id}>
            <ExerciseCard
              exercise={exercise}
              onClick={() => toggleId(exercise.id)}
              isSelected={selectedIds.includes(exercise.id)}
            />
            <Divider />
          </React.Fragment>
        ))}
      {!search &&
        groupedExercises &&
        Object.keys(groupedExercises)
          .sort((a, b) => a.localeCompare(b))
          .map((key) => (
            <React.Fragment key={key}>
              <List
                sx={{ pb: 0 }}
                key={key}
                subheader={<ListSubheader disableSticky>{key.toLocaleUpperCase()}</ListSubheader>}
              >
                <Divider />
                {groupedExercises[key].map((exercise, index) => (
                  <React.Fragment key={exercise.id}>
                    <ExerciseCard
                      exercise={exercise}
                      onClick={() => toggleId(exercise.id)}
                      isSelected={selectedIds.includes(exercise.id)}
                    />
                    {index !== groupedExercises[key].length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Divider />
            </React.Fragment>
          ))}
      <ModalOutlet exercise={editExercise} />
      {workoutId && (
        <Stack
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          direction="row"
          spacing={1}
          justifyContent="center"
        >
          <Fab
            disabled={!hasSelection}
            variant="extended"
            color="primary"
            onClick={() => add(workoutId, selectedIds)}
          >
            Add exercise{selectedIds.length > 1 ? 's' : ''} ({selectedIds.length})
          </Fab>
        </Stack>
      )}
    </Component>
  );
}

export default Exercises;
