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
    page: 0,
    totalHits: 0,
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
    if (searchedPostId.trim() !== '') {
      this.setState({
        searchedPostId: searchedPostId,
        page: 0,
        photos: null,
        totalHits: 0,
      });

      event.currentTarget.reset();
    } else {
      alert('Поле search не може бути порожнім');
    }
  };

  fetchFinder = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchedPostId, page } = this.state;
      const photos = await fetchFinder(searchedPostId, page + 1);
      console.dir(photos);
      if (photos.hits) {
        this.setState(prevState => ({
          photos: [
            ...(prevState.photos && prevState.photos.length > 0
              ? prevState.photos
              : []),
            ...photos.hits,
          ],
          page: prevState.page + 1,
          totalHits: photos.total,
        }));
      }
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
    const { photos, searchedPostId, page, totalHits } = this.state;
    const showPosts =
      Array.isArray(this.state.photos) && this.state.photos.length > 0;
    console.log();
    const showLoad = page * 12 < totalHits ? true : false;
    console.log(showPosts);
    return (
      <div className={css.App}>
        <Searchbar
          onSubmit={this.handleSearchSubmit}
          searchPostId={this.state.searchedPostId}
        />
        {this.state.isLoading && <Loader />}
        {this.state.error && <p className="error">{this.state.error}</p>}
        {showPosts ? (
          <ImageGalleryItem photos={photos} onOpenModal={this.onOpenModal} />
        ) : (
          searchedPostId && !this.state.isLoading && <p>Not found :(</p>
        )}
        {showPosts && showLoad && <Button onClick={this.fetchFinder} />}

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
