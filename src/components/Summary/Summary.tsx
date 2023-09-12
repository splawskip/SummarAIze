function Summary({ children } : ChildrenOnly) {
  // Spit it out.
  return (
    <article className="flex flex-col gap-3">
      <h2 className="font-satoshi font-bold text-gray-600 text-xl">
        <span className="blue-gradient">AI Powered</span>
        {' '}
        Article Summary:
      </h2>
      <div className="after:animate-background-dance gradient-border rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
        <p className="font-inter font-medium text-sm text-gray-700 text-left bg-white/80 p-4 rounded tracking-tight">
          {children}
        </p>
      </div>
    </article>
  );
}

export default Summary;
