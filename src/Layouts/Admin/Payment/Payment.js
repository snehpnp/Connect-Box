import React from 'react'

function Payment() {
  return (

    <div className="content container-fluid ">
      <div class="page-header">
        <div class="content-page-header">
          <h5>System Information</h5>
        </div>
      </div>
      <div className="card flex-fill bg-white">

        <div class="card-header d-flex justify-content-between align-items-center border-bottom">
          <h5 class="card-title mb-0 w-auto">  <i class="fa-regular fa-image pe-2"></i> Background Images</h5>
          <div className="pay-btn text-end w-auto">
            <button className="btn btn-primary ">
            <i className="fa fa-plus"></i>Add
            </button>
          </div>
        </div>

        <div className="card-body card-buttons">


          <p className="card-text">

            Some quick example text to build on the card title and make up the bulk of

            the card's content.

          </p>

        </div>

        <div className="card-footer text-muted">This is my footer</div>

      </div>
    </div>

  )
}

export default Payment