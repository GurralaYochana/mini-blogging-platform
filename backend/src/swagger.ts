import swaggerUi from "swagger-ui-express";
import { Router } from "express";
import fs from "fs";
import yaml from "yaml";

const spec = yaml.parse(
  fs.readFileSync(require.resolve("../docs/openapi.yaml"), "utf8")
);

export function mountSwagger(router: Router) {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
}
