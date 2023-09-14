type ChildrenOnly = {
  children: React.ReactNode;
};

type Article = {
  id: string;
  url: string;
  summary: string;
  language: string;
};

type ArticleLinkProps = {
  article: Article;
  setCurrentArticle: (article:Article) => void;
};

type VisuallyHiddenProps = {
  children: React.ReactNode,
  className?: string,
};

type SupportedLanguages = {
  [key: string]: string;
};

type ErrorProps = FetchBaseQueryError | SerializedError | undefined;
