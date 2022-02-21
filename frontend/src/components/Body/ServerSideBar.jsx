import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../helper/axios';
import Modal from 'react-modal';
import {ServerContext} from '../MainBody'
Modal.setAppElement('#root')
const baseURL = "http://127.0.0.1:8000/api/";
export default function ServerSideBar(props) {
    // const {val} = useContext(ServerContext)
    var serverList = [];
    const [modalVisibility, setModalVisibility] = useState(0)
    const handleServerChange = props.handleServerChange;
    const [serverListState, setServerListState] = useState([])
    const [server,setServer] = useState({name:'',server_thumbnail:null});
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
        body.append("name",server.name);
        body.append("server_thumbnail",server.server_thumbnail,server.server_thumbnail.name);
        axiosInstance.post(`v1/create-server`,body).then((res) => {
            if(res.status == 200){
                setModalVisibility(false);
                setServerListState([...serverListState,{ name: res.data[0].name, server_thumbnail: res.data[0].server_thumbnail, id: res.data[0].id }])
            }
            
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
            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 class="font-bold text-2xl">Create Server</h3>
                </section>
                <section class="mt-4">
                    <form class="flex flex-col">
        
                        <div className="mb-6 pt-3 rounded bg-gray-200">
								<label className="block text-gray-700 text-sm font-bold mb-2 ml-3">server name</label>
								<input name="name" onChange={(e)=>setServer({...server,[e.target.name]:e.target.value})} type="text" id="name" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
						</div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
								<label className="block text-gray-700 text-sm font-bold mb-2 ml-3">server thumbnail</label>
								<input name="server_thumbnail" onChange={(e)=>setServer({...server,[e.target.name]:e.target.files[0]})} type="file" id="server_thumbnail" accept="image/png , image/jpeg" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
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