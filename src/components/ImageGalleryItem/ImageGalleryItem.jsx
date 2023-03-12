import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ query, onClick }) => {
  const { hits } = query;

  return hits?.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li key={id} className={style.ImageGalleryItem}>
        <img
          className={style['ImageGalleryItem-image']}
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL)}
        />
      </li>
    );
  });
};
export default ImageGalleryItem;
