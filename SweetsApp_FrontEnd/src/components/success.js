
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Atom } from 'react-loading-indicators';

const MAX_POKEMON_ID = 1000;

const Success = () => {
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                // Generate a random Pokémon ID
                const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

                // Fetch Pokémon data using Axios
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemon();
    }, []);

    const handleReturn = () => {
        
        
        dispatch({
            type: 'RESET_ITEM_QUEUE2',
        });
        
    
        
        navigate('/');
    };

    const handleHome = () => {

            dispatch({

                type: 'RESET_ITEM_QUEUE',
            });
            navigate('/mithaiwala');

    };

    return (
        <div className='success'>
            <div className="logout">
                <button className='returnB' onClick={handleHome}>Home</button>
                <button className='returnB' onClick={handleReturn}>LogOut</button>
            </div>
            {pokemon ? (
                <div className='pokMain'>
                    <h1 className='pokFont'>SUCCESS!!!</h1>
                    <h1>Thank you for ordering. Here is a free Pokémon card!</h1>
                    <button className = "order1">Order ID: {localStorage.getItem("invoiceNo")}</button>
                    <div className='pokemon-card'>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            alt={pokemon.name}
                        />
                        
                    </div>
                   
                </div>
            ) : (
                
                <div className='indic'>
                    <Atom color="#3176cc" size="large" text="" textColor="#b70eb7"/>
                </div>
                
            )}
        </div>
    );
};

export default Success;


