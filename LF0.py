import json

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps("""Application under development. Search functionality will be implemented in Assignment 3""")
    }
