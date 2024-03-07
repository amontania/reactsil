import app from "./app.js";
const main = () => {
  app.listen(app.get("port"),(req, res) => {
  console.log(`Server runing on port ${app.get("port")}`);
});
}
main();
