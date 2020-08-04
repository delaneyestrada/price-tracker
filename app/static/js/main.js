$(document).ready(function(){
  /* RADIO BUTTON FUNCTIONALITY */
  $(".form-check > input").on("click", function(){
    instrument = $(this).attr("value")
  });

  /* TYPEAHEAD FUNCTIONALITY*/
  $('.typeahead').typeahead({
    minLength: 3,
  },
  {
    name: 'products',
    display: 'name',
    source: function(query, syncResults, asyncResults) {
      if(typeof instrument !== 'undefined'){
        $.get('/products/instrument/' + instrument + '/search?q=' + query, function(data) {
          asyncResults(data);
        });
      } else {
        $.get('/products/search?q=' + query, function(data) {
          asyncResults(data);
        });
      }
    },
    limit: 10,
    templates: {
      suggestion: function(product){
        //let id = product.name.replace(/\W/g, '').toLowerCase()
        let id = product._id.$oid
        let html = '<li id="' + id + '" class="list-group-item d-flex justify-content-between align-items-center product-search-item"><span class="small mr-4">' + product.price + '</span><span class="product-name">' + product.name + '</span><div class="btn-group ml-2" role="group" aria-label="..."><a class="btn btn-primary" target= "_blank" href="' + product.url + '" role="button">View @ zZounds</a><a class="btn btn-primary" href="#" role="button">Add to list</a></div></li>'
        return html
      }
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
      let product = data[0]
      let html = '<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + product.name +'</h5><div class="image-parent"><img src="' + product.image_url + '" class="img-thumbnail img-fluid ml-4" alt="' + product.name + '"></div></div><p class="mb-1">Buttons go here.</p><small class="text-muted">' + product.price + '</small></a>'
      $('#wishlist').append(html)
    });
  })
  function addToList(name, instrument, price, img_url, url) {
    console.log("TEST")
    
    
  }



  $('.twitter-typeahead').addClass('col-6 pl-0')


});
    
