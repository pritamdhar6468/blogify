import React, { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState(localStorage.getItem('description') || '');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('imageUrl') || '');

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            localStorage.setItem('imageUrl', downloadURL); // Save image URL to localStorage
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Tell us something about yourself..."
            />
          </div>
          <div>
            <label htmlFor="profileImage">Upload Profile Image:</label>
            <input type="file" id="profileImage" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>
          </div>
          {imageUrl && <img src={imageUrl} alt="Profile" style={{ marginTop: '20px', width: '150px', borderRadius: '50%' }} />}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
