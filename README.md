# Zyrl - URL Shortener

![img](https://github.com/nnmadalin/zyrl/blob/main/public/logo.png?raw=true)

Zyrl is a modern, fast, and scalable URL shortener built with Next.js. It allows users to create short, memorable links that redirect to longer URLs. The app uses **Supabase** as its backend for authentication and data storage and is optimized for deployment on **Vercel**.

---

## Features

- Create short URLs easily
- Track clicks and URL analytics 
- Responsive design built with Next.js
- Serverless deployment on Vercel for easy scaling

---

## Tech Stack

- **Next.js** (React framework)
- **Supabase** (PostgreSQL backend)
- **Vercel** (Deployment platform)

---

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- Supabase account and project
- Vercel account

---

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/zyrl.git
cd zyrl
```

2. Install dependencies
```bash
npm install
```

3. Setup Supabase
Go to Supabase and create a new project.
Create a table for storing URLs, for example:
```sql
CREATE TABLE shortUrl (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  original_url text NOT NULL,
  short_code text NOT NULL UNIQUE,
  description text,
  clicks int8 DEFAULT 0
);
```

4. Configure environment variables
Create `.env file` with:
```env
POSTGRES_URL="**********************"
POSTGRES_USER="postgres"
POSTGRES_HOST="**********************"
SUPABASE_JWT_SECRET="u**********************"
NEXT_PUBLIC_SUPABASE_ANON_KEY="**********************"
POSTGRES_PRISMA_URL="**********************"
POSTGRES_PASSWORD="**********************"
POSTGRES_DATABASE="postgres"
SUPABASE_URL="h**********************"
SUPABASE_ANON_KEY="**********************"
NEXT_PUBLIC_SUPABASE_URL="**********************"
SUPABASE_SERVICE_ROLE_KEY="**********************"
POSTGRES_URL_NON_POOLING="**********************"
NEXT_URL="https://localhost:3000"
```
Replace with your actual values.

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 to view.

### Deployment on Vercel
    1. Push your code to a Git repository.
    2. Import your project on Vercel.
    3. Add environment variables in the Vercel dashboard.
    4. Deploy and access your live URL shortener.

### MIT License
```
Copyright (c) 2025 nnmadalin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```