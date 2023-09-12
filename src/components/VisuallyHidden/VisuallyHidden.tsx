// React.
import React from 'react';

function VisuallyHidden({ children, className = '' } : VisuallyHiddenProps) {
  // Grab some state.
  const [forceShow, setForceShow] = React.useState(false);
  // Handle hide and show logic.
  React.useEffect(() => {
    // Run it everywhere except prod.
    if (process.env.NODE_ENV !== 'production') {
      // Change state to true on key press.
      const handleKeyDown = (event:KeyboardEvent) : void => {
        if (event.key === 'Alt') {
          setForceShow(true);
        }
      };
      // Change state to false on key release.
      const handleKeyUp = () : void => {
        setForceShow(false);
      };
      // Register events.
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      // Clear events.
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
    // This return is here only to stop ESLint screaming.
    return () => null;
  }, []);
  // Show if state tell us to do so.
  if (forceShow) {
    return <span className="text-[0.5rem]">{children}</span>;
  }
  // Show it to the world.
  return (
    <span className={`${className} absolute w-px h-px p-0 -m-px overflow-hidden border-0`}>
      {children}
    </span>
  );
}

export default VisuallyHidden;
