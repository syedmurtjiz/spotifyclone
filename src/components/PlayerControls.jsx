import React from 'react';
import styled from "styled-components";
import { BsFill0CircleFill, BsFillPauseCircleFill, BsFillPlayCircleFill, BsShuffle } from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const checkActiveDevice = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/devices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.devices.length > 0; // Check if there are any active devices
    } catch (error) {
      console.error("Error checking active devices: ", error);
      return false;
    }
  };

  const playTrack = async (trackId) => {
    const hasActiveDevice = await checkActiveDevice();
    if (!hasActiveDevice) {
      console.error("No active device found for playback.");
      return;
    }

    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          uris: [`spotify:track:${trackId}`], // Ensure the track ID is correct
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error playing track: ", error.response ? error.response.data : error.message);
    }
  };

  const changeTrack = async (type) => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`, {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.item) {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[0]?.url || "fallback_image_url.png",
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    } catch (error) {
      console.error("Error changing track: ", error);
    }
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`, {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
    } catch (error) {
      console.error("Error changing player state: ", error);
    }
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? <BsFillPauseCircleFill onClick={changeState} /> : <BsFillPlayCircleFill onClick={changeState} />}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex; 
  align-items: center;
  gap: 2rem;
  justify-content: center;

  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    font-size: 2rem;

    &:hover {
      color: white;
    }
  }

  .state {
    svg {
      color: white;
    }
  }

  .previous,
  .next,
  .state {
    padding: 2rem;
  }
`;
