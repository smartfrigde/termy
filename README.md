# Termy
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/smartfrigde/termy)
![WIP](https://github.com/user-attachments/assets/3d8000e9-b580-4387-a785-2b79ee6432b2)

**Termy** is a secure, cross-platform SSH and GPG key management application designed for developers, sysadmins, and teams. It runs in the browser and on mobile devices (iOS/Android), and will eventually support major desktop platforms, such as macOS and Windows.

Termy focuses on **fast, encrypted access to your SSH servers**, **cloud-synced or local key storage**, and **team collaboration** through secure resource sharing.

---

## ✨ Features

- 🔐 Manage SSH and GPG keys with end-to-end encryption
- 📋 Add, edit, delete SSH connections and profiles
- 📱 Sync your data securely between mobile and web
- 🧑‍🤝‍🧑 Collaborate using teams
- 🌑 Light/Dark theme support
- 🛠 Future: MFA, SFTP, U2F, SSH tunneling

---

## 🚀 Getting Started (Frontend Only)

### 📦 Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally:

```sh
npm install -g expo-cli
````

Then install project dependencies:

```sh
npm install
```

---

### 🔑 Create a .env file

Create a .env file with following contents:
```env
EXPO_PUBLIC_API_URL=http://192.168.68.116
```
**Remember to replace the url with your backend url.**

---

### ▶️ Run the App

#### 🌐 Web (Chromium only)

```sh
npm run web
# or
expo start --web
```


#### 📱 Android

Make sure you have Android Studio installed:

```sh
npm run android
# or
expo start --android
```

#### 🍏 iOS (macOS only)

Requires macOS with Xcode installed:

```sh
npm run ios
# or
expo start --ios
```

#### 📷 Development build (QR Code, Android only)

If you don't want to install all the SDKs for mobile, you can easily use our prebuilt devbuilds with features like hot-reload. Grab the latest devbuild [here](https://github.com/smartfrigde/termy/releases/tag/devbuilds) and install it on your mobile device. Then simply run:

```sh
expo start
# or
npm start
```

Scan the QR code with your camera app on your mobile device and it should link up your phone with the devbuild and allow you to make changes live.

---

## 🐳 Running with Docker (Web Only)

You can run the web version inside a Docker container:

### 🔧 Build and Run

```sh
# Build the image
docker build -t termy-web .

# Run the container and map port 8081
docker run -p 8081:8081 termy-web
```

Then open [http://localhost:8081](http://localhost:8081) in your browser.

## 📝 Documentation

Documentation can be found [here](https://deepwiki.com/smartfrigde/termy).

## 🛠 Tech Stack

* **React Native** (Web, Android, iOS via Expo)
* **Redux**
* **Expo**
* **TypeScript**
