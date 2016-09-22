from front.home import *

@app.route('/api/sites', methods=['POST', 'GET'])
def sites_api():
    if request.method == 'POST':
        url = request.form.get('url')
        if not url:
            return jsonify(error='No url'), 400
        site = Site.create(domain=url)
        db.commit()
        return jsonify(site=site.to_dict())
    else:
        sites = [s.to_dict() for s in Site.q()]
        return jsonify(sites=sites)
