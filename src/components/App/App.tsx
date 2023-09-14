// Components.
import Hero from '../Hero';
import Content from '../Content';
import Footer from '../Footer';

function App() {
  // Spit it out.
  return (
    <main>
      <section className="site-background">
        <div className="bg-gradient" />
      </section>
      <section className="site-content relative z-10 flex gap-5 justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        <Hero />
        <Content />
        <Footer />
      </section>
    </main>
  );
}

export default App;
