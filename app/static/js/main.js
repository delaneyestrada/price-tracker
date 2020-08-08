
// !!! 
// FIX PAGINATION FORM CALL WHEN CATEGORY BUTTON HAS CHANGED
// !!! 


/* GET URL PARAMETERS */
var page_info = {}

const urlParams = ["page", "categories", "q", "num_products"]
let urlJson = {}
urlParams.forEach(function(param){
  urlJson[param] = getUrlParameter(param)
})
if (urlJson){
  page_info.categories = urlJson["categories"]
  page_info.page = urlJson["page"]
  page_info.query = urlJson['q']
  page_info.num_products = urlJson['num_products']
} else {
  page_info.categories = "all";
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
  $('#product-search').on('input', function(){
    let length = $(this).val().length
    if(length >= 2 || length == 0){
    getProductsFromQuery(page_info['categories'], $(this).val(), page_info['page'], true)
    .then((data) => {
      $('#table-data').empty();
      data['data'].forEach((product) => {$('#table-data').append(`<tr><td>${product.name}</td><td>${product.price}</td><td><button class="btn btn-primary riglist-add" id="${product._id.$oid}" href="#">Add to list</button></td></tr>`)})
      page_info = data['info']
    })
    .catch((err) => console.log(err)
    )
  } else {
    console.log("waiting")
  }
  });
  $('#product-search').on('focus', function(){
    getProductsFromQuery(page_info['categories'], $(this).val(), page_info['page'], true)
    .then((data) => {
      $('#table-data').empty();
      data['data'].forEach((product) => {$('#table-data').append(`<tr><td>${product.name}</td><td>${product.price}</td><td><button class="btn btn-primary riglist-add" id="${product._id.$oid}">Add to list</button></td></tr>`)})
    })
    .catch((err) => console.log(err)
    )
    $('#product-search').off('focus')
  });

  $('#product-search').val(page_info['query']).focus();


  $("#results-table").on('click', "button.riglist-add", function(){
    let id = $(this).attr('id')
    let product_list = []
    $.get('/product/search?q=' + id, function(data) {
      console.log(data)
      let product = data[0]
      product_list += product
      let html = '<li class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + product.name +'</h5><div class="image-parent"><img src="' + product.image_url + '" class="img-thumbnail img-fluid ml-4" alt="' + product.name + '"></div></div><p class="mb-1">Buttons go here.</p><small class="text-muted">' + product.price + '</small></li>'
      $('#riglist').append(html)
      $('#riglist-form > .form-group').append(`<input type="hidden" name="product_id" value="${id}" />`)
    });
    console.log(product_list)
  })

  $('.twitter-typeahead').addClass('col-12 pl-0')

});


function getProductsWithDefaults(query="", sync, async) {
  default_products.clear();
  default_products.local = getProductsFromQuery(page_info['categories'], query, page_info['page'], false);
  default_products.remote.url = '/products/search?req=products&categories=' + page_info['categories'] + '&q=%QUERY&page=' + page_info['page']
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

async function getProductsFromQuery(instrument, query, page, async=true){
  ajaxProduct = await $.ajax({url: '/products/search?req=products&categories=' + instrument + '&q=' + query + '&page=' + page, async: async, success: function(data){
    dataArr = data
  }})
  ajaxPageInfo = await $.ajax({url: '/products/search?req=page_info&categories=' + instrument + '&q=' + query + '&page=' + page, async: async, success: function(data){
    page_info = data;
  }});
  return {data: dataArr, info: page_info}
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
