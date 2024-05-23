import logo from './logo.svg';
import './App.css';
import FunctionComponent from './components/FunctionComponent';
import Gallery, { Profile } from './components/Gallery';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
    <Header/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <FunctionComponent/>
          <Gallery/>
          <Profile/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
