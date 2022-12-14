const app = require("./app.js");
const http = require("http");
const config = require("./utils/config");
const { info, error } = require("./utils/logger");

const PORT = config.PORT;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
