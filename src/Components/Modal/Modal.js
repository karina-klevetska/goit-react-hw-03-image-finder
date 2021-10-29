import PropTypes from 'prop-types'
import './Modal.css'
import { Component } from 'react'
import { createPortal } from 'react-dom'

const modalWrapper = document.querySelector('#modal-wrapper')

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func,
    src: PropTypes.string,
    alt: PropTypes.string,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onCloseModal()
    }
  }

  handleClickBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal()
    }
  }

  render() {
    return createPortal(
      <div className='Overlay' onClick={this.handleClickBackdrop}>
        <div className='Modal'>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalWrapper
    )
  }
}

export default Modal
