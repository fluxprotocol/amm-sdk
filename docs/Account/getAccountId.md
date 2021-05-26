# getAccountId
Returns the account id of the signed-in user

```TypeScript
sdkInstance.getAccountId(): string;
```

## Parameters
No parameters required

## Returns
A string with the current logged in account Id

## Example

```TypeScript
const accountId = sdkInstance.getAccountId();
console.log('You are logged in with: ', accountId);
```
