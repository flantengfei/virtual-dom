const view = _ => {
  return h(
    "div",
    { className: "container" },
    "123 ",
    h(
      "span",
      null,
      "My Text"
    )
  );
};
