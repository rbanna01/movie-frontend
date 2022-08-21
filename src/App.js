import './App.css';
import MoviePanel from './MoviePanel.tsx';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <div>Movie test app</div>
		<div>Frontend for <code>.NET Core API</code> backend code</div>
      </header>
	  <div>
	      <MoviePanel/> 
	  </div>
    </div>
  );
}

export default App;
