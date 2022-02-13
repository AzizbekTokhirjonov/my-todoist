import React from 'react'
import Accordion from "./Accordion"
import "./filters.css"

const filters = [ {title: 'Assigned to me', color: 'blue'} , {title: 'High priority', color: 'red'}]
const Labels = [{title: 'blue', color: 'blue'}, {title: 'green', color: "green"}]

const Filters = () => {

  return (
    <div id='filters' className='mx-auto'>
        <div className="title">
          <h4>Filters & Labels</h4>
        </div>
        
      <div className=''>
          <Accordion filters={filters} labels={Labels}/>
      </div>
    </div>
  )
}

export default Filters