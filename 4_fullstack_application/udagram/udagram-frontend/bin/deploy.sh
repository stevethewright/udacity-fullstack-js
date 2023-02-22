aws s3 cp --recursive --acl public-read ./www s3://udagram-bucket-786172554301/
aws s3 cp --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./www/index.html s3://udagram-bucket-786172554301/
eb setenv POSTGRES_USERNAME=$POSTGRES_USERNAME
eb setenv POSTGRES_PASSWORD=$POSTGRES_PASSWORD
eb setenv POSTGRES_HOST=$POSTGRES_HOST
eb setenv POSTGRES_DB=$POSTGRES_DB
eb setenv AWS_BUCKET=$AWS_BUCKET
eb setenv AWS_REGION=$AWS_REGION
eb setenv AWS_PROFILE=$AWS_PROFILE
eb setenv JWT_SECRET=$JWT_SECRET
eb setenv URL=$URL
