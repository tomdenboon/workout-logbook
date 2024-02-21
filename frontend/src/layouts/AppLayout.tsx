import AppSidebar from 'src/components/AppSidebar';
import { useOutlet, useOutletContext } from 'react-router-dom';
import AppContainer from 'src/components/AppContainer';
import { useEffect, useState } from 'react';

interface HeaderProps {
  title: string;
  afterTitle?: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export function useHeader(props: HeaderProps) {
  const setHeaderProps = useOutletContext<(arg0: HeaderProps) => void>();

  useEffect(() => {
    setHeaderProps(props);
  }, []);
}

function AppLayout() {
  const [headerProps, setHeaderProps] = useState<HeaderProps>({ title: 'default' });
  const outlet = useOutlet(setHeaderProps);

  return (
    <AppContainer header={headerProps} footer={<AppSidebar />}>
      {outlet}
    </AppContainer>
  );
}

export default AppLayout;
