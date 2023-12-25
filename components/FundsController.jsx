import { useContract } from "../hooks/useContract";

const FundsController = () => {
  const {
    initialized,
    loading,
    transactionPending,
    addFunds,
    fund,
    setInputFund,
    inputFund,
  } = useContract();

  const renderTotalFunds = () => {
    if (initialized || loading) {
      return <p>Total Funds: {loading ? "Fetching funds balance..." : fund}</p>;
    } else {
      return (
        <p style={{ fontSize: "14px" }}>
          Please connect a wallet to use this app.
        </p>
      );
    }
  };

  return (
    <div className="main">
      <div className="section">{renderTotalFunds()}</div>

      <div className="add">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={(e) => setInputFund(e.target.value)}
            value={inputFund}
          />
          <button
            onClick={addFunds}
            className="button"
            style={{ background: "var(--accent-color)", color: "white" }}
          >
            {transactionPending ? "Loading..." : "Add Funds"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FundsController;
