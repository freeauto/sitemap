from front.home import *

from com.string_utils import URL_RX

@app.route('/api/sites', methods=['POST', 'GET'])
def sites_api():
    if request.method == 'POST':
        url = request.form.get('url')
        if not url or not URL_RX.match(url):
            return jsonify(error='Please enter a valid URL'), 400
        site = Site.create(domain=url)
        db.commit()
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
