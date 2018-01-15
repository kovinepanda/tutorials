import React, { Component } from "react";
import PropTypes from "prop-types";

class NewCharacterPage extends Component {
  state = {
    step: 1
  };
  render() {
    return (
      <div>
        <nav className="nav nav-pills nav-justified">
          <button
            className={`nav-item nav-link ${
              this.state.step === 1 ? "active" : ""
            }`}
          >
            <h4>Step 1</h4>
            <p>Race</p>
          </button>
          <button disabled className="nav-item nav-link">
            <h4>Step 2</h4>
            <p>Class</p>
          </button>
          <button disabled className="nav-item nav-link">
            <h4>Step 3</h4>
            <p>Background</p>
          </button>
          <button disabled className="nav-item nav-link">
            <h4>Step 4</h4>
            <p>Faction</p>
          </button>
          <button disabled className="nav-item nav-link">
            <h4>Step 5</h4>
            <p>Name</p>
          </button>
        </nav>
      </div>
    );
  }
}

NewCharacterPage.propTypes = {};

export default NewCharacterPage;
