from home import *  # @UnusedWildImport

@app.route('/test/error')
def test_error():
    x = 1
    x /= 0
