export COMMON=\&slackUrl=$SLACK_URL\&influxdb=$INFLUXDB

DISPLAY=:1 chromium-browser \
 --browser \
 --hide-scrollbars \
 --disable-web-security \
 --user-data-dir=/tmp/chrome \
 --remote-debugging-port=9222 \
 https://pose.dudaji.org/\?counter=pullUp$COMMON &

DISPLAY=:1 chromium-browser \
 --browser \
 --hide-scrollbars \
 --disable-web-security \
 --user-data-dir=/tmp/chrome \
 --remote-debugging-port=9222 \
 https://pose.dudaji.org/\?counter=turtleNeck\&camUrl\=$CAM_URL$COMMON &
