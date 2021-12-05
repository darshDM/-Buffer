import React,{useState} from "react";
import axiosInstance from "../../../axiosImage";

export default function CreateServer(props) {
    const [name,setName] = useState(null);
    const [server_thumbnail,setServer_thumbnail] = useState(null);
    const handleSubmit = (e) => {
        const bodyUp = new FormData();
        bodyUp.append("name",name);
        bodyUp.append("server_thumbnail",server_thumbnail,server_thumbnail.name)
        axiosInstance.post(`v1/create-server`,bodyUp)
    }
    

    return <div className="create-server-modal">
        <main className="bg-gray-700 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            <section>
                <h3 class="font-bold text-white text-2xl">Create Server</h3>
            </section>
            <section class="mt-4">
					<form class="flex flex-col">
						<div class="mb-6 pt-3 rounded flex flex-col">
                            <label className="text-white">Server name</label>
                            <input name = "name" onChange={(evt)=>setName(evt.target.value)} className="p-4 mt-3 bg-gray-600 rounded-lg outline-none focus:outline-none"></input>
						</div>

                        <div className="mb-6 pt-3 rounded flex flex-col">
                            <label className="text-white">server thumbnail</label>
                            <input name = "server_thumbnail" onChange={(evt)=>setServer_thumbnail(evt.target.files[0])} type = "file" className="p-4 mt-3 bg-gray-600 rounded-lg outline-none focus:outline-none"></input>
                        </div>
                        <div className="flex flex-row">
                            <button onClick={handleSubmit} className="w-20 bg-gradient-to-r from-pink-400 to-purple-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 focus:outline-none" type="button">Create</button>
                            <button className="w-20 text-white font-bold rounded">Cancel</button>
                        </div>
                    </form>
            </section>
        </main>
    </div>
}