# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
