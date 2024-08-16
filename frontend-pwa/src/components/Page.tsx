import { ReactNode, forwardRef } from 'react';
import Container from './Container';
import clsx from 'clsx';
import { Button, Transition } from '@headlessui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {
  title: string;
  afterTitle?: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

export interface PageProps {
  header: {
    title: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
  };
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  footer?: React.ReactNode;
}

export const PageContainer = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string }
>(function (props, ref) {
  const { children, className } = props;

  return (
    <div
      className={clsx(
        'flex flex-col h-screen w-screen flex-nowrap bg-white',
        className,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
});

export const PageInner = (
  props: Pick<PageProps, 'containerClassName' | 'header' | 'children'>,
) => {
  const { children, header, containerClassName: className } = props;

  return (
    <>
      <div className="py-4 px-2 bg-white border-b">
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {header.leftButton}
            <p className="text-lg font-bold">{header.title}</p>
          </div>
          {header.rightButton}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Container className={clsx('p-2', className)}>{children}</Container>
      </div>
    </>
  );
};

export const Page = forwardRef<HTMLDivElement, PageProps>(function (
  props,
  ref,
) {
  const { children, header, className, containerClassName, footer } = props;

  return (
    <PageContainer ref={ref} className={className}>
      <PageInner {...{ header, containerClassName }}>{children}</PageInner>
      {footer}
    </PageContainer>
  );
});

export const PageOnStack = (props: PageProps) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  return (
    <Transition
      show={show}
      appear={true}
      as={Page}
      afterLeave={() => navigate('..')}
      enter="transition ease-in-out duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      {...props}
      className={clsx(
        'fixed z-20 left-0 drop-shadow-lg top-0',
        props.className,
      )}
      header={{
        ...props.header,
        leftButton: <Button onClick={() => setShow(false)}>Back</Button>,
      }}
    />
  );
};
