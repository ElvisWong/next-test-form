import react, { useEffect, useState } from 'react';

const Metric = ({ time }) => {
  console.log("metric: ", time);
  return (<span>- finish loaded in {(time / 1000).toFixed(4)}s</span>);
};

export default Metric;