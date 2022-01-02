# -*- coding: utf-8 -*-

from flask import Flask, request, abort, Response
# from urllib.parse import parse_qs, urlparse
import requests
import json
import makenft


app = Flask(__name__)






@app.route('/', methods=['GET', 'POST'])
def hello_world():
    # js = transcribe()
    
    js = {}
    js['status'] = 'done'


    resp = Response(js, status=200, mimetype='application/json')

    print ("****************************")
    print (resp)

    return js
    # return resp



@app.route("/NFTize", methods=['POST'])
def nftize():

    res = request.get_json()
    print (res)

    # resraw = request.get_data()
    # print (resraw)

##    args = request.args
##    form = request.form
##    values = request.values

##    print (args)
##    print (form)
##    print (values)

##    sres = request.form.to_dict()


    uname = res['name']
    uid = res['userid']
    unid = uname + uid
    git = float(res['git'])
    steps = float(res['steps'])
    cals = float(res['calories'])
    tsteps = float(res['targetsteps'])
    tcals = float(res['targetcals'])
    tgit = float(res['targetgit'])
    ts = res['ts']

    df = makenft.generate_random_img(unid, git, steps, cals, tsteps, tcals, tgit, ts)

    print (df)


# {"name":"ebtesam","userid":"2","git":"20","steps":"1000","calories":"1300","targetsteps":"15000",  "targetcals" : "2200", "targetgit" : "25", "ts" : 174258898}

    status = {}
    status["server"] = "up"
    status["request"] = res 
    status['df'] = df
    status['image'] = df['image']

    statusjson = json.dumps(status)

    print(statusjson)

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(statusjson, status=200, mimetype='application/json')
    ##resp.headers['Link'] = 'http://google.com'

    return resp

@app.route("/dummyJson", methods=['GET', 'POST'])
def dummyJson():

    res = request.get_json()
    print (res)

    resraw = request.get_data()
    print (resraw)

##    args = request.args
##    form = request.form
##    values = request.values

##    print (args)
##    print (form)
##    print (values)

##    sres = request.form.to_dict()


    status = {}
    status["server"] = "up"
    status["request"] = res 

    statusjson = json.dumps(status)

    print(statusjson)

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(statusjson, status=200, mimetype='application/json')
    ##resp.headers['Link'] = 'http://google.com'

    return resp


if __name__ == '__main__':
    # app.run()
    # app.run(debug=True, host = '45.79.199.42', port = 8005)
    app.run(debug=True, host = 'localhost', port = 8005)
