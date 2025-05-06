# Termy
![WIP](https://github.com/user-attachments/assets/3d8000e9-b580-4387-a785-2b79ee6432b2)

Termy is a cross-platform app available primarily in browsers, and natively on mobile devices. The main goals of the application are:

## Main Functionality

### 1. SSH Connection Management:

* Adding, editing, and deleting SSH servers.
* Quick connection to servers.
* Support for multiple profiles/identities for different SSH configurations.
* Sharing resources with others using teams.

### 2. Data Synchronization:

* Storing the server list in the cloud (end-to-end encryption).
* Synchronizing GPG keys between devices.
* Support for local backups for users who prefer offline work.

### 3. Key Management:

* Generating SSH and GPG keys directly within the app.
* Importing and exporting keys.
* Automatically adding keys to SSH connections.

### 4. Security:

* Any reliable modern encryption.

### 5. User Interface:

* Intuitive dashboard with a server list.
* Dark/light mode.

### 6. Extras (if time permits):

* SSH tunneling capability.
* SFTP support.
* Multi-factor authentication (MFA).
* Support for U2F/FIDO2 keys for secure connections.


## How to run:

## Frontend:

**[⚠ ONLY CHROMIUM BASED BROWSERS WORK](https://stackoverflow.com/a/74744206)**

Follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/) for mobile development setup.

For web:

```sh
npm install
npm run web
```

## Tech Stack

### Frontend:

* TypeScript
* React Native (Web/Android/iOS/macOS??/Windows??)

### Backend:

* Laravel
