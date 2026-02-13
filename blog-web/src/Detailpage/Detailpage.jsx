import React from 'react';
import './Detailpage.css';
import aju from '../../public/Images/aju.jpeg'; // or ../Images/aju.jpg

function Detailpage() {
  return (
    <div className='background'>
    <div className="profile-container">

      {/* Header Background */}
      <div className="profile-header"></div>

      {/* Profile Card */}
      <div className="profile-card">
        
        <img src={aju} alt="profile" className="profile-img" />

        <h2 className="profile-name">Ajith Kumar</h2>
        <p className="profile-role">B.Com Graduate | React.js Learner</p>

        <p className="profile-bio">
          Enthusiastic learner focusing on React.js and web development.
          Passionate about designing clean UIs and building functional apps.
        </p>

        {/* Social Section */}
        <div className="social-links">
          <a href="https://www.instagram.com/a_maveric_k?igsh=bGZqbXc0cTBhbDhr">Instagram</a>
          <a href="https://www.linkedin.com/in/ajith-kumar-a1602a398?utm_source=share_via&utm_content=profile&utm_medium=member_android">LinkedIn</a>
          <a href="https://github.com/ajithkumar-oos">GitHub</a>
        </div>

        {/* Buttons */}
        <div className="profile-actions">
          
         
        </div>

      </div>
    </div>
    </div>
  );
}

export default Detailpage;
