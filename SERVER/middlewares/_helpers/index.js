const AWS = require('aws-sdk');

function generateFilename({ instance, fileName, fieldName, mimetype, model } = {}) {
	const parts = [];

	let type = '';

	if (mimetype) {
		type = `.${mimetype.split('/').pop()}`;
	}

	parts.push(
		`${model ? `${model}/` : ''}${instance ? `${instance._id}/` : ''}${Date.now()}`
	);

	if (fieldName) {
		parts.push(fieldName);
	}

	if (fileName) {
		parts.push(fileName);
	}

	return `${parts.join('_')}${type}`;
}

function getPublicImagesBucketName() {
	return process.env.AWS_S3_PUBLIC_IMAGES_BUCKET
}

function getS3() {
	const { AWS_REGION, S3_HOST } = process.env;

	return new AWS.S3({
		apiVersion: '2006-03-01',
        region: AWS_REGION,
        s3BucketEndpoint: true,
        endpoint: S3_HOST
	});
}

module.exports = {
	generateFilename,
	getPublicImagesBucketName,
	getS3
}