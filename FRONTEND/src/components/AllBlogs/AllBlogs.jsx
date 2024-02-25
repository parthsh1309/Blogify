import React, { useState } from "react";
import { Blogs, Filter } from "../index";

function AllBlogs() {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [filters, setFilters] = useState({});

  return (
    <div className="relative flex">
      <Filter
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        filters={filters}
        setFilters={setFilters} 
      />
      <Blogs
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

export default AllBlogs;
