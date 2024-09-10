import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Authentication/Authentication';

//Search songs based on different properties
function SearchSongs() {

  const [songName, setSongName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [musicDirector, setMusicDirector] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  //Fetching songs based on the song name
  const handleSearchByName = async () => {
      try {
          axios.get(`http://localhost:5000/api/songs/name/${songName}`,{
            headers: {
              Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
            }
          })
          .then(response=>{
            if (Array.isArray(response.data)) {
              setSongs(response.data);
              setError('');
              setSongName('');
          } else if (response.data) {
              setSongs([response.data]);
              setError('');
              setSongName('');
          }else {
            setSongs([]);
          }
          })
          .catch(error=>{
            setSongs([]);
            setError(error.message);
          })
      } catch (error) {
          console.error('Error fetching song by name!', error);
          setError('Song not found');
      }
  };
  //Fetching songs based on the album name
  const handleSearchByAlbum = async () => {
    try {
        axios.get(`http://localhost:5000/api/songs/album/${albumName}`,{
          headers: {
            Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
          }
        })
        .then(response=>{
          if (Array.isArray(response.data)) {
            setSongs(response.data);
            setError('');
            setAlbumName('');
        } else if (response.data) {
            setSongs([response.data]);
            setError('');
            setAlbumName('');
        }else {
          setSongs([]);
        }
        })
        .catch(error=>{
          setSongs([]);
          setError(error.message);
        })
    } catch (error) {
        console.error('Error fetching song by name!', error);
        setError('Song not found');
    }
};
//Fetching songs based on the artist
const handleSearchByArtist = async () => {
  try {
      axios.get(`http://localhost:5000/api/songs/artist/${artistName}`,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then(response=>{
        if (Array.isArray(response.data)) {
          setSongs(response.data);
          setError('');
          setArtistName('');
      } else if (response.data) {
          setSongs([response.data]);
          setError('');
          setArtistName('');
      }else {
        setSongs([]);
      }
      })
      .catch(error=>{
        setSongs([]);
        setError(error.message);
      })
  } catch (error) {
      console.error('Error fetching song by name!', error);
      setError('Song not found');
  }
};
//Fetching songs based on the music director
const handleSearchByMusicDirector = async () => {
  try {
      axios.get(`http://localhost:5000/api/songs/musicdirector/${musicDirector}`,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then(response=>{
        if (Array.isArray(response.data)) {
          setSongs(response.data);
          setError('');
          setMusicDirector('');
      } else if (response.data) {
          setSongs([response.data]);
          setError('');
          setMusicDirector('');
      }else {
        setSongs([]);
      }
      })
      .catch(error=>{
        setSongs([]);
        setError('No songs found');
      })
  } catch (error) {
      console.error('Error fetching song by name!', error);
      setError('Song not found');
  }
};

  return (
    <div className='container mt-5'>
      <div className="row g-2">
        <div className="col-md-3">
          <input className="form-control shadow" placeholder="Search song by name" value={songName}  onChange={(e) => setSongName(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" onClick={handleSearchByName}>Search</button>
        </div>
        <div className="col-md-3">
          <input className="form-control shadow" placeholder="Search song by album" value={albumName}  onChange={(e) => setAlbumName(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" onClick={handleSearchByAlbum}>Search</button>
        </div>
      </div><br/>
      <div className="row g-2">
        <div className="col-md-3">
          <input className="form-control shadow" placeholder="Search song by artist" value={artistName}  onChange={(e) => setArtistName(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" onClick={handleSearchByArtist}>Search</button>
        </div>
        <div className="col-md-3">
          <input className="form-control shadow" placeholder="Search song by music director" value={musicDirector}  onChange={(e) => setMusicDirector(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" onClick={handleSearchByMusicDirector}>Search</button>
        </div>
      </div><br/>
      <div className='mt-5'>
        {error && <div>No Song Found</div>}
        {Array.isArray(songs) && songs.map((song) =>(
            <div className="card mb-3 w-90" key={song._id}>
              <div className="row g-3">
                <div className="col-md-2">
                  <img src="https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" class="img-fluid rounded-start" alt="music" style={{height:150}} />
                </div>
                <div className="col-md-10" >
                  <div className="card-body" style={{textAlign:'left'}}>
                    <h4 className="card-title"><u>{song.songName}</u></h4>
                    <p className="card-text"><b>Album:</b> {song.albumName} &nbsp;&nbsp; <b>MusicDirector:</b> {song.musicDirector}&nbsp;&nbsp; <b>Singer:</b> {song.singer}&nbsp;&nbsp; <b>Artist:</b> {song.artistName}</p>
                    <p className="card-text"><small class="text-body-secondary">Released On:{new Date(song.releaseDate).toLocaleDateString()} &nbsp;&nbsp; Visible:{song.isVisible?"Yes":'No'}</small></p>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default SearchSongs