# Schema type Generator

This tool helps automatically generate types from your Mongo Database to be used in your TypeScript project

Example usage:

```
const generateTypes=require("schema_types_generator")

generateTypes.generateMongoTypes({uri:"mongo_uri", path:"path_to_ts_file"})
```

### Note
* It currently only works with Mongo DB
* For fields that ref another collection, use appropriate naming convention eg to ref user collection via the user id, use the name `user_id`. This would make the lib link the types properly.
* Be sure to seed DB with at least one data before using. As fields that are null would be given a null type