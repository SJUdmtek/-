import React, { useEffect, useState } from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModalBase from './ModalBase';
import modalStyle from './ProgressModal.module.scss';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; time: number }
) {
  return (
    <React.Fragment>
      <div>바꾸시겠습니까?</div>

      <LinearProgress
        variant="determinate"
        {...props}
        sx={{ width: '500px', height: '20px' }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          marginTop: '10px',
          marginRight: '5px',
        }}
      >{`${props.time}초 후 자동 거절...`}</div>
    </React.Fragment>
  );
}

export default function App() {
  const [progress, setProgress] = React.useState(0);
  const [time, setTime] = React.useState(5);
  const [modalOpen, setModalOpen] = React.useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!modalOpen) {
        setProgress(0);
        setTime(5);
      } else {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 20
        );
        setTime((prevTime) => (prevTime <= 0 ? 5 : prevTime - 1));
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [modalOpen]);

  return (
    <React.Fragment>
      <button
        onClick={() => {
          showModal();
        }}
      >
        모달 띄우기
      </button>
      {modalOpen && (
        <ModalBase
          onCloseClick={() => {
            setModalOpen(false);
            setProgress(0);
            setTime(5);
          }}
        >
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel
              value={progress}
              time={time}
              color="success"
            />
          </Box>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <button
              className={modalStyle.footerBtn}
              onClick={() => {
                setModalOpen(false);
                setProgress(0);
                setTime(5);
              }}
            >
              거절
            </button>
            <button className={modalStyle.footerBtn}>적용</button>
          </div>
        </ModalBase>
      )}
    </React.Fragment>
  );
}
