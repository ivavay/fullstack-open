import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (!trimmedName || !trimmedNumber) return;

    const exists = persons.some((person) => person.name === trimmedName);

    if (exists) {
      alert(`${trimmedName} is already added in the phone book.`);
      return;
    }

    const newPerson = { name: trimmedName, number: trimmedNumber };

    personsService.create(newPerson).then((data) => {
      setPersons([...persons, data]);
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={setFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onSubmit={handleSubmit}
      />
      <PersonList persons={filteredPersons} />
    </div>
  );
};

export default App;
