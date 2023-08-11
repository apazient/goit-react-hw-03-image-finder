import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import style from './SearchBar.module.css';
const INITIAL_STATE = {
  query: '',
};

class SearchBar extends Component {
  state = INITIAL_STATE;
  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      return;
    }
    this.props.onSearch(this.state.query);

    this.reset();
  };
  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style['SearchForm-button']}>
            <ImSearch style={{ marginRight: 8 }}></ImSearch>
          </button>

          <input
            className={style['SearchForm-input']}
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleQueryChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
export default SearchBar;
