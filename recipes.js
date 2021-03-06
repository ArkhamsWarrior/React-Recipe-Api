import React from 'react'; 
//.module.css imports a stylesheet specific only to this recipes.js
import style from './recipes.module.css'
const Recipes = ({title, calories, image, ingredients}) =>{
    return(
        
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ul>
                {ingredients.map(ingredient => (
                
                 <li>{ingredient.text}</li>
                    ))}
            </ul>
            <p>{calories}</p>
            <img src={image} alt=""/>

        </div>
    )
}

export default Recipes;