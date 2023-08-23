import React from 'react'
import Navbar from '../../components/navbar'
import Posts from '../../components/posts'

const Home = () => {
  return (
    <div className='flex flex-col itens-center'>
      <Navbar/>
      <Posts/>
    </div>
  )
}

export default Home