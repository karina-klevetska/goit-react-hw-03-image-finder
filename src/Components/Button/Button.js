import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ onClick }) => {
  return (
    <div className='button-wrapper'>
      <button type='button' className='Button' onClick={onClick}>
        Load more
      </button>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
}

export default Button
