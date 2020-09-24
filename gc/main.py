from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re

options = Options()
options.add_argument('--blink-settings=imagesEnabled=false')
options.add_argument("--headless")

profile = webdriver.FirefoxProfile()
profile.set_preference("reader.parse-on-load.enabled", False)
profile.set_preference("browser.display.show_image_placeholders", False)
profile.set_preference("browser.display.use_document_colors", False)
profile.set_preference("browser.display.use_document_fonts", 0)
profile.set_preference("browser.display.use_system_colors", True)
profile.set_preference("browser.helperApps.deleteTempFileOnExit", True)
profile.set_preference("permissions.default.image", 2)
profile.set_preference('dom.ipc.plugins.enabled.libflashplayer.so', 'false')


DRIVER_PATH = 'D:/Dillon Estrada/Documents/geckodriver-v0.27.0-win64/geckodriver.exe'
driver = webdriver.Firefox(options=options, executable_path=DRIVER_PATH, firefox_profile=profile)




print("Starting scrape...")
url = f"https://www.guitarcenter.com/Guitars.gc#pageName=department-page&N=18144+1075&Nao=0&recsPerPage=90&&Ns=bN&postalCode=63126&radius=100&profileCountryCode=US&profileCurrencyCode=USD"
driver.get(url)
print("Browser Loaded")
try:
    for i in range(2):
 
        if i > 0:
            WebDriverWait(driver, 30).until(EC.url_contains(f"Nao={str(i*90)}"))
            print(driver.current_url)

        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.CLASS_NAME, "product-container")))

        print(f"Product container #{str(i + 1)} loaded")

        containers = driver.find_elements_by_class_name('product-container')
        for container in containers:
            link = container.find_element_by_css_selector("div.productTitle > a")
            href = link.get_attribute("href")
            text = link.text
            regex = '/(\w+)/'
            print(href)
            brand = re.search(regex, href).group(1)
            img_url = container.find_element_by_css_selector('div.thumb > a.quickView > img.lazy').get_attribute("data-original")
            price = container.find_element_by_css_selector('div.mainPrice > span.productPrice').text
            if "From" in price:
                continue
            curr_product = {"name": text, "instrument": "", "brand": brand, "url": href, "image_url": img_url, "price": price}
            for key in curr_product.keys():
                print(f"{key}: {curr_product[key]}")
    
        driver.find_element_by_xpath("//a[@aria-label='Next Page']").click()
except:
    driver.quit()