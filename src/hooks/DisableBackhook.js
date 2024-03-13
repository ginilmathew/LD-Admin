import { useEffect } from 'react';

const DisableBackButton = () => {
  useEffect(() => {
    const disableBack = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Optionally, you can display a message or perform any other action
    };

    // Disable back navigation events
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', disableBack);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('popstate', disableBack);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default DisableBackButton;