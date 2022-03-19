import React from "react";
import Accordion from "./Accordion";
import "./filters.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllLabels } from "../../../redux/actions/labelActions";
import Loader from "../../Loader"
const filters = [
  { title: "Assigned to me", color: "blue" },
  { title: "High priority", color: "red" },
];


const Filters = () => {

  const {loading, error, labels} = useSelector(state => state.labelProps)
  const {createLabel, deleteLabel, updateLabel} = useSelector(state => state.labelOps)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllLabels())
  }, [dispatch])

  return (
    <div id="filters" className="mx-auto">
      <div className="title">
        <h4>Filters & Labels</h4>
      </div>

      <div>
        {loading || createLabel.loading || deleteLabel.loading || updateLabel.loading ? <Loader/> :  <Accordion filters={filters} labels={labels} />} 
      </div>
      {error && error}
    </div>
  );
};

export default Filters;
