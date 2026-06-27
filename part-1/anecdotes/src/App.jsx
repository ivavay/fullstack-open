import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // selected stores the index of the anecdote currently shown.
  // The initial value 0 means the app starts with the first anecdote.
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const mostVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(mostVotes);

  // Pick a random valid index from the anecdotes array.
  // Math.random() gives a decimal, and Math.floor() rounds it down.
  const randomAnecdote = () => Math.floor(Math.random() * anecdotes.length);
  const vote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {/* Display the anecdote at the currently selected index. */}
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>

      <button onClick={vote}>vote</button>
      {/* When clicked, choose a new random index and re-render the app. */}
      <button onClick={() => setSelected(randomAnecdote())}>
        next anecdote
      </button>

      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotedIndex]}</div>
      <div>has {mostVotes} votes</div>
    </div>
  );
};

export default App;
