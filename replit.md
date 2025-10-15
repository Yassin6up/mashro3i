# Digital Products Marketplace

## Overview
A comprehensive platform for buying and selling digital projects with a secure Escrow system and a 15% platform commission. The project aims to provide a reliable marketplace for digital assets, ensuring secure transactions and fostering direct communication between buyers and sellers.

## User Preferences
I prefer detailed explanations.
I want iterative development.
Ask before making major changes.
Do not make changes to the folder `Z`.
Do not make changes to the file `Y`.

## System Architecture

### UI/UX Decisions
The frontend is built with Next.js 14 (App Router) and styled using Tailwind CSS, focusing on a responsive and intuitive user experience. The platform includes dynamic navigation, user profile management, and interactive forms for project submission and offer creation.

### Technical Implementations
The platform features a robust authentication system using JWT, an Escrow system for secure transactions with a 15% platform fee and a 7-day review period, and flexible payment methods adaptable by country. Key features include:
- **Authentication**: JWT-based login/registration for sellers and buyers, secure API access, and a "Remember Me" option for persistent sessions.
- **Project Management**: Sellers can upload projects with images and video links (YouTube/Google Drive), while buyers can browse, search, and view project details.
- **Custom Offer System**: Buyers can send custom price offers to sellers, sellers can accept/reject/counter-offer, complete offer negotiation workflow.
- **Transaction System**: Tracks various transaction states (pending, escrow_held, completed, refunded, disputed) and manages platform earnings. Complete flow from payment to project delivery.
- **Escrow System**: Securely holds funds, automatically calculates the 15% platform commission, and supports a 7-day review period before releasing funds.
- **Payment System**: Country-specific payment methods (Vodafone Cash for Egypt, bank cards for other regions), secure payment processing with escrow integration.
- **Project Delivery**: Sellers can upload project files and instructional videos after payment, buyers receive notifications when files are ready.
- **Review & Approval**: Buyers can review delivered projects, approve to release funds, or request revisions during the 7-day review period.
- **Earnings & Withdrawals**: Sellers earn 85% of transaction amount (after 15% platform fee), can withdraw earnings through multiple methods (bank transfer, mobile wallets).
- **Communication**: Real-time notification system and an integrated chat feature for direct buyer-seller interaction.
- **Desktop Software Requirements**: Projects can include up to 5 images and 1 optional YouTube video for display; additional instructional videos are sent post-purchase.

### System Design Choices
The architecture separates frontend and backend concerns, using Next.js for the client and Express.js for the server. Data is stored in a PostgreSQL database. The system emphasizes security with bcrypt for password hashing, CORS protection, and secure file uploads.

## External Dependencies

- **Frontend Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Backend Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **File Uploads**: Multer
- **Video Hosting**: YouTube, Google Drive (for linking)
- **Payment Gateways**: (Future integration planned for Stripe, PayPal)