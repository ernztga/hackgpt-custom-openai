# HackGPT – Custom OpenAI Chatbot

HackGPT is a full-stack SaaS boilerplate built with **Node.js**, **Express**, and **OpenAI API**, featuring **Stripe payments**, a complete **CRUD system**, and **ImageKit integration for media handling**. It is designed as a scalable foundation for AI-powered applications.

---

## Features

- OpenAI-powered AI responses (chat / generation system)
- Stripe subscription & payment integration
- Full CRUD system (Create, Read, Update, Delete resources)
- ImageKit integration for image upload & optimization
- Secure authentication system (JWT-based or session-based depending on setup)
- RESTful API architecture using Node.js + Express
- Responsive frontend with dark and light themes using React

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React
- **Database:** MongoDB (Mongoose ODM)
- **AI Integration:** OpenAI API
- **Payments:** Stripe API
- **Media Storage:** ImageKit
- **Auth:** JWT / bcrypt
- **Deployment Ready:** Vercel / Render / Railway

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ernztga/hackgpt-custom-openai.git
cd hackgpt-custom-openai
```

---

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the backend root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_secret_key

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url

STRIPE_PUBLISHABLE_KEY = your_stripe_publishable_secret
STRIPE_SECRET_KEY = your_stripe_secret
STRIPE_WEBHOOK_SECRET_KEY = your_stripe_webhook
```

---

## Run the Project

### Backend
```bash
npm run server
```

### Frontend
```bash
npm run start
```

---

## Stripe Functionality

This project includes full Stripe integration for:

- Subscription creation
- Payment session handling
- Webhook verification
- Customer billing management

### Flow:
1. User selects a plan
2. Backend creates Stripe Checkout Session
3. Stripe redirects user to payment page
4. Webhook confirms payment status
5. User credits are added automatically

---

## OpenAI Integration

The system uses OpenAI API for:

- General purpose AI chat conversations
- AI responses for user prompts
- Content generation endpoints
- AI image generation

Example flow:
```text
User Prompt → Backend API → OpenAI API → Response → UI
```

---

## ImageKit Integration

Used for:

- Secure image uploads
- Optimized CDN delivery
- Image resizing & transformations

Flow:
```text
Client upload → Backend → ImageKit → CDN URL stored in DB
```

---

## CRUD System

The project includes full CRUD capabilities for core resources:

- Create new user/chat/plan records
- Fetch user/chat/plan records
- Update existing chats
- Delete chats

Example entities:
- Users
- Chats / Messages
- Subscription plans

---

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Stripe webhook verification
- Secure API key handling via env variables

---

## Deployment

### Backend and Frontend
- Vercel

Make sure to set environment variables in deployment dashboard.

---

## Future Improvements

- Rate limiting per user
- AI usage tracking dashboard
- Admin panel
- Multi-model OpenAI support (GPT-4.1 / GPT-5-ready architecture)
- File uploads with S3 alternative support

---
