// React.
import React from 'react';
// Components.
import Summary from '../Summary';
import ArticleLink from '../ArticleLink';
import VisuallyHidden from '../VisuallyHidden';
import Loader from '../Loader';
import Error from '../Error';
// Icons.
import {
  linkIcon,
  languageIcon,
} from '../../assets';
// Article Redux hook.
import { useLazyGetSummaryQuery } from '../../services/article';
// Enums.
import SupportedLanguages from '../../utils/constants';

function Content() {
  // Set state for article.
  const [currentArticle, setCurrentArticle] = React.useState<Article>({
    id: '',
    url: '',
    summary: '',
    language: '',
  });
  // Set state for articles.
  const [allArticles, setAllArticles] = React.useState<Array<Article>>([]);
  // Set state for summary language.
  const [language, setLanguage] = React.useState('en');
  // Grab ref to url input.
  const urlInputRef = React.useRef<HTMLInputElement>(null);
  // Grab id for url input.
  const urlInputId:string = React.useId();
  // Grab id for language select.
  const languageSelectId:string = React.useId();
  // Get Redux endpoint and fetching helpers.
  const [getSummary, { isError, error, isFetching }] = useLazyGetSummaryQuery();
  // Load previously summarized articles on component mount and foucs main input.
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
    <section className="mt-14 w-full max-w-xl">
      <main className="flex flex-col w-full gap-10">
        {/** Build form component. */}
        <form className="relative flex flex-col justify-center items-center gap-3" onSubmit={handleFormSubmit}>
          <h2 className="w-full text-left font-satoshi font-bold text-gray-600 text-xl">
            <span className="blue-gradient">Start</span>
            {' '}
            here:
          </h2>
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
        {/** Previously precessed articles. */}
        {allArticles.length ? (
          <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto">
            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
              <span className="blue-gradient">Previously</span>
              {' '}
              processed articles:
            </h2>
            {allArticles.map((article) => (
              <ArticleLink
                key={article.id}
                article={article}
                setCurrentArticle={setCurrentArticle}
              />
            ))}
          </ul>
        ) : undefined}
        {/** Article summary */}
        <div className="max-w-full flex flex-col gap-1 justify-center items-center">
          {isFetching && <Loader />}
          {isError && <Error error={error} />}
          {
          (currentArticle.summary && !isError && !isFetching)
          && <Summary>{currentArticle.summary}</Summary>
        }
        </div>
      </main>
    </section>
  );
}

export default Content;
