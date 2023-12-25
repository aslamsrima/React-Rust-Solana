import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  SMARTCONTRACT_KEY,
  publicKey,
  programKey,
} from "../constant";
import { IDL } from "../contractIDL";

export function useContract() {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const [initialized, setInitialized] = useState(false);
  const [fund, setFetchFund] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [inputFund, setInputFund] = useState("");

  // Creating contract instance
  const program = useMemo(() => {
    if (anchorWallet && connection) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL, SMARTCONTRACT_KEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const findProfileAccounts = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          //fetch current funds balance from smart contract
          const data = await program.account.jackPotFunds.fetch(publicKey);
          setFetchFund(data?.count);
          setInitialized(true);
        } catch (error) {
          setInitialized(false);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!program) {
      setInitialized(false);
    }

    findProfileAccounts();
  }, [program, transactionPending]);

  const initializeFund = async () => {
    if (program && publicKey) {
      try {
        const counter = anchor.web3.Keypair.generate();
        setTransactionPending(true);
        const tx = await program.methods
          .initializeCounter()
          .accounts({
            counter: counter.publicKey,
          })
          .signers([counter])
          .rpc();
        setInitialized(true);
        toast.success("Successfully initialized user.");
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const addFunds = async () => {
    if (!initialized) {
      toast.error("Connect wallet to use this app.");
      return;
    }
    if (!inputFund || !inputFund.trim().length) {
      toast.error("Input value can't be empty");
      return;
    }

    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const totalCount = +inputFund;

        // call addCount function of smart contract to add new funds
        await program.methods
          .addCount(totalCount)
          .accounts({
            // program id
            fund: programKey,
          })
          .rpc();
        toast.success("Successfully added Funds to total.");
        setInputFund("");
      } catch (error) {
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  return {
    initialized,
    initializeFund,
    loading,
    transactionPending,
    addFunds,
    fund,
    setInputFund,
    inputFund,
  };
}
