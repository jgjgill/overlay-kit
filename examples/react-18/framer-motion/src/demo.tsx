import { Button } from '@mui/material';
import { OverlayProvider, overlay } from 'overlay-kit';
import { ConfirmDialog } from './components/modal';

function App() {
  return (
    <>
      <Button
        onClick={() => {
          overlay.open(
            ({ isOpen, close }) => {
              return <ConfirmDialog isOpen={isOpen} close={close} />;
            },
            { overlayId: 'close-overlay' }
          );
        }}
      >
        close로 오버레이 닫기
      </Button>
      <Button
        onClick={() => {
          overlay.open(
            ({ isOpen, unmount }) => {
              return <ConfirmDialog isOpen={isOpen} close={unmount} />;
            },
            { overlayId: 'unmount-overlay' }
          );
        }}
      >
        unmount로 오버레이 닫기
      </Button>
    </>
  );
}

export const Example = () => {
  return (
    <OverlayProvider>
      <App />
    </OverlayProvider>
  );
};
