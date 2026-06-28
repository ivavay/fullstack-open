# Full Stack Open

Notes, exercises, and mini projects from the Full Stack Open course. Part 0 and the first part of Part 1 were completed in 2023, now 3 years later, I'm picking up the course again to dive more confidently into fullstack. My goal is to feel more at ease with backend lingo and to feel empowered knowing how to bulid my own backend from time to time 🤝

## 🚧 Progress Report 

- [x] Part 0: Fundamentals of Web Apps (sometimes in 2023...)
- [x] Part 1: Introduction to React (6/27)
- [ ] Part 2: Communicating with Server
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