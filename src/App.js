import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

const App= ()=>  {
  const pagesize = 15;
  // apikey=process.env.REACT_NEWS_API_KEY //from .env.local file

  const apikey="23a8846538f6492da254d90e863a13db"

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress} 
          />
          <Switch>
            <Route exact path="/">
              <News setProgress={setProgress}  apikey={apikey} key="general" pagesize={pagesize} country="in" category="general" />
            </Route>
            <Route exact path="/science">
              <News setProgress={setProgress}  apikey={apikey} key="science" pagesize={pagesize} country="in" category="science" />
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={setProgress}  apikey={apikey} key="entertainment" pagesize={pagesize} country="in" category="entertainment" />
            </Route>
            <Route exact path="/health">
              <News setProgress={setProgress}  apikey={apikey} key="health" pagesize={pagesize} country="in" category="health" />
            </Route>
            <Route exact path="/sports">
              <News setProgress={setProgress}  apikey={apikey} key="sports" pagesize={pagesize} country="in" category="sports" />
            </Route>
            <Route exact path="/business">
              <News setProgress={setProgress}  apikey={apikey} key="business" pagesize={pagesize} country="in" category="business" />
            </Route>
            <Route exact path="/technology">
              <News setProgress={setProgress}  apikey={apikey} key="technology" pagesize={pagesize} country="in" category="technology" />
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }

export default App;