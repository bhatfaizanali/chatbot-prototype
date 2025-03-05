# KSA E-commerce AI Chatbot

A Node.js CLI prototype of an AI-powered customer support chatbot optimized for Saudi Arabian e-commerce with Arabic language support.

## Features

- Arabic and English language support with automatic detection
- Product information retrieval
- Order tracking
- Return policy information
- Privacy policy access
- Human agent handoff

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (copy `.env.example` to `.env`)
4. Run the chatbot: `npm start`

## Usage

The chatbot supports the following types of inquiries:

- Product information (e.g., "Tell me about the smartwatch" or "أريد معلومات عن ساعة ذكية")
- Order tracking (e.g., "Where is my order ORD67890" or "أين طلبي ORD67890")
- Return policy (e.g., "What's your return policy" or "ما هي سياسة الإرجاع")
- Privacy policy (e.g., "Show me your privacy policy" or "ما هي سياسة الخصوصية")

To exit the chatbot, type "exit", "quit", "bye", "خروج", or "مع السلامة".

## Command Line Options

- `--lang=ar` or `--lang=en`: Set the starting language (default: ar)
- `--help`: Show help information
