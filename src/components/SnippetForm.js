import React, { Component } from 'react';

export default class SnippetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: 'Yo momma',
      title: '',
      language: 'HTML',
      description: '',
      code: '',
    };
  }

  handleChange = evt => {
    const { value, name } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log('submitting snippetForm');
    this.props.onSubmit(this.state);
    this.setState({
      author: 'Yo momma',
      title: '',
      language: 'HTML',
      description: '',
      code: '',
    });
  };

  render() {
    const { title, language, description, code } = this.state;
    return (
      <div id="snippetFormContainer">
        <form id="createSnippet" onSubmit={this.handleSubmit}>
          <h3 id="snippetFormHeader">Create a Snip!</h3>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handleChange}
            placeholder="Title"
          />
          <select
            id="select"
            value={language}
            onChange={this.handleChange}
            name="language"
          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="SQL">SQL</option>
          </select>
          <textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Description of your Snip..."
          />
          <textarea
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={this.handleChange}
            placeholder="Place your code here."
          />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}
