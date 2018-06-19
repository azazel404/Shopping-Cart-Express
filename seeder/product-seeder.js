var product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');


var products = [
  new product({
    imagePath : 'https://3.bp.blogspot.com/-bC_V5-RrkZk/WwNO3Fa_oXI/AAAAAAAACPo/rbl6XCsZD0MDNLRAPH3Od27veldEvRp_gCLcBGAs/s1600/Spiderman-Homecoming-2-Mysterio-Jake-Gyllenhaal.jpg',
    title : 'james bond',
    description : 'buy this and u get jamesbond',
    price : 50
  }),
  new product({
    imagePath : 'https://2.bp.blogspot.com/-0H8vfIt9frA/Wqr-X13wHYI/AAAAAAAAB48/qnKoJUxSGwMYFIau39PoZw-v1C35k8LbwCLcBGAs/s1600/James-Bond-25-director-Danny-Boyle.jpg',
    title : 'i dont know this image just buy it',
    description : 'lorem ipsum galaga how do anyting',
    price : 25
  }),
  new product({
    imagePath : 'https://2.bp.blogspot.com/-iaWPKAootsU/Wwa1U6ztgPI/AAAAAAAAJBA/GAro0xspqRYAK5ZPt012yZcTy-TQS-MMACLcBGAs/s1600/sky.jpg',
    title : 'the rock in action',
    description : 'the rock omg so  big guy',
    price : 85
  }),
  new product({
    imagePath : 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
    title : 'the rock in action asdasdasdasdas',
    description : 'the  asdasdasdasdsa rock omg so  big guy',
    price : 85
  })
]

var done = 0;
for(var i = 0; i < products.length; i++ ){
  done++;
  products[i].save((err,result) => {
    if(done === products.length){
      mongoose.disconnect();
    }
  })
}
