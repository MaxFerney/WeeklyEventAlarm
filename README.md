#android manifest
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

#cmd stuff
meteor npm install --save cordova-plugin-geolocation@0.3.12
meteor add cordova:org.apache.cordova.geolocation@0.3.12

#running application
meteor run android --cordova-server-port=12001
