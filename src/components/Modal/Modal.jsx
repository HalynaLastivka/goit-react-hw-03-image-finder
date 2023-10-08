import React, { Component } from 'react';
import css from 'styles.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };
  render() {
    const photo = this.props.data;
    return (
      <div onClick={this.onOverlayClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={photo.webformatURL} alt={photo.tags} />
        </div>
      </div>
    );
  }
}
