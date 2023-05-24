import React, { createContext, useState } from 'react';

const FilterContext = createContext();

// Create a context provider component
export function FilterProvider({ children }) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Define any additional state or functions related to the selected filter

  return (
    <FilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

// Create a custom hook to access the selected filter context
export function useFilter() {
  return React.useContext(FilterContext);
}
