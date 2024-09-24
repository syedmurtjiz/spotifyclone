import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Body({ headerBackground }) {
    const [{ token, selectedPlaylistID, selectedPlaylist }, dispatch] = useStateProvider();

    useEffect(() => {
        const getInitialPlaylist = async () => {
            try {
                console.log(selectedPlaylistID);
                const response = await axios.get(
                    `https://api.spotify.com/v1/playlists/${selectedPlaylistID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const selectedPlaylist = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description.startsWith("<a") ? "" : response.data.description,
                    image: response.data.images && response.data.images.length > 0 ? response.data.images[0].url : null,
                    tracks: response.data.tracks.items.map(({ track }) => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map((artist) => artist.name),
                        image: track.album.images && track.album.images.length > 2 ? track.album.images[2].url : null,
                        duration: track.duration_ms,
                        context_uri: track.album.uri,
                        track_number: track.track_number,
                    })),
                };

                // Dispatch the action to set the selected playlist
                dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };

        if (token && selectedPlaylistID) {
            getInitialPlaylist();
        }
    }, [token, dispatch, selectedPlaylistID]);

    const msToMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const playTrack = async (id, name, artists, image, context_uri, track_number) => {
        console.log("Attempting to play track:", id, name);
        try {
            const response = await axios.put(
                `https://api.spotify.com/v1/me/player/play`,
                {
                    uris: [`spotify:track:${id}`], // Ensure the correct URI format
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 204) {
                // Track started playing successfully
                console.log("Track is now playing");
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error playing track:", error.response.data);
                switch (error.response.status) {
                    case 400:
                        console.error("Bad request: Check if the track is playable.");
                        break;
                    case 403:
                        console.error("Permission denied: Check if you have access to this track.");
                        break;
                    case 404:
                        console.error("Track not found: Check if the track ID is correct.");
                        break;
                    default:
                        console.error("Error playing track:", error.message);
                }
            } else {
                console.error("Error playing track:", error.message);
            }
        }
    };

    return (
        <Container $headerBackground={headerBackground}>
            {selectedPlaylist && (
                <>
                    <div className="playlist">
                        <div className="image">
                            <img src={selectedPlaylist.image} alt="selected playlist" />
                        </div>
                        <div className="details">
                            <span className="type">PLAYLIST</span>
                            <h1 className="title">{selectedPlaylist.name}</h1>
                            <p className="description">{selectedPlaylist.description}</p>
                        </div>
                    </div>
                    <div className="list">
                        <div className="header-row">
                            <div className="col">
                                <span>#</span>
                            </div>
                            <div className="col">
                                <span>TITLE</span>
                            </div>
                            <div className="col">
                                <span>ALBUM</span>
                            </div>
                            <div className="col">
                                <span>
                                    <AiFillClockCircle />
                                </span>
                            </div>
                        </div>
                        <div className="tracks">
                            {selectedPlaylist.tracks.map(
                                (
                                    {
                                        id,
                                        name,
                                        artists,
                                        image,
                                        duration,
                                        album,
                                        context_uri,
                                        track_number,
                                    },
                                    index
                                ) => (
                                    <div
                                        className="row" key={id} onClick={() =>
                                            playTrack(id, name, artists, image, context_uri, track_number)
                                        }
                                    >
                                        <div className="col">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className="col detail">
                                            <div className="image">
                                                <img src={image} alt="track" />
                                            </div>
                                            <div className="info">
                                                <span className="name">{name}</span>
                                                <span>{artists.join(', ')}</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <span>{album}</span>
                                        </div>
                                        <div className="col">
                                            <span>{msToMinutesAndSeconds(duration)}</span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`

   background: linear-gradient(135deg, #1DB954, #191414);
   background-size: cover;
   height: 250vh;
   margin-left:2.4rem; 


    .playlist {
        margin: 0 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        .image {
            img {
                height: 15rem;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
            }
        }
        .details {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            color: #e0dede;
            .title {
                color: white;
                font-size: 4rem;
            }
        }
    }
    .list {
        .header-row {
            display: grid;
            grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
            margin: 1rem 0 0 0;
            color: #dddcdc;
            position: sticky;
            top: 15vh;
            padding: 1rem 3rem;
            transition: 0.3s ease-in-out;
            background-color: ${({ $headerBackground }) =>
                $headerBackground ? "#000000dc" : "none"};  // Use transient prop
        }
        .tracks {
            margin: 0 2rem;
            display: flex;
            flex-direction: column;
            margin-bottom: 5rem;
            .row {
                padding: 0.5rem 1rem;
                display: grid;
                grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
                &:hover {
                    background-color: rgba(0, 0, 0, 0.7);
                }
                .col {
                    display: flex;
                    align-items: center;
                    color: #dddcdc;
                    img {
                        height: 40px;
                        width: 40px;
                    }
                }
                .detail {
                    display: flex;
                    gap: 1rem;
                    .info {
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
`;
