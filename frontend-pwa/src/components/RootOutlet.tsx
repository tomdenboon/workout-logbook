import { createPortal } from 'react-dom';
import { Outlet } from 'react-router-dom';

function RootOutlet() {
  const rootDocument = document.getElementById('root');

  return rootDocument ? createPortal(<Outlet />, rootDocument) : null;
}

export default RootOutlet;
