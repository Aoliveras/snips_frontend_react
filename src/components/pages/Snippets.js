import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import SnippetForm from '../SnippetForm';
import SnipList from '../SnipList';

export default class Snippets extends Component {
  static propTypes = {};

  constructor(props) {
    // call parent (React.Component) constructor
    super(props);

    // set intial state
    this.state = {
      snippets: [],
    };
  }

  async componentDidMount() {
    console.log('App Mounted');
    // 1. request the data from our server
    const { data } = await axios.get('http://localhost:5000/api/snippets');
    // 2. hold that data in state so that it will be passed down to our Snips
    this.setState({
      snippets: data,
    });
  }

  fetchSnippets = async searchText => {
    // fetch snippets from database
    const { data: snippets } = await axios.get(
      'http://localhost:5000/api/snippets'
    );

    // inner function for string matching
    const matchStr = (str, toMatch) =>
      str.toLowerCase().includes(toMatch.toLowerCase());
    // filter them
    const filteredSnips = snippets.filter(
      snippet =>
        matchStr(snippet.title || '', searchText) ||
        matchStr(snippet.description || '', searchText) ||
        matchStr(snippet.code || '', searchText) ||
        matchStr(snippet.language || '', searchText)
    );

    // set state
    this.setState({
      snippets: filteredSnips,
    });
  };

  insertSnippet = async snippet => {
    console.log(snippet);
    await axios.post('http://localhost:5000/api/snippets', snippet);
    const { data: snippets } = await axios.get(
      'http://localhost:5000/api/snippets'
    );
    console.log(snippets);
    this.setState({
      snippets,
    });
  };

  render() {
    return (
      <React.Fragment>
        <SearchBar onSearch={this.fetchSnippets} />
        <SnippetForm onSubmit={this.insertSnippet} />
        <SnipList snippets={this.state.snippets} />
      </React.Fragment>
    );
  }
}
