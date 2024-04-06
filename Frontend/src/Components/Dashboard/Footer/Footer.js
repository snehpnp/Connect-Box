import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="settings-icon">
        <span
          data-bs-toggle="offcanvas"
          data-bs-target="#theme-settings-offcanvas"
          aria-controls="theme-settings-offcanvas"
        >
          <img
            src="assets/img/icons/siderbar-icon2.svg"
            className="feather-five"
            alt="layout"
          />
        </span>
      </div>
      <div
        className="offcanvas offcanvas-end border-0 "
        tabIndex={-1}
        id="theme-settings-offcanvas"
      >
        <div className="sidebar-headerset">
          <div className="sidebar-headersets">
            <h2>Customizer</h2>
            <h3>Customize your overview Page layout</h3>
          </div>
          <div className="sidebar-headerclose">
            <a data-bs-dismiss="offcanvas" aria-label="Close">
              <img src="assets/img/close.png" alt="img" />
            </a>
          </div>
        </div>
        <div className="offcanvas-body p-0">
          <div data-simplebar="" className="h-100">
            <div className="settings-mains">
              <div className="layout-head">
                <h5>Layout</h5>
                <h6>Choose your layout</h6>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="form-check card-radio p-0">
                    <input
                      id="customizer-layout01"
                      name="data-layout"
                      type="radio"
                      defaultValue="vertical"
                      className="form-check-input"
                    />
                    <label
                      className="form-check-label avatar-md w-100"
                      htmlFor="customizer-layout01"
                    >
                      <img src="assets/img/vertical.png" alt="img" />
                    </label>
                  </div>
                  <h5 className="fs-13 text-center mt-2">Vertical</h5>
                </div>
                <div className="col-4">
                  <div className="form-check card-radio p-0">
                    <input
                      id="customizer-layout02"
                      name="data-layout"
                      type="radio"
                      defaultValue="horizontal"
                      className="form-check-input"
                    />
                    <label
                      className="form-check-label  avatar-md w-100"
                      htmlFor="customizer-layout02"
                    >
                      <img src="assets/img/horizontal.png" alt="img" />
                    </label>
                  </div>
                  <h5 className="fs-13 text-center mt-2">Horizontal</h5>
                </div>
                <div className="col-4 d-none">
                  <div className="form-check card-radio p-0">
                    <input
                      id="customizer-layout03"
                      name="data-layout"
                      type="radio"
                      defaultValue="twocolumn"
                      className="form-check-input"
                    />
                    <label
                      className="form-check-label  avatar-md w-100"
                      htmlFor="customizer-layout03"
                    >
                      <img src="assets/img/two-col.png" alt="img" />
                    </label>
                  </div>
                  <h5 className="fs-13 text-center mt-2">Two Column</h5>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-3">
                <div className="layout-head mb-0">
                  <h5>RTL Mode</h5>
                  <h6>Change Language Direction.</h6>
                </div>
                <div className="active-switch">
                  <div className="status-toggle">
                    <input id="rtl" className="check" type="checkbox" />
                    <label htmlFor="rtl" className="checktoggle checkbox-bg">
                      checkbox
                    </label>
                  </div>
                </div>
              </div>
              <div className="layout-head pt-3">
                <h5>Color Scheme</h5>
                <h6>Choose Light or Dark Scheme.</h6>
              </div>
              <div className="colorscheme-cardradio">
                <div className="row">
                  <div className="col-4">
                    <div className="form-check card-radio blue  p-0 ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-mode"
                        id="layout-mode-blue"
                        defaultValue="blue"
                      />
                      <label
                        className="form-check-label  avatar-md w-100"
                        htmlFor="layout-mode-blue"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2 mb-2">Blue</h5>
                  </div>
                  <div className="col-4">
                    <div className="form-check card-radio p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-mode"
                        id="layout-mode-light"
                        defaultValue="light"
                      />
                      <label
                        className="form-check-label  avatar-md w-100"
                        htmlFor="layout-mode-light"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2 mb-2">Light</h5>
                  </div>
                  <div className="col-4">
                    <div className="form-check card-radio dark  p-0 ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-mode"
                        id="layout-mode-dark"
                        defaultValue="dark"
                      />
                      <label
                        className="form-check-label avatar-md w-100 "
                        htmlFor="layout-mode-dark"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2 mb-2">Dark</h5>
                  </div>
                  <div className="col-4 d-none">
                    <div className="form-check card-radio p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-mode"
                        id="layout-mode-orange"
                        defaultValue="orange"
                      />
                      <label
                        className="form-check-label  avatar-md w-100 "
                        htmlFor="layout-mode-orange"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2 mb-2">Orange</h5>
                  </div>
                  <div className="col-4 d-none">
                    <div className="form-check card-radio maroon p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-mode"
                        id="layout-mode-maroon"
                        defaultValue="maroon"
                      />
                      <label
                        className="form-check-label  avatar-md w-100 "
                        htmlFor="layout-mode-maroon"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2 mb-2">Brink Pink</h5>
                  </div>
                  <div className="col-4 d-none">
                    <div className="form-check card-radio purple p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-mode"
                        id="layout-mode-purple"
                        defaultValue="purple"
                      />
                      <label
                        className="form-check-label  avatar-md w-100 "
                        htmlFor="layout-mode-purple"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2 mb-2">Green</h5>
                  </div>
                </div>
              </div>
              <div id="layout-width">
                <div className="layout-head pt-3">
                  <h5>Layout Width</h5>
                  <h6>Choose Fluid or Boxed layout.</h6>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-check card-radio p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-width"
                        id="layout-width-fluid"
                        defaultValue="fluid"
                      />
                      <label
                        className="form-check-label avatar-md w-100"
                        htmlFor="layout-width-fluid"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Fluid</h5>
                  </div>
                  <div className="col-4">
                    <div className="form-check card-radio p-0 ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-width"
                        id="layout-width-boxed"
                        defaultValue="boxed"
                      />
                      <label
                        className="form-check-label avatar-md w-100 px-2"
                        htmlFor="layout-width-boxed"
                      >
                        <img src="assets/img/boxed.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Boxed</h5>
                  </div>
                </div>
              </div>
              <div id="layout-position" className="d-none">
                <div className="layout-head pt-3">
                  <h5>Layout Position</h5>
                  <h6>Choose Fixed or Scrollable Layout Position.</h6>
                </div>
                <div
                  className="btn-group bor-rad-50 overflow-hidden radio"
                  role="group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="data-layout-position"
                    id="layout-position-fixed"
                    defaultValue="fixed"
                  />
                  <label
                    className="btn btn-light w-sm"
                    htmlFor="layout-position-fixed"
                  >
                    Fixed
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="data-layout-position"
                    id="layout-position-scrollable"
                    defaultValue="scrollable"
                  />
                  <label
                    className="btn btn-light w-sm ms-0"
                    htmlFor="layout-position-scrollable"
                  >
                    Scrollable
                  </label>
                </div>
              </div>
              <div className="layout-head pt-3">
                <h5>Topbar Color</h5>
                <h6>Choose Light or Dark Topbar Color.</h6>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="form-check card-radio  p-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="data-topbar"
                      id="topbar-color-light"
                      defaultValue="light"
                    />
                    <label
                      className="form-check-label avatar-md w-100"
                      htmlFor="topbar-color-light"
                    >
                      <img src="assets/img/vertical.png" alt="img" />
                    </label>
                  </div>
                  <h5 className="fs-13 text-center mt-2">Light</h5>
                </div>
                <div className="col-4">
                  <div className="form-check card-radio p-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="data-topbar"
                      id="topbar-color-dark"
                      defaultValue="dark"
                    />
                    <label
                      className="form-check-label  avatar-md w-100"
                      htmlFor="topbar-color-dark"
                    >
                      <img src="assets/img/dark.png" alt="img" />
                    </label>
                  </div>
                  <h5 className="fs-13 text-center mt-2">Dark</h5>
                </div>
              </div>
              <div id="sidebar-size">
                <div className="layout-head pt-3">
                  <h5>Sidebar Size</h5>
                  <h6>Choose a size of Sidebar.</h6>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-check sidebar-setting card-radio  p-0 ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-sidebar-size"
                        id="sidebar-size-default"
                        defaultValue="lg"
                      />
                      <label
                        className="form-check-label avatar-md w-100"
                        htmlFor="sidebar-size-default"
                      >
                        <img src="assets/img/vertical.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Default</h5>
                  </div>
                  <div className="col-4 d-none">
                    <div className="form-check sidebar-setting card-radio p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-sidebar-size"
                        id="sidebar-size-compact"
                        defaultValue="md"
                      />
                      <label
                        className="form-check-label  avatar-md w-100"
                        htmlFor="sidebar-size-compact"
                      >
                        <img src="assets/img/compact.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Compact</h5>
                  </div>
                  <div className="col-4 ">
                    <div className="form-check sidebar-setting card-radio p-0 ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-sidebar-size"
                        id="sidebar-size-small-hover"
                        defaultValue="sm-hover"
                      />
                      <label
                        className="form-check-label avatar-md w-100"
                        htmlFor="sidebar-size-small-hover"
                      >
                        <img src="assets/img/small-hover.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Small Sidebar</h5>
                  </div>
                </div>
              </div>
              <div id="sidebar-view">
                <div className="layout-head pt-3">
                  <h5>Sidebar View</h5>
                  <h6>Choose Default or Detached Sidebar view.</h6>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-check sidebar-setting card-radio  p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-style"
                        id="sidebar-view-default"
                        defaultValue="default"
                      />
                      <label
                        className="form-check-label avatar-md w-100"
                        htmlFor="sidebar-view-default"
                      >
                        <img src="assets/img/compact.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Default</h5>
                  </div>
                  <div className="col-4">
                    <div className="form-check sidebar-setting card-radio p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-layout-style"
                        id="sidebar-view-detached"
                        defaultValue="detached"
                      />
                      <label
                        className="form-check-label  avatar-md w-100"
                        htmlFor="sidebar-view-detached"
                      >
                        <img src="assets/img/detached.png" alt="img" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Detached</h5>
                  </div>
                </div>
              </div>
              <div id="sidebar-color">
                <div className="layout-head pt-3">
                  <h5>Sidebar Color</h5>
                  <h6>Choose a color of Sidebar.</h6>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div
                      className="form-check sidebar-setting card-radio p-0"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseBgGradient.show"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-sidebar"
                        id="sidebar-color-light"
                        defaultValue="light"
                      />
                      <label
                        className="form-check-label  avatar-md w-100"
                        htmlFor="sidebar-color-light"
                      >
                        <span className="bg-light bg-sidebarcolor" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Light</h5>
                  </div>
                  <div className="col-4">
                    <div
                      className="form-check sidebar-setting card-radio p-0"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseBgGradient.show"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-sidebar"
                        id="sidebar-color-dark"
                        defaultValue="dark"
                      />
                      <label
                        className="form-check-label  avatar-md w-100"
                        htmlFor="sidebar-color-dark"
                      >
                        <span className="bg-darks bg-sidebarcolor" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Dark</h5>
                  </div>
                  <div className="col-4 d-none">
                    <div className="form-check sidebar-setting card-radio p-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="data-sidebar"
                        id="sidebar-color-gradient"
                        defaultValue="gradient"
                      />
                      <label
                        className="form-check-label avatar-md w-100"
                        htmlFor="sidebar-color-gradient"
                      >
                        <span className="bg-gradients bg-sidebarcolor" />
                      </label>
                    </div>
                    <h5 className="fs-13 text-center mt-2">Gradient</h5>
                  </div>
                  <div className="col-4 d-none">
                    <button
                      className="btn btn-link avatar-md w-100 p-0 overflow-hidden border collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseBgGradient"
                      aria-expanded="false"
                    >
                      <span className="d-flex gap-1 h-100">
                        <span className="flex-shrink-0">
                          <span className="bg-vertical-gradient d-flex h-100 flex-column gap-1 p-1">
                            <span className="d-block p-1 px-2 bg-soft-light rounded mb-2" />
                            <span className="d-block p-1 px-2 pb-0 bg-soft-light" />
                            <span className="d-block p-1 px-2 pb-0 bg-soft-light" />
                            <span className="d-block p-1 px-2 pb-0 bg-soft-light" />
                          </span>
                        </span>
                        <span className="flex-grow-1">
                          <span className="d-flex h-100 flex-column">
                            <span className="bg-light d-block p-1" />
                            <span className="bg-light d-block p-1 mt-auto" />
                          </span>
                        </span>
                      </span>
                    </button>
                    <h5 className="fs-13 text-center mt-2">Gradient</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="offcanvas-footer border-top p-3 text-center">
          <div className="row">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-light w-100 bor-rad-50"
                id="reset-layout"
              >
                Reset
              </button>
            </div>
            <div className="col-6">
              <a
                href="https://themeforest.net/item/smarthr-bootstrap-admin-panel-template/21153150"
                target="_blank"
                className="btn btn-primary w-100 bor-rad-50"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Footer