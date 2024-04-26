import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();
    const getSearched = async (name) => {
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4ed319425cde4154804463df47b082e4&query=${name}`);
            if (!data.ok) {
                throw new Error('Failed to fetch recipes');
            }
            const recipes = await data.json();
            setSearchedRecipes(recipes.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    
    useEffect(() => {
        getSearched(params.search);
        console.log('Search term:', params.search);
    },[params.search]);
  return (
    <Grid>
        {searchedRecipes.map((item) =>{
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                    <img src = {item.image} alt ="" />
                    <h4>{item.title}</h4>
                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
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

export default Searched
