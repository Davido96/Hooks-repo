# Hooks Backend Documentation<a name='hooks_backend_documentation'></a>


## Index<a name='toc'></a>


1. [hooks backend documentation](#hooks_backend_documentation)  
2. [profile retrieve](#profile_retrieve)  
3. [profile update](#profile_update)  
4. [signout user](#signout_user)  
5. [user signin](#user_signin)  
6. [user signup](#user_signup)  


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

This endpoint updates the profile of a user. N.B:All fields could be optionally sent in the payload i.e. Any combination of the payloads could be sent in the request. Valid interest include ['social networking', 'dancing', 'fun times', 'social', 'career', 'business', 'environment', 'fitness', 'nature', 'sports', 'recreation', 'running', 'cycling', 'comedy', 'coffee', 'night waalks', 'foodie', 'dating', 'relationship', 'others']. The maximum size of the display_pic is 2MB and allowed formats are [".jpg",".jpeg",".png"]. Also, Fans cannot update montly_sub_keys and would always br null when retrieved.

**Endpoint:**`/profile/update/`

**Method:** `PUT`

## Payload

``` json
{

full_name:*****

gender:*****

display_pic:*****

monthly_sub_keys (Creators Only):*****

state:*****

city:*****

interests:*****

bio:*****

}

```
## Response body

**status code:200**

``` json
{
  "id": 1,
  "full_name": "Saliu Opeyemi Abdul Azeez",
  "display_pic": "https://hooks-storage.s3.amazonaws.com/display_pic/33092378-1bf2-4362-9671-504bbd91f604default_pp.jpeg",
  "age": 0,
  "bio": "A skilled backend developer and innovation specialist.",
  "gender": "Male",
  "state": "Ogun",
  "city": "Ijebu Ode",
  "interests": [
    "dancing"
  ],
  "monthly_sub_keys": null
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
  "id": 1,
  "full_name": "Saliu Opeyemi Abdul Azeez",
  "display_pic": "https://hooks-storage.s3.amazonaws.com/display_pic/33092378-1bf2-4362-9671-504bbd91f604default_pp.jpeg",
  "age": 0,
  "bio": "A skilled backend developer and innovation specialist.",
  "gender": "Male",
  "state": "Ogun",
  "city": "Ijebu Ode",
  "interests": [
    "dancing"
  ],
  "monthly_sub_keys": null
}
```

[Table of contents](#toc)


# Signout User<a name='signout_user'></a>

This API logsout the user from all devices incases where multiple sessions have been initiated.

**Endpoint:**`/user/signout/`

**Method:** `POST`

## Payload

``` json


```
## Response body

**status code:200**

``` json
{
  "message": "Logged Out from all devices"
}
```

[Table of contents](#toc)