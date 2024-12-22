# Simple Bank API Documentation

## OpenAPI Specification: 3.0.0

### Info
- **Title**: Simple Bank API
- **Description**: API documentation for the Bank web application.
- **Version**: 1.0.0

### Servers
- **URL**: `http://localhost:5000/api`  
  **Description**: Local development server

---

## Endpoints

### Authentication Endpoints

#### **Register a New User**
- **URL**: `/auth/register`
- **Method**: `POST`
- **Summary**: Register a new user.
- **Request Body**:
    - **Required**: Yes
    - **Content Type**: `application/json`
    - **Schema**:
      ```json
      {
        "type": "object",
        "properties": {
          "username": { "type": "string" },
          "password": { "type": "string" },
          "email": { "type": "string" }
        },
        "required": ["username", "password", "email"]
      }
      ```
- **Responses**:
    - `201`: User registered successfully.
    - `400`: Invalid input.

---

#### **Log in a User**
- **URL**: `/auth/login`
- **Method**: `POST`
- **Summary**: Log in a user.
- **Request Body**:
    - **Required**: Yes
    - **Content Type**: `application/json`
    - **Schema**:
      ```json
      {
        "type": "object",
        "properties": {
          "username": { "type": "string" },
          "password": { "type": "string" }
        },
        "required": ["username", "password"]
      }
      ```
- **Responses**:
    - `200`: Login successful.
    - `400`: Missing required field: [field_name]
    - `404`: User not found
    - `401`: Invalid credentials
---

#### **Log Out the Current User**
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Summary**: Log out the current user.
- **Responses**:
    - `200`: Logout successful.

---

#### **Reset Password**
- **URL**: `/auth/reset-password`
- **Method**: `POST`
- **Summary**: Reset password.
- **Request Body**:
    - **Required**: Yes
    - **Content Type**: `application/json`
    - **Schema**:
      ```json
      {
        "type": "object",
        "properties": {
          "email": { "type": "string" }
        },
        "required": ["email"]
      }
      ```
- **Responses**:
    - `200`: Reset link sent.
    - `400`: Invalid email.

---

#### **Change Password**
- **URL**: `/auth/change-password`
- **Method**: `POST`
- **Summary**: Change password.
- **Request Body**:
    - **Required**: Yes
    - **Content Type**: `application/json`
    - **Schema**:
      ```json
      {
        "type": "object",
        "properties": {
          "oldPassword": { "type": "string" },
          "newPassword": { "type": "string" }
        },
        "required": ["oldPassword", "newPassword"]
      }
      ```
- **Responses**:
    - `200`: Password changed successfully.
    - `400`: Invalid input.

---

### User Endpoints
```
    .get("/balance", accountControllers.getBalance)
    .get("/transactions", accountControllers.getTransactionHistory)
    .get("/info", accountControllers.getAccountInfo)
    .put("/info", accountControllers.changeAccountInfo);

```
---

### Transaction Endpoints

#### **Perform a Transaction**
- **URL**: `/transactions`
- **Method**: `POST`
- **Summary**: Perform a transaction.
- **Request Body**:
    - **Required**: Yes
    - **Content Type**: `application/json`
    - **Schema**:
      ```json
      {
        "type": "object",
        "properties": {
          "toAccount": { "type": "string" },
          "amount": { "type": "number" }
        },
        "required": ["toAccount", "amount"]
      }
      ```
- **Responses**:
    - `201`: Transaction successful.
    - `400`: Invalid input.
    - `401`: Unauthorized.

---

#### **Deposit Money**
- **URL**: `/transactions/deposit`
- **Method**: `POST`
- **Summary**: Deposit money.
- **Request Body**:
    - **Required**: Yes
    - **Content Type**: `application/json`
    - **Schema**:
      ```json
      {
        "type": "object",
        "properties": {
          "amount": { "type": "number" }
        },
        "required": ["amount"]
      }
      ```
- **Responses**:
    - `201`: Deposit successful.
    - `400`: Invalid input.
    - `401`: Unauthorized.

---

#### **Withdraw Money**
- **URL**: `/transactions/withdraw`
- **Method**: `POST`
- **Summary**: Withdraw money.
- **Request Body**:
    - **Required**: Yes
    - **Content Type**: `application/json`
    - **Schema**:
      ```json
      {
        "type": "object",
        "properties": {
          "amount": { "type": "number" }
        },
        "required": ["amount"]
      }
      ```
- **Responses**:
    - `201`: Withdrawal successful.
    - `400`: Invalid input.
    - `401`: Unauthorized.
