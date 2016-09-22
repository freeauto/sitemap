from front.home import *

from com.string_utils import URL_RX, get_domain, urlize
from back.scraper import scraper


@app.route('/api/sites', methods=['POST', 'GET'])
def sites_api():
    if request.method == 'POST':
        url = request.form.get('url')
        if not url or not URL_RX.match(url):
            return jsonify(error='Please enter a valid URL'), 400
        url = urlize(url)
        site = Site(domain=get_domain(url), url=url)
        db.commit()
        scraper.scrape(url, site.key)
        return jsonify(site=site.to_dict())
    else:
        sites = [s.to_dict() for s in Site.q().order_by(Site.key.desc())]
        return jsonify(sites=sites)


@app.route('/api/sites/<key>')
def site_api(key):
    site = Site.get(key=key)
    if not site:
        return jsonify(error='Site not found'), 404
    return jsonify(site=site.to_dict())
