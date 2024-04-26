import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
// import { FaS } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function Search() {
    const[input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandler = (e) =>{
        e.preventDefault();
        navigate("/searched/"+input);
    }
  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
            <FaSearch></FaSearch>
      <input 
      onChange={(e)=>setInput(e.target.value)}  type="text" value={input}/>
      <FaSearch />
      </div>
    </FormStyle>
  )
}
const FormStyle = styled.form`
  margin: 2rem 6rem;

  div {
    width: 100%;
    position: relative;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 6rem;
    border-radius: 1rem;
    outline: none;
    width: 500px;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
    color: white;
  }
`;


export default Search;
