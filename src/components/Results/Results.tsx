// React.
import React from 'react';
// Components.
import Summary from '../Summary';
import ArticleLink from '../ArticleLink';
// Icons.
import {
  linkIcon,
  loader,
} from '../../assets';
// Get Redux helpers.
import isFetchBaseQueryError from '../../services/helpers';
// Article Redux hook.
import { useLazyGetSummaryQuery } from '../../services/article';

function Results() {
  // Set state for article.
  const [currentArticle, setCurrentArticle] = React.useState<Article>({
    id: '',
    url: '',
    summary: '',
  });
  // Set state for articles.
  const [allArticles, setAllArticles] = React.useState<Array<Article>>([]);
  // Get Redux endpoint and fetching helpers.
  const [getSummary, { isError, error, isFetching }] = useLazyGetSummaryQuery();
  // Load previously summarized articles on component mount.
  React.useEffect(() => {
    // Pull previously summarized articles from localStorage.
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles') ?? JSON.stringify([]));
    // If we got articles set them.
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
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
   * @returns A Promise that resolves to `void`.
  */
  const handleSubmit = async (event:React.FormEvent) : Promise<void> => {
    event.preventDefault();
    // Call summary endpoint.
    const { data } = await getSummary({ articleUrl: currentArticle.url });
    // Check if we got article summary.
    if (data?.summary) {
      // Create new article.
      const newArticle = { ...currentArticle, summary: data.summary, id: crypto.randomUUID() };
      // Push fresh article into articles list.
      const newAllArticles = [newArticle, ...allArticles];
      // Update state variables.
      setCurrentArticle(newArticle);
      setAllArticles(newAllArticles);
      // Update local storage.
      localStorage.setItem('articles', JSON.stringify(newAllArticles));
    }
  };
  // Spit it out.
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-10">
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="Link Icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input type="url" placeholder="Enter a URL" name="url-input" id="url-input" value={currentArticle.url} onChange={(event) => setCurrentArticle({ ...currentArticle, url: event.target.value })} required className="icon-input peer" />
          <button type="submit" className="submit-btn peer-focus:border-gray-700 per-focus:text-gray-700">
            ⮐
          </button>
        </form>
        <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto">
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
