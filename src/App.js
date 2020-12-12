import './App.css';
import StoriesContainer from './components/Stories/StoriesContainer';
import { BrowserRouter, Route } from "react-router-dom"
import StoryContainer from './components/Story/StoryContainer';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="header"><p>Hacker News</p></div>
      <div className="app-wrapper">
        <div className="content">
          <div>
            <Route exact path="/">
              <StoriesContainer />
            </Route>
          </div>
          <Route exact path="/:id" component={StoryContainer} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
