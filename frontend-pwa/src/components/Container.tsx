import clsx from 'clsx';

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('w-full max-w-screen-lg m-auto', className)}>
      {children}
    </div>
  );
}
export default Container;
