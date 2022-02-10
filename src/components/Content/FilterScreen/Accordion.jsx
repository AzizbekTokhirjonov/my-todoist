import React, {useState} from 'react'
import { BsChevronCompactDown,  BsChevronRight, BsFillDropletFill, BsFillTagFill} from "react-icons/bs";
import {BiPlus, BiEditAlt, BiHeart} from "react-icons/bi"


const Accordion = ({filters, labels}) => {

    const [showFilters, setShowFilters] = useState(true)
    const [showLabels, setShowLabels] = useState(true)

    return (
        <div className='accordion-wrapper'>
            <div className='d-flex justify-content-between'>
                <h6 onClick={() => setShowFilters(showFilters => !showFilters)}>
                    {showFilters ? <BsChevronCompactDown/> : <BsChevronRight/>}
                    Filters
                </h6>
                <BiPlus/>
            </div>
            <hr/>

            {showFilters && filters.map((filter) => (
                <>
                <div className='d-flex justify-content-between additional-text'>
                    <span><BsFillDropletFill style={{color: filter.color}}/>  {filter.title}</span>
                    <span>
                        <BiHeart/>
                        <BiEditAlt/>
                    </span>
                </div>
                <hr/>
                </>
            ))}
            
            <div className='d-flex justify-content-between'>
                <h6 onClick={() => setShowLabels(showLabels => !showLabels)}>
                    {showLabels ? <BsChevronCompactDown/> : <BsChevronRight/>}
                    Labels
                </h6>
                <BiPlus/>
            </div>

            {showLabels && labels.map((label) => (
                <>
                <div className='d-flex justify-content-between additional-text'>
                    <span><BsFillTagFill style={{color: label.color}}/>  {label.title}</span>
                    <span>
                        <BiHeart/>
                        <BiEditAlt/>
                    </span>
                </div>
                <hr/>
                </>
            ))}
            
        </div>
  )
}

export default Accordion