#!/bin/bash 

docker image build -t phpfullstacktest/phpfullstacktest_db .
docker image push phpfullstacktest/phpfullstacktest_db