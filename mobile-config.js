// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.callibrator.callibrator.vilma',
  name: 'Vilma',
  description: 'Vilma Music Player',
  author: 'Callibrator',
  email: 'callibrator21@gmail.com',
  website: 'https://www.upwork.com/o/profiles/users/_~0146ee9a9773201493/'
});

// Set up resources such as icons and launch screens.
App.icons({
  'app_store': 'icons/1024x1024.png',
  'iphone_2x': 'icons/120x120.png',
  'iphone_3x': 'icons/180x180.png',
  'ipad_2x': 'icons/152x152.png',
  'ipad_pro': 'icons/167x167.png',
  'ios_settings_2x': 'icons/58x58.png',
  'ios_settings_3x': 'icons/87x87.png',
  'ios_spotlight_2x': 'icons/80x80.png',
  'ios_spotlight_3x': 'icons/120x120.png',
  'ios_notification_2x': 'icons/40x40.png',
  'ios_notification_3x': 'icons/60x60.png',
  'ipad': 'icons/76x76.png',
  'ios_settings': 'icons/29x29.png',
  'ios_spotlight': 'icons/40x40.png',
  'ios_notification': 'icons/20x20.png',
  'iphone_legacy': 'icons/57x57.png',
  'iphone_legacy_2x': 'icons/114x114.png',
  'ipad_spotlight_legacy': 'icons/50x50.png',
  'ipad_spotlight_legacy_2x': 'icons/100x100.png',
  'ipad_app_legacy': 'icons/72x72.png',
  'ipad_app_legacy_2x': 'icons/144x144.png',
  'android_mdpi': 'icons/48x48.png',
  'android_hdpi': 'icons/72x72.png',
  'android_xhdpi': 'icons/96x96.png',
  'android_xxhdpi': 'icons/144x144.png',
  'android_xxxhdpi': 'icons/192x192.png',
  // More screen sizes and platforms...
});
/*
App.launchScreens({
  'iphone_2x': 'splash/Default@2x~iphone.png',
  'iphone5': 'splash/Default~iphone5.png',
  // More screen sizes and platforms...
});
*/
// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('StatusBarOverlaysWebView', false);
App.setPreference('android-minSdkVersion', '22');
App.setPreference('android-targetSdkVersion', '28');
//App.setPreference('Orientation', 'all', 'ios');

// Pass preferences for a particular PhoneGap/Cordova plugin.
/*App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
*/

// Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// generated config.xml. 'Universal Links' is shown as an example here.
/*App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);*/
