import React,{useState,useContext} from 'react';
import { ServerContext } from '../MainBody';
import axiosInstance from '../../helper/axios';
import { ThreadContext } from '../MainBody';
function CreateThreadComponent(props) {
	const [thread,setThread] = useState({title:'',query:'',code:''})
	const server = useContext(ServerContext).server
	const setThreads = useContext(ThreadContext).setThreads;
	const threads = useContext(ThreadContext).threads;
	const handleSubmit = (e) => {
		e.preventDefault();
		const body = new FormData();
		body.append("room",server.id)
        body.append("title",thread.title);
        body.append("query",thread.query);
		body.append("code",thread.code);
        axiosInstance.post(`v1/create-thread`,body).then((res) => {
			console.log("here");
            if(res.status == 201){
				console.log("created");
				setThreads([...threads,{id:res.data[0].id, title:res.data[0].title}])
            }
        })
	}
	return <div className="w-3/4 bg-gray-700 flex text-purple-200 flex-col ">
		<section class="mt-10 ml-4 mr-4 w-4/6">
			<form class="flex flex-col">
				<div class="mb-6 pt-3 rounded bg-gray-800">
					<label class="block text-gray-200 text-sm w-3/4 font-bold mb-2 ml-3">Title</label>
					<input name="title" onChange={(e)=>setThread({...thread,[e.target.name]:e.target.value})} type="text" id="title" class="bg-gray-800 w-full rounded text-gray-200 focus:outline-none border-b-4 border-gray-900 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
				</div>
				<div class="mb-6 pt-3 rounded bg-gray-800">
					<label class="block text-gray-200 text-sm w-3/4 font-bold mb-2 ml-3">Query</label>
					<input name="query" onChange={(e)=>setThread({...thread,[e.target.name]:e.target.value})} type="text" id="query" class="bg-gray-800 w-full rounded text-gray-200 focus:outline-none border-b-4 border-gray-900 focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
				</div>
				<div class="mb-6 pt-3 rounded bg-gray-800">
					<label class="block text-gray-200 text-sm w-3/4 font-bold mb-2 ml-3">code</label>
					<textarea rows={13} name="code" onChange={(e)=>setThread({...thread,[e.target.name]:e.target.value})} type="text" id="code" class="bg-gray-800 w-full rounded text-gray-200 focus:outline-none border-b-4 border-gray-900 focus:border-purple-600 transition duration-300 px-3 pb-3 resize-none overflow-y-scroll"></textarea>
				</div>
				<button onClick={handleSubmit} class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Add</button>
			</form>
		</section>
	</div>;
}

export default CreateThreadComponent;
