from front.home import *

@app.route('/api/sites')
def sites_api():
    sites = [s.to_dict() for s in Site.q()]
    return jsonify(sites=sites)

