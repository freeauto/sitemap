from front.home import *

@app.route('/api/tests')
def tests_api():
    return jsonify(tests=[1,2,3])
