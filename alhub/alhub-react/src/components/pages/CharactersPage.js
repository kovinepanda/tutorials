import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { charactersSelector } from "../../reducers/characters";

const CharacrersPage = ({ characters }) => (
  <div className="text-center">
    {characters.length === 0 && (
      <div className="alert alert-info ">
        You have no characters yet. How about creating one?
      </div>
    )}
    <Link to="/characters/new" className="btn btn-primary btn-lg">
      Create New Character
    </Link>
  </div>
);

CharacrersPage.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    characters: charactersSelector(state)
  };
}

export default connect(mapStateToProps)(CharacrersPage);
