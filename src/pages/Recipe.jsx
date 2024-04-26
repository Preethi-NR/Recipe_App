import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [priceBreakdown, setPriceBreakdown] = useState({});
    const [analyzedInstructions, setAnalyzedInstructions] = useState([]);
    const [summary, setSummary] = useState('');
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        try {
            const detailResponse = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=4ed319425cde4154804463df47b082e4`);
            const detailData = await detailResponse.json();
            setDetails(detailData);
            
            const priceBreakdownResponse = await fetch(`https://api.spoonacular.com/recipes/${params.name}/priceBreakdownWidget.json?apiKey=4ed319425cde4154804463df47b082e4`);
            const priceBreakdownData = await priceBreakdownResponse.json();
            setPriceBreakdown(priceBreakdownData);

            const instructionsResponse = await fetch(`https://api.spoonacular.com/recipes/${params.name}/analyzedInstructions?apiKey=4ed319425cde4154804463df47b082e4`);
            const instructionsData = await instructionsResponse.json();
            if (instructionsData.length > 0) {
                setAnalyzedInstructions(instructionsData[0].steps);
            }

            const summaryResponse = await fetch(`https://api.spoonacular.com/recipes/${params.name}/summary?apiKey=4ed319425cde4154804463df47b082e4`);
            const summaryData = await summaryResponse.json();
            setSummary(summaryData.summary);

        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <ImageWrapper>
                <img src={details.image} alt=''/>
                <h2>{details.title}</h2>
            </ImageWrapper>
            <TextWrapper>
                <Info>
                    <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</Button>
                    <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>

                    {activeTab === 'instructions' && (
                        <div>
                            <h3>Instructions</h3>
                            <ol>
                                {analyzedInstructions && analyzedInstructions.map((step, index) => (
                                    <li key={index}>{step.step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                    {activeTab === 'ingredients' && (
                        <div>
                            <h3>Ingredients</h3>
                            <ul>
                                {details.extendedIngredients && details.extendedIngredients.map((ingredient) => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Info>
                <Summary dangerouslySetInnerHTML={{__html: summary}} />
                <PriceBreakdown>
                    <h3>Price Breakdown</h3>
                    <p>Total Cost: {priceBreakdown.totalCost}</p>
                </PriceBreakdown>
            </TextWrapper>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  flex: 1;
  margin-right: 2rem;
  
  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: -1rem; 
  }
`;

const TextWrapper = styled.div`
  flex: 1;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1rem;
  font-weight: 400;
  margin-top: 1rem;

  &.active {
    background: black;
    color: white;
  }
`;

const Info = styled.div`
margin-top: 1rem; 
background-color: white;
padding: 3rem;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
width:100%;
`;

const Summary = styled.div`
  margin-top: 1rem;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`;

const PriceBreakdown = styled.div`
  margin-top: 1rem;
  background-color: white;
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
  }
`;

export default Recipe;
