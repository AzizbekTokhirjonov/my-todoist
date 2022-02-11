import React, {useEffect, useState} from 'react'
import { BsChevronCompactDown,  BsChevronRight, BsFillDropletFill, BsFillTagFill} from "react-icons/bs";
import {BiPlus, BiEditAlt, BiHeart} from "react-icons/bi"
import TransitionsModal from '../TransitionModal';


const Accordion = ({filters, labels}) => {

    const [showFilters, setShowFilters] = useState(true)
    const [showLabels, setShowLabels] = useState(true)
    const [openFiltersModal, setOpenFiltersModal] = React.useState(false)
    const [openLabelsModal, setOpenLabelsModal] = React.useState(false)

    useEffect(() => {}, [openFiltersModal, openLabelsModal])
    return (
        <div className='accordion-wrapper'>

            <div className='d-flex justify-content-between'>
                <h6 onClick={() => setShowFilters(showFilters => !showFilters)}>
                    {showFilters ? <BsChevronCompactDown/> : <BsChevronRight/>}
                    Filters
                </h6>
                <BiPlus onClick={() => setOpenFiltersModal(true)}/>
            </div>
            <hr/>

            <TransitionsModal closeModal={setOpenFiltersModal} openModal={openFiltersModal}>
                <form>

                
                <div className="mb-3">
                    <label for="filterTitle" className="form-label">Filter name</label>
                    <input type="email" className="form-control" id="filterTitle"/>
                </div>
                <div className="mb-3">
                    <label for="filterQuery" className="form-label">Filter query</label>
                    <textarea className="form-control" id="filterQuery" rows="3"></textarea>
                </div>
                <select className="form-select" aria-label="Default select example">
                    <option >Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    
                </select>
                </form>
            </TransitionsModal>

            {showFilters && filters.map((filter) => (
                <div key={filter.title}>
                    <div className='d-flex justify-content-between additional-text'>
                        <span><BsFillDropletFill style={{color: filter.color}}/>  {filter.title}</span>
                        <span className='hoverable-icons'>
                            <BiHeart/>
                            <BiEditAlt/>
                        </span>
                    </div>
                    <hr/>
                </div>
            ))}
            
            <div className='d-flex justify-content-between'>
                <h6 onClick={() => setShowLabels(showLabels => !showLabels)}>
                    {showLabels ? <BsChevronCompactDown/> : <BsChevronRight/>}
                    Labels
                </h6>
                <BiPlus onClick={() => setOpenLabelsModal(true)}/>
            </div>

            <TransitionsModal closeModal={setOpenLabelsModal} openModal={openLabelsModal}>Iam a Label modal</TransitionsModal>
            {showLabels && labels.map((label) => (
                <div key={label.title}>
                    <div className='d-flex justify-content-between additional-text'>
                        <span><BsFillTagFill style={{color: label.color}}/>  {label.title}</span>
                        <span className='hoverable-icons'>
                            <BiHeart/>
                            <BiEditAlt/>
                        </span>
                    </div>
                    <hr/>
                </div>
            ))}
            
        </div>
  )
}

export default Accordion