import React, { useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LottieAnimation = ({ url, width, height, ...other }: any) => {
  const ref: any = useRef(null);
  const { loop, style: propStyle, onClick } = other;
  const style = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
  };

  function getInstance() {
    return ref.current?.state?.instance;
  }

  function onEvent(e: any) {
    if (loop) return;

    switch (e) {
      case 'frame': {
        const instance = getInstance();
        if (instance?.currentFrame === 0) {
          instance?.goToAndStop(instance.totalFrames - 1, true);
        }
        break;
      }
    }
  }

  return (
    <div style={{ margin: 0, auto: 0, ...propStyle }} onClick={onClick}>
      <Player
        ref={ref}
        autoplay
        mode="normal"
        {...other}
        style={{ ...style }}
        src={url}
        onEvent={onEvent}
      />
    </div>
  );
};

export default LottieAnimation;
