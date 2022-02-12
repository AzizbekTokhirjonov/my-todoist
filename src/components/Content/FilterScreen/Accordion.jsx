import React, {useEffect, useState} from 'react'
import { BsChevronCompactDown,  BsChevronRight, BsFillDropletFill, BsFillTagFill} from "react-icons/bs";
import {BiPlus, BiEditAlt, BiHeart} from "react-icons/bi"
import TransitionsModal from '../TransitionModal';
import Select from './Select';


const colors = ['blue', 'green', 'red', 'pink', 'yellow']

const Accordion = ({filters, labels}) => {

    const [showFilters, setShowFilters] = useState(true)
    const [showLabels, setShowLabels] = useState(true)
    const [openFiltersModal, setOpenFiltersModal] = React.useState(false)
    const [openLabelsModal, setOpenLabelsModal] = React.useState(false)
   
    const [filterTitle, setFilterTitle] = useState('')
    const [filterQuery, setFilterQuery] = useState('')
    const [filterColor, setFilterColor] = useState(colors[0])
    const [filterAddToFavourites, setFilterAddToFavourites] = useState(false)
   

    const [labelTitle, setLabelTitle] = useState('')
    const [labelColor, setLabelColor] = useState(colors[0])
    const [labelAddToFavourites, setLabelAddToFavourites] = useState(false)
    // console.log('filterTitle-', filterTitle, 'filterQuery-', filterQuery, 'filterColor', filterColor, 'filterAddToFavourites-', filterAddToFavourites)
    const handleFilterSubmit = (e) => {
        e.preventDefault()
    }
    const handleLabelSubmit = (e) => {
        e.preventDefault()
    }


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

            <TransitionsModal closeModal={setOpenFiltersModal} openModal={openFiltersModal} title='Add filter'>
                <form onSubmit={handleFilterSubmit}>
                    <div className="mb-3">
                        <label htmlFor="filterTitle" className="form-label">Filter name</label>
                        <input type="email" className="form-control" id="filterTitle" value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="filterQuery" className="form-label">Filter query</label>
                        <textarea className="form-control" id="filterQuery" rows="3" value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)}/>
                    </div>
                    <span>Filter color</span>
                    <Select setValue={setFilterColor} defaultValue={filterColor} options={colors}/>
                    <div className="form-check form-switch" style={{paddingTop: '10px'}}>
                        <input className="form-check-input" type="checkbox" role="switch"   id="filterAddFavourite"  checked={filterAddToFavourites} onChange={()=> setFilterAddToFavourites(prev => !prev)}/>
                        <label className="form-check-label" htmlFor="filterAddFavourite">Add to favourites</label>
                    </div>
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

            <TransitionsModal closeModal={setOpenLabelsModal} openModal={openLabelsModal} title='Add label'>
                <form onSubmit={handleLabelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="labelTitle" className="form-label">Label name</label>
                        <input type="email" className="form-control" id="labelTitle" value={labelTitle} onChange={e => setLabelTitle(e.target.value)} />
                    </div>
                    <span>Label color</span>
                    <Select setValue={setLabelColor} defaultValue={labelColor} options={colors} />
                    <div className="form-check form-switch" style={{paddingTop: '10px'}}>
                        <input className="form-check-input" type="checkbox" role="switch"   id="filterAddFavourite"  checked={labelAddToFavourites} onChange={()=> setLabelAddToFavourites(prev => !prev)}/>
                        <label className="form-check-label" htmlFor="filterAddFavourite">Add to favourites</label>
                    </div>
                </form>
            </TransitionsModal>


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