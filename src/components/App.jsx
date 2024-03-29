import { Component } from 'react';
import { fetchImg } from 'service/api';

import Button from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import { RevolvingDot } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import style from './Modal/Modal.module.css';

export class App extends Component {
  state = {
    error: '',
    images: [],
    page: 1,
    step: 12,
    per_page: 12,
    loading: false,
    query: '',
    totalHits: null,
    isModalOpen: false,
    largeImg: null,
  };

  handleSearch = query => {
    this.setState({ query, page: 1 });
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, per_page } = this.state;
    const neuQuery = prevState.query !== query;

    if (prevState.page !== page || neuQuery) {
      try {
        this.setState({ loading: true });
        const { data, totalHits } = await fetchImg(query, { page, per_page });

        neuQuery
          ? this.setState({
              totalHits,
              images: data,
            })
          : this.setState(prev => ({
              totalHits,
              images: [...prev.images, ...data],
            }));
      } catch (error) {
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handlePageLoad = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
    console.log('page', this.state.page);
  };
  toggleModal = url => {
    this.setState(prev => ({
      isModalOpen: !prev.isModalOpen,
      largeImg: url,
    }));
  };

  render() {
    const { images, totalHits, loading, isModalOpen, largeImg } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSearch={this.handleSearch}></SearchBar>

        <ImageGallery data={images} toggleModal={this.toggleModal} />

        {images.length > 0 && totalHits - images.length && (
          <div
            style={{
              display: 'block',
              textAlign: 'center',
            }}
          >
            {!loading ? (
              <Button clickMore={this.handlePageLoad} />
            ) : (
              <RevolvingDot wrapperStyle={{ justifyContent: 'center' }} />
            )}
            {isModalOpen && (
              <Modal closeModal={this.toggleModal}>
                <img src={largeImg} alt="items" className={style.ModalImg} />
              </Modal>
            )}
          </div>
        )}
      </div>
    );
  }
}

