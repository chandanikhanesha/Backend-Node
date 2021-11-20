# Introduction 
This is the backend for Retailontap web application.

# Getting Started
## 1.	Installation process
```console
yarn install
```
## 2.	Software dependencies
- [node](https://nodejs.org/en/docs/)
- [serverless](https://www.serverless.com/framework/docs/)
- [graphql](https://graphql.org/learn/)
- [apollo-server](https://www.apollographql.com/docs/apollo-server/)

## 3. Test
- [jest](https://jestjs.io/)

Create a file in test and name it as "user-data.js". Add these lines to user-data.js file.
```code
module.exports = {
  first_name: "John",
  last_name: "Doe",
  password: "John123!@#",
  work_email: "john@doe.com", // your valid email
  company: "Tests",
  phone_number: "1234567890"
}
```

Check [screenshots](screenshots)

```console
yarn jest
```