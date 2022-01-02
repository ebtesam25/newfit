import os
import pymongo
import json
import random
# import psycopg2
import hashlib
import time
from trycourier import Courier

from hashlib import sha256



def sendmessage(text, receiver):


    receiver = os.environ.get('COURIERTEST')

    client = Courier(auth_token=os.environ.get('COURIERAPI'))

    resp = client.send(
        event="courier-quickstart",
        recipient=receiver,
        data={
        "message": text
        }
    )

    print(resp['messageId'])



def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()

    
    mongostr = os.environ.get('MONGOSTR')
    client = pymongo.MongoClient(mongostr)
    db = client["newfit"]


    retjson = {}

    action = request_json['action']



    if action == "getalluserdata":
        col = db.rawreadings
        readings = []
        for x in col.find():
            if x['userid'] != request_json['userid']:
                continue
            
            table = {}

            table['steps'] = x['steps']
            table['ts'] = x['ts']
            table['calories'] = x['calories']
            table['bmr'] = x['bmr']

            readings.append(table)

        col = db.repos
        gits = []
        for x in col.find():
            if x['userid'] != request_json['userid']:
                continue
            
            table = {}

            table['actions'] = x['actions']
            table['ts'] = x['ts']

            gits.append(table)


        col = db.nfts
        nfts = []
        for x in col.find():
            if x['userid'] != request_json['userid']:
                continue
            
            table = {}

            table['steps'] = x['steps']
            table['ts'] = x['ts']
            table['calories'] = x['calories']
            table['name'] = x['name']
            table['git'] = x['git']
            table['image'] = x['image']
            

            nfts.append(table)


        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['readings'] = readings
        retjson['gits'] = gits
        retjson['nfts'] = nfts
        

        return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)



    if action == "getallmemes":
        col = db.memes
        tables = []
        for x in col.find():
            table = {}

            table['memeid'] = x['id']
            table['url'] = x['url']
            table['userid'] = x['userid']
            table['text'] = x['text']

            tables.append(table)

            


        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['tables'] = tables
        

        return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)



    if action == "register" :
        maxid = 1
        col = db.users
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["name"] = request_json['name']
        payload["email"] = request_json['email']
        payload["password"] = request_json['password']
        payload["age"] = request_json['age']
        payload["gender"] = request_json['gender']
        payload["weight"] = request_json['weight']
        payload["height"] = request_json['height']
        payload["phone"] = request_json['phone']
        
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['userid'] = id

        return json.dumps(retjson)




    if action == "addraw" :
        maxid = 1
        col = db.rawreadings
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["userid"] = request_json['userid']
        payload["ts"] = request_json['ts']
        payload["steps"] = request_json['steps']
        payload["calories"] = request_json['calories']
        payload["bmr"] = request_json['bmr']

        
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['readingid'] = id

        return json.dumps(retjson)


    if action == "addgits" :
        maxid = 1
        col = db.repos
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["userid"] = request_json['userid']
        payload["ts"] = request_json['ts']
        payload["actions"] = request_json['actions']
        
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['gitactionid'] = id

        return json.dumps(retjson)


    if action == "addnfts" :
        maxid = 1
        col = db.nfts
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["userid"] = request_json['userid']
        payload["ts"] = request_json['ts']
        payload["steps"] = request_json['steps']
        payload["name"] = request_json['name']
        payload["git"] = request_json['git']
        payload["calories"] = request_json['calories']
        payload["image"] = request_json['image']
        
        
        
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['nftid'] = id

        return json.dumps(retjson)







    if action == "login":
        col = db.users
        for x in col.find():
            if x['email'] == request_json['email'] and x['password'] == request_json['password']:
                userid = x['id']
                name = x['name']
                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['name'] = name
                retjson['userid'] = userid
                

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['userid'] = "-1"

        return json.dumps(retjson)



    if action == "addmatch" :
        maxid = 1
        col = db.matches
        for x in col.find():
            id = x["id"]
            if x["userid1"] == request_json["userid2"] and x["userid2"] == request_json["userid1"]:
                col.update_one({"id": x['id']}, {"$set":{"mutual":"yes"}})

                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "successfully modified"
                retjson['id'] = id

                return json.dumps(retjson)

            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']

        payload["userid1"] = request_json['userid1']
        payload["userid2"] = request_json['userid2']
        
        payload["mutual"] = "no"
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['id'] = id

        return json.dumps(retjson)




    if action == "addscore" :
        maxid = 1
        col = db.scores
        for x in col.find():
            id = x["id"]
            maxid +=1
        id = str(maxid+1)

        payload = {}

        uid = id 
        payload["id"] = id
        # payload["uid"] = request_json['uid']
        # payload["name"] = request_json['name']
        payload["userid"] = request_json['userid']
        payload["score"] = request_json['score']
        
        result=col.insert_one(payload)

        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "successfully added"
        retjson['id'] = id

        return json.dumps(retjson)


    if action == "getmyscore":
        col = db.scores
        for x in col.find():
            if x['userid'] == request_json['userid']:
                score = x['score']
                retjson = {}

                # retjson['dish'] = userid
                retjson['status'] = "success"
                retjson['score'] = score

                return json.dumps(retjson)
        retjson = {}

        # retjson['dish'] = userid
        retjson['status'] = "fail"
        retjson['id'] = "-1"

        return json.dumps(retjson)



    if action == "getallscores":
        col = db.scores
        scores = []
        for x in col.find():
            entry = {}
            entry['userid'] = x['userid']
            entry['score'] = x['score']
            scores.append(entry)
            
        # retjson['dish'] = userid
        retjson['status'] = "success"
        retjson['scores'] = scores

        return json.dumps(retjson)
        retjson = {}



    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
