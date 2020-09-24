from time import sleep, time
from scrapers.gc import get_multipage_guitar_center_products
from scrapers.zzounds import get_multipage_zzounds_products

def scrape_gc():
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
    print('Scraping Guitar Center...')

    for key in gc_url_info.keys():
        get_multipage_guitar_center_products(gc_url_info[key], key)

def scrape_zzounds():
    category_nums = {'drum': "2463", 'guitar': "2543", 'bass': "2392", "keyboard_and_midi": "2666", "recording": "2781", "live_sound": "2713", "DJ": "2447"}
    print('Scraping ZZounds...')
    

    for key in category_nums.keys():
        get_multipage_zzounds_products(category_nums[key], key)

    

def run_scrapers(scrapers):
    start_time = time()
    
    if(scrapers == 'all'):
        scrape_gc()
        scrape_zzounds()
    elif(scrapers == "gc"):
        scrape_gc()
    elif(scrapers == "zzounds"):
        scrape_zzounds()
    else: 
        print('incorrect scraper option')

    end_time = time()
    elapsed_time = end_time - start_time

    print(f"Elapsed run time: {elapsed_time} seconds")
