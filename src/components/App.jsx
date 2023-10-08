import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchFinder } from 'services/api';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import css from 'styles.module.css';

export class App extends Component {
  state = {
    photos: null,
    isLoading: false,
    error: null,
    searchedPostId: null,
    page: 1,
    modal: {
      isOpen: false,
      data: null,
    },
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchedPostId !== this.state.searchedPostId) {
      this.fetchFinder();
    }
  }

  handleSearchSubmit = event => {
    event.preventDefault();

    const searchedPostId = event.currentTarget.elements.searchPostId.value;
    this.setState({
      searchedPostId: searchedPostId,
    });

    event.currentTarget.reset();
  };

  fetchFinder = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchedPostId, page } = this.state;
      const photos = await fetchFinder(searchedPostId, page + 1);
      this.setState(prevState => ({
        photos: [
          ...(prevState.photos && prevState.photos.length > 0
            ? prevState.photos
            : []),
          ...photos.hits,
        ],
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  };

  render() {
    const showPosts =
      Array.isArray(this.state.photos) && this.state.photos.length;
    return (
      <div className={css.App}>
        <Searchbar
          onSubmit={this.handleSearchSubmit}
          searchPostId={this.state.searchedPostId}
        />
        {this.state.isLoading && <Loader />}
        {this.state.error && <p className="error">{this.state.error}</p>}
        {showPosts && (
          <ImageGalleryItem
            photos={this.state.photos}
            onOpenModal={this.onOpenModal}
          />
        )}
        {showPosts && <Button onClick={this.fetchFinder} />}

        {this.state.modal.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            data={this.state.modal.data}
          />
        )}
      </div>
    );
  }
}
