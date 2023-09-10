import { logo } from '../../assets';

export default function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <p className="flex justify-start items-center gap-3 orange_gradient font-bold">
          <img src={logo} alt="SummarAIze Logo" className="w-14 object-contain" />
          SummarAIze
        </p>
        <button type="button" className="black_btn">Github</button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with
        {' '}
        <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with
        {' '}
        <span className="orange_gradient font-bold">SummarAIze</span>
        , an open-source article summarizer that
        transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
}
