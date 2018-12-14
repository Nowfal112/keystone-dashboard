const keystone = require("keystone");
const Types = keystone.Field.Types

const User = new keystone.List("User", {
  hidden: true,
  nocreate: true,
  nodelete: true
});

User.add({
  displayName: { type: String },
  password: { type: keystone.Field.Types.Password },
  email: { type: keystone.Field.Types.Email, unique: true }
});

User.schema.virtual("canAccessKeystone").get(function() {
  return true;
});

User.defaultColumns = 'id, displayName, email';

User.register();
