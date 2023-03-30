export default (editor) => {
  const categories = editor.BlockManager.getCategories();
  categories.each((category) => {
    category.set("open", false).on("change:open", (opened) => {
      opened.get("open") &&
        categories.each((category) => {
          category !== opened && category.set("open", false);
        });
    });
  });
};
