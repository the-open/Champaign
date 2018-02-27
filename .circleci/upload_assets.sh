#!/bin/sh
STATIC_BUCKET=$1
echo 'Uploading assets and packs to S3...'
aws s3 sync public/assets s3://$STATIC_BUCKET/assets/
aws s3 sync public/packs/ s3://$STATIC_BUCKET/packs/
