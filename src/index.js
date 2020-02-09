import { createStore } from "redux";

//bring DOM reference
const lightDiv = document.getElementsByClassName("light")[0];
const switchButton = document.getElementById("switch-btn");

const counterHeadings = document.getElementsByTagName("h1")[0];
const plusButton = document.getElementById("plus-btn");
const minusButton = document.getElementById("minus-btn");

//action
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

//action function
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increment = diff => ({ type: INCREMENT, diff });
const decrement = () => ({ type: DECREMENT });

//initial value
const initialState = {
  light: true,
  counter: 0
};

//reduce function
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        light: !state.light
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.diff
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

//make store
const store = createStore(reducer);

const render = () => {
  const state = store.getState();
  const { light, counter } = state;

  if (light) {
    lightDiv.style.background = "green";
    switchButton.innerHTML = "turn off";
  } else {
    lightDiv.style.background = "gray";
    switchButton.innerHTML = "turn on";
  }
  counterHeadings.innerHTML = counter;
};

// const listner = () => console.log("updated!");
// const unsubscribe = store.subscribe(listner);

render();

store.subscribe(render);

switchButton.onclick = () => {
  store.dispatch(toggleSwitch());
};

plusButton.onclick = () => {
  store.dispatch(increment(5));
};

minusButton.onclick = () => {
  store.dispatch(decrement());
};

