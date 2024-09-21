import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlist from "./Playlists";
export default function Sidebar() {
    return (<Conatainer>
        <div className="top__links">
            <div className="logo">
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png" alt="Spotify" />
            </div>
            <ul>
                <li>
                    <MdHomeFilled/>
                    <span>Home</span>
                </li>
            </ul>
            <ul>
                <li>
                    <MdSearch/>
                    <span>Search</span>
                </li>
            </ul>
            <ul>
                <li>
                    <IoLibrary/>
                    <span>Your Library</span>
                </li>
            </ul>
        </div>
        <Playlist />
        
    </Conatainer>
    )
}

const Conatainer = styled.div`
background-color:black;
color: #b3b3b3;
display: flex;
flex-direction: column;
height: 100%;
width:100%;
.top__links{
display: flex;
flex-direction: column;
.logo{
text-align: center;
margin: 1rem 0;
img {
max-inline-size: 80%;
block-size: auto;
   }
}
ul {
list-style-type: none;
display: flex;
flex-direction: column;
gap: 1rem;

li{
    display: flex;
    gap: 1rem;
    transition: 0.3s ease-in-out;
    cursor:pointer;
    &:hover {
        color: white;
    }
}
}   
}
`