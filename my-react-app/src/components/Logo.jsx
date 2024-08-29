import React from 'react'
import MyLogo from './Logo.jpg'
function Logo(width = '100px') {
    return (
        <div width = "100px">
            <img src={MyLogo} className='rounded-lg'/>
        </div>
    )
}

export default Logo
