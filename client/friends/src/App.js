import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
function App() {
  const [name, setname] = useState()
  const [age, setage] = useState()
  const [phone, setphone] = useState()
  const [friendsList, setfriendsList] = useState([])
  const [modal, setmodal] = useState(false)
  const [update, setupdate] = useState({ name, age, phone })
  const [find, setfind] = useState()

  useEffect(() => {
    //get friends
    axios.get('http://localhost:3001/read')
      .then(res => setfriendsList(res.data))
      .catch(err => console.log(err))
  },
    [])

  const Addfriend = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/insert', { name, age, phone })
      .then(res => {
        setfriendsList([...friendsList, { _id: res.data._id, name, age, phone }])
      })
      .catch(err => console.log(err))
  }


  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(res => {
        setfriendsList(friendsList.filter(deleted => (deleted._id !== id))
        )
      })
      .catch(err => console.log(err))
  }


  function showModal(friend) {
    setmodal(!modal)
    setupdate(friend)
  }


  const updateFriend = (e, id) => {
    e.preventDefault()
    axios.put('http://localhost:3001/update', { id, name, age, phone })
      .then((res) => {
        setfriendsList(friendsList.map((updated) => {
          return updated._id === id ?
            { _id: id, name, age, phone }
            :
            updated;
        }))
      })
      .catch()
  }






  function findFriend(e){
    e.preventDefault()
    axios.post('http://localhost:3001/findFriend' ,{find:find})
    .then(res=>{console.log(res)})
    .catch(err=>console.log(err))

  }
  return (
    <div className="App-header">
      <form onSubmit={Addfriend}>
        <div>
          <span>name:  </span>
          <input type='text' required onChange={((e) => setname(e.target.value))} />
        </div>
        <div>
          <span>Age:  </span>
          <input type='number' required onChange={((e) => setage(e.target.value))} />
        </div>
        <div>
          <span>Phone:  </span>
          <input type='text' onChange={((e) => setphone(e.target.value))} />
        </div>

        <input type='submit' />
      </form>


      {friendsList.length > 0 ?
        friendsList.map(friend => (
          <div key={friend.id} >
            <span>{friend.name}          </span>
            <span>{friend.age}           </span>
            <span>{friend.phone}         </span>
            <button onClick={() => showModal(friend)}>Update</button>
            <button onClick={() => deleteFriend(friend._id)}>X</button>
          </div>
        ))
        :
        <p>No friends found</p>
      }


      {modal &&
        <div>
          <form onSubmit={e => updateFriend(e, update._id)}>
            <div>
              <span>name:  </span>
              <input type='text' defaultValue={update.name} required onChange={((e) => setname(e.target.value))} />
            </div>
            <div>
              <span>Age:  </span>
              <input type='number' defaultValue={update.age} required onChange={((e) => setage(e.target.value))} />
            </div>
            <div>
              <span>Phone:  </span>
              <input type='text' defaultValue={update.phone} onChange={((e) => setphone(e.target.value))} />
            </div>

            <input type='submit' />
          </form>

        </div>}


      <div>
        <form onSubmit={findFriend}>
          <label>Nameeeee</label>
          <input type='text' onChange={(e)=>setfind(e.target.value)} />
          <input type='submit' />
        </form>
      </div>
    </div>


  )
}

export default App;
