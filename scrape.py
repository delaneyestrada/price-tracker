import requests
from bs4 import BeautifulSoup
import re

def get_zzounds_products(path):
    result = requests.get(path)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    product_objects = soup.find_all("div", class_="product-card")

    products = []
    for product in product_objects:
        link = product.find("a", class_="prod-name")
        text = link.text
        href = link['href']
        img_url = product.find("img", class_="product-img")['src']
        price = product.find("div", class_="price-1").find("span", class_="price").text

        regex = r'\S+'
        filtered_price = re.search(regex, price).group(0)
        products.append([text, href, img_url, filtered_price])
        #print("Item: " + text + "\nLink: " + href + "\nImage URL: " + img_url + "\nPrice: " + filtered_price + "\n\n\n")

    return products


    """
    links = soup.find_all("a", class_="prod-name")
    products = []

    for link in links:
        if link.text:
            products.append([link.text, link['href']])
        
    
    return products
    """

print(get_zzounds_products("https://www.zzounds.com/prodsearch?cat=2463&condition%5B0%5D=New&ob=az&pa=33&form=search&key=cat&p=2"))

def get_multipage_zzounds_products(category="2463"):
    url = "https://www.zzounds.com/prodsearch?cat=" + category + "&condition%5B0%5D=New&ob=az&pa=33&form=search&key=cat"

    result = requests.get(url)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    page_buttons = soup.find("div", class_="pag-control").find_all("a")
    num_pages = int(page_buttons[-1].text)

    products = []

    for i in range(num_pages):
        print(i)
        if (i != 0):
            url = "https://www.zzounds.com/prodsearch?cat=" + category + "&condition%5B0%5D=New&ob=az&pa=33&form=search&key=cat" + "&p=" + str(i + 1)
        
        products += get_zzounds_products(url)
    return products
"""
all_products = get_multipage_zzounds_products()
file_object = open("test.txt", "w+")
file_object.write(str(all_products))
for product in all_products:
    print(product)
"""

