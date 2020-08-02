const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

$(document).ready(function(){
  $('.typeahead').typeahead({
    minLength: 3,
  },
  {
    name: 'products',
    display: 'name',
    source: function(query, syncResults, asyncResults) {
      $.get('/products/search?q=' + query, function(data) {
        asyncResults(data);
      });
    },
    limit: 10,
    templates: {
      suggestion: function(product){
        return '<a href="' + product.url + '"><li class="list-group-item d-flex justify-content-between align-items-center"><span class="small mr-4">' + product.price + '</span><span>' + product.name + '</span><div class="image-parent"><img src="' + product.image_url + '" class="img-thumbnail img-fluid ml-4" alt="' + product.name + '"></div></li></a>'
      }
    }
  })
  $('.twitter-typeahead').addClass('col-6 pl-0')
  /*
  let url = "127.0.0.1:5000/"
  $("#group-selector > .dropdown-item").on("click", function(){
    $('.list-group').empty().append('<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>')
    let instrument = $(this).text().toLowerCase()
    $.ajax('/products/instrument/' + instrument)
    .done(function(data){
      products = data
      $('.spinner-border').remove();
      products.forEach(product => {
        $('.list-group').append('<a href="' + product.url + '"><li class="list-group-item d-flex justify-content-between align-items-center"><span>' + product.price + '</span>' + product.name + '<div class="image-parent"><img src="' + product.image_url + '" class="img-fluid" alt="' + product.name + '"></div></li></a>')
      })
    })
  }); */
})
    
