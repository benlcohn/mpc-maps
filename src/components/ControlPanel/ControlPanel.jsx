import { useState } from 'react';
import VolumeSlider from './VolumeSlider';
import PitchSlider from './PitchSlider';

export default function ControlPanel({ onVolumeChange, onPitchChange }) {
  const [volume, setVolume] = useState(0.5);
  const [pitch, setPitch] = useState(1);

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  const handlePitchChange = (event) => {
    const newPitch = parseFloat(event.target.value);
    setPitch(newPitch);
    onPitchChange(newPitch);
  };

  return (
    <div className="control-panel">
      <VolumeSlider value={volume} onChange={handleVolumeChange} />
      <PitchSlider value={pitch} onChange={handlePitchChange} />
    </div>
  );
}
