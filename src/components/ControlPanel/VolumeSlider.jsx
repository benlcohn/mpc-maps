export default function VolumeSlider({ value, onChange }) {
  return (
    <div className="slider">
      <label htmlFor="volume-slider">Volume:</label>
      <input
        type="range"
        id="volume-slider"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
