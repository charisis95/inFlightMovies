import React, { useState, useEffect } from 'react';

const MovieModal = ({ movie, onSave, onClose }) => {
  const [title, setTitle] = useState(movie?.Title || '');
  const [description, setDescription] = useState(movie?.Description || '');
  const [duration, setDuration] = useState(movie?.Duration || '');
  const [category, setCategory] = useState(movie?.Category || '');

  const handleSave = () => {
    if (!title || !description || !duration || !category) {
      alert("Please fill in all fields.");
      return;
    }
    
    const updatedMovie = { Title: title, Description: description, Duration: Number(duration), Category: category };
    onSave(updatedMovie);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{movie ? "Edit Movie" : "Add New Movie"}</h2>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>{movie ? "Update" : "Create"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
