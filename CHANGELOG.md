# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.21.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.16.0...v1.21.0) (2021-03-12)


### Features

* Add better support for accounts & price history ([fc5a72a](https://github.com/fluxprotocol/amm-sdk/commit/fc5a72a97b647daedd0013c768964a06dc71e92d))
* Add getPoolTokenBalance() ([b2ffb4f](https://github.com/fluxprotocol/amm-sdk/commit/b2ffb4fb9f8a20fdd45146b7f4d9d9be8f888fa2))
* **createMarket:** Add support for scalar markets creation ([a4370a3](https://github.com/fluxprotocol/amm-sdk/commit/a4370a3916671b8f39a84e483baf936a36de3986))
* **getAccountInfo:** Add spent to balances ([ac21e54](https://github.com/fluxprotocol/amm-sdk/commit/ac21e5484ee6d885be43f98e8e04807f465fca12))
* **market:** Add 'is_scalar' as a property ([72fd35f](https://github.com/fluxprotocol/amm-sdk/commit/72fd35f6194d68de050f61b1776bd85bed5b2c62))
* **market:** Add creation_date to markets ([6dfd46f](https://github.com/fluxprotocol/amm-sdk/commit/6dfd46f8c395673414ebabb118b26b5ffd075c49))
* **sell:** Add support for setting transaction params ([0855ca8](https://github.com/fluxprotocol/amm-sdk/commit/0855ca8b7e90ad98d0567a00d9a690547659a895))
* Add support for altering gas & value for a transaction ([420c549](https://github.com/fluxprotocol/amm-sdk/commit/420c549a07c1f2e748a83d22135114ae5c1f135f))


### Bug Fixes

* **claimEarnings:** Cast MAX_GAS and STORAGE_BASE to string in claimEarnings ([a535bdd](https://github.com/fluxprotocol/amm-sdk/commit/a535bdd90fffd9ad2fd649a39b23af1167cdd94b))
* Fix issue where slippage calculation could cause rounding errors ([8a532a6](https://github.com/fluxprotocol/amm-sdk/commit/8a532a6422bb4222366bf062cf17989e65c837d8))
* PoolTokenBalance fix issue with missing data and types ([e91ffce](https://github.com/fluxprotocol/amm-sdk/commit/e91ffcee59ddec870e182c61b23c3409e342ba1b))
* **calcBuyAmountInShares:** Fix issue where token denom was not dynamic ([100282d](https://github.com/fluxprotocol/amm-sdk/commit/100282d4d070ee3105de9ad1924f63b2739f6c4b))
* **calcScalarDistributionPercentages:** Fix issue where initial value did not match the actual value ([bac11fe](https://github.com/fluxprotocol/amm-sdk/commit/bac11fea37710d59216af8cb35dc24fc33126a3d))

### [1.20.2](https://github.com/fluxprotocol/amm-sdk/compare/v1.20.1...v1.20.2) (2021-03-11)


### Bug Fixes

* Fix issue where slippage calculation could cause rounding errors ([8a532a6](https://github.com/fluxprotocol/amm-sdk/commit/8a532a6422bb4222366bf062cf17989e65c837d8))

### [1.20.1](https://github.com/fluxprotocol/amm-sdk/compare/v1.20.0...v1.20.1) (2021-03-10)


### Bug Fixes

* PoolTokenBalance fix issue with missing data and types ([e91ffce](https://github.com/fluxprotocol/amm-sdk/commit/e91ffcee59ddec870e182c61b23c3409e342ba1b))

## [1.20.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.19.0...v1.20.0) (2021-03-10)


### Features

* Add better support for accounts & price history ([fc5a72a](https://github.com/fluxprotocol/amm-sdk/commit/fc5a72a97b647daedd0013c768964a06dc71e92d))
* Add getPoolTokenBalance() ([b2ffb4f](https://github.com/fluxprotocol/amm-sdk/commit/b2ffb4fb9f8a20fdd45146b7f4d9d9be8f888fa2))

## [1.19.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.18.0...v1.19.0) (2021-03-10)


### Features

* **getAccountInfo:** Add spent to balances ([ac21e54](https://github.com/fluxprotocol/amm-sdk/commit/ac21e5484ee6d885be43f98e8e04807f465fca12))
* **market:** Add 'is_scalar' as a property ([72fd35f](https://github.com/fluxprotocol/amm-sdk/commit/72fd35f6194d68de050f61b1776bd85bed5b2c62))
* **market:** Add creation_date to markets ([6dfd46f](https://github.com/fluxprotocol/amm-sdk/commit/6dfd46f8c395673414ebabb118b26b5ffd075c49))
* **sell:** Add support for setting transaction params ([0855ca8](https://github.com/fluxprotocol/amm-sdk/commit/0855ca8b7e90ad98d0567a00d9a690547659a895))
* Add support for altering gas & value for a transaction ([420c549](https://github.com/fluxprotocol/amm-sdk/commit/420c549a07c1f2e748a83d22135114ae5c1f135f))


### Bug Fixes

* **calcScalarDistributionPercentages:** Fix issue where initial value did not match the actual value ([bac11fe](https://github.com/fluxprotocol/amm-sdk/commit/bac11fea37710d59216af8cb35dc24fc33126a3d))

## [1.18.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.17.0...v1.18.0) (2021-03-08)


### Features

* **createMarket:** Add support for scalar markets creation ([a4370a3](https://github.com/fluxprotocol/amm-sdk/commit/a4370a3916671b8f39a84e483baf936a36de3986))

## [1.17.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.12.0...v1.17.0) (2021-03-08)


### Features

* **escrow:** added market id and description to escrow status ([8d6113d](https://github.com/fluxprotocol/amm-sdk/commit/8d6113dc09a1c887eada7999e0844fe2a5ed6aca))
* **escrow:** added pool > collateral_token_id to escrow status ([9c811d8](https://github.com/fluxprotocol/amm-sdk/commit/9c811d806abaa87f5e4837f18385adf1408149ad))
* **escrow:** adjusted EscrowStatus type to be up to date with current query result ([3106738](https://github.com/fluxprotocol/amm-sdk/commit/31067380ca6de26327bd9d35801ba313ad84c5b8))
* **escrow:** made marketId for escrowStatus optional and switched arugment index with accountId ([7da124a](https://github.com/fluxprotocol/amm-sdk/commit/7da124a3a8ed0e075d7da963ff87488b94edab70))


### Bug Fixes

* **calcBuyAmountInShares:** Fix issue where token denom was not dynamic ([100282d](https://github.com/fluxprotocol/amm-sdk/commit/100282d4d070ee3105de9ad1924f63b2739f6c4b))

## [1.16.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.15.0...v1.16.0) (2021-03-04)


### Features

* **escrow:** adjusted EscrowStatus type to be up to date with current query result ([3106738](https://github.com/fluxprotocol/amm-sdk/commit/31067380ca6de26327bd9d35801ba313ad84c5b8))

## [1.15.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.14.0...v1.15.0) (2021-03-04)


### Features

* **escrow:** added pool > collateral_token_id to escrow status ([9c811d8](https://github.com/fluxprotocol/amm-sdk/commit/9c811d806abaa87f5e4837f18385adf1408149ad))

## [1.14.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.13.0...v1.14.0) (2021-03-04)


### Features

* **escrow:** added market id and description to escrow status ([8d6113d](https://github.com/fluxprotocol/amm-sdk/commit/8d6113dc09a1c887eada7999e0844fe2a5ed6aca))

## [1.13.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.12.0...v1.13.0) (2021-03-04)


### Features

* **escrow:** made marketId for escrowStatus optional and switched arugment index with accountId ([7da124a](https://github.com/fluxprotocol/amm-sdk/commit/7da124a3a8ed0e075d7da963ff87488b94edab70))

## [1.12.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.11.0...v1.12.0) (2021-03-03)


### Features

* **utils:** Add ability to calculate price by using pool balances ([0fb959e](https://github.com/fluxprotocol/amm-sdk/commit/0fb959e0847558a0ce86add6ca4bacdfbc5d4129))
* **utils:** Add ability to calculate the new prices for selling/buying specific tokens ([ecaab12](https://github.com/fluxprotocol/amm-sdk/commit/ecaab1269fd0cbf80fd72de62ae45ba1abd247f2))

## [1.11.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.10.0...v1.11.0) (2021-03-02)


### Features

* **utils:** Add calcScalarValue to utils ([45b8877](https://github.com/fluxprotocol/amm-sdk/commit/45b8877095514174a1c5e22637de5527ff7192ae))

## [1.10.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.9.0...v1.10.0) (2021-03-02)


### Features

* **utils:** Add calcDistributionHint ([958c106](https://github.com/fluxprotocol/amm-sdk/commit/958c1063487517889fdfab0ada15a188ba15e907))

## [1.9.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.8.0...v1.9.0) (2021-03-02)


### Features

* **utils:** replaced calcDistributionHintForScalar with calcScalarDistributionPercentages ([812975e](https://github.com/fluxprotocol/amm-sdk/commit/812975e77ba679849044d6fd5048aa8ba0fc3eee))

## [1.8.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.7.0...v1.8.0) (2021-03-02)


### Features

* **utils:** Add calcDistributionHintForScalar ([f9ab3ce](https://github.com/fluxprotocol/amm-sdk/commit/f9ab3ceb1fe223b94452463d4b87dbc6401b77dc))

## [1.7.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.6.1...v1.7.0) (2021-03-02)


### Features

* **utils:** Add median calculation ([7643b26](https://github.com/fluxprotocol/amm-sdk/commit/7643b2636e49d22bcd1bb287c15de82f24c8f367))

### [1.6.1](https://github.com/fluxprotocol/amm-sdk/compare/v1.6.0...v1.6.1) (2021-02-27)


### Bug Fixes

* **markets:** Fix issue where fetching markets would result in a 400 due unavailable variables ([b2ed70b](https://github.com/fluxprotocol/amm-sdk/commit/b2ed70b6e187f93dc79278cacea54ffcf6ae7426))

## [1.6.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.5.3...v1.6.0) (2021-02-23)


### Features

* **market:** Add support for getting the token whitelist ([c49f59c](https://github.com/fluxprotocol/amm-sdk/commit/c49f59c33487c66c39550a4e74eb48a8d8130a9d))

### [1.5.3](https://github.com/fluxprotocol/amm-sdk/compare/v1.5.2...v1.5.3) (2021-02-23)


### Bug Fixes

* **2fa:** Fix issue where 2FA was not possible due attaching max gas ([4ac234f](https://github.com/fluxprotocol/amm-sdk/commit/4ac234f812e675c99a908c381e4f17e31e83429e))

### [1.5.2](https://github.com/fluxprotocol/amm-sdk/compare/v1.5.1...v1.5.2) (2021-02-22)


### Bug Fixes

* **escrowStatus:** Fix issue where return was always an empty array ([ef6be4e](https://github.com/fluxprotocol/amm-sdk/commit/ef6be4eb2871166e49bd6219f7bcd923c1bcbca7))

### [1.5.1](https://github.com/fluxprotocol/amm-sdk/compare/v1.5.0...v1.5.1) (2021-02-22)


### Bug Fixes

* **escrowStatus:** Fix issue where wrong variable was used to query the graph ([462f00f](https://github.com/fluxprotocol/amm-sdk/commit/462f00fabeb2d75afdf6a171740118057206ae8f))

## [1.5.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.4.1...v1.5.0) (2021-02-22)


### Features

* **sdk:** Add ability to fetch the escrow statuses ([74f660f](https://github.com/fluxprotocol/amm-sdk/commit/74f660f483265204a45d3b778786dd82b899f41c))


### Bug Fixes

* **build:** Fix issue where nog def files where showing up ([f000927](https://github.com/fluxprotocol/amm-sdk/commit/f00092776f8869b561adfeb488736516c6cad82e))

### [1.4.1](https://github.com/fluxprotocol/amm-sdk/compare/v1.4.0...v1.4.1) (2021-02-19)

## [1.4.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.3.0...v1.4.0) (2021-02-19)


### Features

* **build:** Use webpack to pre-build the sdk ([6e4f21c](https://github.com/fluxprotocol/amm-sdk/commit/6e4f21c94a3fcef9c9b7ba0523c793d066d02368))

## [1.3.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.2.2...v1.3.0) (2021-02-17)


### Features

* **sdk:** allow burning of outcome tokens to collateral ([f33e0cc](https://github.com/fluxprotocol/amm-sdk/commit/f33e0cce75f984aef74c429f1ffb361d72598e4d))

### [1.2.2](https://github.com/fluxprotocol/amm-sdk/compare/v1.2.1...v1.2.2) (2021-02-17)

### [1.2.1](https://github.com/fluxprotocol/amm-sdk/compare/v1.2.0...v1.2.1) (2021-02-17)

## [1.2.0](https://github.com/fluxprotocol/amm-sdk/compare/v1.1.0...v1.2.0) (2021-02-17)


### Features

* **tokenContract:** Implement new NEP-141 standard ([4f28041](https://github.com/fluxprotocol/amm-sdk/commit/4f280411c68bdab7a6b1088594a7655294a8d818))

## 1.1.0 (2021-02-15)


### Features

* **config:** Allow for mainnet and custom network config ([31f99cf](https://github.com/fluxprotocol/amm-sdk/commit/31f99cfd56798ca046479e6c99861d67641a8a5e))
* **pool:** Add addLiquidity and tests ([e97716e](https://github.com/fluxprotocol/amm-sdk/commit/e97716ee089a74b49664326c7c980007abe0a267))
* **sdk:** Add ability to fetch token metadata ([4b03773](https://github.com/fluxprotocol/amm-sdk/commit/4b037739a1dc0520d96dbb2ae02216b09e00093e))
* **sdk:** Finish SDK for prime time ([8164df9](https://github.com/fluxprotocol/amm-sdk/commit/8164df9a894edbcc70dfbcfcdbeadd6de0f18a38))
