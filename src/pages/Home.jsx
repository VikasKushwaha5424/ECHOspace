import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
// import Messages from '../components/Messages'

const Home = () => {
  return (
    <div className='home'>
      {/* The 'container' div has been removed.
        The 'home' div is now the main flex container
        (see style.scss changes).
      */}
      <Sidebar/>
      <Chat/>
    </div>
  )
}

export default Home
