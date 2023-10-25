import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutlet, useOutletContext } from 'react-router-dom';

const ModalOutletContext = createContext<unknown>(null);

export function ModalOutlet<Context = unknown>(props?: Context) {
  const outlet = useOutlet(props);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const outletRef = useRef<typeof outlet>();
  outletRef.current = outlet ?? outletRef.current;

  useEffect(() => {
    if (outlet) {
      setVisible(true);
    }
  }, [outlet]);

  return (
    <ModalOutletContext.Provider
      value={{
        open: !!outlet,
        onClose: () => navigate('.'),
        onTransitionExited: () => setVisible(false),
      }}
    >
      {visible ? outletRef.current : null}
    </ModalOutletContext.Provider>
  );
}

export function useModalOutletContext<Context = unknown>() {
  const outlet = useOutletContext() as Context;
  const modalControls = useContext(ModalOutletContext) as {
    open: boolean;
    onClose: () => void;
    onTransitionExited: () => void;
  };

  return { ...outlet, modalControls };
}
