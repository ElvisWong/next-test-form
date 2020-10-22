import React, { useEffect, useState } from 'react';

const WindowFocusHandler = () => {
  const [hasBlur, setHasBlur] = useState(false);

  // User has switched back to the tab
  const onFocus = () => {
    if (hasBlur) {
      alert("Caught cheated!! You should changed to other tab when doing this exam!");
      setHasBlur(false);
    }
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setHasBlur(true);
    console.log('Tab is blurred');
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  });

  return <></>;
};

export default WindowFocusHandler;