"use strict";delete process.env.VSCODE_CWD;const bootstrap=require("./bootstrap"),bootstrapNode=require("./bootstrap-node"),product=require("../product.json");bootstrap.avoidMonkeyPatchFromAppInsights(),bootstrapNode.configurePortable(product),bootstrap.enableASARSupport(),process.env.VSCODE_CLI="1",require("./bootstrap-amd").load("vs/code/node/cli");

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/30d9c6cd9483b2cc586687151bcbcd635f373630/core/cli.js.map
