import { useState } from 'react';
import { Transition } from '@headlessui/react';

interface SectionProps {
  title: string;
  rightNode?: React.ReactNode;
  collapse?: boolean;
  children?: React.ReactNode;
}

function Section(props: SectionProps) {
  const { title, collapse, rightNode, children } = props;
  const [show, setShow] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-gray-500" onClick={() => setShow(!show)}>
          {title}
        </p>
        {rightNode}
      </div>
      {collapse ? (
        <Transition
          show={show}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {children}
        </Transition>
      ) : (
        children
      )}
    </div>
  );
}

export default Section;
