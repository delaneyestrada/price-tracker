from fuzzywuzzy import fuzz, process
from concurrent.futures import ThreadPoolExecutor, wait
from app import db
from database.models import Product
from time import sleep, time
import json

inst_query = db.session.query(Product.instrument.distinct().label("instrument"))
instruments = [row.instrument for row in inst_query.all()]
matches = []

def compare(instrument):
    # gc = db.session.query(Product).filter(Product.retailer == 'guitar_center')
    # zzounds = db.session.query(Product).filter(Product.retailer == 'zzounds')

    names = {'zz': [], 'gc': []}
    
    gc = Product.query.filter_by(retailer='guitar_center', instrument=instrument).all()
    zzounds = Product.query.filter_by(retailer='zzounds', instrument=instrument).all()

    for zz_item in zzounds:
        names['zz'].append(zz_item.name)

    for gc_item in gc:
        print(f'Search for matches for {gc_item.name}')
        comparison = process.extractOne(gc_item.name, names['zz'], scorer=fuzz.token_set_ratio, score_cutoff=90)
        matches.append({gc_item.name: comparison})

    



def compare_concurrent():
    start_time = time()
    futures = []
    with ThreadPoolExecutor() as executor:
        for instrument in instruments:
            futures.append(executor.submit(compare, instrument))
    
    wait(futures)
    end_time = time()
    elapsed_time = end_time - start_time

    print(matches)
    print(f"Elapsed run time: {elapsed_time} seconds")
    