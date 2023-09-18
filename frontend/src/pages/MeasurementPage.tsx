import { Add } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';

import FullScreenModal from 'src/components/FullScreenModal';
import AddMeasurementModal from 'src/features/measurement/components/AddMeasurementModal';
import AddMeasurementPointModal from 'src/features/measurement/components/AddMeasurementPointModal';
import MeasurementCard from 'src/features/measurement/components/MeasurementCard';
import useModal, { IUseModal, ModalType } from 'src/hooks/useModal';
import { useGetMeasurementsQuery } from 'src/store/monkeylogApi';

function MeasurementPage(props: IUseModal) {
  const { isOpen, close } = props;
  const { data } = useGetMeasurementsQuery();
  const measurementModal = useModal(ModalType.Measurement);
  const measurementPointModal = useModal(ModalType.MeasurementPoint);

  return (
    <FullScreenModal
      header={{
        title: 'Measurements',
        rightButton: (
          <IconButton onClick={() => measurementModal.open()} color="inherit">
            <Add />
          </IconButton>
        ),
      }}
      isOpen={isOpen}
      close={close}
    >
      <Grid container spacing={2}>
        {data?.map((measurement) => (
          <Grid key={measurement.id} item xs={12} md={6}>
            <MeasurementCard
              key={measurement.id}
              measurement={measurement}
              openAddMeasurementPointModal={() => measurementPointModal.open(measurement.id)}
            />
          </Grid>
        ))}
      </Grid>
      {measurementModal.isOpen && <AddMeasurementModal {...measurementModal} />}
      {measurementPointModal.value && (
        <AddMeasurementPointModal
          measurementId={measurementPointModal.value}
          {...measurementPointModal}
        />
      )}
    </FullScreenModal>
  );
}

export default MeasurementPage;
