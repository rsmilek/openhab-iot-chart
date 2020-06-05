#!/usr/bin/env bash

npm run build
scp -r build rsmilek@192.168.0.11:~/Projects/openhab-iot-chart