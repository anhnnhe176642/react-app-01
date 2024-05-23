import React from "react";
import img1 from '../images/logo192.png'

export function Profile(){
    return (
        <img src={img1} width={100} height={100}/>
    )
}

const Gallery = () => {
    return (
        <>
            <p>hello world</p>
            <Profile/>
        </>
    )
}

export default Gallery;
