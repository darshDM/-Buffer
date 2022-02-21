import React from 'react'
import Editor from '@monaco-editor/react'

export default function MyEditor() {
  return (
    <div className='flex flex-col'>
    {/* <div>run</div> */}
    <Editor height="70vh" defaultLanguage = "python" theme="vs-dark" />
    <div className="text-white">output tab</div>
    </div>
  )
}
