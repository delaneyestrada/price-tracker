$(document).ready(function(){
  let url = "127.0.0.1:5000/"
  $("#group-selector > .dropdown-item").on("click", function(){
    $('.list-group').empty().append('<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>')
    let instrument = $(this).text().toLowerCase()
    $.ajax('/products/instrument/' + $(this).text().toLowerCase())
    .done(function(data){
      products = data
      $('.spinner-border').remove();
      products.forEach(product => {
        $('.list-group').append('<a href="' + product.url + '"><li class="list-group-item d-flex justify-content-between align-items-center"><span>' + product.price + '</span>' + product.name + '<div class="image-parent"><img src="' + product.image_url + '" class="img-fluid" alt="' + product.name + '"></div></li></a>')
      })
    })
  });
})
    
