import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    const [filters, setFilters] = useState({
        vegetarian: {
            enabled: false,
            maxCookingTime: 60 
        },
        vegan: {
            enabled: false,
            maxCookingTime: 60 
        },
        glutenFree: {
            enabled: false,
            maxCookingTime: 60 
        },
        cuisine: '' 
    });

    const handleFilterChange = (filter) => {
        setFilters({ ...filters, [filter]: { ...filters[filter], enabled: !filters[filter].enabled } });
    };

    const handleCookingTimeChange = (filter, value) => {
        setFilters({ ...filters, [filter]: { ...filters[filter], maxCookingTime: value } });
    };

    const handleCuisineChange = (value) => {
        setFilters({ ...filters, cuisine: value });
    };

    useEffect(() => {
        const getCuisine = async () => {
            try {
                let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=4ed319425cde4154804463df47b082e4`;

                if (filters.cuisine) {
                    url += `&cuisine=${filters.cuisine}`;
                }

                let dietaryOptions = [];
                if (filters.vegetarian.enabled) dietaryOptions.push('vegetarian');
                if (filters.vegan.enabled) dietaryOptions.push('vegan');
                if (filters.glutenFree.enabled) dietaryOptions.push('glutenFree');
                if (dietaryOptions.length > 0) {
                    url += `&diet=${dietaryOptions.join(',')}`;
                }

                const data = await fetch(url);
                const recipes = await data.json();
                setCuisine(recipes.results);
            } catch (error) {
                console.error('Error fetching cuisine recipes:', error);
            }
        };

        getCuisine();
    }, [filters]);

    return (
        <div>
            <FilterOptions>
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={filters.vegetarian.enabled}
                        onChange={() => handleFilterChange('vegetarian')}
                    />
                    Vegetarian
                </CheckboxLabel>
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={filters.vegan.enabled}
                        onChange={() => handleFilterChange('vegan')}
                    />
                    Vegan
                </CheckboxLabel>
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={filters.glutenFree.enabled}
                        onChange={() => handleFilterChange('glutenFree')}
                    />
                    Gluten-Free
                </CheckboxLabel>
            </FilterOptions>
            <div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Max Cooking Time (Vegetarian):</label>
                    <input
                        type="number"
                        min="0"
                        value={filters.vegetarian.maxCookingTime}
                        onChange={(e) => handleCookingTimeChange('vegetarian', parseInt(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Max Cooking Time (Vegan):</label>
                    <input
                        type="number"
                        min="0"
                        value={filters.vegan.maxCookingTime}
                        onChange={(e) => handleCookingTimeChange('vegan', parseInt(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Max Cooking Time (Gluten-Free):</label>
                    <input
                        type="number"
                        min="0"
                        value={filters.glutenFree.maxCookingTime}
                        onChange={(e) => handleCookingTimeChange('glutenFree', parseInt(e.target.value))}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Cuisine:</label>
                    <select
                        value={filters.cuisine}
                        onChange={(e) => handleCuisineChange(e.target.value)}
                    >
                        <option value="">Select Cuisine</option>
                        <option value="italian">Italian</option>
                        <option value="thai">Thai</option>
                        <option value="japanese">Japanese</option>
                        <option value="american">American</option>
                    </select>
                </div>
            </div>
            <Grid
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {cuisine.map((item) => (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt='' />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                ))}
            </Grid>
        </div>
    );
}

const FilterOptions = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    label {
        margin-right: 1rem;
    }
`;

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns per row */
    grid-gap: 3rem;
`;

const CheckboxLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
`;

const Card = styled.div`
    img {
        width: 80%;
        border-radius: 2rem;
    }

    a {
        text-decoration: none;
    }

    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Cuisine;
