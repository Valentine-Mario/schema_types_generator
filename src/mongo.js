const mongodbUri = require("mongodb-uri");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");

/**
 * Takes an object of the form:
 *
 *   {
 *      uri:String,
 *      path:String
 *    }
 *
 *
 *
 * @param {Object} options
 */

const generateMongoTypes = (options) => {
  var uriObject = mongodbUri.parse(options.uri);
  fs.writeFile(options.path, "\n", (err) => {
    if (!err) {
      console.log("writing types to file ...");
      MongoClient.connect(options.uri, function (err, db) {
        if (err) throw err;
        var dbo = db.db(uriObject.database);
        dbo.listCollections().toArray(function (err, collections) {
          collections.map((x) => {
            let schema_name = x.name.replace("-", "_");
            dbo
              .collection(x.name)
              .find()
              .limit(1)
              .toArray(function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                  delete result[0]["_id"];
                  result[0]["_id"] = "id";
                  writeSchema(result[0], schema_name, "", options.path);
                }
                db.close();
              });
          });
        });
      });
    }
  });
};

/**
 * Parses the object type into a property type.
 *
 * @param {!Object} obj
 * @param {!String} name
 * @param {!String} indent
 * @param {!String} path
 * @private
 */
const writeSchema = (obj, name, indent, path) => {
  fs.appendFileSync(path, `type ${name}Prop = { \n`);
  for (let key in obj) {
    if (typeof obj[key] !== "function" && typeof obj[key] !== "object") {
      fs.appendFileSync(path, `${indent}${key}: ${typeof obj[key]};\n`);
    }
    if (obj[key] === null) {
      fs.appendFileSync(path, `${indent}${key}: null;\n`);
    }
    if (typeof obj[key] === "object" && obj[key] !== null && obj[key].id) {
      fs.appendFileSync(
        path,
        `${indent}${key}: ${maybePluralize(0, key.split("_")[0])}Prop;\n`
      );
    }

    if (
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key]) &&
      obj[key] !== null &&
      typeof obj[key].getMonth !== "function" &&
      !obj[key].id
    ) {
      if (Object.keys(obj[key]).length === 0 && !Array.isArray(obj[key])) {
        fs.appendFileSync(path, `${indent}${key}: ${typeof obj[key]};\n`);
      } else {
        writeObject(obj[key], key, "", path);
      }
    }
    if (Array.isArray(obj[key])) {
      if (obj[key].length > 0) {
        fs.appendFileSync(
          path,
          `${indent}${key}: Array<${typeof obj[key][0]}>;\n`
        );
      } else {
        fs.appendFileSync(path, `${indent}${key}: Array<any>;\n`);
      }
    }
    if (obj[key] !== null && typeof obj[key].getMonth === "function") {
      fs.appendFileSync(path, `${indent}${key}: Date;\n`);
    }
  }
  fs.appendFileSync(path, "}\n\n");
};

/**
 * Parses the nested object type into a property type.
 *
 * @param {!Object} obj
 * @param {!String} name
 * @param {!string} indent
 * @param {!String} path
 * @private
 */
const writeObject = (obj, key, indent, path) => {
  fs.appendFileSync(path, `${indent}${key}: {\n`);
  for (let key in obj) {
    if (typeof obj[key] !== "function") {
      if (obj[key] === null) {
        fs.appendFileSync(path, `${indent}${key}: null;\n`);
      }
      if (typeof obj[key] !== "object") {
        fs.appendFileSync(path, `${indent}${key} : ${typeof obj[key]};\n`);
      }
      if (typeof obj[key] === "object" && obj[key] !== null && obj[key].id) {
        fs.appendFileSync(
          path,
          `${indent}${key}: ${maybePluralize(0, key.split("_")[0])}Prop;\n`
        );
      }
      if (
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null &&
        typeof obj[key].getMonth !== "function" &&
        !obj[key].id
      ) {
        if (Object.keys(obj[key]).length === 0) {
          fs.appendFileSync(path, `${indent}${key}: ${typeof obj[key]};\n`);
        } else {
          writeObject(obj[key], key, indent + "\t", path);
        }
      }
      if (Array.isArray(obj[key])) {
        if (obj[key].length > 0) {
          fs.appendFileSync(
            path,
            `${indent}${key}: Array<${typeof obj[key][0]}>;\n`
          );
        } else {
          fs.appendFileSync(path, `${indent}${key}: Array<any>;\n`);
        }
      }
      if (obj[key] !== null && typeof obj[key].getMonth === "function") {
        fs.appendFileSync(path, `${indent}${key}: Date;\n`);
      }
    }
  }
  fs.appendFileSync(path, "\t}\n");
};

const maybePluralize = (count, noun, suffix = "s") =>
  `${noun}${count !== 1 ? suffix : ""}`;

generateMongoTypes({
  uri: "mongodb+srv://place:place-locate@roadshow-jhhwo.mongodb.net/test",
  path: "types.ts",
});
