export const IDL = {
  version: "0.1.0",
  name: "jackpot_funds",
  instructions: [
    {
      name: "initializeCounter",
      accounts: [
        { name: "fund", isMut: true, isSigner: true },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "initialValue", type: "u8" }],
    },
    {
      name: "addCount",
      accounts: [{ name: "fund", isMut: true, isSigner: false }],
      args: [{ name: "totalCount", type: "u8" }],
    },
  ],
  accounts: [
    {
      name: "JackPotFunds",
      type: { kind: "struct", fields: [{ name: "count", type: "u8" }] },
    },
  ],
};
