/Applications/Chromium.app/Contents/MacOS/Chromium \
 --hide-scrollbars \
 --disable-web-security \
 --user-data-dir=/tmp/chrome \
 https://pose.dudaji.org/\?camUrl\=$CAM_URL\&slackUrl=$SLACK_URL&counter=turtleNeck



DISPLAY=:1 chromium-browser \
 --hide-scrollbars \
 --disable-web-security \
 --user-data-dir=/tmp/chrome \
 --remote-debugging-port=9222 \
 https://pose.dudaji.org/\?counter=turtleNeck\&camUrl\=$CAM_URL\&slackUrl=$SLACK_URL

DISPLAY=:1 chromium-browser \
 --hide-scrollbars \
 --disable-web-security \
 --user-data-dir=/tmp/chrome \
 --remote-debugging-port=9222 \
 https://pose.dudaji.org/\?counter=pullUp\&slackUrl=$SLACK_URL