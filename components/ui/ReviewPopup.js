import React from "react";
import classes from "./Popup.module.css";

function ReviewPopup(props) {
  return props.trigger ? (
    <div className={classes.popup}>
      <div className={classes.popupinner} style={{ opacity: "1" }}>
        <a onClick={() => props.setTrigger(false)} className={classes.closebtn}>
          <i class="fas fa-times"></i>
        </a>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
export default ReviewPopup;
