# Hooks Backend Documentation


## Index<a name='toc'></a>

{{TOC}}


# User Signup

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


# User Signin

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


# Profile Update

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


# Profile Retrieve

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


# Signout User

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


# Follow User

This API allows a user to follow another user. N.B:The User should not have been previously followed ie. Following can only be done once per user pair. A User cannot follow themselves.

**Endpoint:**`/follow/`

**Method:** `POST`

## Payload

``` json
{

follow (A User Id):*****

}

```
## Response body

**status code:201**

``` json
{
  "id": 2,
  "follower": {
    "id": 1,
    "full_name": "Saliu Opeyemi Abdul Azeez",
    "gender": "Male",
    "bio": "A skilled backend developer and innovation specialist."
  },
  "following": {
    "id": 2,
    "full_name": "N/A",
    "gender": "N/A",
    "bio": "N/A"
  },
  "message": "Following"
}
```

[Table of contents](#toc)


# Unfollow User

This API allows a user to unfollow another user. N.B:The other user should have been previously followed. A user cannot unfollow themselves.

**Endpoint:**`/follow/unfollow/`

**Method:** `POST`

## Payload

``` json
{

unfollow (A followed user id):*****

}

```
## Response body

**status code:200**

``` json
{
  "user": {
    "id": 2,
    "full_name": "N/A",
    "gender": "N/A",
    "bio": "N/A"
  },
  "message": "Unfollowed"
}
```

[Table of contents](#toc)


# Get Followings

This API retrieves all the users that the logged in user is currently following. Also vy applying the flag ?count to the endpoint, The total number of the logged in user followings can be retrieved.

**Endpoint:**`/follow/followings/`

**Method:** `GET`

## Payload

``` json


```
## Response body

**status code:200**

``` json
[
  {
    "id": 3,
    "follower": {
      "id": 1,
      "full_name": "Saliu Opeyemi Abdul Azeez",
      "gender": "Male",
      "bio": "A skilled backend developer and innovation specialist."
    },
    "following": {
      "id": 2,
      "full_name": "N/A",
      "gender": "N/A",
      "bio": "N/A"
    }
  }
]
WHERE FLAG IS APPLIED
{
  "following": 1
}
```

[Table of contents](#toc)


# Get Followers

This API retrieves all the users that are currently following the logged in user. N.B:By applying the flag ?count to the endpoint url, the total number of the logged in user followers can be retrieved.

**Endpoint:**`/follow/followers/`

**Method:** `GET`

## Payload

``` json


```
## Response body

**status code:200**

``` json
WITHOUT FLAG
[
  {
    "id": 3,
    "follower": {
      "id": 1,
      "full_name": "Saliu Opeyemi Abdul Azeez",
      "gender": "Male",
      "bio": "A skilled backend developer and innovation specialist."
    },
    "following": {
      "id": 2,
      "full_name": "Balogun Abiola",
      "gender": "Male",
      "bio": "N/A"
    }
  }
]
WITH FLAG
{
  "followers": 1
}
```

[Table of contents](#toc)