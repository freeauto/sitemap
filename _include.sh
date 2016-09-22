export DOMAINS="sitemap.baylaunch.com"
export AWS_HOST=10
export HEROKU_APP="sitemap"
export DEV_DB="sitemap_dev"
export PROD_DB="sitemap_prod"

PROD_DB_USER="meerkat"
PROD_DB_PARAMS="user=$PROD_DB_USER dbname=$PROD_DB host=localhost"
#PROD_DB_PARAMS="user=$PROD_DB_USER dbname=$PROD_DB host=ec2-107-21-93-97.compute-1.amazonaws.com password=f5OVtJ5DGhIcHWLAjThKTWWlun port=5432 sslmode=require"

source ../mvp/lib/_include.sh || echo "no include"
