import FundsController from "../components/FundsController";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <>
      <div className="wrap">
        <h1>JackPot Funds</h1>
        {/* connect wallet button */}
        <WalletMultiButton />
      </div>

      {/* Current Wallet Funds & Add new Funds*/}
      <FundsController />
      <Toaster />
    </>
  );
};

export default Home;
