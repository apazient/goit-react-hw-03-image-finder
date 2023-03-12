import { Component } from 'react';
import cn from 'classnames';
import { RevolvingDot } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import style from './ImageGallery.module.css';

const API_KEY = '33414632-91dc2c07012505ffb510f0739';
class ImageGallery extends Component {
  state = {
    loading: false,
    page: 1,
    hits: null,
    total: 0,
    largeUrl: '',
    showModal: false,
    error: false,
    totalHits: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.fetchItem(nextQuery, nextPage);
    }
  }
  fetchItem(query, page) {
    this.setState({ loading: true });

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&page=${page}&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Nothing is finding'));
      })
      .then(search => {
        if (this.state.page > 1) {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...search.hits],
            total: search.total,
          }));
        } else {
          this.setState({
            hits: search.hits,
            total: search.total,
          });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  pageLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  onClickImg = url => {
    this.setState({ largeUrl: url, showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  showModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { loading, total, hits, showModal, largeUrl } = this.state;
    return (
      <div
        style={{ padding: '20px 10px', margin: '0 auto', textAlign: 'center' }}
      >
        {!total && hits && <h2>Nothing to be found </h2>}
        {loading ? (
          <RevolvingDot wrapperStyle={{ justifyContent: 'center' }} />
        ) : (
          <ul
            className={cn(style.ImageGallery, {
              [style.ImageGalleryOverflow]: showModal,
            })}
            query={this.props.query}
            page={this.props.page}
          >
            <ImageGalleryItem
              query={this.state}
              onClick={this.onClickImg}
            ></ImageGalleryItem>
          </ul>
        )}
        {total > 0 && hits && !loading && (
          <Button clickMore={this.pageLoadMore}></Button>
        )}
        {showModal && (
          <Modal closeModal={this.hideModal}>
            <img src={largeUrl} alt="items" className={style.ModalImg} />
          </Modal>
        )}
      </div>
    );
  }
}
export default ImageGallery;
