export const aboutController = {
  index: {
    handler: async function (request, h) {
      const viewData = {
        title: "About",
      };
      return h.view("about-view", viewData);
    }
  }
}