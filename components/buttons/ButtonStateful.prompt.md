**SLDS Button Stateful** — a toggle button that flips between two states; selected shows a hover affordance to reverse (Follow / Following / Unfollow).

```jsx
<ButtonStateful defaultSelected={false} onChange={setFollowing} />
<ButtonStateful labelWhenOff="Subscribe" labelWhenOn="Subscribed" labelWhenHover="Unsubscribe" />
```

Props: `selected`/`defaultSelected`, `onChange`, `labelWhenOff`·`labelWhenOn`·`labelWhenHover`, `iconNameWhenOff`·`iconNameWhenOn`.
