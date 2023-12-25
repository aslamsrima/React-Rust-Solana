use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct JackPotFunds {
    pub count: u8,
}

declare_id!("CSdgtfkJ5NwGCewHLmXQsbnMhkYGMQMucJjoqM1yn89k");

#[program]
pub mod jackpot_funds {
    use super::*;

    pub fn initialize_counter(ctx: Context<Initialize>, initial_value: u8) -> Result<()> {
        let fund = &mut ctx.accounts.fund;
        fund.count = initial_value;
        msg!("Initialized new count. Current value: {}!", fund.count);
        Ok(())
    }

    pub fn add_count(ctx: Context<AddCount>, _total_count: u8) -> Result<()> {
        let fund = &mut ctx.accounts.fund;
        fund.count = fund.count.saturating_add(_total_count);
        msg!(
            "Added {} to the count. New value: {}!",
            _total_count,
            fund.count
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct AddCount<'info> {
    #[account(mut)]
    pub fund: Account<'info, JackPotFunds>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 +8)]
    pub fund: Account<'info, JackPotFunds>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
