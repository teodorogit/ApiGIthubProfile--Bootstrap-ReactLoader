import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.css'

const Loader = ({isLoading}) => {

  return (
    <div className='loader-div'>{isLoading && <ReactLoading type="spinningBubbles" color='#444'/>
    }
    </div>
  )
}

export default Loader
