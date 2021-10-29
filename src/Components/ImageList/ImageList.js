import { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ApiService } from '../../Service/ApiService'
import ImageGallery from '../ImageGallery/ImageGallery'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import Loader from 'react-loader-spinner'
import './ImageList.css'

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '23128758-78bb9bd788fc6e2a491c41576'

const newApiService = new ApiService(BASE_URL, API_KEY)

class ImageList extends Component {
  state = {
    searchResults: [],
    status: 'idle',
    largeImageId: null,
    isModalOpen: false,
  }

  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props
    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ status: 'pending' })
      newApiService.searchQuery = searchQuery
      newApiService
        .searchImages()
        .then((searchResults) =>
          this.setState({ searchResults, status: 'resolved' })
        )
        .catch((error) => {
          console.log(error)
          this.setState({ status: 'rejected' })
        })
    }
  }

  findLargeImg = () => {
    const { searchResults, largeImageId } = this.state

    const largeImage = searchResults.find((result) => {
      return result.id === largeImageId
    })
    return largeImage
  }

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id),
    })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  onButtonClick = () => {
    newApiService.page = 1
    newApiService
      .searchImages()
      .then((result) => {
        this.setState((prevState) => ({
          searchResults: [...prevState.searchResults, ...result],
          status: 'resolved',
        }))
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ status: 'rejected' })
      })
  }

  render() {
    const { searchResults, status, isModalOpen, largeImageId } = this.state
    const { openModal, onButtonClick, closeModal, findLargeImg } = this

    const paramLoadMore = searchResults.length > 0 && searchResults.length >= 12

    if (status === 'idle') {
      return (
        <div className='info-messages'>
          <p>
            Hello, I have a lot images for you. Just type your query to search
            form
          </p>
        </div>
      )
    }

    if (status === 'pending') {
      return (
        <div className='loader-wrapper'>
          <Loader type='TailSpin' color='#00BFFF' height={120} width={120} />
        </div>
      )
    }

    if (status === 'rejected') {
      return (
        <div className='info-messages'>
          <p>Error</p>
        </div>
      )
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery>
            <ImageGalleryItem
              searchResults={searchResults}
              openModal={openModal}
            />
          </ImageGallery>

          {paramLoadMore && <Button onClick={onButtonClick} />}
          {searchResults.length === 0 && (
            <div className='info-messages'>
              <p>There are no images for your query</p>
            </div>
          )}
          {isModalOpen && (
            <Modal
              largeImageId={largeImageId}
              onCloseModal={closeModal}
              src={findLargeImg().largeImageURL}
              alt={findLargeImg().tags}
            ></Modal>
          )}
        </>
      )
    }
  }
}

export default ImageList
