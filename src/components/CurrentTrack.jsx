import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // Axios import for API calls
import { useStateProvider } from "../utils/StateProvider"; // Custom hook import
import { reducerCases } from "../utils/Constants"; // Constants import

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider(); // Fetching token and dispatch

  useEffect(() => {
    const getCurrentTrack = async () => {
      if (!token) return; // Ensure token is available
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.item) { // Check if item exists
          const currentPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[0]?.url || "fallback_image_url.png", // Fallback image
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
          console.log("No track is currently playing."); // Log if no track is playing
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
      } catch (error) {
        console.error("Error fetching current track: ", error.response ? error.response.data : error.message); // Log detailed error
      }
    };

    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="Current track" />
          </div>
          <div className="track__info">
            <h4 className="track__info__name">{currentPlaying.name}</h4>
            <h6 className="track__info__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__image {
      img {
        height: 60px;  
        width: 60px;   
      }
    }
    
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      
      &__name {
        color: white;
        font-size: 1.2rem;
      }
      
      &__artists {
        color: green;
        font-size: 1rem; 
      }
    }
  }
`;
