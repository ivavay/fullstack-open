# Full Stack Open

Notes, exercises, and mini projects from the Full Stack Open course. Part 0 and the first part of Part 1 were completed in 2023, now 3 years later, I'm picking up the course again to dive more confidently into fullstack. My goal is to feel more at ease with backend lingo and to feel empowered knowing how to bulid my own backend from time to time 🤝

## 🚧 Progress Report 

- [x] Part 0: Fundamentals of Web Apps (sometimes in 2023...)
- [x] Part 1: Introduction to React (6/27)
- [x] Part 2: Communicating with Server (6/29)
- [ ] Part 3: Programming a server with NodeJS and Express

## Part 1: Introduction to React

#### Unicafe

What I built:

- A feedback app with good(+1), neutral (0), and bad (-1) buttons
- Statistics including average and positive percentage

What I learned/refreshed:

This runs only if all is not 0, hence the ternary operator 

``` js 
const average = all === 0 ? 0 : (good - bad) / all;
const positive = all === 0 ? 0 : (good / all) * 100;

``` 

#### Anecdotes

What I built:

- A random anecdote generator from an array off anecdotes 
- Inrementing votes for anecdotes
- A section showing the anecdote with the most votes

What I learned/refreshed:

- How to update arrays immutably, uing the spread operator 
```js 
const copy = [...numbers]
```

## Part 2: Communicating with Server 
#### Course Info (extended)

What I build: 

- Refactored to use child components

What I learned/refreshed:

Reduce is an array method where you take the starting sum at 0 and adding each part to the total sum.
```js 
const totalExercises = course.parts.reduce(
  (sum, part) => sum + part.exercises,
  0
);
```
This review reinforces the concept of props drilling, which is ok for small appllications. 

#### Phonebook

What I build:
- A simple phonebook where you can add person and person's number via form inputs and there's a search filter to search for the persons you're looking for.

What I learned/refreshed: 

- `event.preventDefault()` to a form is to prevent page refresh when you submit, which is the default behavior. 
- A some array method is used to check if the name already exists in the persons array; returns true if it does. 
```js
    const exists = persons.some((person) => person.name === trimmedName);
```
- Using the filter array method, only the people whose name includes the filter text (case insensitive, meaning all changed to lowercase) will be stored to filteredPersons 
```js 
const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
```
- json-server serves as fake API for you to simulate fetching from an API. All you need is a db.json file at the root. Also, it can generate unique IDs for you 
- It is good practice to extract code relating to communication with backend to a separate module in a folder called services so can reuse API logic if there are more API actions that need to be made later
- Filter can also be used here to update the state `persons` without the deleted person. 
```js
 const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };
  ```
- In the network tab, the API name shows the last part of the endpoint (the ID in this case)
- Can use promise chaining `.then` when the logic just does one thing, such as updating state. When there are multi steps, use async/await. Await waits for the API to be fetched before doing sequential actions. 

## Part 2: Programming a server with NodeJS and Express

#### Phonebook Backend 
- Express is a cleaner and abstracted framework to build APIs, an offshoot of node JS
- For example, this gets all persons from the server
```js
app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id)

    if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
 
})
```
- Learned to return a 400 status code if person already exists in phonebook, by using some to check against the name. 400 means server cannot process the request. 
```js
 if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }
```
- Can use `"dev": "node --watch index.js",` inside of `scripts` inside of `package.json` to restart server whenever new changes are saved. Use `npm run dev` to start the development server
- A middleware like `morgan` can be used to give info (url called, status, how long it took to respond, post data the server received) all in the terminal from a backend POV without the browser devtool. 
- The code is like this, with the custom "token" that gives you the body of the request.
```js
morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
```
- It would return something like this after restarting the server
```js
Server running on port 3001
POST /api/persons 200 54 - 16.207 ms {"name":"Test Person","number":"123-456"}
```
- Same-Origin Policy is a safety mechanism that enforces requests only from the same origin, so if front is on one port and the backend on another, there would be an error...unless you install and use the middleware `cors`, like this: 
```js
// Middlewares 
const cors = require('cors')
app.use(cors())
```
- A proxy can be used to achieve the same thing if you are working with backend APIs that don't belong to you
Deployed phonebook's backend and frontend together on Render: [link](https://fullstack-open-phonebook-8sa1.onrender.com/)
- MongoDB is a document, noSQL database, and in a way "schemaless"
- Mongoose is a library that connects node/express code to mongoDB
- A cluster on mongoDB is a group servers to make your storage work 
- To serve up the data stored in MongoDB onto the frontend, can use a Moongoose model (JS object) to talk to the MongoDB collection. Must store MongoDB URI as an env variable. 
- A 204 (No content) status is returned if a person is deleted via DELETE method
- An error handling express middleware centralizes the route logic and can let you specify the error message to make it look more user-friendly
- Validation should be done both on frontend and backend. For backend, can write custom validation with Mongoose. 