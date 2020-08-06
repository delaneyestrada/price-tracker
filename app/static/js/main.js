$(document).ready(function(){
  /* RADIO BUTTON FUNCTIONALITY */
  instrument = "all"
  $(".form-check > input").on("click", function(){
    instrument = $(this).attr("value")
  });

  /* GET CURRENT PAGE FOR PAGINATION */
  let page = getUrlParameter("page");
  if (page == undefined){page = 1};
  
  /* TYPEAHEAD FUNCTIONALITY*/
  $('.typeahead').typeahead({
    minLength: 3,
    menu: $('.f-search__suggestion'),
    dataset: $('.f-dataset'),
  },
  {
    name: 'products',
    display: 'name',
    async: true,
    source: function(query, syncResults, asyncResults) {
        $.get('/products/search?categories=' + instrument + '&q=' + query + '&page=' + page, function(data) {
          console.log(data)
          asyncResults(data);
        });
    },
    limit: 'Infinity',
    templates: {/*
      suggestion: function(product){
        //let id = product.name.replace(/\W/g, '').toLowerCase()
        let id = product._id.$oid
        let html = '<tr id="' + id + '"><th scope="row">' + product.name +'</th><td>' + product.price + '</td><td><a class="btn btn-primary" href="#" role="button">Add to list</a></div></li></td></tr>'
        //let html = '<li id="' + id + '" class="list-group-item d-flex justify-content-between align-items-center product-search-item"><span class="small mr-4">' + product.price + '</span><span class="product-name">' + product.name + '</span><div class="btn-group ml-2" role="group" aria-label="..."><a class="btn btn-primary" href="#" role="button">Add to list</a></div></li>'
        return html
      },*/
      header: function(products){
        let html = '<table class="table"><thead class="thead-dark"><tr><th scope="col">Name</th><th scope="col">Price</th><th scope="col">Link</th></tr></thead><tbody class=".f-dataset">'
        products.suggestions.forEach(function(product){
          html += '<tr id="' + product._id.$oid + '"><th scope="row">' + product.name +'</th><td>' + product.price + '</td><td><a class="btn btn-primary btn-sm" href="#" role="button">Add to list</a></div></li></td></tr>'
        })
        return html
      },
      
      footer: function(products){
        let html = '</tbody></table>'
        return html
      },/*
      pending: function(products){
        $.get('/products/search?all=true', function(data) {
          return JSON.stringify(data)
        })
      }*/
    }
  })
  /* ADD ITEMS TO LIST */
  /* <div class="image-parent"></div> */
  /* <img src="' + product.image_url + '" class="img-thumbnail img-fluid ml-4" alt="' + product.name + '"> */
  /* USE JQUERY ON INSTEAD OF HTML ATTRIBUTE !! */
  $(".tt-dataset").on('click', "li.product-search-item", function(){
    let id = $(this).attr('id')
    $.get('/product/search?q=' + id, function(data) {
      console.log(data)
      let product_list = []
      let product = data[0]
      product_list += product
      let html = '<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + product.name +'</h5><div class="image-parent"><img src="' + product.image_url + '" class="img-thumbnail img-fluid ml-4" alt="' + product.name + '"></div></div><p class="mb-1">Buttons go here.</p><small class="text-muted">' + product.price + '</small></a>'
      $('#wishlist').append(html)
    });
  })

  $('.twitter-typeahead').addClass('col-12 pl-0')

});

const getUrlParameter = function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      } 
  }
};
    
