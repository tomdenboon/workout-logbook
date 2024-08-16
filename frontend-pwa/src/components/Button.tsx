import clsx from 'clsx';
import { Button as HeadlessButton } from '@headlessui/react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  variant?: 'secondary' | 'secondary-outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

function Button({
  onClick,
  children,
  variant = 'secondary',
  size = 'medium',
  className,
}: ButtonProps) {
  const buttonClassName = clsx(className, 'px-2 rounded', {
    'bg-blue-500 text-white': variant === 'secondary',
    'text-blue-500 bg-white border border-blue-500':
      variant === 'secondary-outlined',
    'text-blue-500': variant === 'text',
    'h-6': size === 'small',
    'h-9': size === 'medium',
  });

  return (
    <HeadlessButton className={buttonClassName} onClick={onClick} type="button">
      {children}
    </HeadlessButton>
  );
}

export default Button;
