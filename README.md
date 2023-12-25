## Getting Started

First, run the development server:

1. `yarn`
2. `npm run dev or yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What Next?

### Blockchain

- We have SMARTCONTRACT folder where our smart-contract code lives. which is written in RUST for solana blockchain.

- constant.js file contains our deployed smart-contract address and our Program ID.
- contarctIDL.js file contains our program interface which is genrated by anchor when we deploy on solana network.

### Frontend

- We have next.js folder structure where we have setup for client side project.

- WalletConnectProvider component is responsible for creating network connection.

- useContract component is responsible for app logic where we are fetching JackpotFunds and adding to it.


# Code Explaination

FundsController Component:

- This component is responsible for rendering the user interface and interactions related to the global funds balance. Let's break down the key parts of the code:

- renderTotalFunds Function:

- This function conditionally renders the "Total Funds" information or a message prompting the user to connect their wallet.
It checks the initialized and loading states to determine which content to display.
return Statement:

- Inside the component's return statement, the renderTotalFunds function is invoked to display either the funds balance or the wallet connection message.
Form for Adding Funds:

- A form is provided for users to add funds. It includes an input field for the amount and a button to trigger the addFunds function.

- The button text is dynamically changed to "Loading..." when a transaction is pending.

useContract Custom Hook:

- This custom hook provides functions and state management for interacting with the smart contract. Here's a detailed explanation of this code:

- Imports and Initialization:

- Various imports are used, including dependencies like react, toast, useAnchorWallet, and useConnection.

- Constants like SMARTCONTRACT_KEY and IDL are imported.
The useContract hook initializes several state variables and connects to the Solana wallet and network.

State Variables:

- initialized: A boolean that tracks whether the smart contract has been initialized.
- count: Stores the current global funds value.
- loading: Indicates whether data is being fetched.
- transactionPending: Tracks whether a transaction is currently pending.
- countValue: Holds the value entered by the user for adding funds.

Public Key and Program Initialization:

- A public key is created with the address of the global funds variable.
- The program variable is initialized using the useMemo hook. This is an instance of the Anchor program and is created when the connection and wallet are available. The provider is set up with the connection and wallet.

Data Fetching and Initialization:

- The useEffect hook is used to fetch the current funds balance and set the initialized, count, and loading states accordingly.

- If the program is not available, initialized is set to false.
initializeFund Function:

- This function is called when the user initializes the smart contract.

- It sets transactionPending to true, initializes the contract, and displays a success message when completed. Errors are caught and displayed using toast.

addFunds Function:

- This function is called to add funds to the global integer.
- It checks for wallet connection and validates the input.
- If the program is available, it adds funds, displays a success message, and resets the input value.
- Errors are caught and displayed using toast.

Return Object:

- The hook returns an object containing functions and state variables to be used by the FundsController component.