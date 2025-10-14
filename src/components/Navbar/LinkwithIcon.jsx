import React from 'react'

import './LinkwithIcon.css'
import { NavLink } from 'react-router-dom'

const LinkwithIcon = ({title, link, emoji, sidebar}) => {
  return (
     <NavLink
      to={link} 
      className={sidebar ? 'align_center sidebar_link' :'align_center'}>      
      {title} <img src={emoji} alt='' className='link_emoji'/>
      </NavLink>
  )
}

export default LinkwithIcon