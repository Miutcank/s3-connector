module.exports = {
    S3: {
        auth: {
            region: {
                doc: 'The AWS region where you want to use S3',
                format: String,
                default: null,  // required, must be set via env var
                env: 'AWS_REGION'
            },
            accessKeyId: {
                doc: 'The AWS accessKeyId to connect with.',
                format: String,
                default: null,  // required, must be set via env var
                env: 'AWS_KEY_ID'
            },
            secretAccessKey: {
                doc: 'The AWS secretAccessKey to connect with.',
                format: String,
                default: null,  // required, must be set via env var
                env: 'AWS_KEY_SECRET'
            }
        },
        bucket: {
            doc: 'Default bucket name',
            format: String,
            default: null,  // required, must be set via env var
            env: 'BUCKET_NAME'
        }
    },
    logger: {
        level: {
            doc: 'The log level to output.',
            format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
            default: 'trace',
            env: 'LOG_LEVEL'
        },
        name: {
            doc: 'Logger name',
            format: String,
            default: 's3-connector'
        },
        logStash: {
            host: {
                doc: 'The logstash host to connect to.',
                format: String,
                default: null,  // required, must be set via env var
                env: 'LOGSTASH_URL'
            },
            port: {
                doc: 'The logstash port to connect to (UDP).',
                format: Number,
                env: 'LOGSTASH_PORT',
                default: 5000
            },
            /* eslint-disable camelcase */
            max_connect_retries: {
            /* eslint-enable */
                doc: 'The amount of tries the logger tries to connect to logstash. -1 is infinte.',
                format: Number,
                default: -1
            }
        }
    }
};
