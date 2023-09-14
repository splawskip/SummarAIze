// Get Redux helpers.
import isFetchBaseQueryError from '../../services/helpers';

function Error({ error } : ErrorProps) {
  // Spit it out.
  return (
    <>
      <p className="font-inter font-bold orange-gradient text-center">
        Whoops! Something went wrong:
        {isFetchBaseQueryError(error) && (
        <>
          <br />
          <span className="font-satoshi font-normal text-red-600">
            {'error' in error ? error.error : JSON.stringify(error.data)}
          </span>
        </>
        ) }
      </p>
      <p className="font-inter text-gray-700 text-center">
        Please contact with developer 👉
        {' '}
        <a
          href="https://github.com/splawskip"
          title="Github"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="uppercase blue-gradient"
        >
          here
        </a>
      </p>
    </>
  );
}

export default Error;
