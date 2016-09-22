from com.assets import MyEnv, asset_paths
from main import app
import settings

if not settings.IS_LIKE_PROD:
    app.config['ASSETS_DEBUG'] = True # leave asset files as is for debugging, instead of minifying

env = MyEnv(app)

# JS

env.register_js('main_js', asset_paths('bower/', settings.IS_LIKE_PROD, [
  ('jquery/dist/jquery.js', 'jquery/dist/jquery.min.js'),
  ('bootstrap/dist/js/bootstrap.js', 'bootstrap/dist/js/bootstrap.min.js'),
  ('jquery.easing/js/jquery.easing.js', 'jquery.easing/js/jquery.easing.min.js')
]) + [
  'main/_pre/**.js',
  'main/main.js',
  'main/**.js',
])

env.register_js('app_jsx', [
  'compiled/app.jsx',
])

# CSS

env.register_css('main_css', asset_paths('bower/', settings.IS_LIKE_PROD, [
  # ('bootstrap/dist/css/bootstrap.css', 'bootstrap/dist/css/bootstrap.min.css'),
  ('font-awesome/css/font-awesome.css', 'font-awesome/css/font-awesome.min.css'),
]) + [
  env.add_bundle_less('main_less', settings.IS_REAL_PROD, 'main/main.less', ['main/**.less']),
  'main/_pre/**.css',
  'main/**.css'
])
