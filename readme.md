# Image Management RESTful API with Shortening Service

This project demonstrates a RESTful API built with Node.js, Express, and TypeScript that interacts with Firebase Firestore for image management. It also provides a feature to shorten image URLs using the "shrtco.de" service and save the shortened links in Firebase Firestore.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Link](#link)
- [API Endpoints](#api-endpoints)

## Features

- **Image CRUD Operations:** Perform Create, Read, Update, and Delete operations on images stored in Firebase Firestore.

- **Image URL Shortening:** Shorten image URLs using the "shrtco.de" API and store the shortened links in Firebase Firestore.

- **backend deployment:** Deploy the backend to Firebase Cloud Functions.

## Prerequisites

Before getting started, ensure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually bundled with Node.js)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - You'll need to set up a Firebase project and obtain the Firebase Admin SDK credentials.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Configuration

### Firebase Configuration

To configure Firebase for your project:

1. Set up a Firebase project and Firestore database on the [Firebase Console](https://console.firebase.google.com/).

2. Download the Firebase Admin SDK credentials JSON file and place it in the root directory of your project as `YOUR_FIREBASE_CONFIG.json`.

### Shrtco.de Configuration

To configure the shortening service:

1. Obtain an API key from [shrtco.de](https://shrtco.de/docs).

2. Update the `shortenImageLink` function in `src/controllers/imageController.ts` with your API key.

```typescript
const shortenUrl = 'https://api.shrtco.de/v2/shorten';

// ...

export const shortenImageLink = async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    const response = await axios.post(shortenUrl, {
      url: imageUrl,
      apiKey: 'YOUR_SHRTCO_API_KEY', // Replace with your API key
    });

    // ...
  }
};
```

## Usage

To start the server, run:

```bash
npm start
```

## Deployment

To deploy the backend to Firebase Cloud Functions, run:

```bash
npm run deploy

# or

firebase deploy --only functions

```

## Link 

The backend is deployed to Firebase Cloud Functions at the following URL: https://us-central1-rest-images.cloudfunctions.net/app

## API Endpoints

- **GET /api/images:** Get a list of all images stored in Firebase Firestore.
- **POST /api/images:** Create a new image in Firebase Firestore.
- **PUT /api/images/:id:** Update an existing image in Firebase Firestore.
- **DELETE /api/images/:id:** Delete an image from Firebase Firestore.
- **POST /api/shorten:** Shorten an image URL using the "shrtco.de" service and save the shortened link in Firebase Firestore.
