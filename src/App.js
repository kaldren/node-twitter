import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TweetForm from "./react-components/tweetForm.jsx";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h2>Welcome to Node-Twitter</h2>
        <TweetForm />
      </div>
    );
  }
}

export default App;
