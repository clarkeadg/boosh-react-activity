import { Schema, valuesOf, arrayOf } from 'normalizr'

const ActivitySchema = new Schema('activity', { idAttribute: 'id' });

const UserSchema = new Schema('users', { idAttribute: 'id' });

ActivitySchema.define({
  //user: UserSchema
});

export default ActivitySchema;
