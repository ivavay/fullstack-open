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
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (!trimmedName || !trimmedNumber) return;

    const existingPerson = persons.find(
      (person) => person.name === trimmedName,
    );

    const newPerson = { name: trimmedName, number: trimmedNumber };

    if (existingPerson) {
      if (
        window.confirm(
          `${trimmedName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personsService
          .update(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
            setNotification({
              message: `Changed ${trimmedName}`,
              type: "success",
            });
          })
          .catch(() => {
            setNotification({
              message: `Information of ${trimmedName} has already been removed from server`,
              type: "error",
            });
            setPersons(persons.filter((person) => person.id !== existingPerson.id));
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    personsService.create(newPerson).then((data) => {
      setPersons([...persons, data]);
      setNewName("");
      setNewNumber("");
      setNotification({
        message: `Added ${trimmedName}`,
        type: "success",
      });
    });
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        setNotification({
          message: `Deleted ${person.name}`,
          type: "success",
        });
      }).catch(() => {
        setNotification({
          message: `Information of ${person.name} has already been removed from server`,
          type: "error",
        });
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={setFilter} />
      <h2>add a new</h2>
      {notification && (
        <div
          style={{
            backgroundColor: "#e5e7eb",
            color: notification.type === "error" ? "#991b1b" : "#166534",
            border: `2px solid ${
              notification.type === "error" ? "#991b1b" : "#166534"
            }`,
            padding: "10px 12px",
            borderRadius: "6px",
            marginBottom: "12px",
            display: "inline-block",
          }}
        >
          {notification.message}
        </div>
      )}
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onSubmit={handleSubmit}
      />
      <PersonList persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
