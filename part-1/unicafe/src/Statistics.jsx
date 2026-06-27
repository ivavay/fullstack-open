const Statistics = ({ good, neutral, bad, average, positive }) => {
  return (
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </div>
  );
};
export default Statistics;
