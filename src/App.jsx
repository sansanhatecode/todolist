import { useState } from 'react';

function App() {
  // input
  const [job, setJob] = useState('')
  // button
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs")) ?? [];
    return storageJobs;
  })

  const handleAdd = () => {
    if(job.trim() !==""){
      setJobs(prev => {
        const newJobs = [...prev, job]
        //save to local storage
        const jsonJobs = JSON.stringify(newJobs)
        localStorage.setItem('jobs', jsonJobs)
        return newJobs
      })
      setJob('')
    }
    
  }

  const handleDelete = (index) => {
    const newJobs2 = jobs.filter((job, id) => id !== index)
    // lưu localStorage khi delete
    const jsonJobs2 = JSON.stringify(newJobs2);
    localStorage.setItem("jobs", jsonJobs2);
    setJobs(newJobs2);
  }

  return (
    <div className='bg-red-100' style = {{padding: 40}}>
      <input 
        value={job} 
        onChange={e => setJob(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {jobs.map((job, index) =>
          <li key={index}>
            {job}
            <button style={{marginLeft: 10, marginTop: 10}}
              onClick={()=>handleDelete(index)}>delete
            </button>
          </li>
        )}
      </ul>
    </div>
  )
    
}

export default App;
