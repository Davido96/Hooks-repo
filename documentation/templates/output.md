# Hooks Backend Documentation<a name='hooks_backend_documentation'></a>


## Index<a name='toc'></a>


1. [follow user](#follow_user)  
2. [get followers](#get_followers)  
3. [get followings](#get_followings)  
4. [hooks backend documentation](#hooks_backend_documentation)  
5. [like request](#like_request)  
6. [like request response](#like_request_response)  
7. [profile retrieve](#profile_retrieve)  
8. [profile update](#profile_update)  
9. [retrieve likes](#retrieve_likes)  
10. [signout user](#signout_user)  
11. [unfollow user](#unfollow_user)  
12. [user recommendation](#user_recommendation)  
13. [user signin](#user_signin)  
14. [user signup](#user_signup)  


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


# Follow User<a name='follow_user'></a>

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


# Unfollow User<a name='unfollow_user'></a>

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


# Get Followings<a name='get_followings'></a>

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


# Get Followers<a name='get_followers'></a>

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


# User Recommendation<a name='user_recommendation'></a>

This API recommends users for the logged in user to interact with which may include follow/like.

**Endpoint:**`/follow/recommended/`

**Method:** `GET`

## Payload

``` json


```
## Response body

**status code:200**

``` json
[
  {
    "id": 2,
    "full_name": "Balogun Abiola",
    "display_pic": "https://hooks-storage.s3.amazonaws.com/display_pic/275581f4-10bb-4145-86f7-6313cbba88e3default_pp.jpeg",
    "age": 0,
    "location": "N/A",
    "followers": 1,
    "subscribers": "Not Available",
    "interests": [
      "nature",
      "sports"
    ],
    "active": false
  },
  {
    "id": 3,
    "full_name": "Rebecca Omotoke",
    "display_pic": "https://hooks-storage.s3.amazonaws.com/display_pic/275581f4-10bb-4145-86f7-6313cbba88e3default_pp.jpeg",
    "age": 0,
    "location": "N/A",
    "followers": 0,
    "subscribers": "Not Available",
    "interests": [
      "social networking",
      "dancing",
      "social"
    ],
    "active": true
  }
]
```

[Table of contents](#toc)


# Like Request<a name='like_request'></a>

This API allows the logged in user to send a like request to another user. N.B:A like request can only be sent to a user that has a pending Like request from the user or has accepted the request previously.

**Endpoint:**`/follow/like/`

**Method:** `POST`

## Payload

``` json
{

"like (user_id)":"*****"

}

```
## Response body

**status code:200**

``` json
{
  "like": {
    "id": 1,
    "full_name": "Saliu Opeyemi Abdul Azeez",
    "gender": "Male",
    "bio": "A skilled backend developer and innovation specialist."
  }
}
```

[Table of contents](#toc)


# Retrieve Likes<a name='retrieve_likes'></a>

This API retrieves likes that are associated with the logged in user. N.B:A status query parameter must be provided for this request. status options are pending,requested and confirmed. A pending status retrieves all the like requests initiated by the logged in user that have not been accepted/rejected by the other user. A requested status retrieves all the like requests initiated by other users towards the logged in user which the logged in user can either accept or reject. A confirmed status retrieves all the likes associated with the logged in user that have been confirmed by the user or other users.

**Endpoint:**`/follow/like/?status=requested`

**Method:** `GET`

## Payload

``` json


```
## Response body

**status code:200**

``` json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "like": {
        "id": 3,
        "full_name": "Rebecca Omotoke",
        "gender": "Female",
        "bio": "N/A"
      }
    }
  ]
}
```

[Table of contents](#toc)


# Like Request Response<a name='like_request_response'></a>

This API allows the logged in to either accept or reject a like request. N.B:The logged in user must be the one the like request was directed at to make them eligible to respond to the request. Also, the like request should not have been previously confirmed.

**Endpoint:**`/follow/like/respond/`

**Method:** `POST`

## Payload

``` json
{

"like_instance":"*****"

"action (either accept/reject)":"*****"

}

```
## Response body

**status code:200**

``` json
{
  "like_id": 6,
  "like": {
    "id": 1,
    "full_name": "Saliu Opeyemi Abdul Azeez",
    "gender": "Male",
    "bio": "A skilled backend developer and innovation specialist."
  },
  "action": "Accepted"
}
```

[Table of contents](#toc)