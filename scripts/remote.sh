export COMMON=\&slackUrl=$SLACK_URL\&influxdb=$INFLUXDB
export DISPLAY=:1

chromium-browser \
 --hide-scrollbars \
 --disable-web-security \
 --user-data-dir=/tmp/chrome \
 --remote-debugging-port=9222 \
 https://pose.dudaji.org/\?counter=turtleNeck\&sensitivity=-4\&camUrl\=$CAM_URL$COMMON &

chromium-browser \
 --hide-scrollbars \
 --disable-web-security \
 --user-data-dir=/tmp/chrome \
 --remote-debugging-port=9222 \
 https://pose.dudaji.org/\?counter=pullUp\&sensitivity=2$COMMON &


