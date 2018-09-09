const fetchResource = function(resource, id) {
  return fetch(`api/${resource}/${id}`)
}

let fetchUser = function(id) {
  return fetchResource('users', id)
}

let makeFetcher = function(resource) {
  return function(id) {
    return fetchResource(resource, id)
  }
}

fetchTheater = makeFetcher('theaters')

//e.g.
fetchTheater(3)

// arrow functions

const fetchResource = (resource, id) => fetch(`/api/${resource}/${id}`)

const makeFetcher = resource => id => fetchResource(resource, id)

const fetchUser = makeFetcher('users')

fetchUser(123)
