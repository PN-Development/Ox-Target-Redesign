import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eyeSvg");
const eye2 = document.getElementById("eyeSvg2");

eye.style.display = "none";
eye2.style.display = "none";

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";

      if (event.data.state) {
        eye.style.display = "block";
        eye2.style.display = "none";
      } else {
        eye.style.display = "none";
        eye2.style.display = "block";
      }

      return eye2.classList.remove("eye-hover");
    }

    case "leftTarget": {
      if (event.data.state) {
        eye.style.display = "none";
        eye2.style.display = "block";
      } else {
        eye.style.display = "block";
        eye2.style.display = "none";
      }
      return eye2.classList.remove("eye-hover");
    }

    case "setTarget": {
      eye2.classList.add("eye-hover");

      if (event.data.state) {
        eye.style.display = "block";
        eye2.style.display = "none";
      } else {
        eye.style.display = "none";
        eye2.style.display = "block";
      }

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }
    }
  }
});
