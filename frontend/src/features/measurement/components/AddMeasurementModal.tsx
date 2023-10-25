import ModalForm from 'src/components/ModalForm';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import { TEST } from 'src/features/measurement/types';
import { MeasurementCreateRequest, useCreateMeasurementMutation } from 'src/store/monkeylogApi';

export default function AddMeasurementModal() {
  const { modalControls } = useModalOutletContext();
  const [addMeasurement] = useCreateMeasurementMutation();

  return (
    <ModalForm<MeasurementCreateRequest>
      {...modalControls}
      title="Add measurement"
      initialState={{ name: '', metric: 'WEIGHT' }}
      renderOptions={[
        { key: 'name', label: 'Name' },
        { key: 'metric', label: 'Metric', options: TEST },
      ]}
      onSubmit={(measurementCreateRequest) => addMeasurement({ measurementCreateRequest }).unwrap()}
    />
  );
}
