const PersonList = ({ persons, onDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => onDelete(person)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
