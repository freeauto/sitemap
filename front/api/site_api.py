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


@app.route('/api/pages')
def pages_api():
    site_key = request.args.get('site')
    page = int(request.args.get('page', '1'))
    site = Site.get(key=site_key)
    if not site:
        return jsonify(error='Site not found'), 404
    page_size = settings.PAGE_SIZE
    q = Page.q().filter_by(site_key=site_key).order_by(Page.url.desc())
    total = q.count()
    q = q.offset((page - 1) * page_size).limit(page_size)
    pages = []
    for x in q:
        d = x.to_dict()
        pages.append(d)
    return jsonify(pages=pages, total=total, page_size=page_size, page=page)
