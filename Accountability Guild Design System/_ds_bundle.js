/* @ds-bundle: {"format":4,"namespace":"AccountabilityGuildDesignSystem_da1450","components":[{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Checkbox","sourcePath":"components/choice/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/choice/Radio.jsx"},{"name":"SegmentedControl","sourcePath":"components/choice/SegmentedControl.jsx"},{"name":"Toggle","sourcePath":"components/choice/Toggle.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/data/Avatar.jsx"},{"name":"EmptyState","sourcePath":"components/data/EmptyState.jsx"},{"name":"ListRow","sourcePath":"components/data/ListRow.jsx"},{"name":"List","sourcePath":"components/data/ListRow.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"Skeleton","sourcePath":"components/data/Skeleton.jsx"},{"name":"SkeletonRow","sourcePath":"components/data/Skeleton.jsx"},{"name":"Stepper","sourcePath":"components/data/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/data/Tabs.jsx"},{"name":"DateInput","sourcePath":"components/date/DateInput.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Chip","sourcePath":"components/feedback/Chip.jsx"},{"name":"ChipAdd","sourcePath":"components/feedback/Chip.jsx"},{"name":"FormSummary","sourcePath":"components/feedback/FormSummary.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"ToastStack","sourcePath":"components/feedback/Toast.jsx"},{"name":"PasswordField","sourcePath":"components/forms/PasswordField.jsx"},{"name":"SelectField","sourcePath":"components/forms/SelectField.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"TextareaField","sourcePath":"components/forms/TextareaField.jsx"},{"name":"MoneyInput","sourcePath":"components/money/MoneyInput.jsx"},{"name":"DropdownMenu","sourcePath":"components/overlays/DropdownMenu.jsx"},{"name":"Modal","sourcePath":"components/overlays/Modal.jsx"},{"name":"Tooltip","sourcePath":"components/overlays/Tooltip.jsx"},{"name":"Popover","sourcePath":"components/overlays/Tooltip.jsx"},{"name":"Homepage","sourcePath":"ui_kits/marketing/Homepage.jsx"}],"sourceHashes":{"components/brand/Wordmark.jsx":"dfaa5f84e9a1","components/buttons/Button.jsx":"5249d26a0515","components/choice/Checkbox.jsx":"f216c428c51a","components/choice/Radio.jsx":"afd94c40d32e","components/choice/SegmentedControl.jsx":"30edbe1f5b86","components/choice/Toggle.jsx":"69230f3e8d76","components/data/Avatar.jsx":"7f909f493951","components/data/EmptyState.jsx":"3bf90b97b7ff","components/data/ListRow.jsx":"fe38a08fbe1f","components/data/Pagination.jsx":"403b75162993","components/data/Skeleton.jsx":"5b979bbe4d3c","components/data/Stepper.jsx":"d30ade3a0a48","components/data/Tabs.jsx":"88ab84a37464","components/date/DateInput.jsx":"a7d7396a6946","components/feedback/Alert.jsx":"0386ee02e23b","components/feedback/Badge.jsx":"705bd1059d69","components/feedback/Chip.jsx":"3c3981d63927","components/feedback/FormSummary.jsx":"06c210eac13b","components/feedback/Toast.jsx":"dbe81c8bbfa3","components/forms/PasswordField.jsx":"f359ed8fbc8b","components/forms/SelectField.jsx":"8bc72fda7041","components/forms/TextField.jsx":"4d5c30f0846f","components/forms/TextareaField.jsx":"a5bcc74d1470","components/money/MoneyInput.jsx":"2aedacd8fff6","components/overlays/DropdownMenu.jsx":"c680857a8663","components/overlays/Modal.jsx":"b59aa728e8d0","components/overlays/Tooltip.jsx":"d86c9464a406","ui_kits/marketing/Homepage.jsx":"73ac5a036711"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AccountabilityGuildDesignSystem_da1450 = window.AccountabilityGuildDesignSystem_da1450 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Wordmark.jsx
try { (() => {
function content(variant, kicker) {
  if (variant === "flag") {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "ag-wordmark-rule",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: "ag-wordmark-flag-copy"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ag-wordmark-mono"
    }, kicker ?? "Cycle Report"), /*#__PURE__*/React.createElement("span", {
      className: "ag-wordmark-serif"
    }, "Accountability Guild")));
  }
  if (variant === "stacked") {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "ag-wordmark-serif"
    }, "Accountability"), /*#__PURE__*/React.createElement("span", {
      className: "ag-wordmark-rule",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      className: "ag-wordmark-mono"
    }, "Guild", kicker ? ` · ${kicker}` : ""));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ag-wordmark-serif"
  }, "Accountability"), /*#__PURE__*/React.createElement("span", {
    className: "ag-wordmark-mono"
  }, "Guild"));
}
function Wordmark({
  variant = "inline",
  kicker,
  scale = 1,
  className,
  "aria-label": ariaLabel = "Accountability Guild"
}) {
  const classes = ["ag-wordmark", `ag-wordmark-${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", {
    className: classes,
    style: {
      fontSize: `${scale}rem`
    },
    "aria-label": ariaLabel
  }, content(variant, kicker));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  loading = false,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const classes = ["btn", variant === "primary" && "btn-primary", variant === "secondary" && "btn-secondary", variant === "ghost" && "btn-ghost", variant === "destructive" && "btn-destructive", size === "sm" && "btn-sm", size === "lg" && "btn-lg", size === "block" && "btn-block", loading && "is-loading", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: classes,
    disabled: disabled || loading
  }, rest), loading ? /*#__PURE__*/React.createElement("span", {
    className: "spinner",
    "aria-hidden": "true"
  }) : null, children, arrow && !loading ? /*#__PURE__*/React.createElement("span", {
    className: "arrow",
    "aria-hidden": "true"
  }, "\u2192") : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/choice/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  help,
  error,
  disabled,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["check", disabled && "is-disabled", error && "is-error", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", null, label, help ? /*#__PURE__*/React.createElement("em", null, help) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/choice/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/choice/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  help,
  name,
  disabled,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["radio", disabled && "is-disabled", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", null, label, help ? /*#__PURE__*/React.createElement("em", null, help) : null));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/choice/Radio.jsx", error: String((e && e.message) || e) }); }

// components/choice/SegmentedControl.jsx
try { (() => {
const {
  useState
} = React;
function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  className
}) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? internal;
  function pick(v) {
    setInternal(v);
    onChange && onChange(v);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: ["seg", className].filter(Boolean).join(" ")
  }, options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.value,
    type: "button",
    className: ["seg-btn", current === opt.value && "is-on"].filter(Boolean).join(" "),
    onClick: () => pick(opt.value)
  }, opt.label)));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/choice/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/choice/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toggle({
  label,
  help,
  checked,
  onChange,
  disabled,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["toggle", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, /*#__PURE__*/React.createElement("strong", null, label), help ? /*#__PURE__*/React.createElement("em", null, help) : null), /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "t-track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-knob"
  })));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/choice/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
const AVATAR_TONES = ["", "av-ink", "av-accent", "av-dust", "av-shadow", "av-sage"];
function toneForId(id) {
  if (!id) return AVATAR_TONES[0];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % AVATAR_TONES.length;
  return AVATAR_TONES[hash];
}
function Avatar({
  initial,
  userId,
  size = "md",
  className
}) {
  const tone = toneForId(userId);
  return /*#__PURE__*/React.createElement("span", {
    className: ["av", `av-${size}`, tone, className].filter(Boolean).join(" ")
  }, initial);
}
function AvatarStack({
  children,
  more,
  className
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["av-stack", className].filter(Boolean).join(" ")
  }, children, more ? /*#__PURE__*/React.createElement("span", {
    className: "av av-md av-more"
  }, "+", more) : null);
}
Object.assign(__ds_scope, { Avatar, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/EmptyState.jsx
try { (() => {
function EmptyState({
  glyph = "—",
  kicker,
  title,
  children,
  actions,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["empty", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "glyph"
  }, glyph), kicker ? /*#__PURE__*/React.createElement("div", {
    className: "kicker"
  }, kicker) : null, /*#__PURE__*/React.createElement("h3", null, title), children ? /*#__PURE__*/React.createElement("p", null, children) : null, actions ? /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, actions) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/data/ListRow.jsx
try { (() => {
function ListRow({
  num,
  title,
  meta,
  end,
  onClick,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["list-row", className].filter(Boolean).join(" "),
    onClick: onClick
  }, num !== undefined ? /*#__PURE__*/React.createElement("span", {
    className: "lr-num"
  }, num) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    className: "lr-main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lr-title"
  }, title), meta ? /*#__PURE__*/React.createElement("span", {
    className: "lr-meta"
  }, meta) : null), end ? /*#__PURE__*/React.createElement("span", {
    className: "lr-end"
  }, end) : /*#__PURE__*/React.createElement("span", null));
}
function List({
  children,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["list", className].filter(Boolean).join(" ")
  }, children);
}
Object.assign(__ds_scope, { ListRow, List });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/data/Pagination.jsx
try { (() => {
function Pagination({
  page,
  pageCount,
  onChange,
  summary,
  className
}) {
  const pages = Array.from({
    length: pageCount
  }, (_, i) => i + 1);
  return /*#__PURE__*/React.createElement("div", {
    className: ["pag", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pag-arrow",
    disabled: page <= 1,
    onClick: () => onChange(page - 1)
  }, "\u2190"), pages.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    type: "button",
    className: p === page ? "is-on" : "",
    onClick: () => onChange(p)
  }, p)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pag-arrow",
    disabled: page >= pageCount,
    onClick: () => onChange(page + 1)
  }, "\u2192"), summary ? /*#__PURE__*/React.createElement("span", {
    className: "pag-summary",
    style: {
      marginLeft: 12
    }
  }, summary) : null);
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data/Skeleton.jsx
try { (() => {
function Skeleton({
  variant = "line",
  className
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["skel", `skel-${variant}`, className].filter(Boolean).join(" ")
  });
}
function SkeletonRow({
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["skel-row", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "circle"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "line"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    variant: "short"
  })));
}
Object.assign(__ds_scope, { Skeleton, SkeletonRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/data/Stepper.jsx
try { (() => {
const {
  useState
} = React;
function Stepper({
  value,
  defaultValue = 0,
  min = 0,
  max = 99,
  onChange,
  className
}) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  function set(next) {
    const clamped = Math.max(min, Math.min(max, next));
    setInternal(clamped);
    onChange && onChange(clamped);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: ["stepper", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set(current - 1),
    disabled: current <= min
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    value: current,
    readOnly: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set(current + 1),
    disabled: current >= max
  }, "+"));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/data/Tabs.jsx
try { (() => {
const {
  useState
} = React;
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  className
}) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const current = value ?? internal;
  function pick(v) {
    setInternal(v);
    onChange && onChange(v);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: ["tabs", className].filter(Boolean).join(" ")
  }, items.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.value,
    type: "button",
    className: ["tab", current === item.value && "is-on"].filter(Boolean).join(" "),
    onClick: () => pick(item.value)
  }, item.label, item.count !== undefined ? /*#__PURE__*/React.createElement("span", {
    className: "ct"
  }, item.count) : null)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/date/DateInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DateInput({
  value,
  onChange,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["date-wrap", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "date",
    value: value,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cal",
    "aria-hidden": "true"
  }, "\uD83D\uDCC5"));
}
Object.assign(__ds_scope, { DateInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/date/DateInput.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function Alert({
  tone = "info",
  kicker,
  children,
  action,
  actionHref,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["alert", `alert-${tone}`, className].filter(Boolean).join(" ")
  }, kicker ? /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, kicker) : null, /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, children), action ? /*#__PURE__*/React.createElement("a", {
    className: "alert-action",
    href: actionHref || "#"
  }, action) : null);
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function Badge({
  tone,
  ink,
  outline,
  dot,
  children,
  className
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["badge", tone && `badge-${tone}`, ink && "badge-ink", outline && "badge-outline", className].filter(Boolean).join(" ")
  }, dot ? /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Chip.jsx
try { (() => {
function Chip({
  children,
  onRemove,
  className
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["chip", className].filter(Boolean).join(" ")
  }, children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove"
  }, "\xD7") : null);
}
function ChipAdd({
  children = "Add",
  onClick,
  className
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: ["chip", "chip-add", className].filter(Boolean).join(" "),
    onClick: onClick
  }, "+ ", children);
}
Object.assign(__ds_scope, { Chip, ChipAdd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Chip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/FormSummary.jsx
try { (() => {
function FormSummary({
  kicker = "Fix the following",
  children,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["form-summary", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, kicker), /*#__PURE__*/React.createElement("p", null, children));
}
Object.assign(__ds_scope, { FormSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/FormSummary.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const {
  useState
} = React;
function Toast({
  tone = "info",
  kicker,
  children,
  action,
  onAction,
  onClose,
  className
}) {
  const [leaving, setLeaving] = useState(false);
  function close() {
    setLeaving(true);
    setTimeout(() => onClose && onClose(), 180);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: ["toast", `toast-${tone}`, leaving && "is-leaving", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t-content"
  }, kicker ? /*#__PURE__*/React.createElement("span", {
    className: "t-kicker"
  }, kicker) : null, /*#__PURE__*/React.createElement("p", {
    className: "t-body"
  }, children), action ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "t-action",
    onClick: onAction
  }, action) : null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "t-close",
    onClick: close,
    "aria-label": "Dismiss"
  }, "\xD7"));
}
function ToastStack({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "toast-stack"
  }, children);
}
Object.assign(__ds_scope, { Toast, ToastStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/PasswordField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function scoreStrength(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}
function PasswordField({
  label = "Password",
  help,
  minLength = 8,
  value,
  onChange,
  className,
  id,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const [internal, setInternal] = useState("");
  const current = value ?? internal;
  const score = scoreStrength(current);
  const met = current.length >= minLength;
  const fieldId = id || "password";
  function handleChange(e) {
    setInternal(e.target.value);
    onChange && onChange(e);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: ["field", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "field-input-wrap"
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: show ? "text" : "password",
    value: value !== undefined ? value : internal,
    onChange: handleChange
  }, rest)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "show-btn",
    onClick: () => setShow(s => !s)
  }, show ? "Hide" : "Show")), /*#__PURE__*/React.createElement("div", {
    className: "pw-meter",
    "aria-hidden": "true"
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: ["seg", i < score && "is-on"].filter(Boolean).join(" ")
  }))), /*#__PURE__*/React.createElement("div", {
    className: ["pw-meter-label", met && "is-met"].filter(Boolean).join(" ")
  }, help ? /*#__PURE__*/React.createElement("div", {
    className: "field-help"
  }, help) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, current.length, " / ", minLength, " min")));
}
Object.assign(__ds_scope, { PasswordField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/PasswordField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SelectField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SelectField({
  label,
  optional,
  help,
  options = [],
  className,
  id,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: ["field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId
  }, label, optional ? /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "Optional") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId
  }, rest), options.map(opt => /*#__PURE__*/React.createElement("option", {
    key: opt.value,
    value: opt.value
  }, opt.label))), /*#__PURE__*/React.createElement("span", {
    className: "select-chev",
    "aria-hidden": "true"
  }, "\u25BE")), help ? /*#__PURE__*/React.createElement("div", {
    className: "field-help"
  }, help) : null);
}
Object.assign(__ds_scope, { SelectField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SelectField.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  optional,
  help,
  error,
  success,
  type = "text",
  className,
  id,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: ["field", error && "is-error", success && "is-success", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId
  }, label, optional ? /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "Optional") : null) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type
  }, rest)), error ? /*#__PURE__*/React.createElement("div", {
    className: "field-error"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    "aria-hidden": "true"
  }), error) : success ? /*#__PURE__*/React.createElement("div", {
    className: "field-success"
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), success) : help ? /*#__PURE__*/React.createElement("div", {
    className: "field-help"
  }, help) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextareaField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextareaField({
  label,
  optional,
  help,
  error,
  counter,
  maxLength,
  className,
  id,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: ["field", error && "is-error", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId
  }, label, optional ? /*#__PURE__*/React.createElement("span", {
    className: "opt"
  }, "Optional") : null) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    maxLength: maxLength
  }, rest)), /*#__PURE__*/React.createElement("div", {
    className: "field-meta"
  }, error ? /*#__PURE__*/React.createElement("div", {
    className: "field-error"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    "aria-hidden": "true"
  }), error) : help ? /*#__PURE__*/React.createElement("div", {
    className: "field-help"
  }, help) : /*#__PURE__*/React.createElement("span", null), counter ? /*#__PURE__*/React.createElement("span", {
    className: "counter"
  }, counter) : null));
}
Object.assign(__ds_scope, { TextareaField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextareaField.jsx", error: String((e && e.message) || e) }); }

// components/money/MoneyInput.jsx
try { (() => {
const {
  useState
} = React;
function MoneyInput({
  value,
  defaultValue = "",
  currency = "$",
  presets = [],
  onChange,
  className
}) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  function set(v) {
    setInternal(v);
    onChange && onChange(v);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: "money-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ccy"
  }, currency), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: current,
    onChange: e => set(e.target.value),
    inputMode: "decimal"
  })), presets.length ? /*#__PURE__*/React.createElement("div", {
    className: "money-chips"
  }, presets.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    type: "button",
    className: ["money-chip", current === String(p) && "is-on"].filter(Boolean).join(" "),
    onClick: () => set(String(p))
  }, currency, p))) : null);
}
Object.assign(__ds_scope, { MoneyInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/MoneyInput.jsx", error: String((e && e.message) || e) }); }

// components/overlays/DropdownMenu.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
function DropdownMenu({
  trigger,
  items = [],
  align = "left",
  className
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: ["dd-wrap", align === "right" && "right", className].filter(Boolean).join(" "),
    ref: ref
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o)
  }, trigger), /*#__PURE__*/React.createElement("div", {
    className: "dd",
    hidden: !open
  }, items.map((item, i) => item.separator ? /*#__PURE__*/React.createElement("div", {
    className: "dd-sep",
    key: i
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: ["dd-item", item.destructive && "is-destructive"].filter(Boolean).join(" "),
    onClick: () => {
      item.onClick && item.onClick();
      setOpen(false);
    }
  }, item.label, item.kbd ? /*#__PURE__*/React.createElement("span", {
    className: "kbd"
  }, item.kbd) : null))));
}
Object.assign(__ds_scope, { DropdownMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/DropdownMenu.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Modal.jsx
try { (() => {
function Modal({
  open,
  kicker,
  title,
  children,
  actions,
  destructive,
  onClose,
  className
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: ["modal-overlay", "is-open"].join(" "),
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: ["modal", destructive && "is-destructive", className].filter(Boolean).join(" "),
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, kicker ? /*#__PURE__*/React.createElement("div", {
    className: "kicker"
  }, kicker) : null, /*#__PURE__*/React.createElement("h3", null, title)), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, children), actions ? /*#__PURE__*/React.createElement("div", {
    className: "modal-foot"
  }, actions) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Modal.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children,
  className
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["tip-wrap", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tip-trigger",
    tabIndex: 0
  }, children), /*#__PURE__*/React.createElement("span", {
    className: "tip"
  }, label));
}
function Popover({
  heading,
  children,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["popover", className].filter(Boolean).join(" ")
  }, heading ? /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, heading) : null, /*#__PURE__*/React.createElement("p", {
    className: "b"
  }, children));
}
Object.assign(__ds_scope, { Tooltip, Popover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Homepage.jsx
try { (() => {
const {
  useState
} = React;
const cycleStats = [["3d 14h", "time remaining"], ["11 / 14", "reports submitted"], ["$320", "in the group kitty"], ["82%", "follow-through rate"]];
const commitments = [{
  who: "Brandon W.",
  goal: "Lift three times",
  status: "3 of 3",
  state: "done"
}, {
  who: "Lee L.",
  goal: "Write daily, 500 words",
  status: "5 of 7",
  state: "mid"
}, {
  who: "Mara K.",
  goal: "45 sales calls",
  status: "38 of 45",
  state: "mid"
}, {
  who: "Eitan R.",
  goal: "No alcohol",
  status: "forfeit · $20",
  state: "forfeit"
}];
const acts = [{
  number: "01",
  title: "Set the standard",
  sub: "Once, at the start",
  body: "An owner names the group's cycle, the cadence, the consequence. Members put a card on file and write their own commitments, measurable and in their own voice.",
  sample: "Cadence · Weekly. Forfeit · $20 per missed report. Hall-pass · 1 per cycle."
}, {
  number: "02",
  title: "Run the cycle",
  sub: "Every day, briefly",
  body: "Members log against their goals as they go. A note. A photograph. A tally. The group sees activity, not pressure: small signals that the work is happening.",
  sample: "Brandon · 45 of 45 calls · attached: spreadsheet.png · 14 minutes ago"
}, {
  number: "03",
  title: "Close with receipts",
  sub: "At cycle close",
  body: "Each member writes a short report against their own commitments. Misses are tallied. Forfeits are charged automatically and pooled into the group kitty.",
  sample: "$60 forfeited · 11 of 14 met fully · cycle closed 9:00 PM CT."
}, {
  number: "04",
  title: "Pool the forfeits",
  sub: "Disburse when ready",
  body: "Each cycle's forfeits roll into a running group kitty. Most groups let it accrue and settle a few times a year, according to the policy agreed to at the start.",
  sample: "Cycle 18 · +$60 to kitty · running balance $440 · next disbursement: Q2."
}];
const mechanics = [["Structured proof entries", "Each goal carries its own cadence. Daily, weekly, or by the end of the cycle. The app collects without nagging."], ["Forfeits stay in the group", "Members put a card on file. Misses charge automatically at close, and the money goes into a group kitty, not to us."], ["Recovery prompts", "If someone's slipping mid-cycle, the group sees it gently: not a shame screen, a small signal that wakes a thread."], ["Receipts, not promises", "A cycle closes with a written report and proof of work. The next cycle starts from receipts, not retold intentions."], ["Hall-pass, optional", "Real life happens. Toggle one or two skip-sick days per cycle. The group decides whether it's forgiving or strict."], ["Group visibility", "A shared feed of activity replaces the back-channel how-is-everyone-doing thread that no one wants to write."]];
const kittyOptions = [["01", "Redistribute", "Some competitive groups choose to pay out their top performers when the kitty disburses. Owners set the rule; the group agrees to it on the way in.", "Top 2 finishers · paid at Q2 close"], ["02", "Reinvest", "Reimburse a member for the yearly retreat, the offsite dinner, the shared subscription. The kitty pays for the room.", "Annual retreat · Mara · $480"], ["03", "Donate", "Pick a charity together at the start. Misses fund it automatically. Failure becomes someone else's good week.", "Modest Needs · Q2 · $1,180"]];
function Homepage({
  ds
}) {
  const {
    Wordmark,
    Button
  } = ds;
  const [showSignup, setShowSignup] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "hp-shell"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hp-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-masthead"
  }, /*#__PURE__*/React.createElement("span", null, "Vol. 01 \xB7 Cycle Infrastructure"), /*#__PURE__*/React.createElement("span", null, "Established 2026 \xB7 Members only"), /*#__PURE__*/React.createElement("span", null, "accountabilityguild.com")), /*#__PURE__*/React.createElement("div", {
    className: "hp-nav-main"
  }, /*#__PURE__*/React.createElement(Wordmark, {
    scale: 0.95
  }), /*#__PURE__*/React.createElement("nav", {
    className: "hp-nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#how"
  }, "How it works"), /*#__PURE__*/React.createElement("a", {
    href: "#modes"
  }, "For groups"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "Pricing"), /*#__PURE__*/React.createElement("a", {
    href: "#field"
  }, "Resources")), /*#__PURE__*/React.createElement("div", {
    className: "hp-nav-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#login"
  }, "Log in"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setShowSignup(true)
  }, "Start a Cycle")))), /*#__PURE__*/React.createElement("section", {
    className: "hp-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-copy"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "Cycle Infrastructure, Vol. 01"), /*#__PURE__*/React.createElement("h1", null, "Follow-through, ", /*#__PURE__*/React.createElement("em", null, "made visible"), "."), /*#__PURE__*/React.createElement("p", null, "A deliberate piece of software for accountability groups that meet on a cycle. Set the standard, run the cycle, close it with receipts."), /*#__PURE__*/React.createElement("div", {
    className: "hp-hero-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    arrow: true,
    onClick: () => setShowSignup(true)
  }, "Start a Cycle"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "How it works")), /*#__PURE__*/React.createElement("dl", {
    className: "hp-hero-stats"
  }, cycleStats.map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("dt", null, l), /*#__PURE__*/React.createElement("dd", null, v))))), /*#__PURE__*/React.createElement("div", {
    className: "hp-live-cycle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-live-cycle-top"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "hp-live-dot"
  }), "Live cycle"), /*#__PURE__*/React.createElement("span", null, "Legacy Group")), /*#__PURE__*/React.createElement("dl", {
    className: "hp-stat-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Days left"), /*#__PURE__*/React.createElement("dd", null, "3d 14h")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Reports in"), /*#__PURE__*/React.createElement("dd", null, "11/14")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Kitty"), /*#__PURE__*/React.createElement("dd", null, "$320")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Follow-through"), /*#__PURE__*/React.createElement("dd", null, "82%"))), /*#__PURE__*/React.createElement("div", {
    className: "hp-commitments"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "This week's commitments"), commitments.map(c => /*#__PURE__*/React.createElement("div", {
    className: "hp-commitment-row",
    key: c.who
  }, /*#__PURE__*/React.createElement("span", null, c.who.slice(0, 1)), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, c.who), /*#__PURE__*/React.createElement("em", null, c.goal)), /*#__PURE__*/React.createElement("b", {
    "data-state": c.state
  }, c.status)))), /*#__PURE__*/React.createElement("p", {
    className: "hp-live-caption"
  }, "Updated automatically as members log against their goals."))), /*#__PURE__*/React.createElement("section", {
    className: "hp-section",
    id: "how"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "How it works"), /*#__PURE__*/React.createElement("h2", null, "Four acts, one ", /*#__PURE__*/React.createElement("em", null, "cycle"), ".")), /*#__PURE__*/React.createElement("p", {
    className: "hp-section-note"
  }, "No streaks. No pressure screens. Just the standard, the proof, and the receipts.")), /*#__PURE__*/React.createElement("div", {
    className: "hp-acts"
  }, acts.map(a => /*#__PURE__*/React.createElement("article", {
    key: a.number
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, a.number), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, a.title), /*#__PURE__*/React.createElement("p", null, a.sub))), /*#__PURE__*/React.createElement("p", null, a.body), /*#__PURE__*/React.createElement("small", null, a.sample))))), /*#__PURE__*/React.createElement("section", {
    className: "hp-pullquote"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "Why it holds"), /*#__PURE__*/React.createElement("blockquote", null, "Structure beats motivation. The smallest cycle that ", /*#__PURE__*/React.createElement("em", null, "holds"), " beats the biggest goal that doesn't.")), /*#__PURE__*/React.createElement("section", {
    className: "hp-mechanics"
  }, mechanics.map(([t, b]) => /*#__PURE__*/React.createElement("article", {
    key: t
  }, /*#__PURE__*/React.createElement("p", null, "MECHANIC"), /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("span", null, b)))), /*#__PURE__*/React.createElement("section", {
    className: "hp-modes",
    id: "modes"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "For groups"), /*#__PURE__*/React.createElement("h2", null, "Two modes, one ", /*#__PURE__*/React.createElement("em", null, "infrastructure"), "."), /*#__PURE__*/React.createElement("div", {
    className: "hp-mode-grid"
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "Solo cycle"), /*#__PURE__*/React.createElement("h3", null, "Run it yourself, still with receipts."), /*#__PURE__*/React.createElement("p", null, "A single member on their own cycle \u2014 same standard, same proof, same close-out report. No group required to start."), /*#__PURE__*/React.createElement("blockquote", null, "\"I needed the structure more than I needed an audience.\"")), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "Group cycle"), /*#__PURE__*/React.createElement("h3", null, "Everyone on the same clock."), /*#__PURE__*/React.createElement("p", null, "Shared cadence, shared kitty, shared close. The group sees each other's activity feed without a back-channel thread."), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Shared kitty"), /*#__PURE__*/React.createElement("li", null, "Group feed"), /*#__PURE__*/React.createElement("li", null, "Owner-set policy"), /*#__PURE__*/React.createElement("li", null, "Member reports"))))), /*#__PURE__*/React.createElement("section", {
    className: "hp-kitty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hp-kitty-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "hp-eyebrow"
  }, "The group kitty"), /*#__PURE__*/React.createElement("h2", null, "Where forfeits go")), /*#__PURE__*/React.createElement("p", null, "Every miss charges the card on file. The money never comes to us \u2014 it pools into the group's own account, disbursed on the group's own terms.")), /*#__PURE__*/React.createElement("div", {
    className: "hp-kitty-options"
  }, kittyOptions.map(([n, t, b, s]) => /*#__PURE__*/React.createElement("article", {
    key: n
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, n), /*#__PURE__*/React.createElement("em", null, t)), /*#__PURE__*/React.createElement("span", null, b), /*#__PURE__*/React.createElement("small", null, s)))), /*#__PURE__*/React.createElement("div", {
    className: "hp-kitty-footer"
  }, /*#__PURE__*/React.createElement("span", null, "Cycle 18 \xB7 running balance $440"), /*#__PURE__*/React.createElement("span", null, "Next disbursement \xB7 Q2"))), /*#__PURE__*/React.createElement("footer", {
    className: "hp-footer",
    style: {
      padding: "48px clamp(22px,5.2vw,88px)",
      borderTop: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    variant: "stacked",
    kicker: "Vol. 01"
  })), showSignup && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay is-open",
    onClick: () => setShowSignup(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kicker"
  }, "Get started"), /*#__PURE__*/React.createElement("h3", null, "Start your first ", /*#__PURE__*/React.createElement("em", null, "cycle"), ".")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, "Create an account, name your standard, and invite your group \u2014 or run it solo."), /*#__PURE__*/React.createElement("div", {
    className: "modal-foot"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setShowSignup(false)
  }, "Not now"), /*#__PURE__*/React.createElement(Button, null, "Continue")))));
}
window.Homepage = Homepage;
Object.assign(__ds_scope, { Homepage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Homepage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.List = __ds_scope.List;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.SkeletonRow = __ds_scope.SkeletonRow;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.DateInput = __ds_scope.DateInput;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ChipAdd = __ds_scope.ChipAdd;

__ds_ns.FormSummary = __ds_scope.FormSummary;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.ToastStack = __ds_scope.ToastStack;

__ds_ns.PasswordField = __ds_scope.PasswordField;

__ds_ns.SelectField = __ds_scope.SelectField;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.TextareaField = __ds_scope.TextareaField;

__ds_ns.MoneyInput = __ds_scope.MoneyInput;

__ds_ns.DropdownMenu = __ds_scope.DropdownMenu;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.Homepage = __ds_scope.Homepage;

})();
