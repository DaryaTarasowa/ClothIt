import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clothSchema = new Schema({
  name: { type: 'String', required: true },
  description: {type: 'String', required: false},
  bodypart: { type: 'String', required: true },
  brand: { type: 'String', required: true },
  size: {type: 'String', required: true},
  color: {type: 'String', required: true},
  fabric: {type: 'String', required: true},
  tags: [{ type: 'String', required: false }],
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  picture: {type:'String', required: true}
}, { collection: 'clothes' });

export default mongoose.model('Cloth', clothSchema);
