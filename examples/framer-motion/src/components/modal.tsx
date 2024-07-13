import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useRef, type PropsWithChildren } from 'react';

type ModalProps = {
  isOpen?: boolean;
  onExit?: () => void;
  translateX?: string;
  translateY?: string;
};

export function CenterModal(props: PropsWithChildren<ModalProps>) {
  return <Modal {...props} translateX="-50%" translateY="-50%" />;
}
export function TopModal(props: PropsWithChildren<ModalProps>) {
  return <Modal {...props} translateX="-50%" translateY="-125%" />;
}
export function BottomModal(props: PropsWithChildren<ModalProps>) {
  return <Modal {...props} translateX="-50%" translateY="25%" />;
}

export function Modal({ children, isOpen = false, onExit, translateX, translateY }: PropsWithChildren<ModalProps>) {
  const prevIsOpenRef = useRef(isOpen);

  if (isOpen !== prevIsOpenRef.current) {
    prevIsOpenRef.current = isOpen;

    if (prevIsOpenRef.current === false) {
      setTimeout(() => onExit?.(), 2000);
    }
  }

  return (
    <AnimatePresence>
      {isOpen === true && (
        <ModalContent isOpen={isOpen} translateX={translateX} translateY={translateY}>
          {children}
        </ModalContent>
      )}
    </AnimatePresence>
  );
}

const MODAL_CONTENT_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show: { opacity: 1, scale: 1 },
};

function ModalContent({ children, isOpen, translateX, translateY }: PropsWithChildren<ModalProps>) {
  return (
    <div
      style={{
        zIndex: 100,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(${translateX}, ${translateY})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.section
        variants={MODAL_CONTENT_VARIANTS}
        initial="hidden"
        exit="hidden"
        animate={isOpen ? 'show' : 'hidden'}
        transition={{ duration: 2 }}
        style={{
          padding: 120,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'gray',
          borderRadius: 12,
        }}
      >
        {children}
      </motion.section>
    </div>
  );
}
