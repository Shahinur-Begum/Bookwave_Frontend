import React, { useState, useRef, useEffect } from 'react';
import './ebooks.css';
import audioUrl from '../../../../Assets/chap1.mp3'; // Ensure the path is correct
import img from '../../../../Assets/chap1pic.jpeg';
import { useNavigate } from 'react-router-dom'; 

// Adding 12 chapters
const chapters = [
  { id: '1', title: 'The Boy Who Lived', duration: '15:49 mins', audioUrl },
  { id: '2', title: 'The Vanishing Glass', duration: '10:17 mins', audioUrl },
  { id: '3', title: 'The Keeper of Keys', duration: '12:10 mins', audioUrl },
  { id: '4', title: 'Diagon Alley', duration: '14:05 mins', audioUrl },
  { id: '5', title: 'The Journey from Platform Nine and Three-Quarters', duration: '13:12 mins', audioUrl },
  { id: '6', title: 'The Sorting Hat', duration: '11:25 mins', audioUrl },
  { id: '7', title: 'The Potions Master', duration: '12:50 mins', audioUrl },
  { id: '8', title: 'The Midnight Duel', duration: '10:30 mins', audioUrl },
  { id: '9', title: 'The Forest', duration: '16:00 mins', audioUrl },
  { id: '10', title: 'The Mirror of Erised', duration: '14:23 mins', audioUrl },
  { id: '11', title: 'Christmas at Hogwarts', duration: '11:45 mins', audioUrl },
  { id: '12', title: 'The Forbidden Forest', duration: '12:30 mins', audioUrl }
];

const AudiobookPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(chapters[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume at max
  const [showVolume, setShowVolume] = useState(false); // Toggle volume slider

  const navigate = useNavigate();

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.onloadedmetadata = () => setDuration(audioElement.duration);
    }
  }, [currentChapter]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleChapterChange = (chapter) => {
    if (currentChapter.id !== chapter.id) {
      setCurrentChapter(chapter);
      audioRef.current.src = chapter.audioUrl;
      audioRef.current.currentTime = 0;
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      handlePlayPause();
    }
  };

  const handleRewind = () => {
    const newTime = Math.max(currentTime - 10, 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handleBackClick = () => {
    window.history.back(); // Go back to the previous page
  };
  return (
    <div className="audiobook-player">
    
    <button className="eback-button" onClick={handleBackClick}>← Back</button>

      {/* Cover and Details */}
      <div className="ebook-cover-section">
        <img
          src={img}
          alt="Book Cover"
          className="audio-cover"
        />
        <h2 className="book-title">Harry Potter and the Philosopher's Stone</h2>
        <p className="book-author">by J.K. Rowling</p>
        <p className="current-playing">
          Chapter {currentChapter.id}: {currentChapter.title}
        </p>
      </div>

      {/* Audio Controls */}
      <div className="eaudio-controls">
        <button className="control-button circle" onClick={handleRewind}>⏪</button>
        <button className="control-button circle" onClick={handlePlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button className="control-button circle" onClick={handleForward}>⏩</button>
      </div>

      {/* Progress Bar and Volume */}
      <div className="progress-volume-section">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
        />
        <span>{formatTime(duration)}</span>
        <button
          className="volume-icon circle"
          onClick={() => setShowVolume(!showVolume)}
        >
          🔊
        </button>
        {showVolume && (
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        )}
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentChapter.audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Chapter List */}
      <div className="echapter-list">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`echapter ${currentChapter.id === chapter.id ? 'active' : ''}`}
          >
            <span className="chapter-number">{chapter.id}</span>
            <span
              className="chapter-title"
              style={{
                color: currentChapter.id === chapter.id ? 'teal' : 'black',
              }}
            >
              {chapter.title}
            </span>
            <button
              className="play-button"
              onClick={() => handleChapterChange(chapter)}
            >
              {currentChapter.id === chapter.id && isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiobookPlayer;
