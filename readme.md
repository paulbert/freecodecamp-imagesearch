# FreeCodeCamp Image Search Microservice project

Image search service.

`https://fcc-paulbert-imagesearch.herokuapp.com/imagesearch/{query}`

Will return a JSON array of objects for the first ten images with the following properties:
__url__: The url of the full size image
__snippet__: A short description of the image
__thumbnail__: The url of the thumbnail size image
__context__: The url of the page where the image was found

To get subsequent sets of ten results use the offset query parameter (1 gets 11-20, 2 gets 21-30 and so on):

`https://fcc-paulbert-imagesearch.herokuapp.com/imagesearch/{query}?offset={pagenum}`

`https://fcc-paulbert-imagesearch.herokuapp.com/latest/imagesearch`

Will return a JSON array with the most recent search queries and the time the search was done

[FreeCodeCamp](http://www.freecodecamp.com)