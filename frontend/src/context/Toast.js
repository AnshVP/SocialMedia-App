import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { ToastContext } from "./MyContext";

const Toast = (props) => {
  const success = (msg) =>
    Toastify({
      text: msg,
      className: "info",
      style: {
        color:"black",
        border:"1px solid green",
        boxShadow:"0 0 5px #0b2b06",
        background: "#e1f1df",
        fontSize: "21px",
        width: "30vw",
        textAlign: "center",
        postion: "absolute",
        left: "35%",
        borderRadius: "3px",
      },
    }).showToast();
  const error = (msg) =>
    Toastify({
      text: msg,
      className: "info",
      style: {
        background: "#fc1111",
        fontSize: "21px",
        width: "30vw",
        textAlign: "center",
        postion: "absolute",
        left: "35%",
        borderRadius: "3px",
      },
    }).showToast();

  return (
    <ToastContext.Provider value={{success,error}}>
        {props.children}
    </ToastContext.Provider>
  );
};

export default Toast;
