import requests
from bs4 import BeautifulSoup

def get_zzounds_products(path):
    result = requests.get(path)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')
    product_objects = find_all("div", class_="product-card")
    links = soup.find_all("a", class_="prod-name")
    products = []

    for link in links:
        if link.text:
            products.append([link.text, link['href']])
    
    return products
"""
product_list = get_zzounds_products("https://www.zzounds.com/cat--3-Piece-Acoustic-Drum-Sets--5126")
for product in product_list:
    print(product)

"https://www.zzounds.com/prodsearch?cat=2463&condition%5B0%5D=New&ob=pop&pa=33&form=search&key=cat&p=2"

"""
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

all_products = get_multipage_zzounds_products()
file_object = open("test.txt", "w+")
file_object.write(str(all_products))
for product in all_products:
    print(product)
        
