import { useParams } from 'react-router-dom';
import ModalForm from 'src/components/ModalForm';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import { useCreateMeasurementPointMutation } from 'src/store/monkeylogApi';

export default function AddMeasurementPointModal() {
  const { modalControls } = useModalOutletContext();
  const { measurementId } = useParams();
  const [addMeasurementPoint] = useCreateMeasurementPointMutation();

  return (
    <ModalForm
      {...modalControls}
      title="Add Measurement Point"
      renderOptions={[
        {
          key: 'value',
          label: 'Value',
        },
      ]}
      initialState={{ value: 2 }}
      onSubmit={(measurementPointCreateRequest) => {
        if (measurementId) {
          addMeasurementPoint({ id: measurementId, measurementPointCreateRequest }).unwrap();
        }
      }}
    />
  );
}
