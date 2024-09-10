import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext} from '../Authentication/Authentication'; 
import { useNavigate } from 'react-router-dom';

//Songs list for the admin to perform crud operations on songs
function AdminSongsList() {
  const [songName, setSongName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [musicDirector, setMusicDirector] = useState('');
  const [error, setError] = useState('');
  const [songs,setSongs]=useState([]);
  const { user } = useContext(AuthContext);
  const navigate= useNavigate();

  useEffect(()=>{
      fetchAllSongs();
  },[user]);

  //Fetching all the songs those may be visible and invisible
  async function fetchAllSongs(){
    if(!user || !user.token){
      console.error("User is not authenticated");
      return;
    }
    await axios.get(`http://localhost:5000/api/songs`,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        },
      })
    .then(response=>{
        setSongs(response.data);
    })
    .catch(error=>{
        console.log("Error occured when fetching the songs",error);
    })
  };

  //Deleting song from the list of songs available
  function handleDelete(id) {
    const confirmed = window.confirm("Sure you want to delete this song?");
    if (confirmed) {
      axios.delete(`http://localhost:5000/api/songs/song/${id}`,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then((response) => {
          fetchAllSongs();
          alert("Song Deleted Successfully....");
      })
      .catch(error => {
          console.log({message:'There was an error deleting the song data!', error});
      });
    }
  }

  //Changing status of the song to visible
  function makeVisible(id) {
    const confirmed = window.confirm("Sure you want to make this song visible to user?");
    if (confirmed) {
      axios.put(`http://localhost:5000/api/songs/song/makevisible/${id}`,null,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then((response) => {
          fetchAllSongs();
      })
      .catch(error => {
          console.log({message:'There was an error making song visible to user!', error});
      });
    }
  };

  //Changing status of the song to invisible
  function makeInvisible(id) {
    const confirmed = window.confirm("Sure you want to make this song Invisible to user?");
    if (confirmed) {
      axios.put(`http://localhost:5000/api/songs/song/makeinvisible/${id}`,null,{
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
        }
      })
      .then((response) => {
          fetchAllSongs();
      })
      .catch(error => {
          console.log({message:'There was an error making song invisible to user!', error});
      });
    }
  };

  //fetching songs based on song name
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
          fetchAllSongs();
        })
    } catch (error) {
        console.error('Error fetching song by name!', error);
        setError('Song not found');
    }
  };

  //fetching songs based on album name
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
          fetchAllSongs();
        })
      } catch (error) {
          console.error('Error fetching song by name!', error);
          setError('Song not found');
      }
  };

  //fetching songs based on artist name
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
        setError(`No songs found with artist "${artistName}"`);
        fetchAllSongs();
      })
    } catch (error) {
        console.error('Error fetching song by name!', error);
        setError('Song not found');
    }
  };

  //fetching songs based on Music director
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
            setMusicDirector(`No songs found with music director "${musicDirector}"`);
        }else {
          setSongs([]);
        }
        })
        .catch(error=>{
          setSongs([]);
          setError(`No songs found with music director "${musicDirector}"`);
          fetchAllSongs();
        })
      }catch (error) {
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
      <button className='btn' onClick={()=>(navigate('/addsong'))} style={{float:'left'}}><img src='https://cdn2.iconfinder.com/data/icons/music-player-36/32/add_song_media_button_music_player-512.png' height={40} width={40} alt='Addsong'/><b>Add Song</b></button><br/>
      <h2 className="border-bottom pb-2 mb-0" style={{"fontWeight":600, "fontFamily":"monospace", "marginTop":40}}>Songs</h2><br/>
      {error && <h5>{error}</h5>}
      <div>
        {songs.map(song=>(
            <div className="card mb-3 w-90" key={song._id}>
              <div className="row g-3">
                <div className="col-md-2">
                  <img src="https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" class="img-fluid rounded-start" alt="MusicIcon" style={{height:170}} />
                </div>
                <div className="col-md-10" >
                  <div className="card-body" style={{textAlign:'left'}}>
                    <h4 className="card-title"><u>{song.songName}</u></h4>
                    <p className="card-text"><b>Album:</b> {song.albumName} &nbsp;&nbsp; <b>MusicDirector:</b> {song.musicDirector}&nbsp;&nbsp; <b>Singer:</b> {song.singer}&nbsp;&nbsp; <b>Artist:</b> {song.artistName}</p>
                    <p className="card-text"><small class="text-body-secondary">Released On:{new Date(song.releaseDate).toLocaleDateString()} &nbsp;&nbsp; Visible:{song.isVisible?"Yes":'No'}</small></p>
                    <div style={{float:'right'}}>
                      <button className='btn' onClick={()=>{navigate(`/updatesong/${song._id}`)}}><img src='https://cdn2.iconfinder.com/data/icons/lucid-generic/24/edit_update_pencil_post_write-512.png' height={20} width={30} alt='Update'/></button>&nbsp;&nbsp;&nbsp;
                      <button className='btn' onClick={()=>{handleDelete(song._id)}}><img src='https://cdn-icons-png.flaticon.com/512/70/70757.png' height={20} width={30} alt='Delete'/></button>&nbsp;&nbsp;&nbsp;
                      {song.isVisible===false && 
                      <button className='btn' onClick={()=>{makeVisible(song._id)}}><img src='https://static-00.iconduck.com/assets.00/eye-closed-icon-2048x1839-9ebpliym.png' height={20} width={30} alt='MakeVisible'/></button>
                      }
                      {song.isVisible===true && 
                      <button className='btn' onClick={()=>{makeInvisible(song._id)}}><img src='https://www.svgrepo.com/show/104184/big-eye.svg' height={20} width={30} alt='MakeInvisible'/></button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default AdminSongsList