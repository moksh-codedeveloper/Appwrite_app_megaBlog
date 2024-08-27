import React from 'react'
import MyLogo from './Logo.jpg'
function Logo({width = '10px'}) {
    return (
        <div>
            <img src={MyLogo}/>
        </div>
    )
}

export default Logo
