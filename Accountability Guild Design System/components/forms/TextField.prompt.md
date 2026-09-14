Single-line text input with mono uppercase label, italic-serif help text, and error/success states.

```jsx
<TextField label="Email" type="email" placeholder="you@group.com" />
<TextField label="Nickname" optional help="Shown to your group instead of your full name." />
<TextField label="Commitment" error="Write it as something you can measure." />
```

Error state turns the border/label to `--error` with a dot-marker message; success shows an italic-serif confirmation with a sans check mark.
