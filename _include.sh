export DOMAINS="mvpreact.baylaunch.com"
export AWS_HOST=1
export HEROKU_APP="mvpreact"
export DEV_DB="mvpreact_dev"
export PROD_DB="mvpreact_prod"

PROD_DB_USER="meerkat"
PROD_DB_PARAMS="user=$PROD_DB_USER dbname=$PROD_DB host=localhost"
#PROD_DB_PARAMS="user=$PROD_DB_USER dbname=$PROD_DB host=ec2-107-21-93-97.compute-1.amazonaws.com password=f5OVtJ5DGhIcHWLAjThKTWWlun port=5432 sslmode=require"

source ../../mvp/lib/_include.sh || echo "no include"
