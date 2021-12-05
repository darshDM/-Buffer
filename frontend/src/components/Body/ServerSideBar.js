import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosImage';
import Modal from 'react-modal';

Modal.setAppElement('#root')
const baseURL = "http://127.0.0.1:8000/api/";
export default function ServerSideBar(props) {
    var serverList = [];
    const [modalVisibility, setModalVisibility] = useState(0)
    const handleServerChange = props.handleServerChange
    const [serverListState, setServerListState] = useState([])
    const [name,setName] = useState(null);
    const [server_thumbnail, setServer_thumbnail] = useState(null);

    useEffect(() => {
        axiosInstance
            .get(`v1/my-server-list`).then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    serverList.push({ name: res.data[i].name, server_thumbnail: res.data[i].server_thumbnail, id: res.data[i].id });
                }
                setServerListState(serverList);
            })
    }, [])
    const customStyle = {
        content: {
            backgroundColor: 'rgba(255,255,255,0)',
            marginTop: '2.5rem',
            marginBottom: '2.5rem',
            padding: '0px',
            border: '0px',
        },
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
        }

    }
    const handleSubmit = (e) => {
        const body = new FormData();
        body.append("name",name);
        body.append("server_thumbnail",server_thumbnail,server_thumbnail.name);
        axiosInstance.post(`v1/create-server`,body).then((res) => {
            console.log(res.data);
        })
    }
    return <div id="server_side_bar" className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
        {
            serverListState.map((item) => {
                const thumbnail = `http://localhost:8000${item.server_thumbnail}/`;
                return <div onClick={() => handleServerChange(item)} key={item.id} className="sidebar-icon group bg-local" style={{ "backgroundImage": `url(${thumbnail})` }}>
                    <span class="sidebar-tooltip group-hover:scale-100">
                        {item.name}
                    </span>
                </div>
            })
        }
        <div onClick={() => { setModalVisibility(!modalVisibility) }} class="sidebar-icon bg-gray-800"><i className="fa fa-plus"></i> </div>
        <Modal isOpen={modalVisibility} onRequestClose={() => { setModalVisibility(!modalVisibility) }} style={customStyle}>
            <main className="bg-gray-700 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 class="font-bold text-white text-2xl">Create Server</h3>
                </section>
                <section class="mt-4">
                    <form class="flex flex-col">
                        <div class="mb-6 pt-3 rounded flex flex-col">
                            <label className="text-white">Server name</label>
                            <input name="name" id="name" onChange={(e)=>setName(e.target.value)} className="p-4 mt-3 bg-gray-600 rounded-lg outline-none focus:outline-none text-white"></input>
                        </div>
                        <div class="mb-6 pt-3 rounded flex flex-col">
                            <label className="text-white">Server description</label>
                            <input type="file" onChange={(e)=>setServer_thumbnail(e.target.files[0])} accept="image/png , image/jpeg" name="server_thumbnail" id="thumbnail" className="rounded-lg outline-none focus:outline-none text-white"></input>
                        </div>

                        <div className="flex flex-row">
                            <button onClick={handleSubmit} className="hover:border-solid hover:border-purple-800 w-20 bg-gradient-to-r from-pink-400 to-purple-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none" type="button">Create</button>
                            <button className="w-20 text-white font-bold rounded ml-2">Cancel</button>
                        </div>
                    </form>
                </section>
            </main>
        </Modal>
    </div>
}