#!/bin/bash

echo 'Shipping source bundle to S3...'
cat Dockerrun.aws.json.template | envsubst > Dockerrun.aws.json

zip -r9 $CIRCLE_SHA1-config.zip Dockerrun.aws.json ./.ebextensions/
SOURCE_BUNDLE=$CIRCLE_SHA1-config.zip
aws configure set default.region $AWS_REGION
aws s3 cp $SOURCE_BUNDLE s3://$EB_BUCKET/$SOURCE_BUNDLE

echo 'Creating new application version...'
aws elasticbeanstalk create-application-version --application-name "sou-champs" \
  --version-label $CIRCLE_SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$SOURCE_BUNDLE

echo 'Updating environment...'
aws elasticbeanstalk update-environment --environment-name "sou-champs-demo" \
--version-label $CIRCLE_SHA1
