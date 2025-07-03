# Hooks Backend Documentation<a name='hooks_backend_documentation'></a>


## Index<a name='toc'></a>


1. [hooks backend documentation](#hooks_backend_documentation)  
2. [profile retrieve](#profile_retrieve)  
3. [profile update](#profile_update)  
4. [user signin](#user_signin)  
5. [user signup](#user_signup)  


# User Signup<a name='user_signup'></a>

This API creates a new user on the platform. There are only two kinds of user allowed in the platform. (Fan,Creator). This endpoint defaults the user to Fan unless otherwise specified in the user_type Payload.

**Endpoint:**`/user/signup/`

**Method:** `POST`

## Payload

``` json
{

email:*****

password:*****

password2:*****

user_type:*****

}

```
## Response body

**status code:201**

``` json
{
  "email": "saliuoazeez@gmail.com",
  "user_type": "Fan"
}
```

[Table of contents](#toc)


# User Signin<a name='user_signin'></a>

This endpoint signs in a user and returns a Refresh and access token for further requests.

**Endpoint:**`/user/signin/`

**Method:** `POST`

## Payload

``` json
{

email:*****

password:*****

}

```
## Response body

**status code:200**

``` json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1MDYwNDc0MSwiaWF0IjoxNzUwNTE4MzQxLCJqdGkiOiI2MDE1ZmFmOGFhODk0MTk5OTYyOTExNzIwMWZlYzE2MCIsInVzZXJfaWQiOjJ9.KFGhvWiLeje57xxkNwQkryt4VAZ-UJ3o7VKytidY6kc",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUwNTM2MzQxLCJpYXQiOjE3NTA1MTgzNDEsImp0aSI6IjMwY2M3YWMzZmNlZDRlMWZiMzM2YTJiNTFjZjllNmZmIiwidXNlcl9pZCI6Mn0.IpMIqXctIWWrpQRko42egN7FWWASdpEHbxmVxBcixgA",
  "user": {
    "email": "saliuoazeez@gmail.com",
    "user_id": 2
  }
}
```

[Table of contents](#toc)


# Profile Update<a name='profile_update'></a>

This endpoint updates the profile of a user. N.B:All fields could be optionally sent in the payload.

**Endpoint:**`/profile/`

**Method:** `PUT`

## Payload

``` json
{

full_name:*****

location:*****

interests:*****

display_pic:*****

}

```
## Response body

**status code:200**

``` json
{
  "full_name": "Saliu Opeyemi",
  "display_pic": "N/A",
  "location": "Ijebu Ode",
  "interests": [
    "Games"
  ]
}
```

[Table of contents](#toc)


# Profile Retrieve<a name='profile_retrieve'></a>

This endpoint retrieves the profile information of the logged in user. N.B: By attaching a query string user_id=**id to the endpoint, Other user's profile could be retrieved.

**Endpoint:**`/profile/`

**Method:** `GET`

## Payload

``` json


```
## Response body

**status code:200**

``` json
{
  "full_name": "Saliu Opeyemi",
  "display_pic": "N/A",
  "location": "Ijebu Ode",
  "interests": [
    "Games"
  ]
}
```

[Table of contents](#toc)