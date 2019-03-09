import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const CircularUnderLoad = () => {
return (
  <div>
    <CircularProgress disableShrink />
    正在努力同步新数据
  </div>
  );
}

export default CircularUnderLoad;