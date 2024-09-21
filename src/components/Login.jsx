import React from "react";
import styled from "styled-components";

export default function Login() {
  const handleClick = async () => {
    const client_id = "15e36488dc074cce856806323a23a937";
    const redirect_uri = "http://localhost:3000/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

    return (
        <Container>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png" alt="Spotify" />
            <button onClick={handleClick}>Connect Spotify</button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: black;
    gap: 5rem;
    img {
        height: 20vh;
    }
    button {
        padding: 1rem;
        border-radius: 5rem;
        background-color: rgb(150, 280, 150);
        color: white;
        border: none;
        font-size: 1.4rem;
        cursor: pointer;
    }
`;
