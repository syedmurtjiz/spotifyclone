import React from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";

export default function Navbar({ navBackground }) {
    const [{ userInfo }] = useStateProvider();
    return (
        <Container $navBackground={navBackground}>
            <div className="search__bar">
                <FaSearch />
                <input type="text" placeholder="Artists, songs or podcasts" />
            </div>
            <div className="avatar">
                <a href="">
                    <CgProfile />
                    <span>{userInfo?.userName}</span>
                </a>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 2rem; /* Slightly reduced padding for a sleeker look */
    height: 15vh;
    position: sticky;
    top: 0;
    transition: 0.3s ease-in-out;
    margin-left:2.4rem;
background: linear-gradient(135deg, #191414 60%, #1DB954);
background-size: cover;


    .search__bar {
        background-color: rgba(255, 255, 255, 0.9); /* White with slight transparency */
        width: 40%;
        padding: 0.5rem 1.5rem; /* Increased padding for comfort */
        border-radius: 30px; /* More rounded edges */
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */

        input {
            border: none;
            height: 2rem;
            width: 100%;
            font-size: 1rem; /* Added font size for readability */
            &:focus {
                outline: none;
            }
        }
    }

    .avatar {
        background-color: #282828; 
        padding: 0.5rem 0.8rem; 
        border-radius: 30px; 
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); 

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            color: white;
            font-weight: bold;
        }

        svg {
            font-size: 1.5rem; 
            background-color: #1DB954;
            padding: 0.3rem;
            border-radius: 50%;
            color: white; 
        }
    }
`;
