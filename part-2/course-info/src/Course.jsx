import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total totalexercises={totalExercises} />
    </div>
  );
};

export default Course;
