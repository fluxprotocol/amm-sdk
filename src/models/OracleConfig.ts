export interface OracleConfig {
    gov: string,
    final_arbitrator: string, // Invoked to have last say in `DataRequest`, this happens when the `challenge_bond` for a `DataRequest` is >= than `final_arbitrator_invoke_amount` / 100 % of the total supply
    stake_token: string,
    bond_token: string,
    validity_bond: string,
    max_outcomes: number,
    default_challenge_window_duration: string,
    min_initial_challenge_window_duration: string,
    final_arbitrator_invoke_amount: string, // Amount of tokens that when bonded in a single `ResolutionWindow` should trigger the final arbitrator
    resolution_fee_percentage: number,

}
