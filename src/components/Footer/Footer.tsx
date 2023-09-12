// React.
import React from 'react';
// Components.
import Heart from '../Heart';

function Footer() {
  // Spit it out.
  return (
    <footer className="w-full flex justify-center items-center p-4">
      <p className="text-center font-satosh font-medium text-sm">
        Made with
        {' '}
        <Heart />
        {' '}
        by
        {' '}
        <a
          href="https://psplawski.dev"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="Link to psplawski.dev site."
          className="hover:text-cyan-600"
        >
          psplawski.dev
        </a>
      </p>
    </footer>
  );
}

export default React.memo(Footer);
