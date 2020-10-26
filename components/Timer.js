import react, { useEffect, useState } from 'react';
import {
  Box,
  LinearProgress,
  Typography,
} from '@material-ui/core';

const LinearProgressWithLabel = (props) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={(props.value) * 100} />
        </Box>
        <Box minWidth={100}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(props.value * props.seconds)} / ${props.seconds} sec`}</Typography>
        </Box>
      </Box>
    </>
  );
}

const Timer = ({ seconds, timeEnd, setTimeEnd }) => {
const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    // exit early when we reach 0
    if (timeLeft <= 0) {
       setTimeEnd(true);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    seconds && timeLeft ? <LinearProgressWithLabel value={(seconds - timeLeft)/seconds} seconds={seconds} />  : null
  );
};

export default Timer;