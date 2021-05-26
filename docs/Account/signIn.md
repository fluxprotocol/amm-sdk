# signIn
Sign in through the NEAR wallet to interact with Flux.

To interact with the Flux smart contract, we first need to sign in. We can do this by using the `signIn` method. This method will redirect us to the NEAR wallet and once the sign-in process is complete the user will be redirected back to your URL with sign-in credentials stored.

```TypeScript
sdkInstance.signIn(): void
```

## Parameters
No parameters required

## Example
```TypeScript
sdkInstance.signIn()
```

## Returns
void
