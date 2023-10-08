import React, { Component } from 'react';
import css from 'styles.module.css';

export default class Button extends Component {
  render() {
    return (
      <div className={css.buttonContainer}>
        <button
          onClick={this.props.onClick}
          type="button"
          className={css.Button}
        >
          Load more...
        </button>
      </div>
    );
  }
}
