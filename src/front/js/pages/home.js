import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined)
      actions.getMessage();
  }, [store.token]);
  return (
	<div className="text-center mt-5">
	<h1>Hello Rigo!</h1>
	<p>
		<img src={rigoImageUrl} />
	</p>
	<div className="alert alert-info" />
	<h1>PROTECTED DATA</h1>
</div>
  );
};
