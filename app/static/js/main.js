/*
<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" aria-disabled="true"><<</a></li>
<li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" aria-disabled="true"><</a></li>
<li class="page-item active"><a class="page-link" href="/products?q={{ page_info.query }}&categories={{ page_info.categories }}&num_products={{ page_info.num_products }}&page={{ page_info.page }}">{{ page_info.page }}</a></li>
<li class="page-item"><a class="page-link" href="/products?q={{ page_info.query }}&categories={{ page_info.categories }}&num_products={{ page_info.num_products }}&page={{ page_info.page + 1 }}">{{ page_info.page + 1 }}</a></li>
<li class="page-item"><a class="page-link" href="/products?q={{ page_info.query }}&categories={{ page_info.categories }}&num_products={{ page_info.num_products }}&page={{ page_info.page + 2 }}">{{ page_info.page + 2 }}</a></li>
<li class="page-item"><a class="page-link" href="/products?q={{ page_info.query }}&categories={{ page_info.categories }}&num_products={{ page_info.num_products }}&page={{ page_info.page + 1 }}" tabindex="-1" aria-disabled="true">></a></li>
<li class="page-item"><a class="page-link" href="/products?q={{ page_info.query }}&categories={{ page_info.categories }}&num_products={{ page_info.num_products }}&page={{ page_info.number_of_pages }}" tabindex="-1" aria-disabled="true">>></a></li>
*/

/* GET URL PARAMETERS */
var page_info = {}

const urlParams = ["page", "categories", "q", "num_products"]
let urlJson = {}
urlParams.forEach(function(param){
  urlJson[param] = getUrlParameter(param)
})
if (urlJson){
  instrument = urlJson["categories"]
  page_info['page'] = urlJson["page"]
  page_info['query'] = urlJson['q']
  page_info['num_products'] = urlJson['num_products']
} else {
  instrument = "all";
  page_info.page = 1
  page_info.query = ""
  page_info.num_products = 0
}

/*let default_products = new Bloodhound({
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  identify: function(product) { return product._id.$oid },
  local: getProductsFromQuery(instrument, "", page_info['page']),
  remote: {
    wildcard: '%QUERY',
    url: '/products/search?req=products&categories=' + instrument + '&q=%QUERY&page=' + page_info['page']
  }
})*/

$(document).ready(function(){
  /*
  $('ul.pagination > li.page-item').click(function(event){
    console.log("TTTTTEEEESDTST")
    $('#page-input').val = $(this).text()
    $('#filter-form').submit();
    event.preventDefault()
  })*/
/*
  initializeTypeahead();
  $('.typeahead').typeahead('val', urlJson['q']).focus()

*/
 

 /*$.ajax({url: '/products/search?req=page_info&categories=' + instrument + '&q=' + query + '&page=' + page, async: true, success: function(data){
  page_info = data;
}});*/

 // $('.typeahead').typeahead('val', urlJson["q"])
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


function getProductsWithDefaults(query="", sync, async) {
  default_products.clear();
  default_products.local = getProductsFromQuery(instrument, query, page_info['page'], false);
  default_products.remote.url = '/products/search?req=products&categories=' + instrument + '&q=%QUERY&page=' + page_info['page']
  default_products.initialize(true);
  return default_products
}

function getUrlParameter(sParam) {
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

function getProductsFromQuery(instrument, query, page, async=true){
  let dataArr = [];
  $.ajax({url: '/products/search?req=products&categories=' + instrument + '&q=' + query + '&page=' + page, async: async, success: function(data){
    dataArr = data
    $.ajax({url: '/products/search?req=page_info&categories=' + instrument + '&q=' + query + '&page=' + page, async: async, success: function(data){
      page_info = data;
    }});
  }})
  return dataArr
}

/* TYPEAHEAD FUNCTIONALITY
function initializeTypeahead() {
  $('.typeahead').typeahead({
    minLength: 0,
    menu: $('.f-search__suggestion'),
    dataset: $('.f-dataset'),
  },
  {
    name: 'products',
    display: 'name',
    async: true,
    source: getProductsWithDefaults /*function(query, syncResults, asyncResults) {
        $.ajax({url: '/products/search?req=products&categories=' + instrument + '&q=' + query + '&page=' + page, async: true, success: function(data){
          asyncResults(data)
          $.ajax({url: '/products/search?req=page_info&categories=' + instrument + '&q=' + query + '&page=' + page, async: true, success: function(data){
            page_info = data;
          }});
        }});
    },
    limit: 'Infinity',
    templates: {
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
      },
    }
  })
};*/
