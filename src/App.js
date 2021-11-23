import './App.css';
import MovieList from './MovieList.js';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <div>Movie test app</div>
		<div>Frontend for <code>.NET Core API</code> backend code</div>
      </header>
	  <div>
	      <MovieList/> 
	  </div>
    </div>
  );
}

export default App;
