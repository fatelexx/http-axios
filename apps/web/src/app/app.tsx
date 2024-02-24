// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useSelector } from 'react-redux';
import { Form } from './form';
import { Vehicle } from './vehicle';
import { RootState } from './state/store';

export function App() {
  const isFormVisible = useSelector((state: RootState) => state.vehicle.isFormVisible);
  return (
    <div>
      <Vehicle />
      {isFormVisible && <Form />}
    </div>
  );
}

export default App;
