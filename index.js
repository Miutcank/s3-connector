var config = require('./config');
var log = require('./utils/logger')();
var AWSConnector = require('aws-connector');

module.exports = function S3ConnectorConstructor(bucketName) {
    var s3 = this;
    var AWS_AUTH = config.S3.auth;
    var BUCKET_NAME = bucketName || config.S3.bucket;

    AWSConnector.s3.configure(AWS_AUTH);
    s3.connection = AWSConnector.s3.connect();

    // get object
    s3.getObject = function getObject(key, isString, returnOnlyString) {
        isString = isString || true;
        returnOnlyString = returnOnlyString || false;
        var params = {
            Bucket: BUCKET_NAME,
            Key: key
        };
        return s3.connection.getObject(params)
            .then(function decodeObjectToString(object) {
                //if string, return we dont return buffer.
                if (isString) {
                    object.Body = object.Body.toString('utf8');
                }
                if (returnOnlyString) {
                    return object.Body;
                } else {
                    return object;
                }
            })
            .catch(function handleError(e) {
                log.error({error: e}, 'Error in getObject');
                throw e;
            });
    };

    // put object
    s3.putObject = function putObject(key, content){
        if (!key || !content) {
            log.error('Required arguments are missing');
            throw new Error('Required arguments are missing');
        }
        if (!Buffer.isBuffer(content)) {
            content = new Buffer(content);
        }
        var params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: content
        };
        return s3.connection.putObject(params)
            .catch(function handleError(e) {
                log.error({error: e}, 'Error in putObject');
                throw e;
            });
    };

    // delete object
    s3.deleteObject = function deleteObject(key){
        if (!key) {
			log.error('Required arguments are missing');
            throw new Error('Required arguments are missing');
        }
        var params = {
            Bucket: BUCKET_NAME,
            Key: key
        };
        return s3.connection.deleteObject(params)
            .catch(function handleError(e) {
                log.error({error: e}, 'Error in deleteObject');
                throw e;
            });
    };

    // list objects in bucket
    s3.listFilesInBucket = function listFilesInBucket(bucketName) {
        bucketName = bucketName || BUCKET_NAME;
        var params = {
            Bucket: bucketName
        };
        return s3.connection.listObjects(params)
            .catch(function handleError(e) {
                log.error({error: e}, 'Error in listFilesInBucket');
                throw e;
            });
    };

	return s3;
};
