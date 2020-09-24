import requests, sys, re, asyncio, math
from time import sleep
from random import choice
from concurrent.futures import ThreadPoolExecutor, wait
from bs4 import BeautifulSoup
from pyppeteer import launch


#https://www.guitarcenter.com/Drums-Percussion.gc#pageName=department-page&N=18210+1075&Nao=90&recsPerPage=90&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD
#https://www.guitarcenter.com/Drums-Percussion.gc#pageName=department-page&N=18210+1075&Nao=90&recsPerPage=90&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD
proxy_list = [
    '52.179.18.244:8080',
    '216.37.138.177:3128',
    '168.169.96.2:8080',
    '152.26.66.140:3128',
    '193.122.128.155:3128',
    '165.22.91.38:62387',
    '159.65.189.75:80',
    '161.35.29.58:80',
    '198.237.114.54:8080',
    '157.230.11.223:3128',
    '3.219.72.64:80',
    '149.28.70.79:3128',
    '157.230.11.214:3128',
    '162.252.58.157:5836',
    '157.230.11.235:3128'
]

async def scrape_page(path, proxy):
    browser = await launch(
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False,
        ignoreHTTPSErrors=True,
        args = [f'--proxy-server={proxy}']
    )
    page = await browser.newPage()
    await page.goto(path)
    await page.waitForFunction("document.querySelectorAll('.productGrid .product-container').length !== 30")
    content = await page.content()
    await browser.close()

    return {'content': content}

def get_guitar_center_products(path, instrument_id, proxy):
    print(path)
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    response = loop.run_until_complete(scrape_page(path, proxy))
    src = response['content']
    # result = requests.get(path, timeout=15)
    # sleep(5)
    # src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    product_objects = soup.find("div", class_="product-grid").find_all("div", class_="product")
    print(product_objects)
    products = []
    for product in product_objects:
        link = product.find("div", class_="productTitle").find("a")
        regex = r'\n'
        text = re.sub(regex, '', link.text)
        href = f"https://www.guitarcenter.com{link['href']}"
        img_url = product.find("div", class_="thumb").find("img")['src']
        price = product.find("div", class_="mainPrice").find('span').text
        regex = r'\$[0-9]*,?[0-9]*.[0-9][0-9]'
        filtered_price = re.search(regex, price).group(0)
        if len(filtered_price) < 1:
            continue
        curr_product = {"name": text, "instrument": instrument_id, "url": href, "image_url": img_url, "price": filtered_price, "retailer": "guitar_center"}

        products.append(curr_product)
        try:
            result = requests.post("http://127.0.0.1:5000/products", json=curr_product)
        except:
            print("Something went wrong.")

    return {'products': products}

def get_multipage_guitar_center_products(url_object, instrument_id):
    print(f'Scraping {url_object["name"]}')
    url = f"https://www.guitarcenter.com/{url_object['name']}.gc#pageName=department-page&N={url_object['num']}+1075&Nao=0&recsPerPage=90&Ns=bN&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD"
    proxy = {}
    new_proxy = True
    while(new_proxy == True):
        print('Choosing new proxy...')
        proxy = choice(proxy_list)
        try:
            result = requests.get(url, proxies={'https': proxy}, timeout=10)
            new_proxy = False
        except requests.exceptions.ProxyError as e:
            print(e)
        except:
            print('Something went wrong')

    src = result.content
    soup = BeautifulSoup(src, 'html5lib')

    num_products = soup.find("div", class_="facetContainer-seeable_condition").find('ul').find('li').text
    num_products = re.findall(r'\d+', num_products)[0]
    num_pages = math.ceil(int(num_products) / 90)

    print(f"{num_pages} total pages.")
    futures = []
    with ThreadPoolExecutor() as executor:
        for i in range(num_pages):
            print("Page #" + str(i + 1))
            if (i != 0):
                url = f"https://www.guitarcenter.com/{url_object['name']}.gc#pageName=department-page&N={url_object['num']}+1075&Nao={str(i * 90)}&recsPerPage=90&Ns=bN&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD"
            futures.append(
                executor.submit(get_guitar_center_products, url, instrument_id, proxy)
            )
    wait(futures)
       
    return True