import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
    console.log('query', query);
    console.log('this.state.query', this.state.query);
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmit={this.handleFormSubmit}></SearchBar>
        <ImageGallery query={this.state.query}></ImageGallery>
      </div>
    );
  }
}
