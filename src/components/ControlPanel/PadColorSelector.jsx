export default function PadColorSelector({ categoryColors, onColorChange }) {
    const handleColorChange = (category, color) => {
      onColorChange(category, color);
    };
  
    return (
      <div className="pad-color-selector">
        {Object.keys(categoryColors).map((category, index) => (
          <div key={index}>
            <label htmlFor={`color-${category}`}>{category}: </label>
            <input
              type="color"
              id={`color-${category}`}
              value={categoryColors[category]}
              onChange={(e) => handleColorChange(category, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }