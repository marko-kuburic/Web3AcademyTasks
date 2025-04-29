# Lido Staking dApp

A decentralized application (dApp) for staking ETH on Lido using the Sepolia testnet. This project includes a React frontend and an Express backend for logging staking events.

## Project Overview

- **Frontend**: A React application that allows users to connect MetaMask, stake ETH, view their stETH balance, simulate rewards, and access unstaking information via Uniswap Testnet.
- **Backend**: An Express server that logs staking events to an endpoint (`/api/log-stake`).
- **Technologies**:
  - Frontend: React, ethers.js, recharts
  - Backend: Express, Node.js
  - Development Tools: concurrently, nodemon

## Directory Structure

```
Week 3 - Lido staking dApp/
├── lido-backend/          # Backend (Express server)
│   ├── index.js
│   ├── package.json
│   └── ...
├── src/                   # Frontend (React app)
│   ├── components/
│   │   ├── StakeForm.js
│   │   ├── BalanceInfo.js
│   │   ├── ClaimRewardsSimulator.js
│   │   ├── UnstakeSimulation.js
│   │   └── ...
│   ├── hooks/
│   │   ├── useWeb3.js
│   │   ├── useRewardsSimulator.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── start-servers.bat      # Batch script to start both servers
└── README.md
```

## Prerequisites

- **Node.js**: Ensure Node.js (v14 or later) and npm are installed. Download from [nodejs.org](https://nodejs.org/).
- **MetaMask**: Install the MetaMask browser extension and set it to the Sepolia testnet with some test ETH.
- **Windows**: The batch script (`start-servers.bat`) is designed for Windows. For macOS/Linux, use the command line method or adapt the script to a `.sh` file.

## Starting the Project

You can start the project in two ways: using command line commands or the provided `start-servers.bat` file.

### Method 1: Using Command Line Commands

```

1. **Install Dependencies**:
   Install dependencies for both the frontend and backend concurrently:
   ```bash
   npm run install:all
   ```
   This runs:
   - `npm install` in the root directory (frontend).
   - `npm install` in the `lido-backend` directory (backend).

2. **Start Both Servers**:
   Start the frontend and backend servers concurrently:
   ```bash
   npm run start:all
   ```
   This runs:
   - `npm start` in the root directory (frontend on `http://localhost:3000`).
   - `npm run dev` in the `lido-backend` directory (backend on `http://localhost:3001`).

3. **Access the dApp**:
   - Open `http://localhost:3000` in your browser.
   - Connect MetaMask (set to Sepolia testnet), stake ETH, check your balance, simulate rewards, and view unstaking info.

### Method 2: Using the Batch File (Windows Only)

2. **Run the Batch File**:
   - Double-click `start-servers.bat` in File Explorer.
   - Alternatively, run it from the command line:
     ```bash
     \Web3AcademyTasks\Week 3 - Lido staking dApp\start-servers.bat
     ```

3. **What Happens**:
   - The script installs dependencies for both frontend and backend.
   - It starts both servers and keeps the terminal open to show logs:
     - Frontend: `http://localhost:3000`
     - Backend: `http://localhost:3001`

4. **Access the dApp**:
   - Open `http://localhost:3000` in your browser.
   - Use the dApp as described above.

## Stopping the Servers

- **Using the Terminal**:
  - Press `Ctrl+C` in the terminal where the servers are running to stop both the frontend and backend.

## Troubleshooting

- **Port Conflicts**:
  - If you see “Port 3000 is already in use” or “Port 3001 is already in use”:
    ```bash
    npx kill-port 3000
    npx kill-port 3001
    ```
    Then rerun the start command.
- **Dependencies Missing**:
  - If `npm run install:all` fails, run the install commands manually:
    ```bash
    cd C:\Users\Marko\Documents\GitHub\Web3AcademyTasks\Week 3 - Lido staking dApp
    npm install
    cd lido-backend
    npm install
    ```
- **Backend `dev` Script Missing**:
  - If `npm run dev` fails in `lido-backend`, ensure `lido-backend/package.json` has a `"dev"` script:
    ```json
    "scripts": {
      "start": "node index.js",
      "dev": "nodemon index.js"
    }
    ```
  - Install `nodemon` if missing:
    ```bash
    cd C:\Users\Marko\Documents\GitHub\Web3AcademyTasks\Week 3 - Lido staking dApp\lido-backend
    npm install nodemon --save-dev
    ```
- **Terminal Closes (Batch File)**:
  - If the terminal closes immediately, run the commands manually to see errors:
    ```bash
    cd C:\Users\Marko\Documents\GitHub\Web3AcademyTasks\Week 3 - Lido staking dApp
    npm run install:all
    npm run start:all
    ```
- **MetaMask Issues**:
  - Ensure MetaMask is set to the Sepolia testnet and has test ETH.
  - If connection fails, check the browser console (F12) for errors.