import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import Recipes from "./recipes";

const App = () => {
  
  const APP_ID = "9e9c5ecb";

  const APP_KEY = "2a208dcf294ff446ab7043f8cd2dfb0f";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  
  // const exampleReq=  `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;


  //This is used to update our search bar. 
  //Every time 
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }
const getSearch = e => {
  //Prevents the page from resetting when we submit our query
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
const [counter, setCounter] = useState(0);

//Array is a constraint, indicating when our useEffect should run
//Empty array = once 
//Can put a variable in, so it only changes when that variable (counter for example) is run
useEffect(() => {
  getRecipes();

  //Only runs when query is changes, which is when the submit button is hit
}, [query]);
/*Async awaits are good when requesting information from an external API. 
//Since we don't know when the information will return, we use the keyword "await" to indicate that 
//We want that information to be returned when it's ready.
//Promises can also be used when requesting information from external services and APIs
//Fetch indicates where you want the information to be retrieved from in the API */

const getRecipes = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  //Waits for the json file from the API
  const data = await response.json();
  //Hits is where the recipes are located 
  setRecipes(data.hits);
  console.log(data.hits);
} 

// fetch(tps://https://api.edamam.com)
// .then(response => {
//   response.json();
// })

  return(

    
    <div className = "App">
      <form className="search-form"
      onSubmit = {getSearch}>
        <input 
        className ="search-bar"
        type="text" 
        //Sets value equal to search
        value ={search} 
        //Updates search every time a user presses
        onChange = {updateSearch}/>
        <button className ="search-button" type ="submit">Search</button>
      </form>
      <div className="recipe-list">
      {recipes.map(recipe => (
        <Recipes
        key = {recipe.recipe.label + recipe.recipe.calories}
        title = {recipe.recipe.label}
        calories = {Math.round(recipe.recipe.calories)+ " Calories"}
        ingredients = {recipe.recipe.ingredients}
        image = {recipe.recipe.image}/>
      ))}
      {/* <h1 onClick= {() =>setCounter(counter + 1)}>{counter}</h1> */}
      </div>
    </div>
  );
}
export default App;
