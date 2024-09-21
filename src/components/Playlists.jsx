import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        if (!token) return;
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const playlists = items.map(({ name, id }) => ({ name, id }));
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.error("Error fetching playlists:", error.response ? error.response.data : error.message);
      }
    };

    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <Container>
      Playlist
      <ul>
        {playlists && playlists.length > 0 ? (
          playlists.map(({ name, id }) => (
            <li key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          ))
        ) : (
          <li>No playlists available</li>
        )}
      </ul>
    </Container>
  );
}

const Container = styled.div`
height: 100%;
overflow: hidden;
margin-left:2.5rem;
    ul {
    
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height:100%;
    overflow: auto;
    &::-webkit-scrollbar{
    width: 0.7rem;
    &-thumb{
      background-color: rgba(255, 255, 255, 0.6);
      }
    }

    li {
    display: flex;
    gap: 1rem;
    cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`;
