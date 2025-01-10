import Timer from "./Timer";

export default function Timers() {
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Multiple Timers</h1>
      <Timer initialTime={25 * 60} label="Timer 1: 25 Minutes" />
      <Timer initialTime={15 * 60} label="Timer 2: 15 Minutes" />
      <Timer initialTime={5 * 60} label="Timer 3: 5 Minutes" />
    </div>
  );
}
