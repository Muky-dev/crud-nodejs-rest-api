# Node.js-MongoDB REST API

+ Made for a job interview.
+ It's a sample project.


### Requisites
![](https://img.shields.io/npm/v/npm.svg?logo=npm)
![](https://img.shields.io/badge/MongoDB-LTS-informational?style=flat&logo=mongodb&logoColor=green&color=green)
![](https://img.shields.io/badge/Node->=12.18.3-informational?style=flat&logo=node.js&logoColor=green&color=green)

---

### Running application
    npm install
    node index.js

### Configs
Enviroment variables: `USERS_DATABASE` and `PORT`

---

## Routes
### GET:
+ `/user` - Recives query params `name` and/or `lastname` | Responses `JSON` with all users that match the query, with all infos. 
+ `/user/:nickname` - Recives `nickname` as param in the `:nickname` url placeholder | Responses `JSON` with user info: name, lastname and nickname.

### POST:
+ `/user` - Recives `name`, `lastname`, `nickname`, `address`, `bio (optional)` to create a user | Responses `JSON` with infos of created user.

### PUT:
+ `/user/:id` - Recives `id` as param in `:id` url placeholder, recives `lastname` and/or `address` in body request with respectives datas and modify | Responses `JSON` of modified user, with all infos.
+ `/user/nick/:id` - Recives `id` as param in `:id` url placeholder, recives `nickname` in body request | Responses `JSON` with the user data.

### DELETE:
+ `user/:id` - Recives `id` as param in `:id` url placeholder to exclude the respective user | Responses `JSON` with status.
