import requests, sys, re, asyncio
from concurrent.futures import ThreadPoolExecutor, wait
from bs4 import BeautifulSoup

#from database.models import Product

def get_zzounds_products(path, instrument):
    result = requests.get(path, timeout=15)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    product_objects = soup.find_all("div", class_="product-card")

    products = []
    for product in product_objects:
        link = product.find("a", class_="prod-name")
        text = link.text
        href = link['href']
        img_url = product.find("img", class_="product-img")['src']
        if (product.find("div", class_="price-1")):
            price = product.find("div", class_="price-1").find("span", class_="price").text
        else: 
            continue
        regex = r'\S+'
        filtered_price = re.search(regex, price).group(0)
        curr_product = {"name": text, "instrument": instrument, "url": href, "image_url": img_url, "price": filtered_price, "retailer": "zzounds"}
        products.append(curr_product)
        try:
            result = requests.post("http://127.0.0.1:5000/products", json=curr_product)
        except:
            print("Unexpected error:", sys.exc_info()[0])
            raise
        # except Exception as e:
        #     try:
        #         product_id = Product.objects(name=text).first().id
        #         print(product_id)
        #         result = requests.put("http://127.0.0.1:5000/products/" + str(product_id), json=curr_product)
        #     except requests.exceptions.RequestException as e:
        #         raise SystemExit(e)
        # except requests.exceptions.RequestException as e:
        #     raise SystemExit(e)
    return products


def get_multipage_zzounds_products(category, instrument):
    url = "https://www.zzounds.com/prodsearch?cat=" + category + "&condition%5B0%5D=New&ob=az&pa=33&form=search&key=cat"

    result = requests.get(url)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    page_buttons = soup.find("div", class_="pag-control").find_all("a")
    num_pages = int(page_buttons[-1].text)

    futures = []
    with ThreadPoolExecutor() as executor:
        for i in range(num_pages):
            print(i)
            if (i != 0):
                url = "https://www.zzounds.com/prodsearch?cat=" + category + "&condition%5B0%5D=New&ob=az&pa=33&form=search&key=cat" + "&p=" + str(i + 1)
            futures.append(
                executor.submit(get_zzounds_products, url, instrument)
            )
    wait(futures)

    return True