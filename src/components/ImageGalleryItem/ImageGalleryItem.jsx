import React, { Component } from 'react';
import css from 'styles.module.css';

export default class ImageGalleryItem extends Component {
  handleImageClick = photo => () => {
    this.props.onOpenModal(photo);
  };

  render() {
    const arrayPhotos = this.props.photos;
    return (
      <ul className={css.ImageGallery}>
        {arrayPhotos.map(photo => {
          return (
            <li key={photo.id} className={css.ImageGalleryItem}>
              <img
                className={css.ImageGalleryItemimage}
                src={photo.webformatURL}
                alt={photo.tags}
                onClick={this.handleImageClick(photo)}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}
