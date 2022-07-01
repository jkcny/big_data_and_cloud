import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
db = dynamodb.Table('posts')

def lambda_handler(event, context):

    dbrow = json.loads(event['body'])
    print(dbrow)
    db.put_item(Item={
        'id':int(dbrow['id']),
        'date':dbrow['date'],
        'posts':dbrow['posts']
    })
    return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Origin": '*'
        },
        'body': json.dumps('Post success! Post id is {}'.format(dbrow['id']))
    }
