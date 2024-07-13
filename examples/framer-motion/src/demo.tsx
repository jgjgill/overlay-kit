import { overlay, useCurrentOverlay } from 'overlay-kit';
import { useState } from 'react';
import { CenterModal, Modal } from './components/modal';

export function Demo() {
  const current = useCurrentOverlay();
  return (
    <div>
      <div>current: {current ?? 'null'}</div>
      {/* <DemoWithState /> */}
      <DemoWithEsOverlay />
      <button
        onClick={() => {
          if (!current) {
            return;
          }

          overlay.close(current);
        }}
      >
        Current Close Button
      </button>
    </div>
  );
}

function DemoWithState() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>Demo with useState</p>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      <Modal isOpen={isOpen}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p>MODAL CONTENT</p>
          <button onClick={() => setIsOpen(false)}>close modal</button>
        </div>
      </Modal>
    </div>
  );
}

function DemoWithEsOverlay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <p>Demo with overlay-kit</p>
      <button
        onClick={() => {
          overlay.open(({ isOpen, close, unmount }) => {
            return (
              <CenterModal isOpen={isOpen} onExit={unmount}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <p>MODAL CONTENT</p>
                  <button onClick={close}>close modal</button>
                </div>
              </CenterModal>
            );
          });
        }}
      >
        open center modal
      </button>
    </div>
  );
}
