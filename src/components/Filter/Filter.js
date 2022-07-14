import React from 'react';
import propTypes from 'prop-types';

const Filter = ({ state, onChange }) => {
  return (
    <div>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={state.filter}
          onInput={onChange}
        />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: propTypes.string,
  onChange: propTypes.func,
};
