import Cloth from './models/cloth';

export default function (callback) {
  Cloth.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const cloth1 = new Cloth({ name: 't-shirt',
    bodypart: 'top',
    brand: 'HM',
    size: '36',
    color: 'white',
    fabric: 'cotton',
    picture: '123',
    slug: 't-shirt',
    cuid: 'cikqgkv4q01ck7453ualdn3hd' });
    const cloth2 = new Cloth({ name: 'jeans',
    bodypart: 'bottom',
    brand: 'HM',
    size: '36',
    color: 'blue',
    fabric: 'denim',
    picture: '456',
    slug: 'jeans',
    cuid: 'cikqgkv4q01ck7453ualdn3yu' });

    Cloth.create([cloth1, cloth2], (error) => {
        if (!error) {
          callback(null);
      }else{
          callback(error);
      }
    });
  });
}
