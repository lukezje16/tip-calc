import { useState } from "react";

export default function App() {
  return <TipCalculator></TipCalculator>;
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = parseFloat(bill) * ((percentage1 + percentage2) / 2 / 100);
  const calculatedBill = bill + tip;

  console.log(tip);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div className="app">
      <BillInput bill={bill} onSetBill={setBill}></BillInput>
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        <label>How did you like the service?</label>
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        <label>How did your friend like the service?</label>
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output
            tip={tip}
            bill={bill}
            calculatedBill={calculatedBill}
          ></Output>
          <Reset handleReset={handleReset}></Reset>
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div className="input">
      <label>How much was the bill?</label>
      <input
        type="number"
        placeholder="Bill Value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ children, onSelect, percentage }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip, calculatedBill }) {
  return (
    <h3>{`You pay £${calculatedBill.toFixed(2)} (£${bill.toFixed(
      2
    )} + £${tip.toFixed(2)} tip)`}</h3>
  );
}

function Reset({ handleReset }) {
  return (
    <button className="button" onClick={handleReset}>
      Reset
    </button>
  );
}
