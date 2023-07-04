import React from 'react'
import './Loader.scss'
import LoaderImg from '../../assets/loading.gif'

const Loader = () => {
  return (
    <>
        <div className='loader-container'>
            <img src={LoaderImg} alt='Loading ...' style={{marginTop:'100px'}}/>
        </div>
    </>
  )
}

export default Loader
