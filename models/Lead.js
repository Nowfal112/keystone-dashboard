const keystone = require('keystone');
const Types = keystone.Field.Types;

const Lead = new keystone.List('Lead', {
  map: { name: 'fullName' },
  nocreate: true,
  perPage: 10
});
Lead.add({
    fullName: { type: String, required: true, initial: true},
    description: { type: Types.Html, wysiwyg: false, },
    budget: {type: Types.Money, format: '$0,0.00', default: '50'},
    email: {type: Types.Email, required: true, initial: true },
    phone: {type: Number, initial: true },
    projectName: {type: String},
    status: {type: Types.Select, options: 'pending, completed, on-going', default: 'pending'}
  });

  Lead.schema.virtual('canAccessKeystone').get(function () {
    return true;
  });

  Lead.schema.pre('save', function (next) {
    let event = this;
    if (event.isModified('published') && event.published) {
      this.publishDate = Date.now();
    }
    return next();
  });
  
  Lead.defaultColumns = 'fullName email, type, budget, description, status';
  Lead.register();