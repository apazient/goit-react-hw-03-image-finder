import style from './ImageGalleryItem.module.css';
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
