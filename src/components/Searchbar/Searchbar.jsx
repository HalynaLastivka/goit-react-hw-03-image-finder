import React, { Component } from 'react';
import css from 'styles.module.css';

export default class Searchbar extends Component {
  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.props.onSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormbutton}>
            GO
            {/* <span className={css.SearchFormbuttonlabel}>Search</span> */}
          </button>

          <input
            className={css.SearchForminput}
            type="text"
            name="searchPostId"
            defaultValue={this.props.searchPostId}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
