from datetime import datetime, timedelta # @UnusedImport
import logging # @UnusedImport
from flask import abort, render_template, redirect, url_for, request, make_response, jsonify, flash, Response # @UnusedImport

from database import db # @UnusedImport
from main import app
from models import * # @UnusedWildImport
import settings
from com.react_render import ReactRender
from com.front import escapejs


app.template_filter()(escapejs)
react = ReactRender(app)


@app.route('/')
def home_view():
    return render_template('home.html')


@app.route('/app/<path:pathname>')
@app.route('/app/', defaults={'pathname':''})
def app_view(pathname):
    server_data = dict(test="Hello there, this is the data.");
    rendered = react.render_router('app/App.jsx', pathname, '/app', redux=1, server_data=server_data)
    if isinstance(rendered, Response):
        return rendered
    return render_template('app.html', rendered=rendered, server_data=server_data)
