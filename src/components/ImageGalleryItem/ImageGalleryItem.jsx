import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, largeImg, url, alt, onClick }) => {
  return (
    <li key={id} className={style.ImageGalleryItem}>
      <img
        className={style['ImageGalleryItem-image']}
        src={url}
        alt={alt}
        onClick={() => onClick(largeImg)}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  id: PropTypes.number,

  largeImg: PropTypes.string,
  url: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
