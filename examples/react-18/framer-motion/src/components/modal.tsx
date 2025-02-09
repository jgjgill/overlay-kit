import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export function ConfirmDialog({ isOpen, close }) {
  const [count, setCount] = useState(0);
  return (
    <Dialog open={isOpen} onClose={close} transitionDuration={1000}>
      <DialogTitle>정말로 계속하시겠어요?</DialogTitle>

      <DialogContent>
        <p>count: {count}</p>
        <Button onClick={() => setCount(count + 1)}>카운트 증가</Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={close}>아니요</Button>
        <Button onClick={close}>네</Button>
      </DialogActions>
    </Dialog>
  );
}
