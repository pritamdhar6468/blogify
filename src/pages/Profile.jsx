import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { storage } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState(localStorage.getItem('description') || '');
  const [editMode, setEditMode] = useState(false);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    localStorage.setItem('description', e.target.value); // Save description to localStorage
  };

  

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div>
            <label htmlFor="description"><strong>Description:</strong></label>
            {editMode ? (
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                onBlur={() => setEditMode(false)} // Exit edit mode on blur
                placeholder="Tell us something about yourself..."
                autoFocus
              />
            ) : (
              <p onClick={() => setEditMode(true)}>{description || 'Click here to add a description'}</p>
            )}
          </div>
          
         
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
