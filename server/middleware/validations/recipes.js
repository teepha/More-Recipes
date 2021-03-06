import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import checkId from '../../utils/checkId';
import requestFeedback from '../../utils/requestFeedback';


/**
 * Validates POST and GET requestuests for recipes route
 * @class RecipesValidation
 */
export default class RecipesValidation {
  /**
   * Validates all recipe details before allowing access to controller class
   * @memberof RecipesValidation
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   * @param   {object} next      the node/express middleware next object
   *
   * @returns {object} validation error messages object or contents of request.body object
   */
  static addRecipeValidations(request, response, next) {
    if (typeof request.body.title === 'undefined' || typeof request.body.ingredients === 'undefined' || typeof request.body.procedures === 'undefined') {
      return requestFeedback.error(response, 422, 'All or some fields are not defined');
    }

    const title = request.body.title.trim(),
      ingredients = request.body.ingredients.trim(),
      procedures = request.body.procedures.trim(),
      errors = {};

    if (!validator.isEmpty(title)) {
      if (title.search(/[^A-Za-z\s]/) !== -1) {
        errors.title = 'Recipe title must contain only alphabets';
      }
    } else { errors.title = 'Recipe title is required'; }

    if (!validator.isEmpty(ingredients)) {
      if (!validator.isLength(ingredients, { min: 20, max: undefined })) {
        errors.ingredients = 'Recipe ingredients provided must be at least 20 characters';
      }
    } else { errors.ingredients = 'Recipe ingredients are required'; }

    if (!validator.isEmpty(procedures)) {
      if (!validator.isLength(procedures, { min: 20, max: undefined })) {
        errors.procedures = 'Recipe procedures provided must be at least 20 characters';
      }
    } else { errors.procedures = 'Recipe procedures are required'; }

    const result = { isValid: isEmpty(errors) };

    if (!result.isValid) {
      return response.status(400).json({ errors });
    }
    return next();
  }

  /**
   * Validates updated recipe detail(s) before allowing access to controller class
   * @memberof RecipesValidation
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   * @param   {object} next      the node/express middleware next object
   *
   * @returns {object} validation error messages object or content(s) of request.body object
   */
  static updateRecipeValidations(request, response, next) {
    const { title, ingredients, procedures } = request.body,
      recipeId = parseInt(request.params.recipeID.trim(), 10),
      errors = {};

    if (checkId.recipeId(response, recipeId)) {
      if (!(title || ingredients || procedures)) {
        return requestFeedback.error(response, 422, 'Provide a field to update');
      }

      if (title) {
        if (title.search(/[^A-Za-z\s]/) !== -1) {
          errors.title = 'Recipe title must contain only alphabets';
        }
      }

      if (ingredients) {
        if (!validator.isLength(ingredients, { min: 20, max: undefined })) {
          errors.ingredients = 'Recipe ingredients provided must be atleast 20 characters';
        }
      }

      if (procedures) {
        if (!validator.isLength(procedures, { min: 20, max: undefined })) {
          errors.procedures = 'Recipe procedures provided must be atleast 20 characters';
        }
      }

      const result = { isValid: isEmpty(errors) };

      if (!result.isValid) {
        return response.status(400).json({ errors });
      }
      return next();
    }
  }

  /**
   * Validates query and non query routes before allowing access to controller class
   * @memberof RecipesValidation
   * @static
   *
   * @param   {object} request   the server/http(s) request object
   * @param   {object} response  the server/http(s) response object
   * @param   {object} next      the node/express middleware next object
   *
   * @returns {object} validation error messages object or contents of request.query(or nothing)
   */
  static getSortdedRecipesValidation(request, response, next) {
    if (!request.query.sort && !request.query.order) {
      return next();
    }

    if (typeof request.query.sort === 'undefined' || typeof request.query.order === 'undefined') {
      return requestFeedback.error(response, 422, 'Sort or(and) order query parameter(s) is(are) not defined');
    }

    const sort = request.query.sort.trim(),
      order = request.query.order.trim(),
      errors = {};

    if (!validator.isEmpty(sort)) {
      if (!(sort.toLowerCase() === 'upvotes' || sort.toLowerCase() === 'downvotes')) {
        errors.sortType = 'Sort query must be either upvotes or downvotes';
      }
    } else { errors.sortType = 'Sort query is required'; }

    if (!validator.isEmpty(order)) {
      if (!(order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
        errors.order = 'Order query must be either asc or desc';
      }
    } else { errors.order = 'Order query is required'; }


    const result = { isValid: isEmpty(errors) };

    if (!result.isValid) {
      return response.status(400).json({ errors });
    }
    return next();
  }
}
