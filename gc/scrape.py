import requests
from bs4 import BeautifulSoup
import re
import time
import json

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
        curr_product = {"name": text, "instrument": instrument, "url": href, "image_url": img_url, "price": filtered_price}
        products.append(curr_product)
        try:
            result = requests.post("http://127.0.0.1:5000/products", json=curr_product)
        except Exception as e:
            """try:
                product_id = Product.objects(name=text).first().id
                print(product_id)
                result = requests.put("http://127.0.0.1:5000/products/" + str(product_id), json=curr_product)
            except requests.exceptions.RequestException as e:
                raise SystemExit(e)"""
        except requests.exceptions.RequestException as e:
            raise SystemExit(e)
    return products


def get_multipage_zzounds_products(category, instrument):
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
        
        products += get_zzounds_products(url, instrument)

    return True

zz_category_nums = {'drum': "2463", 'guitar': "2543", 'bass': "2392", "keyboard_and_midi": "2666", "recording": "2781", "live_sound": "2713", "DJ": "2447"}
gc_url_info = {
    'drum':                 {'num': "18210", 'name': "Drums-Percussion"}, 
    'guitar':               {'num': "18144", 'name': "Guitars"}, 
    'bass':                 {'num': "18171", 'name': "Bass"}, 
    "keyboard_and_midi":    {'num': "18185", 'name': "Keyboards-MIDI"}, 
    "recording":            {'num': "19630", 'name': "Recording-Gear"}, 
    "live_sound":           {'num': "19615", 'name': "Live-Sound"}, 
    "DJ":                   {'num': "19660", 'name': "DJ-Gear"}, 
    "mics_and_wireless":    {'num': "19725", 'name': "Microphones-Wireless-Systems"}, 
    "amps_and_effects":     {'num': "18353", 'name': "Amplifiers-Effects"}
}

#https://www.guitarcenter.com/Drums-Percussion.gc#pageName=department-page&N=18210+1075&Nao=90&recsPerPage=90&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD
#https://www.guitarcenter.com/Drums-Percussion.gc#pageName=department-page&N=18210+1075&Nao=90&recsPerPage=90&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD

def get_guitar_center_products(path, instrument_id):
    print(path)
    result = requests.get(path, timeout=15)
    time.sleep(2)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    product_objects = soup.find("div", class_="product-grid").find_all("div", class_="product")

    products = []
    for product in product_objects:
        link = product.find("div", class_="productTitle").find("a")
        text = link.text[1:]
        href = f"https://www.guitarcenter.com{link['href']}"
        img_url = product.find("div", class_="thumb").find("img")['src']
        price = product.find("div", class_="mainPrice").find('span').text
        regex = r'\$[0-9]*,?[0-9]*.[0-9][0-9]'
        filtered_price = re.search(regex, price).group(0)
        curr_product = {"name": text, "instrument": instrument_id, "url": href, "image_url": img_url, "price": filtered_price}
        print(curr_product)
        products.append(curr_product)
        try:
            print("POST")
            result = requests.post("http://127.0.0.1:5000/products", json=curr_product)
        except Exception as e:"""
            try:
                product_id = Product.objects(name=text).first().id
                print(product_id)
                result = requests.put("http://127.0.0.1:5000/products/" + str(product_id), json=curr_product)
            except requests.exceptions.RequestException as e:
                raise SystemExit(e)"""
        except requests.exceptions.RequestException as e:
            raise SystemExit(e)
    return products

#https://www.guitarcenter.com/Guitars.gc#pageName=department-page&N=18144+1075&Nao=90&recsPerPage=90&&Ns=bN&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD
#https://www.guitarcenter.com/Drums-Percussion.gc#pageName=department-page&N=18210+1075&Nao=0&recsPerPage=90&postalCode=70737&radius=100&profileCountryCode=US&profileCurrencyCode=USD
def get_multipage_guitar_center_products(url_object, instrument_id):
    print(url_object)
    url = f"https://www.guitarcenter.com/{url_object['name']}.gc#pageName=department-page&N={url_object['num']}+1075&Nao=0&recsPerPage=90&Ns=bN&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD"

    result = requests.get(url)
    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    page_buttons = soup.find("div", class_="searchPagination").find_all("a")
    num_pages = int(page_buttons[-2].text)

    products = []

    for i in range(num_pages):
        print("Page #" + str(i))
        if (i != 0):
            print("i = " + str(i))
            print("i * 90 = " + str(i * 90))
            url = f"https://www.guitarcenter.com/{url_object['name']}.gc#pageName=department-page&N={url_object['num']}+1075&Nao={str(i * 90)}&recsPerPage=90&Ns=bN&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD"
        
        products += get_guitar_center_products(url, instrument_id)

    return True

for key in gc_url_info.keys():
    get_multipage_guitar_center_products(gc_url_info[key], key)
for key in zz_category_nums.keys():
    get_multipage_zzounds_products(zz_category_nums[key], key)
