# s3-connector
S3 connector with Bluebird promises and Bunyan logging

## ENV vars
`NODE_ENV` *development*, testing or production
`AWS_REGION` AWS region where you want to use S3
`AWS_KEY_ID` The AWS accessKeyId to connect with
`AWS_KEY_SECRET` The AWS secretAccessKey to connect with
`BUCKET_NAME` Default bucket name (you can override it in constructor)
`LOG_LEVEL` *trace*, debug, info, warn, error or fatal
`LOGSTASH_URL` URL or IP of Logstash server where the modul will send the logs
`LOGSTASH_PORT` Port of Logstash connection
