// Icons.
import {
  loader,
} from '../../assets';

function Loader() {
  // Spit it out.
  return (
    <>
      <img src={loader} alt="loader" className="w-20 h-10 object-contain" />
      <p className="font-inter font-medium text-m text-gray-700">
        Please wait, your article is being
        {' '}
        <span className="blue-gradient">SummarAIzed</span>
        {' '}
        🤖🧠
      </p>
    </>
  );
}

export default Loader;
