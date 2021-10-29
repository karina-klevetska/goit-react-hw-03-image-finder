import PropTypes from 'prop-types'
import './ImageGalleryItem.css'

const ImageGalleryItem = ({ searchResults, openModal }) => {
  return (
    <>
      {searchResults.length > 0 &&
        searchResults.map(({ id, webformatURL, tags }) => {
          return (
            <li
              key={id}
              id={id}
              onClick={openModal}
              className='ImageGalleryItem'
            >
              <img
                src={webformatURL}
                alt={tags}
                className='ImageGalleryItem-image'
              />
            </li>
          )
        })}
    </>
  )
}

ImageGalleryItem.propTypes = {
  searchResults: PropTypes.array,
  openModal: PropTypes.func,
}

export default ImageGalleryItem
