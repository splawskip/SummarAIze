// Components.
import VisuallyHidden from '../VisuallyHidden';

function Heart() {
  // Spit it out.
  return (
    <span className="heart animate-heart-beat" title="Love">
      <VisuallyHidden>Love</VisuallyHidden>
    </span>
  );
}

export default Heart;
