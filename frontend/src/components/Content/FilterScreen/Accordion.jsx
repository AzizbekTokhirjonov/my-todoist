import React, {useEffect, useState} from 'react'
import { BsChevronCompactDown,  BsChevronRight, BsFillDropletFill, BsFillTagFill, BsTrash} from "react-icons/bs";
import {BiPlus, BiEditAlt, BiHeart} from "react-icons/bi"
import TransitionsModal from '../TransitionModal';
import Select from './Select';
import { useDispatch, useSelector } from 'react-redux';
import { createLabel, deleteLabel, updateLabel } from '../../../redux/actions/labelActions';


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
   

    const [currentLabel, setCurrentLable] = useState({})
    const [labelTitle, setLabelTitle] = useState('')
    const [labelColor, setLabelColor] = useState(colors[0])
    const [labelAddToFavourites, setLabelAddToFavourites] = useState(false)
    const [letLabelSubmit, setLetLabelSubmit] = useState(false)
    const [labelAction, setLabelAction] = useState('create')

    const user = useSelector((state) => state.user.userDetails);

    const dispatch = useDispatch()
    const handleFilterSubmit = (e) => {
        e.preventDefault()
    }
    const handleLabelCreate = (e) => {
        if(labelTitle && labelColor){
            setOpenLabelsModal(false)
            dispatch(createLabel({title: labelTitle, color: labelColor, favorite: labelAddToFavourites, owner: user._id}))
        }

    }
    const handleLabelDelete = (labelId) =>{
        dispatch(deleteLabel(labelId))
    }

    const handleEdit = (label) => {
        setLabelTitle(label.title)
        setLabelColor(label.color)
        setLabelAddToFavourites(label.favorite)
        setCurrentLable(label)
        setLabelAction('update')
        setOpenLabelsModal(true)
    }
    const handleAddToFavorite = (label) => {
        dispatch(updateLabel({...label, favorite: !label.favorite}))
    }
    const handleLabelUpdate = () => {
        if(labelTitle && labelColor){
            setOpenLabelsModal(false)
            dispatch(updateLabel({...currentLabel, title: labelTitle, color: labelColor, favorite: labelAddToFavourites}))
        }
    }

    useEffect(() => {
        if(labelTitle && labelColor){
            setLetLabelSubmit(true)
        }
    }, [openFiltersModal, openLabelsModal, labelTitle, labelColor])

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
                            <BsTrash/>
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

            <TransitionsModal closeModal={setOpenLabelsModal} action={labelAction === 'create' ? handleLabelCreate : handleLabelUpdate } letAction={letLabelSubmit} openModal={openLabelsModal} title='Add label'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="labelTitle" className="form-label">Label name</label>
                        <input type="email" className="form-control" id="labelTitle" value={labelTitle} onChange={e => setLabelTitle(e.target.value)} required/>
                    </div>
                    <span>Label color</span>
                    <Select setValue={setLabelColor} defaultValue={labelColor} options={colors} required />
                    <div className="form-check form-switch" style={{paddingTop: '10px'}}>
                        <input className="form-check-input" type="checkbox" role="switch"   id="filterAddFavourite"  checked={labelAddToFavourites} onChange={()=> setLabelAddToFavourites(prev => !prev)}/>
                        <label className="form-check-label" htmlFor="filterAddFavourite">Add to favourites</label>
                    </div>
                </form>
            </TransitionsModal>


            {showLabels && labels.map((label) => (
                <div key={label._id}>
                    <div className='d-flex justify-content-between additional-text'>
                        <span><BsFillTagFill style={{color: label.color}}/>  {label.title}</span>
                        <span className='hoverable-icons'>
                            <BiHeart style={label.favorite && {color: 'red'} } onClick ={(e) => handleAddToFavorite( label)} />  
                            <BsTrash onClick={(e) => handleLabelDelete(label._id)}/>
                            <BiEditAlt onClick={(e) => handleEdit(label)}/>
                        </span>
                    </div>
                    <hr/>
                </div>
            ))}
            
        </div>
  )
}

export default Accordion