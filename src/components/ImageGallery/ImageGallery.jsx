import cn from 'classnames';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import style from './ImageGallery.module.css';

export const ImageGallery = ({ data = [], toggleModal }) => {
  return (
    <ul className={cn(style.ImageGallery)}>
      {data.map(el => {
        return <ImageGalleryItem key={el.id} {...el} onClick={toggleModal} />;
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  data: PropTypes.array,
  toggleModal: PropTypes.func,
};
