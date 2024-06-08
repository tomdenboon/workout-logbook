import { Add } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddItemCard from 'src/components/AddItemCard';

import FullScreenModal from 'src/components/FullScreenModal';
import { ModalOutlet, useModalOutletContext } from 'src/components/ModalOutlet';
import MeasurementCard from 'src/features/measurement/components/MeasurementCard';
import { useGetMeasurementsQuery } from 'src/store/workoutLogbookApi';

function MeasurementPage() {
  const { data } = useGetMeasurementsQuery();
  const { modalControls } = useModalOutletContext();
  const navigate = useNavigate();

  return (
    <FullScreenModal
      header={{
        title: 'Measurements',
        rightButton: (
          <IconButton onClick={() => navigate('add')} color="inherit">
            <Add />
          </IconButton>
        ),
      }}
      {...modalControls}
    >
      <Grid container spacing={2}>
        {data?.length == 0 && (
          <Grid item xs={12} md={6}>
            <AddItemCard item="measurement" onClick={() => navigate('add')} />
          </Grid>
        )}

        {data?.map((measurement) => (
          <Grid key={measurement.id} item xs={12} md={6}>
            <MeasurementCard key={measurement.id} measurement={measurement} />
          </Grid>
        ))}
      </Grid>
      <ModalOutlet />
    </FullScreenModal>
  );
}

export default MeasurementPage;
