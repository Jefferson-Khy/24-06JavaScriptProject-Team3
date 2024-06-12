import React, { useEffect } from "react";
import { loadMoov } from "@moovio/moov-js";
import header from "../assets/header.png";

export default function Signup() {
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://ed80-70-118-49-243.ngrok-free.app/api/generate-token",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        const data = await response.json();
        const initialToken = data.token;
        const moovInstance = await loadMoov(initialToken);

        const onboarding = document.querySelector("moov-onboarding");

        // console.log('Moov object:', moovInstance);

        // console.log('Onboarding element:', onboarding);

        if ("token" in onboarding) {
          console.log("Current token:", onboarding.token);
          onboarding.token = initialToken;
          console.log("Updated token:", onboarding.token);

          onboarding.open = true;
        } else {
          console.error(
            "The 'moov-onboarding' element does not have a 'token' property."
          );
        }

        console.log("Moov.js initialized successfully:", moovInstance);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <div
      className="bg-cover min-h-screen"
      style={{ backgroundImage: `url(${header})` }}
    >
      <moov-onboarding></moov-onboarding>
    </div>
  );
}
