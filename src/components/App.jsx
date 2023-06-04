import React, { useState, useEffect } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imagegallery/Imagegallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';
import css from '../Styles.module.css';
import { getImages } from '../service/sevice';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setImagesError] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;
    try {
      const fetchImages = async () => {
        setIsLoading(true);
        const { imagesData, totalImages } = await getImages(page, query);
        setImages(prevImages => [...prevImages, ...imagesData]);
        setShowBtn(page < Math.ceil(totalImages / 12));
      };
      fetchImages();
    } catch (error) {
      setImagesError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, query]);

  const handleSubmit = query => {
    if (query === '') {
      alert('Please enter a query');
    } else {
      setQuery(query);
      setPage(1);
      setImages([]);
      setImagesError(null);
      setIsLoading(false);
      setShowBtn(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageURL => {
    setSelectedImage(imageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery images={images} onClick={handleImageClick} />

      {isLoading && <Loader />}

      {showBtn && <Button onClick={handleLoadMore}>Load More</Button>}
      {error && <>Sorry. {error} ... 😭</>}
      {showModal && (
        <Modal largeImageURL={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};
