import React from 'react';
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

export default function Volume() {
    const [{ token }] = useStateProvider();

    const setVolume = async (e) => {
        try {
            await axios.put(
                "https://api.spotify.com/v1/me/player/volume",
                {},
                {
                    params: {
                        volume_percent: e.target.value,
                    },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error("Error setting volume: ", error);
        }
    };

    return (
        <Container>
            <VolumeIcon />
            <Slider 
                type="range" 
                min={0} 
                max={100} 
                onMouseUp={(e) => setVolume(e)} 
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const VolumeIcon = styled.div`
    width: 2rem;
    height: 2rem;
    background: url('/path/to/volume-icon.svg') no-repeat center/contain; /* Replace with your icon path */
    margin-right: -8rem; /* Space between icon and slider */
`;

const Slider = styled.input`
    -webkit-appearance: none;
    width: 15rem;
    height: 0.5rem;
    border-radius: 1rem;
    background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #4caf50;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
    }

    &::-moz-range-thumb {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #4caf50;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
    }

    &:hover::-webkit-slider-thumb {
        transform: scale(1.1);
    }

    &:hover::-moz-range-thumb {
        transform: scale(1.1);
    }
`;
