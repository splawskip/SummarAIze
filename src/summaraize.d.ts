type ChildrenOnly = {
  children: React.ReactNode;
};

type Article = {
  id: string;
  url: string;
  summary: string;
};

type ArticleLinkProps = {
  article: Article;
  setCurrentArticle: (article:Article) => void;
};

type VisuallyHiddenProps = {
  children: React.ReactNode,
  className?: string,
};
