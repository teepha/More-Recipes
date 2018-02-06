import React from 'react';
import PropTypes from 'prop-types';
import AllRecipe from './allRecipesList/AllRecipe.jsx';


/**
 * @description displays a list of all recipes
 * @method AllRecipesList
 * 
 * @param { array } allRecipes - array of all recipes
 * 
 * @returns { jsx } jsx - renders AllRecipesList component
 */
const AllRecipesList = ({ allRecipes }) => (
  <div className="card-deck mb-3 mt-3">
    {allRecipes.length === 0 ?
      <div className="lead text-center text-warning">
        There are no recipes to display
      </div> :
      allRecipes
      .map(allRecipe =>
        <AllRecipe
          key={allRecipe.id}
          allRecipe={allRecipe} />)
    }
  </div>
);

AllRecipesList.propTypes = {
  allRecipes: PropTypes.array.isRequired
};

export default AllRecipesList;
