export const imgNormalize = data => {
  return data.map(({ id, largeImageURL, webformatURL, tags }) => ({
    id,
    largeImg: largeImageURL,
    url: webformatURL,
    alt: tags,
  }));
};
