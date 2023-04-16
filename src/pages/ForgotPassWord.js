import React from "react";
import firebase from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPassPage = () => {
  const Navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState();
  const [showEmail, setShowEmail] = useState(true);
  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const otpChangeHandler = (e) => {
    setEnteredOtp(e.target.value);
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          // console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = async (e) => {
    e.preventDefault();
    configureCaptcha();
    //fetch phone number from database
    let res = await axios.get("http://localhost:4000/getCurrUserData", {
      params: { currUserEmail: enteredEmail },
    });
    let phoneNumber = "+91" + res.data.phNo;
    
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log("OTP has been sent");
        // ...
        if (phoneNumber.length > 8) {
          setShowEmail(false);
        }
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        // console.log("SMS not sent");
        window.alert("no user found with this email");
        window.location.reload(false);
      });
  };
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = enteredOtp;
    // console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        // alert("User is verified");
        localStorage.setItem("email", enteredEmail);
        Navigate(`/setNewPassWordPage`);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  return (
    <>
      {showEmail && (
        <div>
          <form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={emailChangeHandler}
              value={enteredEmail}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {!showEmail && (
        <div>
          <form onSubmit={onSubmitOTP}>
            <input
              type="number"
              name="otp"
              placeholder="OTP Number"
              required
              onChange={otpChangeHandler}
              value={enteredOtp || ""}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassPage;
