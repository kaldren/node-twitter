import React, { Component } from "react";
import TweetEntry from "./tweetEntry";

class TweetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      tweets: [],
      tweetInput: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/tweet")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            tweets: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidUpdate() {
    fetch("http://localhost:3001/tweet")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            tweets: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleNewTweetClick = () => {
    fetch("http://localhost:3001/tweet/add", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: this.state.tweetInput, author: "kdrenski" })
    })
      .then(res => res.json())
      .then(res => console.log(res));

    this.setState({ tweetInput: "" });
  };

  render() {
    const { error, isLoaded, tweets } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="tweetForm">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's on your mind?"
              aria-label="What's on your mind?"
              aria-describedby="button-addon2"
              value={this.state.tweetInput}
              onChange={e => {
                this.setState({ tweetInput: e.target.value });
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                type="button"
                id="button-addon2"
                onClick={this.handleNewTweetClick}
              >
                Tweet
              </button>
            </div>
          </div>
          <div>
            {this.state.tweets.tweet_data.map(item => (
              <p key={item._id}>{item.text}</p>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default TweetForm;
