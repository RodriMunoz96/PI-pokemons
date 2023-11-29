import { Home, LandingPage, CreateForm, Detail } from "./views/viewsIndex";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/create" component={CreateForm} />
    </div>
  );
}

export default App;
