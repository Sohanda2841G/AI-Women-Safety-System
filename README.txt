SAFESOS MOBILE APP
==================

Your supplied HTML/CSS/JavaScript has been placed in www/ and prepared for Capacitor.

SEE THE APP NOW
1. Open this folder in VS Code.
2. Install the VS Code extension "Live Server".
3. Right-click www/index.html -> Open with Live Server.
4. Chrome opens SafeSOS.
5. Press F12 -> Ctrl+Shift+M to see the phone layout.

MAKE A REAL ANDROID APP
Requirements: Node.js LTS + Android Studio/Android SDK.
In this folder, run:
  npm install
  npx cap add android
  npx cap sync android
  npx cap open android

Then press Run in Android Studio with an emulator or Android phone.

BUILD APK:
Android Studio -> Build -> Build Bundle(s) / APK(s) -> Build APK(s)

BACKEND
The current SOS and responder actions are front-end prototype state. Connect them to your backend API in www/app.js.
For an Android emulator, a backend on your PC at port 8000 is normally:
  http://10.0.2.2:8000
For a physical phone, use your PC LAN IP or a deployed HTTPS backend.

The app does not contact real emergency services until a real backend/integration is added.
