import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/global/Header";
import Create from "./components/mint/mint";
import 'react-dropzone-uploader/dist/styles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScrollToTop = () => {
  const history = useHistory()
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action !== 'POP') {
        document.querySelector("body").scrollTo(0, 0);
      }
    })
    return () => unlisten()
  }, [history])
  return (null)
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white font-roboto h-screen text-black">
        <Header />
        <Switch>
          <Route exact path="/" component={Create}></Route>
          <Route exact path="/create" component={Create}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
