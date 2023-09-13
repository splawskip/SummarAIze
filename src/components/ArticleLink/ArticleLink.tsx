import React from 'react';
import {
  copy,
  tick,
} from '../../assets';

function ArticleLink({ article, setCurrentArticle } : ArticleLinkProps) {
  // Create state to indicate that copy action happened.
  const [copied, setCopied] = React.useState<string>('');
  /**
   * Handles copying a URL to the clipboard.
   *
   * This function sets the specified URL as "copied," writes the URL to the
   * clipboard using the `navigator.clipboard` API, and clears the "copied"
   * state after a delay.
   *
   * @param copyUrl - The URL to be copied to the clipboard.
   * @returns - Void.
   */
  const handleCopy = (copyUrl:string) : void => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(''), 2000);
  };
  // Spit it out.
  return (
  /* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
    <li
      role="button"
      tabIndex={0}
      className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer hover:bg-white/50"
      onClick={() => setCurrentArticle(article)}
      onKeyDown={(event) => event.code === 'Enter' && setCurrentArticle(article)}
    >
      <button type="button" className="copy-btn" onClick={() => handleCopy(article.url)}>
        <img src={copied === article.url ? tick : copy} alt="copy" className="w-[40%] h-[40%] object-contain" />
      </button>
      <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm text-left truncate">{article.url}</p>
    </li>
  );
}

export default ArticleLink;
