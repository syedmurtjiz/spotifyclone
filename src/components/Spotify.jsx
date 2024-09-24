import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import { reducerCases } from "../utils/Constants";
import PlayerControls from "./PlayerControls"; // Ensure to import PlayerControls

export default function Spotify() {
    const [{ token }, dispatch] = useStateProvider();
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    
    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30
            ? setNavBackground(true)
            : setNavBackground(false);
        bodyRef.current.scrollTop >= 268
            ? setHeaderBackground(true)
            : setHeaderBackground(false);  
    };

    useEffect(() => {
        console.log("Token in Spotify component:", token); // Log the token for debugging

        const getUserInfo = async () => {
            if (!token) {
                console.error("No token available"); // Error handling if token is not available
                return;
            }
            try {
                const { data } = await axios.get("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Correctly format the authorization header
                        "Content-Type": "application/json",
                    },
                });
                const userInfo = {
                    userId: data.id,
                    userName: data.display_name,
                };
                dispatch({ type: reducerCases.SET_USER, userInfo });
            } catch (error) {
                console.error("Error fetching user info:", error.response ? error.response.data : error.message);
            }
        };

        getUserInfo();
    }, [dispatch, token]);

    return (
        <Container>
            <div className="spotify__body">
                <Sidebar />
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBackground={navBackground} />
                    <div className="body__contents">
                        <Body headerBackground={headerBackground} />
                    </div>
                    {/* Pass the token to PlayerControls */}
                    <PlayerControls token={token} trackId="YOUR_TRACK_ID" /> {/* Replace "YOUR_TRACK_ID" with actual track ID */}
                </div>
            </div>
            <div className="spotify__footer">
                <Footer />
            </div>
        </Container>
    );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0,0,0,1));
    background-color: rgb(32, 87, 100); 
  }

  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
`;
