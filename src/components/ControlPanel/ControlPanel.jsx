import { useState } from 'react';
import VolumeSlider from './VolumeSlider';
import PitchSlider from './PitchSlider';
import PadColorSelector from './PadColorSelector';

export default function ControlPanel({ onVolumeChange, onPitchChange, onColorChange }) {
  const [volume, setVolume] = useState(0.5);
  const [pitch, setPitch] = useState(1);
  const [categoryColors, setCategoryColors] = useState({});

  const handleVolumeChange = (evt) => {
    const newVolume = parseFloat(evt.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  const handlePitchChange = (evt) => {
    const newPitch = parseFloat(evt.target.value);
    setPitch(newPitch);
    onPitchChange(newPitch);
  };

  const handleColorChange = (category, color) => {
    const newCategoryColors = { ...categoryColors, [category]: color };
    setCategoryColors(newCategoryColors);
    onColorChange(newCategoryColors); 
  };

  return (
    <div className="control-panel">
      <VolumeSlider value={volume} onChange={handleVolumeChange} />
      <PitchSlider value={pitch} onChange={handlePitchChange} />
      <PadColorSelector categoryColors={categoryColors} onColorChange={handleColorChange} />
    </div>
  );
}
