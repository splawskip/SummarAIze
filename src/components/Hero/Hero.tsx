// Icons.
import { logo, github } from '../../assets';

function Hero() {
  // Spit it out.
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <p className="flex flex-col justify-start items-center blue-gradient font-bold">
          <img src={logo} alt="SummarAIze Logo" title="SummarAIze Logo" className="w-14 object-contain" />
          SummarAIze
        </p>
        <a
          href="https://github.com/splawskip/SummarAIze"
          title="Github"
          className="github-btn"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <img src={github} alt="Github logo" className="w-8 h-8 object-contain" />
          Github
        </a>
      </nav>
      <h1 className="h1">
        Summarize Articles with
        {' '}
        <br className="max-md:hidden" />
        <span className="blue-gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Streamline and expedite your reading experience with
        {' '}
        <span className="blue-gradient font-bold">SummarAIze</span>
        , an open-source article summarizer that effortlessly condenses
        lengthy articles into clear and concise summaries in your preferred language.
      </h2>
    </header>
  );
}

export default Hero;
