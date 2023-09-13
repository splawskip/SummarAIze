// React.
import React from 'react';
// Components.
import Summary from '../Summary';
import ArticleLink from '../ArticleLink';
import VisuallyHidden from '../VisuallyHidden';
// Icons.
import {
  linkIcon,
  loader,
  languageIcon,
} from '../../assets';
// Get Redux helpers.
import isFetchBaseQueryError from '../../services/helpers';
// Article Redux hook.
import { useLazyGetSummaryQuery } from '../../services/article';
// Enums.
import SupportedLanguages from '../../utils/constants';

function Results() {
  // Set state for article.
  const [currentArticle, setCurrentArticle] = React.useState<Article>({
    id: '',
    url: '',
    summary: '',
    language: '',
  });
  // Set state for articles.
  const [allArticles, setAllArticles] = React.useState<Array<Article>>([]);
  // Get Redux endpoint and fetching helpers.
  const [getSummary, { isError, error, isFetching }] = useLazyGetSummaryQuery();
  const [language, setLanguage] = React.useState('en');
  // Grab ref to url input.
  const urlInputRef = React.useRef<HTMLInputElement>(null);
  // Grab id for url input.
  const urlInputId:string = React.useId();
  // Grab id for language select.
  const languageSelectId:string = React.useId();
  // Load previously summarized articles on component mount.
  React.useEffect(() => {
    // Pull previously summarized articles from localStorage.
    const alreadyProcessedArticles:Article[] = JSON.parse(localStorage.getItem('articles') ?? JSON.stringify([]));
    // If we got articles set them.
    if (alreadyProcessedArticles) {
      setAllArticles(alreadyProcessedArticles);
    }
    // If we got url input reference focus in on mount.
    if (urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, []);
  /**
   * Handles form submission for article data.
   *
   * This function prevents the default form submission behavior, calls an API
   * to retrieve an article summary, and updates the state and local storage
   * with the new article data if a summary is received.
   *
   * @param event - The form submission event.
   * @returns - A Promise that resolves to void.
  */
  const handleFormSubmit = async (event:React.FormEvent) : Promise<void> => {
    event.preventDefault();
    // Check if given article was processed before.
    const alreadyProcessedArticle = allArticles.find((article) => (
      article.url === currentArticle.url && article.language === language
    ));
    // If article was processed before, set it as current and bail,
    // so we won't make unnecessary calls.
    if (typeof alreadyProcessedArticle !== 'undefined') {
      setCurrentArticle(alreadyProcessedArticle);
      return;
    }
    // Call summary endpoint.
    const { data } = await getSummary({ articleUrl: currentArticle.url, lang: language });
    // Check if we got article summary.
    if (data?.summary) {
      // Create new article.
      const newArticle:Article = {
        ...currentArticle,
        id: crypto.randomUUID(),
        summary: data.summary,
        language,
      };
      // Push fresh article into articles list.
      const newAllArticles:Article[] = [newArticle, ...allArticles];
      // Update state variables.
      setCurrentArticle(newArticle);
      setAllArticles(newAllArticles);
      // Update local storage.
      localStorage.setItem('articles', JSON.stringify(newAllArticles));
    }
  };
  /**
   * Handles changes to the article URL input.
   *
   * @param event - The event object representing the change in the input field.
   * @returns - Void
   */
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    setCurrentArticle({ ...currentArticle, url: event.target.value })
  );
  // Spit it out.
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-10">
        <form className="relative flex flex-col justify-center items-center gap-5" onSubmit={handleFormSubmit}>
          <label htmlFor={urlInputId} className="relative w-full flex justify-start items-center">
            <img src={linkIcon} alt="Link Icon" className="absolute left-0 my-2 ml-3 w-5" />
            <VisuallyHidden>Enter a URL to article you want to summarize:</VisuallyHidden>
            <input type="url" placeholder="Enter a URL" name="url-input" id={urlInputId} value={currentArticle.url} ref={urlInputRef} onChange={handleUrlChange} required className="icon-input peer invalid:placeholder-shown:border-transparent invalid:border-red-500 valid:border-green-400 focus:placeholder-shown:border-gray-700" />
            <button type="submit" className="submit-btn peer-focus:border-gray-700 peer-focus:text-gray-700">
              ⮐
            </button>
          </label>
          <label htmlFor={languageSelectId} className="relative w-full flex justify-start items-center before:content-['▼'] before:text-gray-400 before:text-sm before:absolute before:top-1/2 before:right-4 before:-translate-y-1/2">
            <img src={languageIcon} alt="Language Icon" className="absolute left-0 my-2 ml-3 w-5" />
            <VisuallyHidden>Select summary language:</VisuallyHidden>
            <select id={languageSelectId} defaultValue="en" className="icon-input appearance-none" onChange={(event) => setLanguage(event.target.value)}>
              {Object.entries(SupportedLanguages).map((languageData) => (
                <option
                  key={languageData[0]}
                  value={languageData[0]}
                >
                  {languageData[1]}
                </option>
              ))}
            </select>
          </label>
        </form>
        <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto">
          <li>Previously processed articles:</li>
          {allArticles.map((article) => (
            <ArticleLink key={article.id} article={article} setCurrentArticle={setCurrentArticle} />
          ))}
        </ul>
      </div>
      <div className="my-10 max-w-full flex flex-col gap-1 justify-center items-center">
        {isFetching && (
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
        )}
        {isError && (
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
        )}
        {
          (currentArticle.summary && !isError && !isFetching)
          && <Summary>{currentArticle.summary}</Summary>
        }
      </div>
    </section>
  );
}

export default Results;
