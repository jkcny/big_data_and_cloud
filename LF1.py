import boto3
import json
import requests
from requests_aws4auth import AWS4Auth
from boto3.dynamodb.conditions import Key


region = 'us-east-1' 
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = 'https://search-posts-olyfhy4stfviygw2xf35znnvmi.us-east-1.es.amazonaws.com'
index = 'posts'
url = host + '/' + index + '/_search'

def lambda_handler(event, context):
    query = {
        "size": 3,
        "query": {
            "multi_match": {
                "query": event['queryStringParameters']['q'],
                "fields": ["tags"]
            }
        }
    }
    
    headers = { "Content-Type": "application/json" }

    # Make the signed HTTP request
    r = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))

    # Create the response and add some extra content to support CORS
    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": '*'
        },
        "isBase64Encoded": False
    }

    # Add the search results to the response
    #response['body'] = r.text
    
    posts_list = json.loads(r.text)['hits']['hits']
    posts_id_list = [x['_id'] for x in posts_list]
    
    # get the posts details from dynamoDB
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('posts')
    posts_text = []
    for id in posts_id_list:
        resp = table.query(KeyConditionExpression=Key('id').eq(int(id)))
        #print(resp)
        if len(resp['Items']) == 0:
            continue
        else:
            posts_text.append(resp['Items'][0]['posts'])
    
    response['body'] = json.dumps(posts_text)
    return response
