Output: {
msg: string,
data: {}
}

#Login
input: email, password
output: user, accessToken

#Register
input: email, password, fullname, username
output: user, accessToken

#RefreshToken
input: req.cookies.refreshToken
output: newAccessToken

#Reload
input: req.cookies.refreshToken
output: user, newAccessToken

#Logout

#Get user
input: req.params.id
output: user: {
...user,
followers: [
{
_id,
avatar,
fullname,
username
}
],
followings: [
{
_id,
avatar,
fullname,
username
}
]
}

#Update user
input: fullname, username,gender,mobile,address, story,website,avatar,
output: updatedUser
