import React, { memo } from "react";

function NotFoud() {
  return (
    <h3 className="no-results-message">
      Opps 🤯, There are no cities that match the filters you've applied.
    </h3>
  );
}

export default memo(NotFoud);
