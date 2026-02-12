# Clarity: Expense Tracker
Author: `Sanskar Bhusal` <br>

### Frontend Approach
1. Single Page application
2. React + Tyscript
3. Project structure scafolded from Vite's react-ts template
4. deployed on Github pages (Yes we can do It for react SPA)

### Backend Approach
1. Code in Node.js and Express.js for API
2. Postgress db server for SQL.
3. My own kaam chalaau authentication logic (not good though).
4. Deployed on a cheap 1 GB dual core Azure VM.

## Installation Instruction

1. clone the repository
```bash
git clone git@github.com:sanskarbhusal/clarity.git
```
2. Install packages 

```bash
cd clarity/frontend
npm install
cd ../backend
npm install
```
3. Spin up a new terminal and cd into `clarity/backend` folder the run:
```bash
npm start
```
4. Spin up another instance of terminal and cd into `clarity/frontend` folder then run:
```bash
npm run dev
```
5. You can then access the website at: <br>
[http://localhost:5173](http://localhost:5173)

6. API will be available at: <br>
[http://localhost:3000](http://localhost:3000)


