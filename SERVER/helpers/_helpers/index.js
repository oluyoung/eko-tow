function buildQuery(query, options, model = '') {
  const PAGINATION = 20;
  const page = options.page || 0;
  const limit = options.limit && options.limit < PAGINATION ? options.limit : PAGINATION;

  query.limit(limit);

  try {
      query.skip(parseInt(page) * limit)
  } catch(e) {}

  if (options.select) query.select(options.select)

  if (options.populate) query.populate(options.populate)

  if (options.sort) query.sort(options.sort)

  return query;
}

function throwNoEmailOrPasswordError(email, password) {
  if (!email) {
    throw errorObj.UnprocessableEntity('Email missing');
  }

  if (!password) {
    throw errorObj.UnprocessableEntity('Password missing');
  }
}

module.exports = {
    buildQuery,
    throwNoEmailOrPasswordError
}
