import Hero from '../Hero';
import Results from '../Results';

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <Hero />
        <Results />
      </div>
    </main>
  );
}

export default App;
