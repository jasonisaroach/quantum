# Quantum Documentation `[0.2.1]`
Docs / . / Glossary

## Glossary
This defines basic terminology used within the Quantum development.

### Component
> "Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. `React.Component` is provided by [React](https://facebook.github.io/react)."

### Props
>`props` (short for properties) are a Component's configuration, its options if you may. 
>They are received from above and immutable as far as the Component receiving them is concerned.
>
>A Component cannot change its props, but it is responsible for putting together the props of its child Components.[[1]](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md "React Guide: props-vs-state")

### State
>The state starts with a default value when a Component mounts and then suffers from mutations in time (mostly generated from user events). 
>It's a serializable* representation of one point in time—a snapshot.
>
>A Component manages its own state internally, but—besides setting an initial state—has no business fiddling with the state of its children. 
>You could say the state is private.
>
>* We didn't say props are also serializable because it's pretty common to pass down callback functions through props.[[1]](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md "React Guide: props-vs-state")
