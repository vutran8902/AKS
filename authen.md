# Authentication

    To authorize, use this code:

    Instead of ‘login’ and ‘password’ use your credentials from [https://app.dataforseo.com/api-access](https://app.dataforseo.com/api-access).

    ## Getting Started
    Create an account with DataForSEO and then use the credentials from your account dashboard to access DataForSEO APIs. Note that the API password is generated automatically by DataForSEO and is different from your account password.

    ## Basic Authentication
    DataForSEO uses Basic Authentication, which makes it possible to call our APIs with almost any programming language, Postman app, REST API platforms, and all major frameworks.

    Regardless of the programming language, your unique API token should be passed in the `Authorization` header within the request in the following format:
    ```
    Authorization: Basic login:password
    ```

    Instead of “login” and “password”, use your API credentials encoded in Base64.

    For instance, the Base64-encoded `login:password` value will have the following format:
    ```
    bG9naW46cGFzc3dvcmQ=
    ```

    So the whole string will look as follows:
    ```
    Authorization: Basic bG9naW46cGFzc3dvcmQ=
    ```

    ## Examples
    Here’s how to implement Basic Authentication in different programming languages:

    ### JavaScript
    ```javascript
    const API_LOGIN = 'your_login';
    const API_PASSWORD = 'your_password';
    const API_CREDENTIALS = btoa(`${API_LOGIN}:${API_PASSWORD}`);

    fetch('https://api.dataforseo.com/v3/endpoint', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${API_CREDENTIALS}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ /* your request data */ })
    });
    ```

    ### Python
    ```python
    import requests
    from base64 import b64encode

    API_LOGIN = 'your_login'
    API_PASSWORD = 'your_password'
    API_CREDENTIALS = b64encode(f"{API_LOGIN}:{API_PASSWORD}".encode()).decode()

    response = requests.post(
      'https://api.dataforseo.com/v3/endpoint',
      headers={
        'Authorization': f'Basic {API_CREDENTIALS}',
        'Content-Type': 'application/json'
      },
      json={ /* your request data */ }
    )
    ```

    ### PHP
    ```php
    $API_LOGIN = 'your_login';
    $API_PASSWORD = 'your_password';
    $API_CREDENTIALS = base64_encode("$API_LOGIN:$API_PASSWORD");

    $ch = curl_init('https://api.dataforseo.com/v3/endpoint');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'Authorization: Basic ' . $API_CREDENTIALS,
      'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([ /* your request data */ ]));
    $response = curl_exec($ch);
    curl_close($ch);
    ```

    ## Important Notes
    - It is **not possible** to pass the login and password in URL parameters.
    - You do **not** have to make a separate authentication call to obtain API credentials.
    - Basic authentication is the **only way** to access DataForSEO API; credentials should always be passed in the header of the request.
