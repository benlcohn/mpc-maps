export default function PitchSlider({ value, onChange }) {
  return (
    <div className="slider">
      <label htmlFor="pitch-slider">Pitch:</label>
      <input
        type="range"
        id="pitch-slider"
        min="0.5"
        max="2"
        step="0.01"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
