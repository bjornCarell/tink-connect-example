import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { useCallback } from "../../hooks/useCallback";

const getHeaderProps = error =>
  error
    ? {
        text: "Something went wrong",
        emoji: "sad"
      }
    : {
        text: "Your bank was successfully connected!",
        emoji: "tada"
      };

export const Callback = ({ location }) => {
  const { loading, error, data } = useCallback(location);
  const message = new URLSearchParams(location).get("message");
  const headerProps = getHeaderProps(error);

  return (
    <div>
      <header {...headerProps} />
    </div>
  );
};

Callback.propTypes = {
  location: ReactRouterPropTypes.location.isRequired
};

export default Callback;
