// Components.
import Hero from '../Hero';
import Results from '../Results';
import Footer from '../Footer';

function App() {
  // Spit it out.
  return (
    <main>
      <section className="site-background">
        <div className="bg-gradient" />
      </section>
      <section className="site-content relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        <Hero />
        <Results />
        <Footer />
      </section>
    </main>
  );
}

export default App;
