import React from 'react'
import { Spinner } from 'react-bootstrap'
const SpinnerCustom = () => {
  return (
    <React.Fragment>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
    </React.Fragment>
  )
}

export default SpinnerCustom