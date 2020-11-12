import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Metric from './Metric';

let fcpEvent = null;

export const dispatchFcpEvent = (fcp) => {
  fcpEvent = new CustomEvent('fcpTime', { detail: fcp.value });
  window.dispatchEvent(fcpEvent);
}

const Copyright = () => {
  const [fcpTime, setFcpTime] = useState();

  if (typeof window !== "undefined") {
    const onFcpTimeUpdate = (e) => {
      setFcpTime(e.detail);
      window.removeEventListener('fcpTime', onFcpTimeUpdate, false);
    };
    useEffect(() => {
      window.addEventListener('fcpTime', onFcpTimeUpdate);
    }, []);
  }

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://elviswong.space/">
        Elvis Wong
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
      {
        fcpTime && <Metric time={fcpTime} />
      }
    </Typography>
  );
}

export default Copyright;