import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../Authentication/Authentication';
import { useNavigate } from 'react-router-dom';

//Listing songs to the user and few functionalities like adding to playlist are provided
function UserSongsList() {

  const [songs,setSongs]=useState([]);
  const { user } = useContext(AuthContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [playlists,setPlaylists]=useState([]);
  const [selectedSongs,setSelectedSongs]=useState([]);
  const [addToPlaylistButton,setAddToPlaylistButton]=useState(false);
  const navigate=useNavigate();
  const [songName, setSongName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
      fetchAllVisibleSongs();
      fetchUserPlaylists();
  },[user]);

  async function fetchAllVisibleSongs(){
    if (!user || !user.token) {
      console.error("User is not authenticated");
      return;
    }
    await axios.get('http://localhost:5000/api/songs/visiblesongs',{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
    .then(response=>{
      setSongs(response.data);
    })
    .catch(error=>{
        console.log("Error occured when fetching the songs",error);
    })
  };

  async function fetchUserPlaylists(){
    if (!user || !user.token) {
      console.error("User is not authenticated");
      return;
    }
    await axios.get('http://localhost:5000/api/playlists/user', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
    .then(response => {
      if(response.data.length===0){
        throw new Error('No data found');
      }
      setPlaylists(response.data);
    })
    .catch(error => {
      console.log("Error fetching playlists", error);
    });
  }

  const handleSongsSelection=(songId)=>{
    setSelectedSongs(prevSelectedsongs=>prevSelectedsongs.includes(songId)
      ?prevSelectedsongs.filter(id=>id!==songId)
      :[...prevSelectedsongs,songId])
  }

  const handleAddToPlaylist = (songId) => {
    if (!selectedPlaylist) {
      alert("Select the playlist");
      return;
    }

    if(selectedSongs.length===0){
      alert("Select atleast one song to add to playlist");
      return;
    }
  
    axios.post(`http://localhost:5000/api/playlists/${selectedPlaylist}/songs`, {
      songIds: selectedSongs,
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
      }
    })
    .then((response) => {
      alert(response.data.message);
      setSelectedSongs([]);
      setSelectedPlaylist('');
      navigate('/usersongs')
    })
    .catch(error => {
      console.log("There was an error adding the song to the playlist!", error);
    });
  };

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
          setError(`No songs found with song name "${songName}"`);
          fetchAllVisibleSongs();
        })
    } catch (error) {
        console.error('Error fetching song by name!', error);
        setError('Song not found');
    }
};

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
        setError(`No songs found with album "${albumName}"`);
        fetchAllVisibleSongs();
      })
  } catch (error) {
      console.error('Error fetching song by name!', error);
      setError('Song not found');
  }
};

  return (
    <div className='container mt-5'>
      <div className="row g-2">
        <div className="col-md-3 shadow">
          <input className="form-control" placeholder="Search song by name" value={songName}  onChange={(e) => setSongName(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" onClick={handleSearchByName}>Search</button>
        </div>
        <div className="col-md-3 shadow">
          <input className="form-control" placeholder="Search song by album" value={albumName}  onChange={(e) => setAlbumName(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100" onClick={handleSearchByAlbum}>Search</button>
        </div>
      </div><br/><br/>
      {error && <h5>{error}</h5>}
      {!addToPlaylistButton &&
      <div>
      <button className='btn' style={{float:'left'}} onClick={()=>setAddToPlaylistButton(true)}><img src='https://cdn0.iconfinder.com/data/icons/music-2-solid/32/Add_Playlist-512.png' height={40} width={40} alt='AddSongsToPlaylistButton'/>Add songs to playlist</button><br/><br/><br/>
      </div>
      }
      {addToPlaylistButton &&
      <div>
      <button className='btn' style={{float:'right'}} onClick={()=>setAddToPlaylistButton(false)}><img src='https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Cancel_delete_remove_stop_x_no_close_cross.png' height={40} width={40} alt='AddToPlaylistButton'/>Cancel</button><br/><br/><br/>
      </div>
      }
      <div>
      { addToPlaylistButton &&
      <div className="row g-2">
        <div className='col-md-6'>
          <select 
            value={selectedPlaylist} 
            onChange={(e) => setSelectedPlaylist(e.target.value)}
            className="form-select"
          >
            <option value="">Select a playlist</option>
            {playlists.map(playlist => (
              <option key={playlist._id} value={playlist._id}>{playlist.name}</option>
            ))}
          </select>
        </div>
        <div className='col-md-3'>
          <button className='btn' style={{float:'left'}} onClick={handleAddToPlaylist}><img src='https://cdn0.iconfinder.com/data/icons/ui-vol-05/32/240-512.png' alt='AddSongToPlaylist' height={40} width={40}/><button className='btn btn-warning'> Add to playlist</button></button><br/><br/><br/><br/>
        </div>
      </div>
      }
        {songs.map(song => (
          <div className="card mb-3 w-90 shadow" key={song._id}>
            <div className="row g-3">
              {addToPlaylistButton &&
                  <div className="form-check" style={{marginLeft:15}}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`selectSong-${song._id}`}
                      checked={selectedSongs.includes(song._id)}
                      onChange={() => handleSongsSelection(song._id)}
                    />
                  </div>
                }
              <div className="col-md-2">
                <img src="https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" className="img-fluid rounded-start" alt="MusicIcon" style={{height:150}} />
              </div>
              <div className="col-md-10">
                <div className="card-body" style={{textAlign:'left'}}>
                  <h4 className="card-title"><u>{song.songName}</u></h4>
                  <p className="card-text"><b>Album:</b> {song.albumName} &nbsp;&nbsp; <b>MusicDirector:</b> {song.musicDirector}&nbsp;&nbsp; <b>Singer:</b> {song.singer}&nbsp;&nbsp; <b>Artist:</b> {song.artistName}</p>
                  <p className="card-text"><small className="text-body-secondary">Released On:{new Date(song.releaseDate).toLocaleDateString()}</small></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default UserSongsList