import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { faMoon as farMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(farMoon, faLongArrowAltLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);
