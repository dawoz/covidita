import json
import sys
import traceback

import requests
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait

base_link = 'https://public.tableau.com/views/Saturazioneterapieintensive2/Foglio1?%3Aembed=y&%3AshowVizHome=no' \
           '&%3Adisplay_count=y&%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Alanguage=it&:embed=y' \
           '&:showVizHome=n&:apiID=host0#navType=1&navSrc=Parse '


def create_browser():
    browser_options = Options()
    browser_options.add_argument("--headless")
    browser_options.add_argument('--no-sandbox')
    browser = webdriver.Firefox(firefox_options=browser_options)
    print("Done Creating Browser")
    return browser


def csv_to_json(csv_f):
    csv_lines = [l for l in csv_f.splitlines() if l.strip() != '']
    array = []
    keys = [k.lower().replace(' ', '_') for k in csv_lines[0].split(';')]

    for line in csv_lines[1:]:
        json_object = dict()
        values = [e.strip() for e in line.split(';')]

        for key, value in zip(keys, values):
            json_object[key] = value.format()

        array.append(json_object)

    return array


if __name__ == '__main__':
    browser = create_browser()
    browser.get(base_link)

    try:
        WebDriverWait(browser, 10).until_not(lambda x: x.find_element_by_id('loadingGlassPane').is_displayed())
        browser.find_element_by_id('download-ToolbarButton').click()

        WebDriverWait(browser, 10).until(lambda x: x.find_element_by_xpath('//*[contains(text(), "Dati")]').is_displayed())
        browser.find_element_by_xpath('//*[contains(text(), "Dati")]').click()

        browser.switch_to.window(browser.window_handles[1])

        WebDriverWait(browser, 10).until(lambda x: x.find_element_by_id('tab-view-table-data-0').is_displayed())
        browser.find_element_by_id('tab-view-table-data-0').click()

        link = browser.find_element_by_class_name('csvLink_summary').get_attribute('href')

        resp = requests.get(link)

        if not resp.ok:
            print('HTTP request failed. Try later')
            sys.exit(1)

        print('File request successful')
        csv_content = resp.content.decode("utf-8-sig")

        json_array = csv_to_json(csv_content)

        with open('terapia_intensiva.js', 'w+') as f:
            f.write('var getTerapiaIntensiva = function() {\nreturn ')
            f.write(json.dumps(json_array, indent=4))
            f.write('}')
            print('Done. File created: ' + f.name)

    except NoSuchElementException:
        print('Element not found')
        traceback.print_exc(file=sys.stdout)
        sys.exit(1)

    except TimeoutException:
        print('Page loading timeout')
        traceback.print_exc(file=sys.stdout)
        sys.exit(1)

    finally:
        browser.close()
        browser.quit()
