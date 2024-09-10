import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../Authentication/Authentication';
import { useNavigate } from 'react-router-dom';

//Playlists page that is displayed to the user, where the playlists belong to that particular user
function AllPlaylists() {

  const [songName,setSongName]=useState('');
  const [playlists,setPlaylists]=useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [updateButton, setUpdateButton]=useState(false);
  const [songs, setSongs] = useState([]);
  const {user} = useContext(AuthContext);
  const navigate=useNavigate();
  const [error,setError]=useState('');

  useEffect(() => {
    fetchAllPlaylistsOfUser();
  },[user]);

  useEffect(() => {
    if (selectedPlaylist) {
      // Fetch songs for the selected playlist
      axios.get(`http://localhost:5000/api/playlists/playlist/songs/${selectedPlaylist._id}`,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then(response => {
        setSongs(response.data);
        setError('');
        setSongName('');
      })
      .catch(error => {
        console.error('Error fetching songs for playlist:', error);
      });
    }
  }, [selectedPlaylist,user.token]);

  //Fetching all the playlists of the loggedin user
  const fetchAllPlaylistsOfUser=()=>{
    if(!user || !user.token){
      console.error("User is not authenticated");
      return;
    }
    // Fetch playlists when the component mounts
    axios.get('http://localhost:5000/api/playlists/user',{
      headers: {
        Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
      }
    })
    .then(response => {
      setPlaylists(response.data);
      if (response.data.length > 0) {
        setSelectedPlaylist(response.data[0]); // Select the first playlist by default
      }
    })
    .catch(error => {
      console.error('Error fetching playlists:', error);
    });
  }

  //Changing selected playlist
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handlePlaylistDelete=(id)=>{
    const confirmed = window.confirm("Sure you want to delete this playlist?");
    if (confirmed) {
      //deleting playlist
      axios.delete(`http://localhost:5000/api/playlists/playlist/${id}`,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then((response) => {
        alert(response.data.message);
        fetchAllPlaylistsOfUser();
      })
      .catch(error => {
          console.log({message:'There was an error deleting the playlist!', error});
      });
    }
    else{
      return;
    }
  };

  const handleSongDelete=(id)=>{
    const confirmed = window.confirm("Sure you want to delete this playlist?");
    if (confirmed) {
      //deleting song in a particular playlist
      axios.delete(`http://localhost:5000/api/playlists/${selectedPlaylist._id}/songs/${id}`,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then((response) => {
        alert(response.data.message);
        fetchAllPlaylistsOfUser();
      })
      .catch(error => {
          console.log({message:'There was an error deleting a song in playlist!', error});
      });
    }
  };

  //Fetch song in a playlist based on the song name
  const handleSearchByName = async () => {
    try {
        axios.get(`http://localhost:5000/api/playlists/${selectedPlaylist._id}/songs/name/${songName}`,{
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
        })
      } catch (error) {
          console.error('Error fetching song by name!', error);
          setError('Song not found');
      }
  };


  return (
    <div className='container mt-5'>
      
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {playlists.map(playlist => (
              <li className="nav-item d-flex align-items-center" style={{ marginRight: 5 }} key={playlist._id}>
                <button
                  className={`nav-link ${selectedPlaylist && selectedPlaylist._id === playlist._id ? 'active' : ''}`}
                  aria-current="true"
                  href=""
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  {playlist.name}
                </button>
                {updateButton && 
                <>
                <button onClick={()=>{navigate(`/updateplaylist/${playlist._id}`)}} className="btn btn-sm ms-2" style={{padding:0, border:0}}><img src='https://cdn2.iconfinder.com/data/icons/lucid-generic/24/edit_update_pencil_post_write-512.png' height={20} width={20} alt='Update'/></button>
                <button onClick={()=>handlePlaylistDelete(playlist._id)} className="btn btn-sm ms-2" style={{padding:0, border:0}}><img src='https://cdn-icons-png.flaticon.com/512/70/70757.png' alt='Delete' height={20} width={20}/></button>
                </>
                }
              </li>
            ))}
          </ul>
          {!updateButton && selectedPlaylist &&
            <button className='btn' style={{float:'right'}} onClick={()=>(setUpdateButton(true))}><img src='https://cdn2.iconfinder.com/data/icons/lucid-generic/24/edit_update_pencil_post_write-512.png' alt='UpdateButton' height={30} width={30}/>Update</button>
          }
          {updateButton &&
            <button className='btn' style={{float:'right'}} onClick={()=>(setUpdateButton(false))}><img src='https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Cancel_delete_remove_stop_x_no_close_cross.png' alt='CancelButton' height={30} width={30}/>Cancel</button>
          }
          {!updateButton &&
            <button className='btn' style={{float:'right'}} onClick={()=>(navigate('/createplaylist'))}><img src='https://cdn4.iconfinder.com/data/icons/media-buttons/512/add-512.png' alt='CreatePlaylist' height={35} width={35}/>Create</button>
          }
        </div><br/>
        {selectedPlaylist &&
          <div className="row g-0" style={{marginLeft:50, marginRight:30}}>
              <input className="form-control" placeholder="Search song by name" value={songName}  onChange={(e) => setSongName(e.target.value)} />          
              <button className="btn btn-success w-10" onClick={handleSearchByName} >Search</button>
          </div>
        }
        <div className="card-body">
        <div style={{float:'right'}}>
            <button className='btn' style={{marginRight:20}}><img src='https://cdn4.iconfinder.com/data/icons/social-media-set-2-1/256/9-512.png' alt='Play' height={30} width={30}/>Play</button>
            <button className='btn' style={{marginRight:20}}><img src='https://cdn2.iconfinder.com/data/icons/media-30/24/350-512.png' alt='Stop' height={30} width={30}/>Stop</button>
            <button className='btn' style={{marginRight:20}}> <img src='https://cdn1.iconfinder.com/data/icons/navigation-controls/100/i_43-512.png' alt='Repeat' height={30} width={30}/>Repeat</button>
            <button className='btn' style={{marginRight:20}}><img src='https://cdn1.iconfinder.com/data/icons/navigation-controls/100/i_44-512.png' alt='Shuffle' height={30} width={30}/>Shuffle</button>
          </div><br/><br/>
          <h5 className="card-title">{selectedPlaylist ? selectedPlaylist.name : 'Select a Playlist'}</h5>
          <p className="card-text">
            {error && <h5>{error}</h5>}
            {songs.length > 0 ? (
              <ul>
                {songs.map(song => (
                  <>
                  <div class="card mb-3 w-90 shadow"  key={song._id}>
                  <div class="row g-3">
                    <div class="col-md-2">
                      <img src="https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" class="img-fluid rounded-start" alt="MusicIcon" style={{height:180}} />
                    </div>
                    <div class="col-md-10">
                      <div class="card-body" style={{textAlign:'left'}}>
                        <h4 class="card-title"><u>{song.songName}</u></h4>
                        <p class="card-text"><b>Album:</b> {song.albumName} &nbsp;&nbsp; <b>MusicDirector:</b> {song.musicDirector}&nbsp;&nbsp; <b>Singer:</b> {song.singer}&nbsp;&nbsp; <b>Artist:</b> {song.artistName}</p>
                        <p class="card-text"><small class="text-body-secondary">Released On:{new Date(song.releaseDate).toLocaleDateString()} &nbsp;&nbsp; Visible:{song.isVisible?"Yes":'No'}</small></p>
                        {updateButton &&
                        <button className='btn' style={{float:'right', marginBottom:5}} onClick={()=>handleSongDelete(song._id)}><img src='https://cdn-icons-png.flaticon.com/512/70/70757.png' alt='DeleteSong' height={20} width={30}/>Delete</button>
                        }
                      </div>
                    </div>
                  </div>
                  </div>
                  </ >
                ))}
              </ul>
            ) : (
              <p>No songs found in this playlist.</p>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AllPlaylists