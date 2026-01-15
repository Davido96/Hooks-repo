# Stores Documentation

All stores are correctly configured according to the API specifications.

## 1. Auth Store (`src/stores/authStore.ts`)

### Endpoints Used
- **POST /user/signup/** - Register new user (Fan by default, or Creator)
- **POST /user/signin/** - Login and get access/refresh tokens
- **POST /user/signout/** - Logout from all devices

### Store Functions

#### `signup(data)`
```typescript
signup({
  email: string,
  password: string,
  password2: string,
  user_type?: "Fan" | "Creator"  // Defaults to "Fan"
})
```
- Creates new user account
- Returns null (user must sign in separately to get tokens)
- Toast notification on success

#### `signin(data)`
```typescript
signin({
  email: string,
  password: string
})
```
- Authenticates user
- Returns tokens and user info
- Sets cookies and localStorage
- Toast notification on success

#### `signout()`
- Clears all authentication state
- Removes tokens from cookies and localStorage
- Toast notification on success

#### `fetchProfile()`
- Retrieves current user's profile
- Updates user state

#### `initializeAuth()`
- Restores auth session from localStorage on app load

---

## 2. Profile Store (`src/stores/profileStore.ts`)

### Endpoints Used
- **GET /profile/** - Retrieve user's profile
- **GET /profile/?user_id={id}** - Retrieve another user's profile
- **PUT /profile/update/** - Update user's profile

### Store Functions

#### `getProfile(userId?)`
```typescript
getProfile(userId?: number)
```
- Gets current user's profile if no userId provided
- Gets specific user's profile if userId provided

#### `updateProfile(data)`
```typescript
updateProfile({
  full_name?: string,
  gender?: "Male" | "Female" | "Other",
  age?: number,
  display_pic?: File,  // Max 2MB, formats: jpg, jpeg, png
  bio?: string,
  state?: string,
  city?: string,
  interests?: string[],  // Valid interests from backend
  monthly_sub_keys?: string  // Creators only
})
```
- Updates user profile
- All fields optional
- Returns updated profile
- Toast notification on success

---

## 3. Social Store (`src/stores/socialStore.ts`)

### Endpoints Used

#### Follow Endpoints
- **POST /follow/** - Follow a user
- **POST /follow/unfollow/** - Unfollow a user
- **GET /follow/followers/** - Get list of followers
- **GET /follow/followers/?count** - Get follower count
- **GET /follow/followings/** - Get list of followings
- **GET /follow/followings/?count** - Get following count
- **GET /follow/recommended/** - Get recommended users

#### Like Endpoints
- **POST /follow/like/** - Send like request to user
- **GET /follow/like/?status=pending|requested|confirmed** - Get likes by status
- **POST /follow/like/respond/** - Accept or reject like request

### Store Functions

#### Follow Functions

##### `followUser(id)`
- Follow a user by ID
- Optimistic update + server sync
- Toast notification on success

##### `unfollowUser(id)`
- Unfollow a user by ID
- Optimistic update + server sync
- Toast notification on success

##### `getFollowers()`
- Fetches list of followers

##### `getFollowings()`
- Fetches list of followings

##### `getFollowerCount()`
- Fetches total follower count

##### `getFollowingCount()`
- Fetches total following count

##### `getRecommendations()`
- Fetches recommended users to follow

##### `isFollowing(id)`
- Check if user is already following someone

#### Like Functions

##### `sendLike(id)`
```typescript
sendLike(userId: string | number)
```
- Send like request to user
- Toast notification on success

##### `getLikes(status)`
```typescript
getLikes(status: "pending" | "requested" | "confirmed")
```
- **pending**: Likes initiated by current user, awaiting response
- **requested**: Likes from other users to current user
- **confirmed**: Mutual likes/matches

##### `respondLike(likeInstance, action)`
```typescript
respondLike(likeInstanceId, "accept" | "reject")
```
- Accept or reject a like request
- Toast notification on success
- Refreshes requested likes list

---

## Important Notes

1. **Age Field**: Now properly included in profile updates
2. **Interests**: Removed from ProfileSetup form to match backend validation
3. **Signup Flow**: User signs up → gets created → must sign in separately to get tokens
4. **User Types**: Two types supported - "Fan" and "Creator"
   - Creators can set `monthly_sub_keys`
   - Fans cannot update `monthly_sub_keys`
5. **Image Upload**: Max 2MB, formats: jpg, jpeg, png
6. **Optimistic Updates**: Follow/unfollow use optimistic updates for better UX
7. **Error Handling**: All errors show toast notifications
8. **Token Persistence**: Tokens stored in localStorage and cookies for middleware

---

## API Errors

Common error handling across all stores:
- Network errors → Toast error notification
- Server errors → Response message displayed
- All errors thrown after toast notification

