from front.home import *

@app.route('/api/sites')
def sites_api():
    return jsonify(sites=[1,2,3])
